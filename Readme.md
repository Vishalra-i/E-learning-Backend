# API Documentation
``
PORT = 4000 

MONGODB_URI =

CLOUDINARY_CLOUD_NAME = 

CLOUDINARY_API_KEY =

CLOUDINARY_API_SECRET = 

RESEND_API_KEY = 

CLIENT_URL = 

JWT_SECRET = 

``

## Installation

Install node modules

```bash
  npm install
```

```bash
  npm run dev
```


## Home Route For Documentation ("/")
![alt text](./public/image.png)
This documentation provides details about the endpoints available in the API.

## User Routes

### Register User

- **Method**: POST
- **Endpoint**: `/api/v1/users/register`
- **Description**: Register a new user.

### Login User

- **Method**: POST
- **Endpoint**: `/api/v1/users/login`
- **Description**: Login with user credentials.

### Logout User

- **Method**: POST
- **Endpoint**: `/api/v1/users/logout`
- **Description**: Logout with user credentials.

### Verify User

- **Method**: GET
- **Endpoint**: `/api/v1/users/:userId/verify/:token`
- **Description**: Verify user email using verification token.

### Update User

- **Method**: PATCH
- **Endpoint**: `/api/v1/users/update`
- **Description**: Update user details including avatar.

## Course Routes

### Get All Course

- **Method**: Get
- **Endpoint**: `/api/v1/courses`
- **Description**: Get all available courses.

### Create Course

- **Method**: POST
- **Endpoint**: `/api/v1/courses/create`
- **Description**: Create a new course. (Admin Only)

### Delete Course

- **Method**: DELETE
- **Endpoint**: `/api/v1/courses/:courseId`
- **Description**: Delete a course by ID. (Admin Only)

### Update Course

- **Method**: Patch
- **Endpoint**: `/api/v1/courses/:courseId`
- **Description**: Update a course by ID. (Admin Only)

## Enrollment Routes

### Enroll Course

- **Method**: POST
- **Endpoint**: `/api/v1/courses/enroll/:courseId`
- **Description**: Enroll in a course.

### View Enrolled Courses

- **Method**: GET
- **Endpoint**: `/api/v1/courses/enroll`
- **Description**: View all enrolled courses.



    


## Technologies Used

- ### Node Js
- ### Express
- ### MongoDb
- ### Cloudniary
- ### Resend
- ### JWT
- ### bcrypt



## Authors

### [Vishal Rai](https://github.com/vishalra-i)
## 🌐 Socials:

   - [![Portfolio](https://img.shields.io/badge/-Portfolio-grey?style=for-the-badge&logoColor=white&logo=portfolio&logoWidth=20&logoHeight=20&labelPadding=2px)](https://vishalrai.netlify.app/)
   - [![Twitter](https://img.shields.io/badge/-Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white&logoWidth=20&logoHeight=20&labelPadding=2px)](https://twitter.com/Vishal____rai)
   - [![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white&logoWidth=20&logoHeight=20&labelPadding=2px)](https://www.linkedin.com/in/vishalrai07/)
   - [![Instagram](https://img.shields.io/badge/-Instagram-d62976?style=for-the-badge&logo=instagram&logoColor=white&logoWidth=20&logoHeight=20&labelPadding=2px)](https://www.instagram.com/vishal____rai)
   - [![Instagram](https://img.shields.io/badge/-Email-purple?style=for-the-badge&logo=gmail&logoColor=red&logoWidth=20&logoHeight=20&labelPadding=2px)](mailto:vishalrai0392@gmail.com)

