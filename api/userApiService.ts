import { BaseApiClient } from './baseApiClient';
import { UserData } from '../testData/userData';

export class UserApiService extends BaseApiClient {
    private static readonly AUTH_ENDPOINT = '/auth/login';
    private static readonly USER_INFO_ENDPOINT = '/user/info';

    async login(email: string, password: string, remember: boolean = false) {
        const response = await this.post(UserApiService.AUTH_ENDPOINT, {
            email,
            password,
            remember
        });
        const data = await response.json();
        return {
            response,
            token: data.access_token
        };
    }

    async updateUserInfo(userData: UserData, token: string) {
        return await this.put(UserApiService.USER_INFO_ENDPOINT, userData, {
            'Authorization': `Bearer ${token}`
        });
    }

    async getUserInfo(token: string) {
        const response = await this.get(UserApiService.USER_INFO_ENDPOINT, {
            'Authorization': `Bearer ${token}`
        });
        return await response.json();
    }
} 