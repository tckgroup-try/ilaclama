import React from 'react';

const slugify = (text: string) => {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const imageList = [
  '/images/tck_fare_uzman.png',
  '/images/tck_fabrika_ekip.png',
  '/images/tck_bocek_mutfak.png',
  '/images/tck_arac_filo.png',
  '/images/tck_expert.png'
];

const getImageForPest = (pest: string, index: number) => {
  return imageList[index % imageList.length];
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
    `kokusuz ilaçlama`
  ].join(', ');
};

const generateCorporateContent = (district: string, pest: string) => {
  return `
    <article class="professional-blog-content">
      <p class="lead" style="font-size: 1.1rem; color: #475569; margin-bottom: 2rem;">
        TCK İlaçlama olarak <strong>${district}</strong> bölgesinde karşılaştığınız <strong>${pest}</strong> problemlerine karşı kalıcı, garantili ve Sağlık Bakanlığı onaylı ilaçlama çözümleri sunuyoruz.
      </p>

      <h2 style=" font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(15,23,42,0.1); padding-bottom: 0.5rem;">
        ${district} ${pest} İstilasının Nedenleri ve Riskleri
      </h2>
      <p style="margin-bottom: 1.5rem;">
        İstanbul'un en yoğun yaşam alanlarından biri olan ${district} bölgesinde, altyapı eskimesi, iklimsel değişiklikler ve yoğun insan popülasyonu <strong>${pest}</strong> üremesi için ideal koşullar yaratır. 
        Geleneksel market spreyleri veya merdiven altı tarım ilaçları, sadece gözle gördüğünüz ${pest} popülasyonunu etkiler, ancak yuvalarında üremeye devam eden koloniyi durduramaz.
      </p>
      <p style="margin-bottom: 1.5rem;">
        Özellikle gıda işletmelerinde, plazalarda ve evlerde ${pest} sorunu hem maddi hem de ciddi halk sağlığı riskleri (enfeksiyon, virüs taşıma) barındırmaktadır.
        Bu sebeple soruna yüzeysel değil, kökten müdahale eden profesyonel ve garantili ilaçlama yöntemleri uygulamaktayız.
      </p>

      <div style="background: rgba(16, 185, 129, 0.05); border-left: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 0 0.5rem 0.5rem 0;">
        <h3 style="color: #10b981; margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">Garantili ve Kokusuz İlaçlama Uygulamaları</h3>
        <p style="margin-bottom: 1rem;">
          TCK İlaçlama olarak, uyguladığımız işlemlerde sadece <strong>T.C. Sağlık Bakanlığı ve Dünya Sağlık Örgütü (WHO)</strong> onaylı, insan ve çevre sağlığına zarar vermeyen ruhsatlı ilaçlar kullanmaktayız.
        </p>
        <ul style="list-style-type: none; padding-left: 0;">
          <li style="margin-bottom: 0.5rem;">✓ Kokusuzdur ve leke bırakmaz.</li>
          <li style="margin-bottom: 0.5rem;">✓ Alanı terk etmenize gerek kalmaz.</li>
          <li style="margin-bottom: 0.5rem;">✓ Evcil hayvan dostudur (Pet-friendly).</li>
          <li style="margin-bottom: 0;">✓ Kapsül teknolojisi ile aylarca koruma sağlar.</li>
        </ul>
      </div>

      <h2 style=" font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(15,23,42,0.1); padding-bottom: 0.5rem;">
        ${district} Bölgesi ${pest} İlaçlama Fiyatları
      </h2>
      <p style="margin-bottom: 1.5rem;">
        Maliyet analizi yapılırken alanın m² büyüklüğü, popülasyonun direnç seviyesi ve kullanılacak ilaçların türü dikkate alınır. TCK İlaçlama olarak, en ucuzu değil, kalıcı ve garantili olan en doğru çözümü sunuyoruz. 
        Sağlıktan ve hijyenden tasarruf olmaz; kalitesiz ilaçlar yalnızca paranızı israf etmekle kalmaz, mekanınızı da zehirler.
      </p>

      <h2 style=" font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(15,23,42,0.1); padding-bottom: 0.5rem;">
        Sıkça Sorulan Sorular (S.S.S.)
      </h2>
      
      <div style="margin-bottom: 1.5rem; background: rgba(15,23,42,0.02); padding: 1.5rem; border-radius: 0.5rem; border: 1px solid rgba(15,23,42,0.05);">
        <h4 style=" margin-top: 0; margin-bottom: 0.5rem; font-size: 1.2rem;">Soru: ${pest} ilaçlaması sonrası evde kalabilir miyim?</h4>
        <p style="margin-bottom: 0;"><strong>Cevap:</strong> Evet. Uyguladığımız özel jeller ve kokusuz sıvı bariyerler sayesinde günlük yaşantınıza veya işleyişinize kesintisiz devam edebilirsiniz.</p>
      </div>

      <div style="margin-bottom: 1.5rem; background: rgba(15,23,42,0.02); padding: 1.5rem; border-radius: 0.5rem; border: 1px solid rgba(15,23,42,0.05);">
        <h4 style=" margin-top: 0; margin-bottom: 0.5rem; font-size: 1.2rem;">Soru: Çözüm garantili mi?</h4>
        <p style="margin-bottom: 0;"><strong>Cevap:</strong> Kesinlikle. ${district} bölgesindeki tüm operasyonlarımızda tam izolasyon sağlanana kadar süreç tarafımızca garanti altındadır.</p>
      </div>

      <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid rgba(15,23,42,0.1);">
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
      `${district} Fare İstilası Kabusuna Son: Yuvalarını Bulup 45 Dakikada Kurutuyoruz!`,
      `${district} Kemirgen İlaçlama: Taşıdıkları Ölümcül Hastalıklardan Ailenizi Koruyun`,
      `${district} Fare İlaçlama Servisi | 7/24 Kesin Sonuçlu İstila Önleme`
    ],
    'Hamam Böceği': [
      `${district} Hamam Böceği Kabusuna Kesin Çözüm: Tek Seferde Yuvaları Kurutun!`,
      `${district} Kalorifer Böceği İlaçlama: Mutfaktaki Gizli Bakterileri Yok Edin!`,
      `Spreyle Bitmeyen ${district} Hamam Böceği İstilasını Kökünden Kazıyoruz!`
    ],
    'Pire': [
      `${district} Pire İstilası Nasıl Geçer? Kaşıntı ve Uykusuz Gecelere Son!`,
      `${district} Pire İlaçlama: Evcil Hayvanlarınızı ve Yuvanızı Parazitlerden Kurtarın`,
      `Halıların Arasına Gizlenen ${district} Pirelerini Tek Uygulamada Yok Ediyoruz!`
    ],
    'Kene': [
      `${district} Kene İlaçlama: Ölümcül Kırım Kongo Ateşine Karşı Acil Kalkan`,
      `Bahçeniz Güvenli mi? ${district} Kene ve Akrep İlaçlama ile %100 Güvenlik`,
      `Gezici Ekiplerle ${district} Kene İlaçlama Servisi | 7/24 Koruma`
    ],
    'Böcek': [
      `${district} Böcek İstilasına Son: Sağlık Bakanlığı Onaylı Kokusuz Çözümler!`,
      `${district} İlaçlama Şirketi: Evinizde Böceklerin Üreme Noktalarını Nasıl Buluyoruz?`,
      `Merdiven Altı İlaçlamacılara Dikkat! ${district} Garantili Böcek İlaçlama`
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

const generatedBlogs = [];
let index = 0;

for (const district of districts) {
  for (const pest of pests) {
    const aggressiveTitle = generateAggressiveTitle(district, pest.name);
    const aggressiveExcerpt = generateAggressiveExcerpt(district, pest.name);

    generatedBlogs.push({
      slug: `${slugify(district)}-${slugify(pest.name)}-ilaclama`,
      title: aggressiveTitle,
      excerpt: aggressiveExcerpt,
      content: generateCorporateContent(district, pest.name),
      image: getImageForPest(pest.name, index),
      date: `2026-07-${(index % 28) + 1 < 10 ? '0' + ((index % 28) + 1) : (index % 28) + 1}`,
      geo: { lat: 41.0082, lng: 28.9784, region: district },
      tags: [district, `${pest.name} İlaçlama`, 'Garantili İlaçlama', 'Profesyonel Çözüm']
    });
    index++;
  }
}

export const blogs = [
  ...generatedBlogs
];
