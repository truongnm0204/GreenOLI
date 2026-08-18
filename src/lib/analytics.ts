/**
 * Lightweight client analytics helpers (GA4 gtag when configured).
 * No-ops when NEXT_PUBLIC_GA_MEASUREMENT_ID is unset.
 */

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return id || undefined;
}

/** Fire a GA4 event if gtag is available. */
export function trackEvent(name: string, params?: AnalyticsPayload): void {
  if (typeof window === "undefined") return;
  if (!getGaMeasurementId()) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}

export function trackContactSubmit(source?: string): void {
  trackEvent("generate_lead", {
    event_category: "contact",
    method: "form",
    source: source ?? "contact_form",
  });
}

export function trackPhoneClick(label?: string): void {
  trackEvent("click_call", {
    event_category: "engagement",
    link_text: label ?? "hotline",
  });
}

export function trackOutbound(url: string, label?: string): void {
  trackEvent("click_outbound", {
    event_category: "engagement",
    link_url: url,
    link_text: label,
  });
}
