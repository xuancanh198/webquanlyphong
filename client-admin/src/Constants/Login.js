import { faUser, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
export const LOGIN_USER_BY_PASSWORD = "password";
export const LOGIN_USER_BY_EMAIL = 'email';
export const LOGIN_USER_BY_PHONE = 'phone';
export const arrTypeLogin = [
    {
        icon: faUser,
        value: LOGIN_USER_BY_PASSWORD,
        initialValues: {
            username: '',
            password: '',
            typeLogin: LOGIN_USER_BY_PASSWORD
        }
    },
    {
        icon: faEnvelope,
        value: LOGIN_USER_BY_EMAIL,
        initialValues: {
            email: '',
            typeLogin: LOGIN_USER_BY_EMAIL
        }
    },
    {
        icon: faPhone,
        value: LOGIN_USER_BY_PHONE,
        initialValues: {
            phone: '',
            typeLogin: LOGIN_USER_BY_PHONE
        }
    },
]