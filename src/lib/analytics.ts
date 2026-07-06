/**
 * GA4 Event Tracking Utility
 */

export const GA_TRACKING_ID = 'G-GYD22WWKC8';

// Safe gtag wrapper
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    console.log(`[Analytics Event - Local Dev]: ${action} | Category: ${category} | Label: ${label} | Value: ${value}`);
  }
};

// Custom triggers
export const trackPhoneClick = (location: string) => {
  trackEvent('phone_click', 'Engagement', location);
};

export const trackWhatsAppClick = (location: string) => {
  trackEvent('whatsapp_click', 'Engagement', location);
};

export const trackFormSubmit = (formId: string, status: 'success' | 'error') => {
  trackEvent('form_submission', 'Conversion', `${formId}_${status}`);
};
