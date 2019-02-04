## guidr endpoints

---

## PROTECTED ROUTES

---

## Guide Routes

GET /user/guides/:guideId (returns specific guide)
GET /user/guides/all (returns all guides)
PUT /user/guides/update/:guideId (returns number of updated guides)

---

## Trip Routes

GET /user/trips/:guideId/all (returns users)
GET /user/trips/:guideId/:tripId (returns one of user's trips)
PUT /user/trips/:guideId/:tripId (returns number of updated trips)
POST /user/trips/:guideId/create (returns newly created trip)
DEL /user/trips/:tripId (return number of trips deleted)

---

## AUTH ROUTES

POST /auth/login
POST /auth/register
