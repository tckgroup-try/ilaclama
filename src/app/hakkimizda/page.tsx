import Image from 'next/image';
import Link from 'next/link';
import { RoseButton } from '@/components/ui/RoseButton';
import { ShieldCheck, Truck, FlaskConical, Leaf, Target, Award } from 'lucide-react';

export const metadata = {
  title: 'Hakkımızda | TCK Group - TCK İlaçlama',
  description: 'TCK Group güvencesiyle İstanbul\'un en profesyonel mobil haşere kontrol ekibi. Biyosidal, kokusuz ve Sağlık Bakanlığı onaylı ilaçlama teknolojileri.',
};

export default function Hakkimizda() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative mb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-slate-300 mb-6">
            <Award className="w-4 h-4 text-brand" />
            <span className="tracking-widest uppercase font-semibold">Bir TCK GROUP Kuruluşudur</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Profesyonel Mobil Ekip,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">
              Kusursuz Müdahale.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            TCK İlaçlama, TCK Group'un gücü ve vizyonuyla İstanbul'un her noktasına 7/24 ulaşan, teknolojik donanımlı profesyonel bir mobil haşere kontrol operasyonudur. Kesin ve garantili çözümler sunuyoruz.
          </p>
        </div>
      </section>

      {/* İlaç Özelliklerimiz (Biyosidal Teknoloji) */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image 
                  src="/images/blog_spray.png" 
                  alt="TCK İlaçlama Teknolojisi" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-brand/20" />
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Kullandığımız İlaçların Özellikleri</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Sağlık Bakanlığı & WHO Onaylı Biyosidal</h3>
                    <p className="text-slate-400">Piyasadaki merdiven altı tarım ilaçlarını kullanmayız. Sadece insan ve çevre sağlığına duyarlı, uluslararası standartlarda "Biyosidal" ürünler kullanıyoruz.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Kokusuz ve Leke Bırakmaz</h3>
                    <p className="text-slate-400">Evi barkı terk etmenize, günlerce cam çerçeve açmanıza gerek yok. Jel ve sıvı solüsyonlarımız zerre koku yapmaz, parkede veya duvarda iz bırakmaz.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Çocuk ve Evcil Hayvan Dostu (Pet-Friendly)</h3>
                    <p className="text-slate-400">Evdeki evcil hayvanlarınız veya küçük çocuklarınız için endişe etmenize gerek yoktur. İlaçlarımız sadece soğukkanlı zararlıların sinir sistemini etkiler, sıcakkanlılara zarar vermez.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Nano-Kapsül Kalıcılık Teknolojisi</h3>
                    <p className="text-slate-400">Sıktığımız ilaç o an kurusa bile, içinde mikroskobik kapsüller barındırır. Böcek o yüzeyden aylar sonra geçse bile kapsül patlar ve işi bitirir. Domino etkisi yaratır.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobil Ekip ve Operasyon */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand/10 mb-8">
            <Truck className="w-10 h-10 text-brand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Hızlı ve Kesintisiz Mobil Ekip</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            TCK Group araç filomuz, çağrıyı aldığınız an harekete geçer. Gece gündüz demeden, tam teçhizatlı tulumlarımız ve yüksek basınçlı ULV makinelerimizle müdahale sağlıyoruz. İşletmenizin itibarını korumak adına, operasyonlarımızı çevreyi rahatsız etmeden, hızlı ve tamamen profesyonel bir gizlilik içinde tamamlarız.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-4xl font-bold text-brand mb-2">7/24</h3>
              <p className="text-white font-medium mb-2">Kesintisiz Operasyon</p>
              <p className="text-sm text-slate-400">Üretim tesisleri, restoranlar veya plazalar için iş akışınızı kesintiye uğratmadan mesai dışı operasyon gerçekleştirilir.</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-4xl font-bold text-brand mb-2">%100</h3>
              <p className="text-white font-medium mb-2">Garantili Çözüm</p>
              <p className="text-sm text-slate-400">Haşere sorunu tamamen ortadan kalkana kadar ek müdahale ve kalıcı çözüm garantisi sunuyoruz.</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-4xl font-bold text-brand mb-2">1. Sınıf</h3>
              <p className="text-white font-medium mb-2">Mühendislik ve Analiz</p>
              <p className="text-sm text-slate-400">Sıradan uygulamalar yerine, tür tespiti ve alan analizine dayalı stratejik entomolojik mühendislik kullanıyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass-panel rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-brand/10 z-0" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Mekanı Profesyonellere Teslim Et</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                TCK İlaçlama kalitesiyle tanışın. Hemen bizi arayın veya Whatsapp'tan yazın, mobil ekibimiz dakikalar içinde yola çıksın.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:05300000000" className="w-full sm:w-auto">
                  <RoseButton className="w-full text-lg px-8 py-4">
                    Mobil Ekibi Çağır
                  </RoseButton>
                </a>
                <a href="https://wa.me/905300000000?text=Merhaba,%20%C3%BCcretsiz%20ke%C5%9Fif%20ve%20fiyat%20bilgisi%20istiyorum" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <RoseButton variant="outline" className="w-full text-lg px-8 py-4">
                    Ücretsiz Keşif İste
                  </RoseButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
