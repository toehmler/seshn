# seshn-server

### Profile API

Because of the way auth0 manages user profile information seperately from the authentication access token that gets passed 
to the server for secure requests, we need to essentially cache relevant profile information to associate user uuids to the
`sub` that auth0 uses as way of uniquely identifying users based on their authentication provider (ie. google, facebook, etc).


**create profile**
This will associate a new user uuid to a sub, username and email that are currently only associated auth0. Note: these fields
will need to remain synced to auth0 whenever profile updates are made within a user's preferences.

Request sample:
```json
{
  "sub": "",
  "username": "",
  "email": ""
}
```
Response sample:
```json

```


### Post API

This is meant to serve as a basic example of how to associate one entity to another using a foreign key and parent/child
relationship. Refer to the model in `api/post/post_model.py` for more the syntax. 

**create a post**
When creating a post, the user's (internal) profile UUID is needed, thus it's required that a profile already be created with
a user's auth0 sub and username and email.

request sample:
*authorization header needs to set with `Bearer: {auth0 access token}`
```json
{
  "profile_id": "",
  "title": "Hello world",
  "body": "This is a test.",
  "public": "True"
}
```







