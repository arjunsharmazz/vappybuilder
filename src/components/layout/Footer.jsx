import logo1 from '../../assets/logo1.png';

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-slate-500">
        <img src={logo1} alt="VappyBuilder" className="h-12 w-auto" />
        <p>Powered by Vappy Shop</p>
      </div>
    </footer>
  );
}