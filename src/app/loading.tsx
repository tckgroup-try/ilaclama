export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-brand rounded-full animate-spin"></div>
        <div className="mt-8 text-slate-600 font-medium tracking-widest uppercase animate-pulse">
          Sistem Hazırlanıyor...
        </div>
      </div>
    </div>
  );
}
