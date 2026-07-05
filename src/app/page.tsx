import { HeroSection } from "@/components/HeroSection";
import { ServiceTab } from "@/components/ServiceTab";
import { ShieldCheck, Target, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TrustBadges } from "@/components/TrustBadges";
import { CostEstimator } from "@/components/CostEstimator";
import { FAQ } from "@/components/FAQ";
import { MobileAppPromo } from "@/components/MobileAppPromo";
import { Testimonials } from "@/components/Testimonials";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      
      {/* Features Section */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">%100 Kesin Çözüm Garantisi</h3>
              <p className="text-slate-400">
                Uyguladığımız tüm biyosidal protokoller sıfır toleranslıdır. İstila sorununa kalıcı olarak veda edin, zamanınız ve paranız boşa gitmesin.
              </p>
            </GlassCard>
            
            <GlassCard className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Taktiksel Biyosidal Müdahale</h3>
              <p className="text-slate-400">
                Gelişmiş taksonomik analiz ile haşerenin biyolojisine özel, bağışıklık direnci geliştiremeyen en etkili aktif ajanlar kullanılır.
              </p>
            </GlassCard>
            
            <GlassCard className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">45 Dakikada Acil Operasyon</h3>
              <p className="text-slate-400">
                Kritik tesisler, ev ve plazalar için gece gündüz demeden, kokusuz ve anında müdahale edebilen sivil motorize ekiplerimiz 7/24 hazır.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      <ServiceTab />
      
      <BeforeAfterSlider />
      <Testimonials />
      <CostEstimator />
      <MobileAppPromo />
      <FAQ />
    </>
  );
}
