# API Documentation

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

