/**
 * TCK İlaçlama — Site Geneli Sabit Değerler
 * Telefon numarasını, adresi veya iletişim bilgisini değiştirmek için
 * sadece bu dosyayı güncelleyin. Site genelinde otomatik yansır.
 */

// ─── İLETİŞİM ────────────────────────────────────────────────────────────────
export const PHONE_RAW      = '905016355053';          // uluslararası, + ve boşluksuz
export const PHONE_DISPLAY  = '0501 635 50 53';        // gösterim formatı
export const PHONE_HREF     = `tel:+${PHONE_RAW}`;    // <a href> için

// WhatsApp linkleri
export const WHATSAPP_BASE  = `https://wa.me/${PHONE_RAW}`;
export const WHATSAPP_QUOTE = `${WHATSAPP_BASE}?text=Merhaba%2C%20ila%C3%A7lama%20hizmeti%20i%C3%A7in%20%C3%BCcretsiz%20teklif%20almak%20istiyorum.`;
export const WHATSAPP_URGENT = `${WHATSAPP_BASE}?text=Merhaba%2C%20acil%20ila%C3%A7lama%20teklifi%20almak%20istiyorum.`;

// ─── ŞİRKET BİLGİLERİ ────────────────────────────────────────────────────────
export const COMPANY_NAME   = 'TCK İlaçlama';
export const COMPANY_EMAIL  = 'info@tckilaclama.com';
export const COMPANY_DOMAIN = 'https://tckilaclama.com';

// ─── ADRES ───────────────────────────────────────────────────────────────────
export const ADDRESS_STREET  = 'Barbaros Bulvarı No:74';
export const ADDRESS_DISTRICT = 'Beşiktaş';
export const ADDRESS_CITY    = 'İstanbul';
export const ADDRESS_POSTAL  = '34349';
export const ADDRESS_FULL    = `${ADDRESS_STREET}, ${ADDRESS_DISTRICT} / ${ADDRESS_CITY}`;

// ─── SOSYAL MEDYA ─────────────────────────────────────────────────────────────
export const INSTAGRAM_URL  = 'https://www.instagram.com/tckilaclama';
export const FACEBOOK_URL   = 'https://www.facebook.com/tckilaclama';
