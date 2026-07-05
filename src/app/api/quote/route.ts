import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Telegram Bot Bildirim Fonksiyonu
async function sendTelegramNotification(lead: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return; // Token yoksa sessizce geç (dev ortamı için)

  const message = `
🚨 *YENİ ACİL TALEP (TCK İlaçlama)* 🚨

👤 *Müşteri:* ${lead.fullName}
📞 *Tel:* ${lead.phoneNumber}
🏢 *Tip:* ${lead.customerType === 'B2B' ? 'Kurumsal' : 'Bireysel'}
📍 *Bölge:* ${lead.serviceArea}
🐛 *Sorun:* ${lead.pestType}
📏 *Alan:* ${lead.areaSizeSqM ? lead.areaSizeSqM + ' m²' : 'Belirtilmedi'}
⚡ *Aciliyet:* ${lead.isUrgent ? 'EVET! Acil Müdahale İstiyor' : 'Normal'}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (error) {
    console.error('Telegram notification failed:', error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerType,
      pestType,
      areaSizeSqM,
      serviceArea,
      fullName,
      phoneNumber,
      isUrgent
    } = body;

    // Validate inputs
    if (!customerType || !pestType || !serviceArea || !fullName || !phoneNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        customerType,
        pestType,
        areaSizeSqM: areaSizeSqM ? parseInt(areaSizeSqM) : null,
        serviceArea,
        fullName,
        phoneNumber,
        isUrgent: Boolean(isUrgent),
      }
    });

    // Send Telegram Notification asynchronously without blocking response
    sendTelegramNotification(lead).catch(console.error);

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
