import { AUTH0_CREDENTIALS } from '@/constants';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0(AUTH0_CREDENTIALS);

export const login = (onSuccess: (accessToken: string) => void) => {
  auth0.webAuth
    .authorize({
      scope: 'openid profile email',
      audience: 'https://dev-xf5mji86.us.auth0.com/api/v2/',
    })
    .then(({ accessToken }) => onSuccess(accessToken))
    .catch((error) => console.warn(error));
};

export const logout = (onSuccess: () => void) => {
  auth0.webAuth
    .clearSession({})
    .then(() => onSuccess())
    .catch((error) => {
      console.warn(error);
    });
};
