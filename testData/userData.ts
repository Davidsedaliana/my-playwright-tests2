export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    data: {
        genderName: string;
        phoneNumber: string;
        photo: string;
    };
}

export const testUserData: UserData = {
    email: "david.tirayan1@gmail.com",
    firstName: "Давид",
    lastName: "Тираян",
    data: {
        genderName: "Анфисачехова",
        phoneNumber: "+7 (915) 404-00-28",
        photo: ""
    }
};

export const testCredentials = {
    email: 'david.tirayan1@gmail.com',
    password: 'Davidik1!',
    remember: false
};

export const apiConfig = {
    baseUrl: 'https://dev.bff.elcoreplc.team',
    userAgent: 'Mozilla/6.0 (Linux; Android 7.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36'
}; 