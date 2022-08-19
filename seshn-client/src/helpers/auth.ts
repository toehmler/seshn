import { AUTH0_CREDENTIALS } from '@/constants';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0(AUTH0_CREDENTIALS);

interface AuthProps {
  onSuccess: (accessToken?: string) => void;
  onError?: (error: Error) => void;
}

export const login = ({
  onSuccess,
  onError = (error) => console.warn(error),
}: AuthProps) => {
  auth0.webAuth
    .authorize({
      scope: 'openid profile email',
      audience: 'https://dev-xf5mji86.us.auth0.com/api/v2/',
    })
    .then(({ accessToken }) => onSuccess(accessToken))
    .catch(onError);
};

export const logout = ({ onSuccess, onError }: AuthProps) => {
  auth0.webAuth
    .clearSession({})
    .then(() => onSuccess())
    .catch(onError);
};
