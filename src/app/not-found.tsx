import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: '404 - Sayfa Bulunamadı | TCK İlaçlama',
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand/10 mb-8">
          <ShieldAlert className="w-12 h-12 text-brand" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-4">
          Aradığınız Sayfa Bulunamadı
        </h2>
        <p className="text-slate-600 max-w-md mx-auto mb-10 text-lg">
          Ulaşmaya çalıştığınız sayfa taşınmış veya yayından kaldırılmış olabilir. Operasyon ekibimizden doğrudan destek almak için iletişime geçebilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <RoseButton className="px-8 py-4 text-lg w-full sm:w-auto">
              Ana Sayfaya Dön
            </RoseButton>
          </Link>
          <a href="https://wa.me/905016355053?text=Merhaba,%20sitenizde%20bir%20sayfaya%20ula%C5%9Famad%C4%B1m,%20destek%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">
            <RoseButton variant="outline" className="px-8 py-4 text-lg w-full sm:w-auto">
              WhatsApp Destek
            </RoseButton>
          </a>
        </div>
      </div>
    </div>
  );
}
