/* tslint:disable */
/* eslint-disable */
/**
 * WorldTimeAPI-compatible client for the TimeLogic API `/api/*` routes.
 *
 * Contract: openapi/openapi-worldtimeapi.yaml. The routes answer the same paths,
 * field names and plain-text variants as worldtimeapi.org; a TimeLogic API key
 * is required and is sent as the `X-API-Key` header.
 *
 * This module is self-contained: it does not read or change the configuration,
 * runtime or transport used by the generated `/v1` clients in this package.
 */

/** Default host for the WorldTimeAPI-compatible routes. */
export const WORLD_TIME_API_DEFAULT_BASE_URL = 'https://api.timelogicapi.com';

/** Time object returned by `/api/timezone/{zone}` and `/api/ip`, with worldtimeapi.org field names. */
export interface WorldTimeApiDateTime {
    abbreviation: string;
    client_ip: string;
    datetime: string;
    day_of_week: number;
    day_of_year: number;
    dst: boolean;
    dst_from: string | null;
    dst_offset: number;
    dst_until: string | null;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
    week_number: number;
}

/** Raw HTTP answer, including the `X-TimeLogic-Signature*` headers when `sign` is enabled. */
export interface WorldTimeApiRawResponse {
    status: number;
    headers: Record<string, string>;
    body: string;
}

export interface WorldTimeApiClientOptions {
    /** TimeLogic API key, sent as the `X-API-Key` header. */
    apiKey: string;
    /** Defaults to https://api.timelogicapi.com */
    baseUrl?: string;
    /** Adds `sign=true` so responses carry detached signature headers. */
    sign?: boolean;
    /** Custom fetch implementation (defaults to the global fetch). */
    fetchApi?: (input: string, init?: any) => Promise<any>;
}

/**
 * Error raised for any non-2xx answer. `error` is the worldtimeapi.org-style message
 * (for example `unknown location` or `malformed ip`), or the TimeLogic error message
 * for authentication and quota errors.
 */
export class WorldTimeApiError extends Error {
    readonly status: number;
    readonly error: string;
    readonly code?: string;
    readonly body: string;

    constructor(status: number, error: string, body: string, code?: string) {
        super(`WorldTimeAPI-compatible request failed (${status}): ${error}`);
        this.name = 'WorldTimeApiError';
        this.status = status;
        this.error = error;
        this.code = code;
        this.body = body;
        Object.setPrototypeOf(this, new.target.prototype);
    }

    /** True for the 404 `{"error":"unknown location"}` answer. */
    get isUnknownLocation(): boolean {
        return this.status === 404 && this.error === 'unknown location';
    }

    /** True for the 404 `{"error":"malformed ip"}` answer. */
    get isMalformedIp(): boolean {
        return this.status === 404 && this.error === 'malformed ip';
    }
}

/** Builds the path for a zone name such as `Europe/London`, `America/Argentina/Salta` or `UTC`. */
export function worldTimeApiZonePath(timezone: string, text = false): string {
    const segments = String(timezone).split('/').filter((s) => s.length > 0);
    if (segments.length < 1 || segments.length > 3) {
        throw new Error('timezone must have one to three segments, for example "Europe/London"');
    }
    return '/api/timezone/' + segments.map(encodeURIComponent).join('/') + (text ? '.txt' : '');
}

/** Builds `/api/ip` or `/api/ip/{ip}` (plus `.txt` when requested). */
export function worldTimeApiIpPath(ip?: string, text = false): string {
    return (ip ? '/api/ip/' + encodeURIComponent(ip) : '/api/ip') + (text ? '.txt' : '');
}

/** Parses a non-2xx answer into a WorldTimeApiError. */
export function worldTimeApiErrorFromResponse(status: number, body: string): WorldTimeApiError {
    let message = body.trim();
    let code: string | undefined;
    if (message.startsWith('Error:')) {
        message = message.slice('Error:'.length).trim();
    } else {
        try {
            const parsed = JSON.parse(body);
            if (parsed && typeof parsed.error === 'string') {
                message = parsed.error;
            } else if (parsed && parsed.error && typeof parsed.error === 'object') {
                message = String(parsed.error.message ?? '');
                code = parsed.error.code !== undefined ? String(parsed.error.code) : undefined;
            }
        } catch {
            // keep the raw body as the message
        }
    }
    return new WorldTimeApiError(status, message, body, code);
}

/**
 * Client for the WorldTimeAPI-compatible routes.
 *
 * ```ts
 * const wta = new WorldTimeApiClient({ apiKey: process.env.TIMELOGIC_API_KEY! });
 * const now = await wta.getTimezone('Europe/London');
 * console.log(now.datetime, now.utc_offset);
 * ```
 */
export class WorldTimeApiClient {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly sign: boolean;
    private readonly fetchApi: (input: string, init?: any) => Promise<any>;

    constructor(options: WorldTimeApiClientOptions) {
        if (!options || !options.apiKey) {
            throw new Error('apiKey is required');
        }
        this.apiKey = options.apiKey;
        this.baseUrl = (options.baseUrl ?? WORLD_TIME_API_DEFAULT_BASE_URL).replace(/\/+$/, '');
        this.sign = options.sign === true;
        const fetchApi = options.fetchApi ?? (typeof fetch === 'function' ? fetch.bind(globalThis) : undefined);
        if (!fetchApi) {
            throw new Error('fetch is not available; pass fetchApi');
        }
        this.fetchApi = fetchApi;
    }

    /** GET /api/timezone — every zone name. */
    async listTimezones(): Promise<string[]> {
        return this.getJson<string[]>('/api/timezone');
    }

    /** GET /api/timezone.txt — every zone name, one per line. */
    async listTimezonesText(): Promise<string> {
        return this.getText('/api/timezone.txt');
    }

    /** GET /api/timezone/{area} — the zone names in an area such as `Europe`. */
    async listTimezonesInArea(area: string): Promise<string[]> {
        const value = await this.getJson<unknown>(worldTimeApiZonePath(area));
        if (!Array.isArray(value)) {
            throw new WorldTimeApiError(200, `${area} is a timezone, not an area; use getTimezone`, JSON.stringify(value));
        }
        return value as string[];
    }

    /** GET /api/timezone/{area}.txt */
    async listTimezonesInAreaText(area: string): Promise<string> {
        return this.getText(worldTimeApiZonePath(area, true));
    }

    /** GET /api/timezone/{area}/{location}[/{region}] (or a one-word zone such as `UTC`). */
    async getTimezone(timezone: string): Promise<WorldTimeApiDateTime> {
        return this.getJson<WorldTimeApiDateTime>(worldTimeApiZonePath(timezone));
    }

    /** Plain-text variant of getTimezone. */
    async getTimezoneText(timezone: string): Promise<string> {
        return this.getText(worldTimeApiZonePath(timezone, true));
    }

    /** GET /api/ip (the caller's address) or /api/ip/{ip}. */
    async getIp(ip?: string): Promise<WorldTimeApiDateTime> {
        return this.getJson<WorldTimeApiDateTime>(worldTimeApiIpPath(ip));
    }

    /** Plain-text variant of getIp. */
    async getIpText(ip?: string): Promise<string> {
        return this.getText(worldTimeApiIpPath(ip, true));
    }

    /** Sends a GET to any `/api/*` path and returns status, headers and body without raising. */
    async requestRaw(path: string): Promise<WorldTimeApiRawResponse> {
        const url = this.baseUrl + path + (this.sign ? '?sign=true' : '');
        const response = await this.fetchApi(url, {
            method: 'GET',
            headers: { 'X-API-Key': this.apiKey, Accept: path.endsWith('.txt') ? 'text/plain' : 'application/json' },
            redirect: 'error',
        });
        const headers: Record<string, string> = {};
        if (response.headers && typeof response.headers.forEach === 'function') {
            response.headers.forEach((value: string, key: string) => {
                headers[key.toLowerCase()] = value;
            });
        }
        return { status: response.status, headers, body: await response.text() };
    }

    private async getText(path: string): Promise<string> {
        const raw = await this.requestRaw(path);
        if (raw.status < 200 || raw.status >= 300) {
            throw worldTimeApiErrorFromResponse(raw.status, raw.body);
        }
        return raw.body;
    }

    private async getJson<T>(path: string): Promise<T> {
        const raw = await this.requestRaw(path);
        if (raw.status < 200 || raw.status >= 300) {
            throw worldTimeApiErrorFromResponse(raw.status, raw.body);
        }
        return JSON.parse(raw.body) as T;
    }
}
