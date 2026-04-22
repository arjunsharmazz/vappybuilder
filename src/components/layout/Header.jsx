import logo1 from '../../assets/logo1.png';

export function Header({ onScrollToBuilder }) {
  return (
    <header className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="glass-panel overflow-hidden px-6 py-6 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-4">
              <img src={logo1} alt="VappyBuilder" className="h-14 w-auto sm:h-16" />
              <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                Resume Builder
              </span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Build polished resumes, CVs, and biodata in a few easy steps.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Beginner-friendly forms, instant live preview, customizable templates, browser auto-save, and export tools built into one clean workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#vappy-shop-promo"
                className="primary-button"
              >
                Visit Vappy Shop
              </a>
              <button
                type="button"
                onClick={onScrollToBuilder}
                className="soft-button"
              >
                Open Resume Builder
              </button>
            </div>

            <div className="rounded-3xl border border-brand/20 bg-brand/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Vappy Shop Promotion</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Need premium templates, print delivery, or profile writing help? Vappy Shop can prepare polished resumes, biodata, and ready-to-print documents for your users.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[320px] lg:grid-cols-1">
            <div className="rounded-3xl bg-mist px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Builder Types</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">4</p>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-4 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Templates</p>
              <p className="mt-1 text-2xl font-semibold">4 Styles</p>
            </div>
            <div className="rounded-3xl bg-white px-4 py-4 ring-1 ring-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Auto Save</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">On</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}