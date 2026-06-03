import * as Linking from 'expo-linking';
import { isValidUrl } from './helpers';

export async function openAdUrl(url?: string): Promise<boolean> {
  if (!url || !isValidUrl(url)) {
    console.warn('[FlexAds] Invalid or missing URL:', url);
    return false;
  }

  try {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      console.warn('[FlexAds] Cannot open URL:', url);
      return false;
    }

    await Linking.openURL(url);
    return true;
  } catch (error) {
    console.error('[FlexAds] Failed to open URL:', error);
    return false;
  }
}

export function createDeepLinkUrl(scheme: string, path: string, params?: Record<string, string>): string {
  const queryString = params
    ? '?' + Object.entries(params).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
    : '';
  return `${scheme}://${path}${queryString}`;
}

export function parseDeepLinkUrl(url: string): { scheme: string; path: string; params: Record<string, string> } | null {
  try {
    const parsed = new URL(url);
    const params: Record<string, string> = {};
    parsed.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return {
      scheme: parsed.protocol.replace(':', ''),
      path: parsed.hostname + parsed.pathname,
      params,
    };
  } catch {
    return null;
  }
}
