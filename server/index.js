const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

const app = express();
const port = process.env.PORT || 4000;
const distPath = path.join(__dirname, '..', 'dist');
const defaultAllowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const browserExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_BIN;

app.set('trust proxy', 1);

function isOriginAllowed(origin, originAllowList) {
  return originAllowList.some((allowedOrigin) => {
    if (allowedOrigin === origin) {
      return true;
    }

    if (!allowedOrigin.includes('*')) {
      return false;
    }

    const pattern = new RegExp(`^${allowedOrigin.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`);
    return pattern.test(origin);
  });
}

app.use(
  cors({
    origin(origin, callback) {
      const originAllowList = process.env.NODE_ENV === 'production'
        ? allowedOrigins
        : [...defaultAllowedOrigins, ...allowedOrigins];

      if (!origin) {
        return callback(null, true);
      }

      if (originAllowList.length === 0) {
        return callback(process.env.NODE_ENV === 'production' ? new Error('No allowed origins configured.') : null, process.env.NODE_ENV !== 'production');
      }

      if (isOriginAllowed(origin, originAllowList)) {
        return callback(null, true);
      }

      return callback(new Error('CORS origin not allowed.'));
    },
  })
);
app.use(express.json({ limit: '20mb' }));

function sanitizeTitle(title) {
  return String(title || 'vappybuilder-document')
    .trim()
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'vappybuilder-document';
}

function buildHtmlDocument(html, styles = '') {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          margin: 0;
          background: #f3f7ff;
          font-family: Outfit, system-ui, sans-serif;
          padding: 24px;
        }

        * {
          box-sizing: border-box;
        }

        ${styles}
      </style>
    </head>
    <body>
      ${html}
    </body>
  </html>`;
}

async function withPage(html, styles, work) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: browserExecutablePath || undefined,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 2 });
    await page.setContent(buildHtmlDocument(html, styles), { waitUntil: 'networkidle0' });
    return await work(page);
  } finally {
    await browser.close();
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'VappyBuilder export API',
    environment: process.env.NODE_ENV || 'development',
    hasBrowserExecutableOverride: Boolean(browserExecutablePath),
  });
});

app.post('/generate-pdf', async (req, res) => {
  const { html, styles, title = 'vappybuilder-document' } = req.body || {};
  const safeTitle = sanitizeTitle(title);

  if (!html) {
    return res.status(400).json({ error: 'HTML content is required.' });
  }

  try {
    const pdfBytes = await withPage(html, styles, async (page) =>
      page.pdf({ format: 'A4', printBackground: true, margin: { top: '12mm', right: '12mm', bottom: '12mm', left: '12mm' } })
    );

    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.setTitle(safeTitle);
    pdfDoc.setProducer('VappyBuilder');
    pdfDoc.setCreator('VappyBuilder');
    const finalizedPdf = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.pdf"`);
    res.send(Buffer.from(finalizedPdf));
  } catch (error) {
    res.status(500).json({ error: 'Unable to generate PDF.', details: error.message });
  }
});

app.post('/generate-image', async (req, res) => {
  const { html, styles, title = 'vappybuilder-document' } = req.body || {};
  const safeTitle = sanitizeTitle(title);

  if (!html) {
    return res.status(400).json({ error: 'HTML content is required.' });
  }

  try {
    const imageBuffer = await withPage(html, styles, async (page) =>
      page.screenshot({ type: 'png', fullPage: true })
    );

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.png"`);
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Unable to generate image.', details: error.message });
  }
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get(/^(?!\/generate-|\/api\/).*/, (req, res, next) => {
    if (req.path.startsWith('/generate-') || req.path.startsWith('/api/')) {
      return next();
    }

    return res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use((error, _req, res, next) => {
  if (error.message && (error.message.includes('CORS') || error.message.includes('allowed origins'))) {
    return res.status(403).json({ error: error.message });
  }

  return next(error);
});

app.listen(port, () => {
  console.log(`VappyBuilder server running on http://localhost:${port}`);
});