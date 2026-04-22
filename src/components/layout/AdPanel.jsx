import logo2 from '../../assets/logo2.png';

export function AdPanel() {
  return (
    <aside id="vappy-shop-promo" className="glass-panel scroll-mt-24 overflow-hidden">
      <div className="grid gap-0 xl:grid-cols-[minmax(280px,0.9fr)_minmax(0,2.1fr)]">
        <div className="bg-slate-900 px-6 py-6 text-white sm:px-8">
          <img src={logo2} alt="VappyBuilder" className="mb-5 h-20 w-auto" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Vappy Shop</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Extra services can live here without shrinking the preview.</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-200">
            This section now stays below the builder so the document preview gets more space. You can still promote design help, printing, and premium templates here.
          </p>
          <button className="primary-button mt-5">Promote Vappy Shop</button>
        </div>

        <div className="grid gap-4 bg-white px-6 py-6 sm:px-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-mist p-5">
            <p className="text-sm font-semibold text-slate-900">Premium Template Pack</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Show premium resume, CV, and biodata themes without crowding the main editing area.</p>
          </div>

          <div className="rounded-3xl border border-dashed border-brand/40 p-5">
            <p className="text-sm font-semibold text-slate-900">Print & Delivery</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Offer printed copies, lamination, or same-day delivery as a clear next step after download.</p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-brand to-blue-400 p-5 text-white">
            <p className="text-sm font-semibold">Assisted Filling Service</p>
            <p className="mt-2 text-sm leading-6 text-blue-50">Help users who want someone from Vappy Shop to prepare their document for them.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}