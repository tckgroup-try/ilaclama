import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand/10 mb-8">
          <ShieldAlert className="w-12 h-12 text-brand" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-300 mb-4">
          Böcekler bile bu sayfayı bulamadı!
        </h2>
        <p className="text-zinc-400 max-w-md mx-auto mb-10 text-lg">
          Aradığın sayfa ya kaldırılmış ya da hiç var olmamış abi. Endişe yok, ana sayfaya dönüp dükkanı temizlemeye devam edelim.
        </p>
        <Link href="/">
          <RoseButton className="px-8 py-4 text-lg">
            Ana Sayfaya Dön
          </RoseButton>
        </Link>
      </div>
    </div>
  );
}
