import { NextRequest, NextResponse } from 'next/server';
import { blogs } from '@/data/blogs';
import { COMPANY_DOMAIN, PHONE_DISPLAY, PHONE_RAW } from '@/lib/constants';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return new NextResponse('Blog post not found', { status: 404 });
  }

  const title = `${blog.title} | TCK İlaçlama Blog (AMP)`;
  const description = blog.excerpt;
  const canonicalUrl = `${COMPANY_DOMAIN}/blog/${slug}`;

  // Parse HTML content to replace any standard <img> tags with <amp-img> just in case
  let parsedContent = blog.content || '';
  parsedContent = parsedContent.replace(/<img([^>]+)>/g, (match, p1) => {
    // Basic replacement for AMP image compatibility
    return `<amp-img${p1} layout="responsive" width="600" height="400"></amp-img>`;
  });

  const ampHtml = `<!doctype html>
<html amp lang="tr">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="canonical" href="${canonicalUrl}">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <meta name="description" content="${description}">
    
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    
    <style amp-custom>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.7;
        color: #334155;
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
      .container {
        padding: 24px 20px;
        max-width: 680px;
        margin: 0 auto;
      }
      .article-header {
        margin-bottom: 24px;
      }
      .date {
        color: #e11d48;
        font-weight: 700;
        font-size: 13px;
        text-transform: uppercase;
        margin-bottom: 8px;
        display: block;
      }
      h1 {
        font-size: 28px;
        font-weight: 800;
        color: #0f172a;
        margin: 0 0 16px 0;
        line-height: 1.25;
      }
      .excerpt {
        font-size: 16px;
        line-height: 1.5;
        color: #64748b;
        margin-bottom: 24px;
        border-left: 3px solid #e11d48;
        padding-left: 16px;
      }
      .amp-img-container {
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 32px;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      }
      .content {
        font-size: 16px;
        color: #334155;
      }
      .content h2 {
        font-size: 20px;
        color: #0f172a;
        margin-top: 32px;
        margin-bottom: 16px;
      }
      .content p {
        margin-bottom: 20px;
      }
      .cta-box {
        background-color: #fff1f2;
        border: 1px solid #ffe4e6;
        border-radius: 16px;
        padding: 24px;
        margin-top: 40px;
        text-align: center;
      }
      .cta-box h3 {
        margin-top: 0;
        color: #0f172a;
        font-size: 18px;
        margin-bottom: 8px;
      }
      .cta-box p {
        font-size: 14px;
        color: #475569;
        margin-bottom: 16px;
      }
      .btn {
        display: inline-block;
        background-color: #e11d48;
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 700;
        text-decoration: none;
        font-size: 15px;
      }
      footer {
        background-color: #0f172a;
        color: #94a3b8;
        padding: 40px 20px;
        text-align: center;
        font-size: 14px;
        margin-top: 60px;
        border-top: 1px solid #1e293b;
      }
      footer a {
        color: #ffffff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <header>
      <a href="/" class="logo">TCK <span>İlaçlama</span></a>
      <a href="tel:${PHONE_RAW}" style="color: #e11d48; font-weight: 700; text-decoration: none;">Arayın</a>
    </header>

    <article class="container">
      <div class="article-header">
        <span class="date">${blog.date}</span>
        <h1>${blog.title}</h1>
        <p class="excerpt">${blog.excerpt}</p>
      </div>

      <div class="amp-img-container">
        <amp-img src="${COMPANY_DOMAIN}${blog.image}" width="600" height="350" layout="responsive" alt="${blog.title}"></amp-img>
      </div>

      <div class="content">
        ${parsedContent}
      </div>

      <div class="cta-box">
        <h3>🛡️ Profesyonel İlaçlama Desteği Alın</h3>
        <p>Yaşam alanınızdaki haşere ve kemirgen sorunlarını kesin olarak çözüyoruz. 7/24 ücretsiz bilgi ve fiyat teklifi için arayın.</p>
        <a href="tel:${PHONE_RAW}" class="btn">📞 Hemen Arayın: ${PHONE_DISPLAY}</a>
      </div>
    </article>

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
