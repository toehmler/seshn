# seshn-server

Backend server and PSQL database container. Uses identity management and authentication integration with auth0.

#### Requirements

* python3.9+
* docker
* postgres 13

## Quick start

1. Build the docker image (after starting docker engine)
```shell
docker-compose build
```
2. Start the server and database services (`-d` detached)
```shell
docker-compose up -d
```
3. Initialize database
```shell
docker-compose exec api python manage.py recreate_db
```
4. Sanity check
```shell
curl localhost:5004/ping
```

## Usage
Build and start services
```shell
docker-compose up -d --build 
```
Access database using psql (example query to show all profiles)
```shell
docker-compose exec api-db psql -U postgres
$ \c seshn_db_dev
$ select * from profiles;
```
### Auth0 Integration
Some of the endpoints are protected using `@authorization_guard` which 
requires a valid access token from auth0. A valid access token can be 
collected using the client app and registering / signing in using the
auth0 universal login integration. Upon a valid sign in, a token will be
output to the console that can be used in the authorization header of a 
request in the form: `Authorization: Bearer {ACCESS_TOKEN}`.

Auth0 manages and keeps track of a lof helpful profile information that 
gets automatically pulled in from an authentication provider (ie. Google,
Apple, Facebook, etc.). To avoid making redudant calls to the auth0 profile
api everytime profile info is needed (ie. returning the username of the 
author of a post), the profile api will act as an internal cache for relevant
profile info. Therefore to start using an API that relies on a profile id,
the `/profile/register` endpoint must be hit first with the authorization
header set.
```shell
curl -H "Authorization: Bearer {ACCESS_TOKEN}" http://localhost:5004/profile/register
```
The response will look something like:
```json
{
    "id": "fb131f1f-baa4-4858-b636-c1f33864c8f5",
    "sub": "google-oauth2|103999120634231419437",
    "username": "treyoehmler",
    "email": "treyoehmler@gmail.com"
}
```
The `id` that is returned is the internal uuid that is used to associate
other entities (ie. post) to this profile. The `sub` is the identifier that
auth0 uses and is what is queried on when pulling profile information from
auth0. This could be a user's profile picture, which for right now, is managed
by auth0. 


**TODO** Clean up api docs and add each endpoint for both apis

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







