# guidr table schema

## **PUBLIC ROUTES**

### Headers

No headers needed

---

### **GET GUIDES**

---

#### Fetches all guides' public info

_Method Url:_ `/guidr/guides/all`
_HTTP method:_ **_[GET]_**

#### Responses

---

##### 200 (OK)

> If you successfully fetch the guides, the endpoint will return an HTTP response with a status code `200` and a array of objects as below.

```
{
    "id": 1,
    "name": "Stephannie Joskowitz",
    "tagline": "Aliquam nec pellentesque erat. Nam tristique et tellus quis rutrum. Suspendisse potenti. Mauris arcu neque, feugiat eu ex eu, dapibus dignissim augue. Integer nec augue velit. Donec sit amet neque cursus, tempus turpis vel, sodales libero.",
    "age": 34,
    "title": "Expert Guide",
    "careerLength": "3 years"
}
```

---

### **GET TRIPS**

---

#### Fetches all trips (that are designated Professional)

_Method Url:_ `/guidr/trips/all`
_HTTP method:_ **_[GET]_**

#### Responses

---

##### 200 (OK)

> If you successfully fetch the guides, the endpoint will return an HTTP response with a status code `200` and a array of objects as below.

```
{
    "id": 2,
    "title": "Horse Rebellion",
    "description": "Tough Russian Mountain Escape",
    "designation": "Professional",
    "type": "Valuyki",
    "duration": "2 days",
    "guide_id": 6,
    "img_url": "https://images.pexels.com/photos/1840102/pexels-photo-1840102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "created_at": "2019-02-05T17:59:09.590Z",
    "updated_at": "2019-02-05T17:59:09.590Z"
}
```

## **PROTECTED ROUTES**

### Headers (for all protected routes)

---

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Bearer JWT authorization token |

## Guide Routes

### **GET USER**

---

#### Gets specific user by id

_Method Url:_ `/user/guides/:guideId`
_HTTP method:_ **_[GET]_**

#### Responses

---

##### 200 (OK)

> If you successfully fetch the user, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "id": 1,
    "username": "sjoskowitz0",
    "password": "$2a$14$0db0iQaspO6hIHtFq6Lj1.jAwXpMWSuF37s7eQ5uWNvl8eO4DzgXi",
    "name": "Stephannie Joskowitz",
    "age": 29,
    "title": "Expert Guide",
    "tagline": "I'm the best guide this side of the Mississippi",
    "careerLength": "12 years"
}
```

##### 400 (Bad Request)

> If you send in invalid fields or the password of the user corresponding to the token does not match the currentPassword field, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
    "error": "That user does not exist"
}
```

---

### **UPDATE USER**

---

#### Updates specified user object

_Method Url:_ `/user/guides/update/:guideId`
_HTTP method:_ **_[PUT]_**

#### Body

| name           | type   | required | description                |
| -------------- | ------ | -------- | -------------------------- |
| `name`         | String | No       | Guide's name               |
| `age`          | Int    | No       | Age of guide               |
| `tagline`      | String | No       | Short description of guide |
| `title`        | String | No       | Job title                  |
| `careerLength` | String | No       | Amount of time as guide    |

_example:_

```
{
	"tagline": "I'm the best guide this side of the Mississippi",
	"careerLength": "12 years",
	"age": 29
}
```

#### Responses

---

##### 200 (OK)

> If you successfully update the user, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
1
```

##### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

```
{
    "name": "error",
    "length": 128,
    "severity": "ERROR",
    "code": "42703",
    "position": "70",
    "file": "analyze.c",
    "line": "2339",
    "routine": "transformUpdateTargetList"
}
```

##### 400 (Bad Request)

> If you send in an invalid guideId, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
    "error": "A user with that ID does not exist"
}
```

## Trip Routes

### **GET TRIPS**

---

#### Gets all trips related to specified guide

_Method Url:_ `/user/trips/:guideId/all`
_HTTP method:_ **_[GET]_**

#### Responses

---

##### 200 (OK)

> If you successfully fetch the user, the endpoint will return an HTTP response with a status code `200` and a an array of objects as below.

```
{
[
    {
        "id": 5,
        "title": "Boy A",
        "description": "Sweden",
        "img_url": "http://dummyimage.com/212x139.png/5fa2dd/ffffff"
    },
    {
        "id": 8,
        "title": "Hotel",
        "description": "Ecuador",
        "img_url": "https://images.pexels.com/photos/1840102/pexels-photo-1840102.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
        "id": 11,
        "title": "Wavelength",
        "description": "Indonesia",
        "img_url": "http://dummyimage.com/195x202.png/dddddd/000000"
    }
]
}
```

##### 404 (Bad Request)

> If you supply an invalid guideId or the guide has no trips, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
    "error": "There are no trips for this guideId"
}
```

---

### **GET TRIP**

---

#### Get's specific trip, linked to specified guideId

_Method Url:_ `/user/trips/:guideId/:tripId`
_HTTP method:_ **_[GET]_**

#### Responses

---

##### 200 (OK)

> If you successfully fetch the user, the endpoint will return an HTTP response with a status code `200` and a an array of objects as below.

```
{
    "id": 5,
    "title": "Boy A",
    "description": "Sweden",
    "designation": "Professional",
    "type": "Skellefteå",
    "duration": "4 days",
    "guide_id": 1,
    "img_url": "http://dummyimage.com/212x139.png/5fa2dd/ffffff"
}
```

##### 400 (Bad Request)

> If you supply an invalid tripId or guideId, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
    "error": "A trip with that ID does not exist for the specified user"
}
```

---

### **UPDATE TRIP**

---

#### Update's a specific trip

_Method Url:_ `/user/trips/:guideId/:tripId`
_HTTP method:_ **_[PUT]_**

#### Body

| name          | type   | required | description             |
| ------------- | ------ | -------- | ----------------------- |
| `title`       | String | No       | Guide's name            |
| `description` | String | No       | Age of guide            |
| `designation` | String | No       | Professional or Private |
| `type`        | String | No       | Category of trip        |
| `duration`    | String | No       | Trip duration           |
| `img_url`     | String | No       | Image related to trip   |

_example:_

```
{
	"title": "Norwegian Polar Trek",
	"description": "Go north to find the beauty and harsh reality of the frozen tundra inside the Arctic Circle in Norway",
	"duration": "14 days",
	"type": "Cross-country skiing, winter backpacking/camping"
}
```

#### Responses

---

##### 203 (OK)

> If you successfully update the user, the endpoint will return an HTTP response with a status code `200` and a an array of objects as below.

```
1
```

##### 404 (Bad Request)

> If you supply an invalid tripId or guideId, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
    "error": "A trip/user with that ID does not exist"
}
```

##### 400 (Invalid Request)

> If you supply valid guideId and tripId but they aren't related, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
    "error": "You must be the trip's guide to make changes to this trip"
}
```

---

### **CREATE TRIP**

---

#### Inserts a new trip object

_Method Url:_ `/user/trips/:guideId/create`
_HTTP method:_ **_[POST]_**

#### Body

| name          | type   | required | description             |
| ------------- | ------ | -------- | ----------------------- |
| `title`       | String | Yes      | Trip's name (unique)    |
| `description` | String | Yes      | Age of guide            |
| `type`        | String | Yes      | Category of trip        |
| `duration`    | String | Yes      | Trip duration           |
| `designation` | String | No       | Professional or Private |
| `img_url`     | String | No       | Image related to trip   |

_example:_

```
{
	"title": "Norwegian Polar Trek",
	"description": "Go north to find the beauty and harsh reality of the frozen tundra inside the Arctic Circle in Norway",
	"duration": "14 days",
	"type": "Cross-country skiing, winter backpacking/camping",
    "img_url": "www.fakeimage.com/fakeimage1"
}
```

#### Responses

---

##### 201 (SUCCESS)

> If you successfully create the trip, the endpoint will return an HTTP response with a status code `201` and the id of the newly created trip as below.

```
{
11
}
```

##### 400 (Bad Request)

> If you supply an invalid guideId, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
    "error": "A user with that ID does not exist"
}
```

---

### **CREATE TRIP IMAGE**

---

#### Inserts a new image object

_Method Url:_ `/user/trips/:tripId/upload`
_HTTP method:_ **_[POST]_**

#### Body

| name  | type   | required | description |
| ----- | ------ | -------- | ----------- |
| `url` | String | Yes      | Image url   |

_example:_

```
{
	"url": "https://images.pexels.com/photos/556416/pexels-photo-556416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
}
```

#### Responses

---

##### 201 (SUCCESS)

> If you successfully create the trip, the endpoint will return an HTTP response with a status code `201` and the id of the newly added image as below.

```
{
11
}
```

##### 400 (Bad Request)

> If you supply an invalid tripId, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
    "error": "A trip with that id does not exist"
}
```

---

### **DELETE TRIP**

---

#### Delete trip specified by tripId

_Method Url:_ `/user/trips/:tripId`
_HTTP method:_ **_[DELETE]_**

#### Responses

---

##### 202 (OK)

> If you successfully delete the trip, the endpoint will return an HTTP response with a status code `202` and a body as below.

```
1
```

##### 400 (Bad Request)

> If you send an invalid tripId, the endpoint will return an HTTP response with a status code `400` and a body as below.

```
{
    "error": "A trip with that ID does not exist"
}
```

## **AUTH ROUTES**

### **REGISTER USER**

---

#### Registers a new user

_Method Url:_ `/auth/register`
_HTTP method:_ **_[POST]_**

#### Body

| name           | type   | required | description                |
| -------------- | ------ | -------- | -------------------------- |
| `username`     | String | Yes      | username (unique)          |
| `password`     | String | Yes      | password                   |
| `name`         | String | Yes      | Guide's name (unique)      |
| `age`          | Int    | No       | Age of guide               |
| `tagline`      | String | No       | Short description of guide |
| `title`        | String | No       | Job title                  |
| `careerLength` | String | No       | Amount of time as guide    |

_example:_

```
{
	"username": "deploy_test",
	"password": "newuser",
	"name": "Mr. Deploy User"
}
```

#### Responses

---

##### 201 (OK)

> If you successfully delete the trip, the endpoint will return an HTTP response with a status code `201` and a body as below.

```
{
    "id": 50,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWRtZSIsImlhdCI6MTU0OTMyMjk5NSwiZXhwIjoxNTQ5NDA5Mzk1LCJqdGkiOiJndWlkciJ9.YXnh9zGn-TNkfGQ68xCQWJCzLOaYwTx32vEllP4Qtmw",
}
```

##### 404 (Bad Request)

> If body is missing either password, username or name, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
    "error": "Please include name, username and password in request"
}
```

---

### **Login USER**

---

#### Logs a user into site

_Method Url:_ `/auth/login`
_HTTP method:_ **_[POST]_**

#### Body

| name       | type   | required | description       |
| ---------- | ------ | -------- | ----------------- |
| `username` | String | Yes      | username (unique) |
| `password` | String | Yes      | password          |

_example:_

```
{
	"username": "test",
	"password": "brap"
}
```

#### Responses

---

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.

```
{
    "id": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNqb3Nrb3dpdHowIiwiaWF0IjoxNTQ5MzIyOTAwLCJleHAiOjE1NDk0MDkzMDAsImp0aSI6Imd1aWRyIn0.tEgYfk6yB7r2hCQyE0sPD84Adri8VoGQVKWRR7rBggM"
}
```

##### 404(Bad Request)

> If you send incorrect credentials, the endpoint will return an HTTP response with a status code `404` and a body as below.

```
{
    "err": "A user with those credentials does not exist"
}
```

---
