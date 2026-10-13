import type { ContactDetails } from "./api";

/** Cleaned contact details consumed by the UI. */
export interface ContactInfo {
  phone: string[];
  email: string[];
  address: string;
  businessHours: string;
  /** External link to the location (Google Maps share link). */
  mapUrl: string;
}

/** Content shown while the API loads (or if it fails). */
export const FALLBACK_CONTACT: ContactInfo = {
  phone: ["+977 01 5553000"],
  email: ["info@aveautomotive.com.np"],
  address: "Kupondole-Lalitpur, Nepal",
  businessHours: "Sun – Fri: 9:00 AM – 6:00 PM",
  mapUrl: "https://maps.app.goo.gl/DgstP79ZqvW9movB8",
};

/** Default embedded map, used unless the API supplies an embed URL. */
export const FALLBACK_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.979158870078!2d85.30880874166583!3d27.68703901501477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b4ad7096dd%3A0x29fa3d73b99dcc97!2sKupondole%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1781237235303!5m2!1sen!2snp";

/** Collapse whitespace (API values often carry trailing newlines). */
function cleanText(value?: string | null): string | undefined {
  const text = value?.replace(/\s+/g, " ").trim();
  return text || undefined;
}

/** Trim a list of phone numbers / emails and drop any empty entries. */
function cleanList(value?: Array<string | null> | null): string[] {
  return (value ?? [])
    .map((item) => item?.trim())
    .filter((item): item is string => Boolean(item));
}

/** Normalize the `GET /contacts` payload into the fields the UI renders. */
export function toContactInfo(contact?: ContactDetails | null): ContactInfo {
  if (!contact) return FALLBACK_CONTACT;

  const phone = cleanList(contact.phone);
  const email = cleanList(contact.email);

  return {
    phone: phone.length ? phone : FALLBACK_CONTACT.phone,
    email: email.length ? email : FALLBACK_CONTACT.email,
    address: cleanText(contact.address) ?? FALLBACK_CONTACT.address,
    businessHours:
      cleanText(contact.business_hours) ?? FALLBACK_CONTACT.businessHours,
    mapUrl: cleanText(contact.map_url) ?? FALLBACK_CONTACT.mapUrl,
  };
}

/** Build a `tel:` link from a display phone number. */
export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Build a `mailto:` link from an email address. */
export function emailHref(email: string): string {
  return `mailto:${email}`;
}

/** Use the API map URL as an `<iframe>` source when it is an embed URL. */
export function mapEmbedUrl(mapUrl?: string | null): string {
  if (mapUrl && /(?:[?&]output=embed|\/maps\/embed)/i.test(mapUrl)) {
    return mapUrl;
  }
  return FALLBACK_MAP_EMBED;
}
