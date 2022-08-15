# seshn-client

## Quick start

**Requirements**

- xcode
- node
- npm

To start the client using the xcode emulator run:

```shell
npm run ios
```

After running, an instance of a metro server will start automatically and
open in a new terminal window.

### Auth0 Integraton

When prompted to log in, the auth0 universal login modal will appear and
you will need to create an account. After doing so the metro server will log
the access token that is returned by auth0. At the moment, the tokens expire
few hours, however we might turn this off while developing. This token is used as part of the `Authorization: Bearer` header.

### Internal API calls

In this example app I've just set up two api calls, one for creating a post and
one for getting all the public posts. These calls look something like:

```javascript
axios.post(
  'http://localhost:5004/posts/',
  {
    title: inputText,
    body: bodyText,
    public: true,
  },
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
);
```
