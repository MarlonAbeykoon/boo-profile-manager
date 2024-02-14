**INSTALL**
> npm install

**RUN**

> node app.js

**TEST**

> npm test


**ENDPOINTS**

Postman collection is added to the repository.

1. Use `POST /profiles` to create a profile.
2. `GET /profiles` will list the created profiles with their IDs.
3. `GET /profiles/{profileId}` - get by profile id.
4. `POST /users` can be used to create users.
5. `POST /profiles/{profileId}/comments/` can be used to create a comment with the body stated as below

`   {
   "user": "65cd09cd015029080c1a7c50",
   "commentData": {
   "title": "Your comment title",
   "description": "Your comment description"
   },
   "voteData": {
   "mbti": "INTJ",
   "enneagram": "7w6",
   "zodiac": "Gemini"
   }
   }` 

where user and profile ids are obtained from previous endpoints.
6. To get comments filtered and sorted use `GET profiles/65cd09bd015029080c1a7c4d/comments?mbti=INTJ&enneagram=7w6&zodiac=Gemini&sort=best`
where sort (best, recent) and other filters are optional. If filters are not provided all the comments of the given profile is returned.
7. `PATCH /profiles/{profileId}/comments/{commentId}/like` - To like a comment.
8. `PATCH /profiles/{profileId}/comments/{commentId}/unlike` - To unlike a comment.

Refer the postman json for further clarifications.