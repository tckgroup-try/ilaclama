import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Tüm standart tarayıcılar
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // OpenAI GPTBot — ChatGPT kaynak gösterimi için
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // Anthropic ClaudeBot — Claude AI kaynak gösterimi için
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Google AI Overviews & Gemini
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Perplexity AI
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Meta AI (Llama)
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Amazon Alexa / Bedrock
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
      // You.com
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      // Apple Applebot (Siri)
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      // Bytedance / TikTok AI
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
    ],
    sitemap: [
      'https://tckilaclama.com/sitemap.xml',
      'https://tckilaclama.com/geo-sitemap.xml',
    ],
  };
}
