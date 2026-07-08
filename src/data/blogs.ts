import React from 'react';

const slugify = (text: string) => {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const pestImages: Record<string, string> = {
  'Fare': '/images/blog_fare_control.png',
  'Hamam Böceği': '/images/blog_hamambocek_control.png',
  'Pire': '/images/blog_pire_control.png',
  'Kene': '/images/blog_kene_control.png',
  'Böcek': '/images/blog_bocek_control.png'
};

const getImageForPest = (pest: string) => {
  return pestImages[pest] || '/images/blog_bocek_control.png';
};

const districts = [
  'Kadıköy', 'Şişli', 'Beşiktaş', 'Bakırköy', 'Pendik', 
  'Ümraniye', 'Sarıyer', 'Beylikdüzü', 'Maltepe', 'Tuzla',
  'Kartal', 'Zeytinburnu', 'Ataşehir', 'Üsküdar', 'Beykoz',
  'Esenyurt', 'Avcılar', 'Fatih', 'Başakşehir', 'Eyüpsultan'
];

const pests = [
  { name: 'Fare', desc: 'Kemirgen', type: 'kemirgen' },
  { name: 'Hamam Böceği', desc: 'Blattodea', type: 'bocek' },
  { name: 'Pire', desc: 'Dış Parazit', type: 'parazit' },
  { name: 'Kene', desc: 'Dış Parazit', type: 'parazit' },
  { name: 'Böcek', desc: 'Genel Haşere', type: 'bocek' }
];

const generateLSIKeywords = (district: string, pest: string) => {
  return [
    `${district} garantili ilaçlama`,
    `${district} ${pest.toLowerCase()} ilaçlama firmaları`,
    `${district} ilaçlama fiyatları`,
    `sağlık bakanlığı onaylı ${pest.toLowerCase()} ilacı`,
    `${pest.toLowerCase()} kesin çözüm`,
    `haşere ilacı`,
    `kokusuz ilaçlama`,
    `böcek ilaçlama`,
    `haşere ilaçlama`,
    `${district} ilçe ilaçlama`,
    `${district} ilçe böcek ilaçlama`,
    `${district} ilçe haşere ilaçlama`,
    `il ilaçlama`,
    `ilçe ilaçlama`,
    `il böcek ilaçlama`,
    `ilçe böcek ilaçlama`,
    `il haşere ilaçlama`,
    `ilçe haşere ilaçlama`
  ].join(', ');
};

const generateCorporateContent = (district: string, pest: string) => {
  return `
    <article class="professional-blog-content">
      <p class="lead" style="font-size: 1.15rem; color: #1e293b; margin-bottom: 2rem; font-weight: 600; border-left: 4px solid #f43f5e; padding-left: 1rem;">
        Dikkat: <strong>${district}</strong> genelinde son dönemdeki kontrolsüz yapılaşma ve altyapı yetersizliği, <strong>${pest}</strong> popülasyonunu zirveye taşıdı. Basit market spreyleriyle veya ne idüğü belirsiz ilaçlamacılarla vakit kaybetmek, sadece koloniyi daha derin deliklere kaçırıp üremelerini hızlandırır. Ailenizin sağlığını ve yuvanızı riske atmayın!
      </p>

      <h2 style="font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 2px solid #f43f5e; padding-bottom: 0.5rem; color: #0f172a; font-weight: 700;">
        Neden Sıradan İlaçlama İşlemleri İstila Karşısında Yetersiz Kalır?
      </h2>
      <p style="margin-bottom: 1.5rem; color: #334155; line-height: 1.8;">
        Piyasadaki dev bütçeli, çağrı merkezi üzerinden çalışan aracı firmaların çoğu, sahada yüksek kâr marjı hedefledikleri için yetersiz eğitimli veya taşeron ekiplerle hizmet verir. Evinizde veya iş yerinizde detaylı zemin, nem ve yuva analizi yapmadan standart, suyla aşırı seyreltilmiş etkisiz kimyasalları üstünkörü püskürtüp giderler. Sonuç olarak, kısa süre sonra aynı <strong>böcek ilaçlama</strong> veya <strong>haşere ilaçlama</strong> problemiyle tekrar karşılaşırsınız.
      </p>
      <p style="margin-bottom: 1.5rem; color: #334155; line-height: 1.8;">
        Daha da tehlikelisi, piyasada "ucuz fiyat" vaadiyle çalışan ruhsatsız ve merdiven altı şahıslardır. T.C. Sağlık Bakanlığı yetki belgesi olmayan bu kişiler, kapalı yaşam alanlarında asla kullanılmaması gereken ağır tarım kimyasallarını bilinçsizce uygulayarak sevdiklerinizin ve evcil hayvanlarınızın sağlığını doğrudan tehlikeye atar. Bu tip kalitesiz veya tarım kökenli ilaçlar, <strong>${pest}</strong> türlerinin kimyasallara karşı bağışıklık kazanıp daha dirençli şekilde çoğalmasına sebep olur.
      </p>

      <div style="background: rgba(244, 63, 94, 0.05); border-left: 4px solid #f43f5e; padding: 1.5rem; margin: 2rem 0; border-radius: 0 0.5rem 0.5rem 0;">
        <h3 style="color: #e11d48; margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem; font-weight: 700;">TCK İlaçlama ile Nano-Kapsül Bariyer Teknolojisi</h3>
        <p style="margin-bottom: 1rem; color: #334155;">
          Biz <strong>${district}</strong> bölgesindeki tüm <strong>ilçe ilaçlama</strong> operasyonlarımızda sadece anlık öldürücü değil, aylarca koruyan özel formüller kullanıyoruz:
        </p>
        <ul style="list-style-type: none; padding-left: 0; color: #334155; margin-bottom: 0;">
          <li style="margin-bottom: 0.8rem; display: flex; align-items: flex-start; line-height: 1.6;">
            <span style="color: #e11d48; margin-right: 10px; font-weight: bold; font-size: 1.2rem; line-height: 1;">✓</span> 
            <span><strong>Sağlık Bakanlığı ve WHO Onaylı Biyosidal Ürünler:</strong> İnsan ve evcil hayvan sağlığına tamamen zararsız, kokusuz ve lekesiz koruma bariyeri.</span>
          </li>
          <li style="margin-bottom: 0.8rem; display: flex; align-items: flex-start; line-height: 1.6;">
            <span style="color: #e11d48; margin-right: 10px; font-weight: bold; font-size: 1.2rem; line-height: 1;">✓</span> 
            <span><strong>Mikro-Kapsül Teknolojisi:</strong> Yüzeye yapışan nano-kapsüller haşereler yürüdükçe patlar ve koloninin kalbine (yuvasına) taşınarak zincirleme yok oluş başlatır.</span>
          </li>
          <li style="margin-bottom: 0; display: flex; align-items: flex-start; line-height: 1.6;">
            <span style="color: #e11d48; margin-right: 10px; font-weight: bold; font-size: 1.2rem; line-height: 1;">✓</span> 
            <span><strong>45 Dakikada Hızlı Servis Garantisi:</strong> ${district} sokaklarına hakim yerel mobil ekiplerimizle en kritik durumlarda bile hızla yanınızdayız.</span>
          </li>
        </ul>
      </div>

      <div style="background: #fff1f2; border: 1.5px solid #fda4af; border-radius: 0.75rem; padding: 1.5rem 2rem; margin: 2.5rem 0;">
        <p style="margin: 0 0 0.5rem 0; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #e11d48;">⚖️ Yasal Uyarı — T.C. Türk Ceza Kanunu</p>
        <h3 style="color: #9f1239; margin: 0 0 0.75rem 0; font-size: 1.15rem; font-weight: 800; line-height: 1.4;">TCK Madde 187/1: Ruhsatsız İlaçlama 1 ila 5 Yıl Hapis Cezası Gerektirir</h3>
        <p style="margin: 0; color: #4c0519; line-height: 1.7; font-size: 0.95rem;">
          T.C. Türk Ceza Kanunu'nun 187. maddesi 1. fıkrası uyarınca: <em>"Kişilerin hayatını ve sağlığını tehlikeye sokacak biçimde ilaç üreten veya satan kimseye bir yıldan beş yıla kadar hapis ve adlî para cezası verilir."</em> Bu sebeple ruhsatsız, eğitimsiz veya Sağlık Bakanlığı yetki belgesi bulunmayan kişilere ev veya iş yerinizde ilaçlama yaptırmak hem aileniz hem de o kişi açısından ciddi hukuki sonuçlar doğurur. Güvenliğiniz için mutlaka <strong>lisanslı ve tescilli bir ilaçlama firması</strong> tercih edin.
        </p>
      </div>

      <h2 style="font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 2px solid #f43f5e; padding-bottom: 0.5rem; color: #0f172a; font-weight: 700;">
        İstanbul ve ${district} Genelinde Profesyonel Böcek İlaçlama
      </h2>
      <p style="margin-bottom: 1.5rem; color: #334155; line-height: 1.8;">
        Sadece yerel mahalle bazlı değil, İstanbul genelinde geniş kapsamlı <strong>İstanbul İlaçlama</strong> ve <strong>${district} İlaçlama</strong> operasyonları yönetiyoruz. TCK İlaçlama, İstanbul genelinde <strong>İstanbul Böcek İlaçlama</strong> ağını yöneterek tüm 39 ilçede 7/24 hizmet sunmaktadır. Her bölgeye özel kurduğumuz mobil ekiplerimiz sayesinde <strong>${district} Böcek İlaçlama</strong> taleplerine 45 dakikada hızlı müdahale sağlıyoruz. Evinizi saran haşerelerden kalıcı olarak kurtulmak için en yetkin <strong>İstanbul Haşere İlaçlama</strong> firmasıyız.
      </p>
      <p style="margin-bottom: 1.5rem; color: #334155; line-height: 1.8;">
        Envanterimizdeki tüm biyosidal ürünler T.C. Sağlık Bakanlığı ruhsatlı olup, <strong>${district} Haşere İlaçlama</strong> prosedürlerine göre her mekana (villa, apartman dairesi, restoran, depo) özel olarak formüle edilir. İstanbul genelinde güvenilir, yasal ve garantili bir <strong>İstanbul İlaçlama</strong> veya <strong>${district} İlaçlama</strong> çözümü arıyorsanız, uzman kadromuzla yanınızdayız.
      </p>

      <h2 style="font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 2px solid #f43f5e; padding-bottom: 0.5rem; color: #0f172a; font-weight: 700;">
        ${district} ${pest} İlaçlama Fiyatları: Sağlığın Ucuzu Olmaz!
      </h2>
      <p style="margin-bottom: 1.5rem; color: #334155; line-height: 1.8;">
        İstanbul genelinde <strong>il ilaçlama</strong> ve genel <strong>ilaçlama</strong> hizmeti adı altında piyasa gerçekleriyle uyuşmayan komik fiyatlar sunanlara itibar etmeyin. Profesyonel bir biyosidal ürünün, koruyucu ekipmanların ve uzman ziraat mühendislerinin maliyeti bellidir. TCK İlaçlama olarak, ${district} sakinlerine bütçe dostu ama %100 garantili kesin çözümler sunuyoruz. Fiyattan tasarruf etmek, sevdiklerinizin sağlığından tasarruf etmektir.
      </p>

      <h2 style="font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1.5rem; border-bottom: 2px solid #f43f5e; padding-bottom: 0.5rem; color: #0f172a; font-weight: 700;">
        Kullanıcılar Bunları da Sordu (S.S.S.)
      </h2>
      
      <div style="margin-bottom: 1.5rem; background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.15rem; color: #0f172a; font-weight: 700;">Soru: ${pest} ilaçlaması sırasında evi terk etmeli miyiz?</h4>
        <p style="margin-bottom: 0; color: #475569; line-height: 1.6;"><strong>Cevap:</strong> Hayır. Kullandığımız son teknoloji kokusuz biyosidal formüller sayesinde evinizden çıkmanıza gerek kalmaz. Günlük yaşamınıza güvenle devam edebilirsiniz.</p>
      </div>

      <div style="margin-bottom: 1.5rem; background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.15rem; color: #0f172a; font-weight: 700;">Soru: İlaçlama sonrası haşereler ne zaman tamamen yok olur?</h4>
        <p style="margin-bottom: 0; color: #475569; line-height: 1.6;"><strong>Cevap:</strong> Mikro-kapsül etki mekanizmamız sayesinde ilk 24 saat içinde gözle görülür düşüş başlar. Maksimum 7 ila 10 gün içinde tüm koloni yuvalarında zincirleme olarak kurutulmuş olur.</p>
      </div>

      <div style="margin-bottom: 1.5rem; background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.15rem; color: #0f172a; font-weight: 700;">Soru: İlaçlarınız evcil hayvanlarımıza zarar verir mi?</h4>
        <p style="margin-bottom: 0; color: #475569; line-height: 1.6;"><strong>Cevap:</strong> Kesinlikle hayır. Kullandığımız tüm ürünler hedef dışı canlıların (kedi, köpek vb.) metabolizmasına zarar vermeyecek şekilde formüle edilmiş WHO tescilli biyosidal ürünlerdir.</p>
      </div>

      <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
        <p style="font-size: 0.85rem; color: #64748b;">
          <strong>İlgili Terimler (LSI):</strong> ${generateLSIKeywords(district, pest)}
        </p>
      </div>
    </article>
  `;
};

const generateAggressiveTitle = (district: string, pest: string) => {
  const titles: Record<string, string[]> = {
    'Fare': [
      `${district} Böcek ve Fare İlaçlama | 45 Dakikada Yuvaları Kurutuyoruz!`,
      `${district} Haşere İlaçlama: Taşıdıkları Ölümcül Hastalıklardan Ailenizi Koruyun`,
      `${district} Fare İlaçlama Servisi | 7/24 Kesin Sonuçlu İlçe İlaçlama`
    ],
    'Hamam Böceği': [
      `${district} Hamam Böceği İlaçlama: 45 Dakikada Yuvaları Kökünden Kurutun!`,
      `Spreyle Bitmeyen ${district} Hamam Böceği İstilasını Kökünden Kazıyoruz!`,
      `${district} Kalorifer Böceği İlaçlama: Mutfaktaki Gizli Bakterileri Yok Edin!`
    ],
    'Pire': [
      `${district} Pire İlaçlama | Kaşıntı ve Uykusuz Gecelere Son! %100 Garantili`,
      `Halıların Arasına Gizlenen ${district} Pirelerini Tek Uygulamada Yok Ediyoruz!`,
      `${district} Pire ve Haşere İlaçlama | Evcil Hayvan Dostu Kokusuz Koruma`
    ],
    'Kene': [
      `${district} Kene İlaçlama: Ölümcül Kırım Kongo Ateşine Karşı Acil Kalkan`,
      `Bahçeniz Güvenli mi? ${district} Kene ve Böcek İlaçlama ile %100 Güvenlik`,
      `Gezici Ekiplerle ${district} Kene İlaçlama Servisi | 7/24 İl İlaçlama`
    ],
    'Böcek': [
      `${district} Böcek İlaçlama: Sağlık Bakanlığı Onaylı Kokusuz Çözümler!`,
      `${district} Haşere İlaçlama Şirketi: Evinizde Böceklerin Üreme Noktalarını Nasıl Buluyoruz?`,
      `Merdiven Altı İlaçlamacılara Dikkat! ${district} Garantili İlaçlama Firması`
    ]
  };
  const list = titles[pest] || [
    `${district} ${pest} İlaçlama: Sağlığınızı Riski Atmayın, Uzman Desteği Alın!`,
    `${district} Bölgesinde %100 Garantili Profesyonel ${pest} Kontrolü`
  ];
  return list[district.length % list.length];
};

const generateAggressiveExcerpt = (district: string, pest: string) => {
  const excerpts: Record<string, string> = {
    'Fare': `${district} bölgesinde fare istilası mı var? Salgın hastalık yayan kemirgenlerden profesyonel, Sağlık Bakanlığı onaylı ve 7/24 acil müdahale ile kurtulun.`,
    'Hamam Böceği': `Mutfak ve banyonuzu saran hamam böceklerine ev yapımı çözümlerle zaman kaybetmeyin. ${district} genelinde yuvaları tek seferde kurutuyoruz.`,
    'Pire': `Evcil hayvanlardan veya dışarıdan bulaşan pireler uykunuzu mu kaçırıyor? ${district} genelinde kokusuz ve lekesiz ilaçlama ile 45 dakikada temizlik.`,
    'Kene': `Kene ısırması ölümcül olabilir. Bahçe ve yeşil alanlarınızda ${district} profesyonel kene ilaçlama çözümleri ile sevdiklerinizi güvenceye alın.`,
    'Böcek': `Evinizde veya iş yerinizde yürüyen haşere kabusu mu başladı? ${district} en güvenilir, ruhsatlı ve garantili ilaçlama servisi burada.`
  };
  return excerpts[pest] || `${district} genelinde ${pest} sorunlarına karşı 7/24 aktif, Sağlık Bakanlığı onaylı ve kesin çözüm garantili profesyonel ilaçlama.`;
};

const districtCoordinates: Record<string, { lat: number; lng: number }> = {
  'Kadıköy': { lat: 40.9906, lng: 29.0251 },
  'Şişli': { lat: 41.0606, lng: 28.9878 },
  'Beşiktaş': { lat: 41.0422, lng: 29.0075 },
  'Bakırköy': { lat: 40.9783, lng: 28.8724 },
  'Pendik': { lat: 40.8769, lng: 29.2583 },
  'Ümraniye': { lat: 41.0256, lng: 29.1244 },
  'Sarıyer': { lat: 41.1719, lng: 29.0289 },
  'Beylikdüzü': { lat: 40.9911, lng: 28.6483 },
  'Maltepe': { lat: 40.9442, lng: 29.1350 },
  'Tuzla': { lat: 40.8164, lng: 29.3025 },
  'Kartal': { lat: 40.8986, lng: 29.1825 },
  'Zeytinburnu': { lat: 40.9881, lng: 28.8953 },
  'Ataşehir': { lat: 40.9847, lng: 29.1064 },
  'Üsküdar': { lat: 41.0269, lng: 29.0156 },
  'Beykoz': { lat: 41.1342, lng: 29.0967 },
  'Esenyurt': { lat: 41.0342, lng: 28.6814 },
  'Avcılar': { lat: 40.9801, lng: 28.7175 },
  'Fatih': { lat: 41.0186, lng: 28.9392 },
  'Başakşehir': { lat: 41.1075, lng: 28.7956 },
  'Eyüpsultan': { lat: 41.0475, lng: 28.9342 }
};

const generatedBlogs = [];
let index = 0;

for (const district of districts) {
  for (const pest of pests) {
    const aggressiveTitle = generateAggressiveTitle(district, pest.name);
    const aggressiveExcerpt = generateAggressiveExcerpt(district, pest.name);
    const coords = districtCoordinates[district] || { lat: 41.0082, lng: 28.9784 };

    generatedBlogs.push({
      slug: `${slugify(district)}-${slugify(pest.name)}-ilaclama`,
      title: aggressiveTitle,
      excerpt: aggressiveExcerpt,
      content: generateCorporateContent(district, pest.name),
      image: getImageForPest(pest.name),
      date: `2026-07-${(index % 28) + 1 < 10 ? '0' + ((index % 28) + 1) : (index % 28) + 1}`,
      geo: { lat: coords.lat, lng: coords.lng, region: district },
      tags: [district, `${pest.name} İlaçlama`, 'Garantili İlaçlama', 'Profesyonel Çözüm']
    });
    index++;
  }
}

export const blogs = [
  ...generatedBlogs
];
