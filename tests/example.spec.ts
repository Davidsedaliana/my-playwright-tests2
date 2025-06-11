import { test, expect } from '@playwright/test';
import { UserApiService } from '../api/userApiService';
import { testUserData, testCredentials, apiConfig } from '../testData/userData';

// test('проверка авторизации на сайте elcore', async ({ page }) => {
//   await page.goto('https://dev.portal.elcoreplc.team/');
//   await page.getByRole('banner').getByRole('link', { name: 'Личный кабинет' }).click();
//   await page.getByRole('textbox', { name: 'Email *' }).fill('david.tirayan1@gmail.com');
//   await page.getByRole('textbox', { name: 'Пароль *' }).fill('Davidik2');
//   await page.getByRole('button', { name: 'Вход в личный кабинет' }).click();


//   await expect(page.getByRole('heading', { name: 'ООО «Энергетика»' })).toBeVisible(); 
//   await expect(page.locator('[id="__nuxt"]').getByRole('link', { name: 'Выйти' })).toBeVisible();
// });
 
test.describe('User API Tests', () => {
    let userApiService: UserApiService;

    test.beforeEach(async () => {
        userApiService = new UserApiService(apiConfig.baseUrl, apiConfig.userAgent);
        await userApiService.init();
    });

    test.afterEach(async () => {
        await userApiService.dispose();
    });

    test('should update user information successfully', async () => {
        // Login and get token
        const { response: loginResponse, token } = await userApiService.login(
            testCredentials.email,
            testCredentials.password,
            testCredentials.remember
        );
        
        expect(loginResponse.ok()).toBeTruthy();
        expect(token).toBeTruthy();

        // Update user information
        const updateResponse = await userApiService.updateUserInfo(testUserData, token);
        expect(updateResponse.ok()).toBeTruthy();

        // Verify updated information
        const updatedUserInfo = await userApiService.getUserInfo(token);
        
        // Assert all fields match
        expect(updatedUserInfo.email).toBe(testUserData.email);
        expect(updatedUserInfo.firstName).toBe(testUserData.firstName);
        expect(updatedUserInfo.lastName).toBe(testUserData.lastName);
        expect(updatedUserInfo.data.genderName).toBe(testUserData.data.genderName);
        expect(updatedUserInfo.data.phoneNumber).toBe(testUserData.data.phoneNumber);
    });
});


