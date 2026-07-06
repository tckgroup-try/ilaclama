import { NextRequest, NextResponse } from 'next/server';
import { parseSlug } from '../page';
import { COMPANY_DOMAIN, PHONE_DISPLAY, PHONE_RAW } from '@/lib/constants';
import { tckBranches } from '@/data/branches';

function slugify(text: string): string {
  const map: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
    ' ': '-',
    '\'': '',
    '.': '',
    ',': ''
  };
  return text.toLowerCase().split('').map(c => map[c] || c).join('').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { districtName, placeName, pestName, districtKey } = parseSlug(slug);

  const titlePrefix = placeName ? `${districtName} ${placeName}` : `${districtName}`;
  const title = `${titlePrefix} ${pestName} İlaçlama | %100 Garantili Çözüm (AMP)`;
  const description = `${districtName} bölgesinde ${placeName ? `${placeName.toLowerCase()} alanları` : 'tüm yaşam alanları'} için %100 garantili ${pestName.toLowerCase()} ilaçlama hizmeti. Acil müdahale ve kokusuz koruma kalkanı.`;
  const canonicalUrl = `${COMPANY_DOMAIN}/hizmet/${slug}`;

  // Find nearest branch
  const branch = tckBranches.find(b => slugify(b.district) === districtKey.toLowerCase()) || tckBranches[0];

  const ampHtml = `<!doctype html>
<html amp lang="tr">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="canonical" href="${canonicalUrl}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <meta name="description" content="${description}">
    
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0.1/amp-accordion-0.1.js"></script>
    
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    
    <style amp-custom>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: #1e293b;
        background-color: #f8fafc;
        margin: 0;
        padding: 0;
      }
      header {
        background-color: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        padding: 16px;
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .logo {
        font-size: 20px;
        font-weight: 800;
        color: #e11d48;
        text-decoration: none;
        letter-spacing: -0.5px;
      }
      .logo span {
        color: #0f172a;
      }
      .hero {
        background: linear-gradient(135deg, #fff1f2 0%, #fff 100%);
        padding: 40px 20px;
        text-align: center;
        border-bottom: 1px solid #ffe4e6;
      }
      .badge {
        background-color: #ffe4e6;
        color: #e11d48;
        font-size: 12px;
        font-weight: 700;
        padding: 6px 16px;
        border-radius: 100px;
        display: inline-block;
        margin-bottom: 16px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      h1 {
        font-size: 28px;
        font-weight: 800;
        color: #0f172a;
        margin: 0 0 12px 0;
        line-height: 1.2;
      }
      .subtitle {
        font-size: 16px;
        color: #475569;
        margin: 0 0 24px 0;
      }
      .cta-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
        margin: 0 auto;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 24px;
        border-radius: 12px;
        font-weight: 700;
        text-decoration: none;
        font-size: 16px;
        transition: background-color 0.2s;
      }
      .btn-primary {
        background-color: #e11d48;
        color: #ffffff;
      }
      .btn-secondary {
        background-color: #25d366;
        color: #ffffff;
      }
      .container {
        padding: 32px 20px;
        max-width: 650px;
        margin: 0 auto;
      }
      h2 {
        font-size: 20px;
        color: #0f172a;
        margin-top: 0;
        margin-bottom: 16px;
        font-weight: 700;
      }
      .card {
        background-color: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      }
      .feature-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .feature-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
      }
      .feature-icon {
        color: #e11d48;
        font-weight: bold;
        margin-right: 12px;
        font-size: 18px;
        line-height: 1;
      }
      .feature-text {
        font-size: 15px;
        color: #334155;
      }
      .info-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .info-box {
        background-color: #f1f5f9;
        padding: 16px;
        border-radius: 12px;
      }
      .info-label {
        font-size: 12px;
        text-transform: uppercase;
        color: #64748b;
        font-weight: 700;
        margin-bottom: 4px;
      }
      .info-value {
        font-size: 15px;
        color: #0f172a;
        font-weight: 600;
      }
      footer {
        background-color: #0f172a;
        color: #94a3b8;
        padding: 40px 20px;
        text-align: center;
        font-size: 14px;
        border-top: 1px solid #1e293b;
      }
      footer a {
        color: #ffffff;
        text-decoration: none;
      }
      .amp-img-container {
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <header>
      <a href="/" class="logo">TCK <span>İlaçlama</span></a>
      <a href="tel:${PHONE_RAW}" style="color: #e11d48; font-weight: 700; text-decoration: none;">Arayın</a>
    </header>

    <div class="hero">
      <span class="badge">%100 Garantili</span>
      <h1>${titlePrefix} ${pestName} İlaçlama</h1>
      <p class="subtitle">Sağlık Bakanlığı Onaylı, Kokusuz ve Kalıcı Haşere Koruma Kalkanı</p>
      
      <div class="cta-container">
        <a href="tel:${PHONE_RAW}" class="btn btn-primary">📞 Hemen Arayın: ${PHONE_DISPLAY}</a>
        <a href="https://wa.me/905016355053?text=${encodeURIComponent(`Merhaba, ${titlePrefix} ${pestName.toLowerCase()} ilaçlama hizmeti hakkında bilgi alabilir miyim?`)}" class="btn btn-secondary">💬 WhatsApp Destek Hattı</a>
      </div>
    </div>

    <div class="container">
      <div class="card">
        <h2>🛡️ TCK Güvencesiyle İlaçlama Çözümleri</h2>
        <div class="amp-img-container">
          <amp-img src="${COMPANY_DOMAIN}/images/tck_expert.webp" width="600" height="350" layout="responsive" alt="${titlePrefix} ${pestName} İlaçlama Hizmeti"></amp-img>
        </div>
        <ul class="feature-list">
          <li class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text"><strong>Sağlık Bakanlığı Onaylı:</strong> Tüm uygulamalarımızda Dünya Sağlık Örgütü (WHO) onaylı biyosidal ürünler kullanılmaktadır.</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text"><strong>Kokusuz İlaçlama:</strong> Günlük yaşantınızı kesintiye uğratmayan, leke bırakmayan yeni nesil ilaçlama teknolojisi.</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text"><strong>7/24 Acil Müdahale:</strong> Haşere ve kemirgen problemlerine karşı günün her saati kesintisiz teknik destek.</span>
          </li>
          <li class="feature-item">
            <span class="feature-icon">✓</span>
            <span class="feature-text"><strong>Garantili Sonuç:</strong> Yapılan uygulamalardan sonra sorun tamamen çözülene kadar ücretsiz ek kontrol garantisi.</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h2>📍 Yakındaki Bölge Şubemiz</h2>
        <div class="info-grid">
          <div class="info-box">
            <div class="info-label">Yetkili Şube</div>
            <div class="info-value">TCK ${branch.district} Şubesi</div>
          </div>
          <div class="info-box">
            <div class="info-label">Hizmet Alanı</div>
            <div class="info-value">${districtName} ve çevre mahalleleri</div>
          </div>
          <div class="info-box">
            <div class="info-label">Çalışma Saatleri</div>
            <div class="info-value">7 Gün 24 Saat (Resmi Tatiller Dahil)</div>
          </div>
          <div class="info-box">
            <div class="info-label">İrtibat Numarası</div>
            <div class="info-value">${PHONE_DISPLAY}</div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>© ${new Date().getFullYear()} TCK İlaçlama. Tüm Hakları Saklıdır.</p>
      <p><a href="${canonicalUrl}">Masaüstü Sürümüne Git</a></p>
    </footer>
  </body>
</html>`;

  return new NextResponse(ampHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=600'
    }
  });
}
