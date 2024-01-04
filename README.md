# mindstaq_India
Public Apis:-
1.	SignUp Api: So basically this user sign up API, that is used to registering the user with having information like it has in the payload. If the userName is already there then validation checks and return message of "user exist, please go to login".
URL: localhost:3000/api/signUp
If userName does not match, then It saves the user data and trigger a mail that is sent on the user email mail. And return the respective message.
2.	LogIn Api: Now the second Api is logIn API, that can be used by already register user. If the userName does not matches with the any of the userName then it return "user not exists" message. If password does not matches with the saved password then it return that PASSWORD_MISMATCH message. And if everything is fine and it matches all the data and generate token for the user and send in the response.
URL: localhost:3000/api/logIn
Admin Protected Apis:-
3.	Post Api for Adding Items:So this is the Admin apis, it is protected for Admin only. Admin only can create new Items by adding items details in req body. Admin validation done with token verfication. If user is not an Admin then the api can't be used this api.It will return some message “Insufficient Permission”.
URL: localhost:3000/api/admin/items
4.	Put Api for Updating Items: This is also Admin protected api. Only admin role of user can update the data into db.
URL: localhost:3000/api/admin/items?id=6596e5b983b9d700192bd910
5.	Delete Api: This also a role base Api where admin only can delete the items
URL: localhost:3000/api/admin/items?id=659576d0d00940ba3d58c37d
User Api:
6.	This is the user folder it consits of two apis.One is used to get single item from db. it get the data by query with id. and other is list api , that is used to get the list of the items that is in the db. So this is user protected api. That mean both admin and user can use this api, by verfication of the token. One token has been been verified then user can get the item by it sending its id in the params of the url.
URL: localhost:3000/api/user/itemById?id=6596764db57789c7d03cad93
7.	So this is also a user protected api. That mean both admin and user can use this api, by verfication of the token. Once token has been been verified then user can get the items list by hitting the url.
URL: localhost:3000/api/user/items   
