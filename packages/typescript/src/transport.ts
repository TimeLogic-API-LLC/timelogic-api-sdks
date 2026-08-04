import { BASE_PATH, Configuration } from './runtime';

export const DEFAULT_API_BASE_URL = BASE_PATH;
export const DEFAULT_RAPID_API_HOST = 'timelogic-api-world-time-timezones-time-calculations.p.rapidapi.com';
export const DEFAULT_RAPID_API_BASE_URL = `https://${DEFAULT_RAPID_API_HOST}`;

export interface TransportOptions {
  apiKey: string;
  rapidApi?: boolean;
  baseUrl?: string;
  rapidApiHost?: string;
}

function required(value: string, name: string): string {
  if (!value || !value.trim()) throw new Error(`${name} is required`);
  return value.trim();
}

export function createConfiguration(options: TransportOptions): Configuration {
  const apiKey = required(options.apiKey, 'apiKey');
  if (options.rapidApi) {
    const host = (options.rapidApiHost || DEFAULT_RAPID_API_HOST).trim();
    const baseUrl = (options.baseUrl || `https://${host}`).replace(/\/+$/, '');
    return new Configuration({
      basePath: baseUrl,
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': host,
      },
    });
  }
  return new Configuration({
    basePath: options.baseUrl?.replace(/\/+$/, ''),
    accessToken: apiKey,
  });
}
