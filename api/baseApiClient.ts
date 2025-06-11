import { APIRequestContext, request } from '@playwright/test';

export class BaseApiClient {
    protected readonly baseUrl: string;
    protected apiContext: APIRequestContext;
    protected readonly userAgent: string;

    constructor(baseUrl: string, userAgent: string) {
        this.baseUrl = baseUrl;
        this.userAgent = userAgent;
    }

    async init() {
        this.apiContext = await request.newContext({
            extraHTTPHeaders: {
                'content-type': 'application/json',
                'user-agent': this.userAgent,
            }
        });
    }

    protected async post(endpoint: string, data: any, headers = {}) {
        return await this.apiContext.post(`${this.baseUrl}${endpoint}`, {
            data,
            headers: { ...headers }
        });
    }

    protected async put(endpoint: string, data: any, headers = {}) {
        return await this.apiContext.put(`${this.baseUrl}${endpoint}`, {
            data,
            headers: { ...headers }
        });
    }

    protected async get(endpoint: string, headers = {}) {
        return await this.apiContext.get(`${this.baseUrl}${endpoint}`, {
            headers: { ...headers }
        });
    }

    async dispose() {
        await this.apiContext.dispose();
    }
} 