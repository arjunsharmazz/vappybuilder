import { getExportMarkup } from '../utils/preview';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function resolveEndpoint(pathname) {
  return apiBaseUrl ? `${apiBaseUrl}${pathname}` : pathname;
}

async function downloadBlob(endpoint, previewNode, title, mimeType, extension) {
  const payload = getExportMarkup(previewNode);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...payload, title }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Failed to generate ${extension.toUpperCase()}.`);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(new Blob([blob], { type: mimeType }));
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = `${title}.${extension}`;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

export function downloadPdf(previewNode, title) {
  return downloadBlob(resolveEndpoint('/generate-pdf'), previewNode, title, 'application/pdf', 'pdf');
}

export function downloadImage(previewNode, title) {
  return downloadBlob(resolveEndpoint('/generate-image'), previewNode, title, 'image/png', 'png');
}

export function printPreview(previewNode, title) {
  const previewWindow = window.open('', '_blank', 'noopener,noreferrer,width=1100,height=900');

  if (!previewWindow || !previewNode) {
    throw new Error('Unable to open the print window.');
  }

  const payload = getExportMarkup(previewNode);

  previewWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>${payload.styles}</style>
      </head>
      <body>${payload.html}</body>
    </html>
  `);
  previewWindow.document.close();
  previewWindow.focus();
  previewWindow.print();
}