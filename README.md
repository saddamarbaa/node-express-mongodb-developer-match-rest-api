# Developer Match API

Developer Match is an open-source RESTful API designed for developers looking to connect, collaborate, and find coding partners. Think of it like Tinder for developers—allowing users to swipe, connect, and collaborate based on their skills, interests, and projects.

Built with **Node.js**, **Express**, and **MongoDB**, this API supports user authentication, profile creation, and match-making functionalities, enabling developers to find the perfect coding partner for projects, freelancing, or networking.

## Features
- **User Registration**: Create an account using email and password.
- **Profile Management**: Add skills, technologies, and interests to your profile.
- **Connection Requests**: Send and receive connection requests to find coding partners.
- **Match-making**: Match developers based on shared interests, skills, and technologies.
- **Authentication**: Secure authentication using JWT tokens.



- **Authentication**: User registration, login, and JWT-based authentication.
- **Developer Profiles**: Users can create and update their profiles with details like bio, skills, and availability.
- **Connection Requests**: Send, receive, and manage connection requests between developers.
- **Feeds**: Discover developers who are not yet connected or pending requests.


## General Workflow
1. User signs up
2. User logs in
3. User updates profile
4. User sends a connection request
5. Match-making happens based on user skills and interests.


# Table of Contents

- [Author](#author)
- [Tech Stack](#tech-stack)
- [API Features](#api-features)
- [Endpoints](#endpoints)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Project Status](#project-status)
- [Related Projects](#related-projects)
- [Error Handling](#error-handling) 
- [Feedback](#feedback)
- [Support](#support)
- [License](#license)

---

# **Author**

This project is developed by:

- [Saddam Arbaa](https://github.com/saddamarbaa)

For more information, visit [GitHub Profile](https://github.com/saddamarbaa).

# **Tech Stack**

### **Backend Framework & Libraries**

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database for storing and managing developer data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (jsonwebtoken)**: JSON Web Token for handling authentication and authorization.

### **Security & Middleware**

- **bcrypt**: Library for hashing passwords to store them securely.
- **cookie-parser**: Middleware for handling cookies in requests.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **helmet**: Helps secure Express apps by setting various HTTP headers.
- **dotenv**: Loads environment variables from `.env` files into `process.env`.

### **Validation & Error Handling**

- **Joi**: Data validation library for JavaScript, used for request validation.
- **http-errors**: Simplifies creating HTTP errors for better error handling.

### **File Uploading**

- **multer**: Middleware for handling `multipart/form-data`, used for file uploads (e.g., profile images).

### **Logging & Monitoring**

- **morgan**: HTTP request logger middleware for Node.js.


### **Dev Tools & Testing**

- **ESLint**: Linter for identifying and fixing problems in JavaScript code.
- **Prettier**: Code formatter to maintain consistent code style.
- **Jest**: JavaScript testing framework, used for unit and integration tests.

---

# **API Features**

### **Authentication & Authorization**
- **User Signup**: Developers can create an account using email/password.
- **User Login**: Secure login using JWT tokens.

### **Developer Profile Management**
- **Create/Update/Delete Profile**: Developers can manage their profiles, including skills, interests, and projects.
- **Upload Profile Picture**: Users can upload and edit their profile pictures.

### **Connection Requests**
- **Send Connection Requests**: Developers can send connection requests to other users based on shared interests or skillsets.
- **Accept/Reject Requests**: Users can accept or reject connection requests from other users based on compatibility.
- **Notifications**: Users will receive notifications when a connection request is received or accepted.

### **Match-making**
- **Smart Match-making**: Smart match-making algorithm to suggest potential collaborators based on shared interests, skills, and previous project work.
- **View Matches**: Users can view matches and connect with potential collaborators or clients.

### **Admin Management** (To Be Implemented)
- **User Account Management**: Admin can manage user accounts, including deleting inactive or malicious profiles.
- **View User Statistics**: Admin can view user statistics, including active users, connection statistics, and more.

### **Search & Filters** (To Be Implemented)
- **Search for Collaborators**: Users can search for potential collaborators based on location, skills, interests, or project types.
- **Filters**: Filters to refine searches, ensuring developers find the most suitable partners for their needs.

### **Notifications** (To Be Implemented)
- **Real-time Notifications**: Real-time notifications for events like profile updates, connection requests, and match-making results.
- **Manage Preferences**: Option to manage notification preferences (e.g., daily or weekly summaries).

---


# **Endpoints**

- [API Authentication](#api-authentication)
  - [User Signup](#user-signup)
  - [User Login](#user-login)
  - [User Logout](#user-logout)
  - [Get Profile](#get-profile)
  - [Update User Profile](#update-user-profile)

- [Users](#users-api-reference)
  - [Get Pending Connection Requests](#get-pending-connection-requests)
  - [Get Matches & Connections](#get-matches-connections)
  - [Get User Feed](#get-user-feed)

- [Connection Request](#connection-request-routes)
  - [Send Connection Request](#send-connection-request)
  - [Review Connection Request](#review-connection-request)

---


# **Getting Started**

Follow these steps to get the project up and running:

### **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16.x or later)
- [MongoDB](https://www.mongodb.com/) (running locally or with a cloud provider like MongoDB Atlas)
- [Nodemon](https://nodemon.io/) (for development)

### **Run Locally**

1. **Clone the project**:

```bash
  git clone https://github.com/saddamarbaa/express-mongodb-developer-match-rest-api
```

2. **Go to the project directory**:

```bash
  cd express-mongodb-developer-match-rest-api
```

3. **Install dependencies**:

```bash
  npm install
```

4. **Set Up Environment Variables**:

```bash
  Copy `.env.example` to `.env` and update the necessary values:
```

5. **Run the Application Locally**:
   Start the server in development mode:

```bash
  npm run server
```

6. **Access the API**:

- Once the server is running, you can make API requests to `http://localhost:8000/api/v1`
- Use tools like Postman or cURL to test the endpoints.

7. **Authentication**:

- To authenticate, generate a token via the `/auth/login/` endpoint.
- Include the token in the `Authorization` header as `Bearer <your-token>`.

8. **Test the API**:
   Refer to the **API Reference** section for detailed information on the available endpoints and request/response formats.

### **Seed the Database (Optional)**:

To seed the MongoDB database with initial data, run the following command:

```bash
  npm run db:seed
```



# Environment Variables

To run this project, you will need to add the necessary environment variables to your .env file by checking .env.example for reference.



# **API Authentication**

Some endpoints may require authentication, you need to authenticate and obtain an access token.

Upon successful login, the server will return  **token**, which is also stored as cookies.

## **Making Authenticated Requests**

For future requests, you need to include the **token** in the `Authorization` header. If the header is not provided, the token will be automatically retrieved from the cookies.

### **Example Authorization Header**:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```




# API Reference

## **Authentication API Reference**

### **User Signup**

```http
POST /api/v1/auth/signup
```

| Parameter         | Type     | Description                              | Required |
|-------------------|----------|------------------------------------------|----------|
| `authentication`  | `string` | Your token                               | no       |
| `firstName`       | `string` | User's first name (3-15 characters)      | yes      |
| `lastName`        | `string` | User's last name (3-15 characters)       | yes      |
| `email`           | `string` | Valid email address                      | yes      |
| `password`        | `string` | Minimum 6 characters                     | yes      |
| `confirmPassword` | `string` | Must match the password                  | yes      |
| `bio`             | `string` | User's bio (max 500 characters)          | no       |
| `skills`          | `array`  | Array of skills (optional)               | no       |
| `profileUrl`      | `string` | Valid URL for profile picture            | no       |
| `acceptTerms`     | `boolean`| Accept the terms and conditions          | no       |      |
| `dateOfBirth`     | `date`   | User's date of birth                     | no       |

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/signup`
- **Functionality:** Registers a new user with the provided information and sends a verification email.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "yourpassword",
  "confirmPassword": "yourpassword",
  "bio": "This is my bio",
  "skills": ["JavaScript", "Node.js"],
  "profileUrl": "http://example.com/profile.jpg",
  "acceptTerms": true,
  "gender": "male",
  "dateOfBirth": "1990-01-01"
}
```

**Response:**
- **Success (201):**
```json
{
  "success": true,
  "message": "Auth Signup is success. An Email with Verification link has been sent to your account.",
  "status": 201,
  "data": null
}
```

- **Error (409):**
```json
{
  "success": false,
  "message": "E-Mail address already exists, please pick a different one.",
  "status": 409,
  "data": null
}
```

- **Error (422): Validation Error:**
```json
{
  "success": false,
  "error": "Validation error",
  "message": "One or more fields are invalid.",
  "status": 422,
  "data": null
}
```

This error typically happens when:
- Required fields are missing.
- Field types do not match the expected format (e.g., email, string, etc.).
- A value exceeds or falls short of the defined length or pattern.
  
In your code, this could be triggered by failing the validation schema checks, such as the mismatch between `password` and `confirmPassword`, or an invalid `email` format.


### **User Login**

```http
POST /api/v1/auth/login
```

| Parameter        | Type     | Description   | Required |
| :--------------- | :------- | :------------ | :------- |
| `authentication` | `string` | Your token    | no       |
| `email`          | `string` | Your email    | yes      |
| `password`       | `string` | Your password | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/login`
- **Functionality:** Logs in the user by verifying their email and password and returns a token for further use..

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "message": "User login successful.",
  "status": 200,
  "data": {
    "authToken": "yourjsonwebtoken"
  }
}
```

##### **Set Cookies**

Upon successful login, the following cookie will be set:

 -  Name: `authtoken`.
-   Value: `yourjsonwebtoken`.



- **Error (401):**
```json
{
  "success": false,
  "message": "Invalid credentials, please try again.",
  "status": 401,
  "data": null
}
```

- **Error (422): Validation Error:**
```json
{
  "success": false,
  "error": "Validation error",
  "message": "One or more fields are invalid.",
  "status": 422,
  "data": null
}
```


### **User Logout**

```http
POST /api/v1/auth/logout
```

| Parameter         | Type     | Description         | Required |
|-------------------|----------|---------------------|----------|
| `authentication`  | `string` | Your token          | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/auth/logout`
- **Functionality:** Logs out the user by invalidating their token.

**Request Body:**
```json
{
  "authentication": "yourjsonwebtoken"
}
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "message": "User logged out successfully.",
  "status": 200,
  "data": null
}
```

- **Error (401):**
```json
{
  "success": false,
  "message": "No token provided or token is invalid.",
  "status": 401,
  "data": null
}
```


### **Get Profile**

```http
GET /api/v1/auth/me
```

| Parameter         | Type     | Description         | Required |
|-------------------|----------|---------------------|----------|
| `authentication`  | `string` | Your token          | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/auth/profile`
- **Functionality:** Retrieves the authenticated user's profile details.

**Request Header:**
```json
{
  "authentication": "yourjsonwebtoken"
}
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully.",
  "status": 200,
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "bio": "This is my bio",
    "skills": ["JavaScript", "Node.js"],
    "profileUrl": "http://example.com/profile.jpg",
    "dateOfBirth": "1990-01-01"
  }
}
```

- **Error (401):**
```json
{
  "success": false,
  "message": "Unauthorized access, please login first.",
  "status": 401,
  "data": null
}
```


### **Update User Profile**

```http
PUT /api/v1/auth/update/:userId
```

| Parameter         | Type     | Description                              | Required |
|-------------------|----------|------------------------------------------|----------|
| `authentication`  | `string` | Your token                               | yes      |
| `firstName`       | `string` | User's first name (3-15 characters)      | no       |
| `lastName`        | `string` | User's last name (3-15 characters)       | no       |
| `email`           | `string` | Valid email address                      | no       |
| `bio`             | `string` | User's bio (max 500 characters)          | no       |
| `skills`          | `array`  | Array of skills (optional)               | no       |
| `profileUrl`      | `string` | Valid URL for profile picture            | no       |

#### **Description:**

- **Endpoint:** PUT /api/v1/auth/update/:userId
- **Functionality:** Updates the user's profile with the provided information.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "skills": ["JavaScript", "Node.js"],
  "profileUrl": "http://example.com/updated_profile.jpg"
}
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "message": "User profile updated successfully.",
  "status": 200,
  "data": null
}
```

- **Error (401):**
```json
{
  "success": false,
  "message": "Unauthorized access, please login first.",
  "status": 401,
  "data": null
}
```

- **Error (422): Validation Error:**
```json
{
  "success": false,
  "error": "Validation error",
  "message": "One or more fields are invalid.",
  "status": 422,
  "data": null
}
```



##  **Users API Reference**


### **Get User Feed**

```http
GET /api/v1/user/feed
```

| Parameter         | Type     | Description             | Required |
|-------------------|----------|-------------------------|----------|
| `authentication`  | `string` | Your token              | yes      |
| `page`            | `number` | Page number for pagination | no      |
| `limit`           | `number` | Number of results per page | no      |

#### **Description:**

- **Endpoint:** `GET /api/v1/user/feed`
- **Functionality:** Fetches the user feed excluding the current user's profile and users involved in any connection requests with them (accepted, ignored, pending).

**Request Header:**
```json
{
  "authentication": "yourjsonwebtoken"
}
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "error": false,
  "message": "User feed loaded successfully.",
  "status": 200,
  "data": {
    "users": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "profileUrl": "https://example.com/profile/johndoe"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "limit": 20,
      "totalDocs": 100,
      "totalPages": 5,
      "nextPage": 2,
      "prevPage": null,
      "lastPage": 5
    }
  }
}
```
- **No Users Found (200):**
```json
{
  "success": true,
  "error": false,
  "message": "No users found for your feed.",
  "status": 200,
  "data": {
    "users": [],
    "pagination": {
      "currentPage": 1,
      "limit": 20,
      "totalDocs": 0,
      "totalPages": 0,
      "nextPage": null,
      "prevPage": null,
      "lastPage": 0
    }
  }
}
```

---

### **Get Pending Connection Requests**

```http
GET /api/v1/user/requests/pending
```

| Parameter         | Type     | Description         | Required |
|-------------------|----------|---------------------|----------|
| `authentication`  | `string` | Your token          | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/user/requests/pending`
- **Functionality:** Fetches all pending connection requests where the logged-in user is the recipient (status is `'interested'`).
- **Response Data:**
  - An array of pending connection requests with details of the sender (`firstName`, `lastName`, `profileUrl`).

**Request Header:**
```json
{
  "authentication": "yourjsonwebtoken"
}
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "error": false,
  "message": "Pending connection requests retrieved successfully.",
  "status": 200,
  "data": [
    {
      "fromUserId": {
        "firstName": "Jane",
        "lastName": "Doe",
        "profileUrl": "https://example.com/profile/janedoe"
      }
    }
  ]
}
```
- **No Pending Requests (200):**
```json
{
  "success": true,
  "error": false,
  "message": "No pending connection requests found.",
  "status": 200,
  "data": []
}
```

---

### **Get Matches & Connections**

```http
GET /api/v1/user/match/connections
```

| Parameter         | Type     | Description         | Required |
|-------------------|----------|---------------------|----------|
| `authentication`  | `string` | Your token          | yes      |

#### **Description:**

- **Endpoint:** `GET /api/v1/user/match/connections`
- **Functionality:** Fetches all accepted connections (matches) where the logged-in user is either the sender or the receiver.

**Request Header:**
```json
{
  "authentication": "yourjsonwebtoken"
}
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "error": false,
  "message": "User connections retrieved successfully.",
  "status": 200,
  "data": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "profileUrl": "https://example.com/profile/johndoe"
    }
  ]
}
```
- **No Connections Found (204):**
```json
{
  "success": true,
  "error": false,
  "message": "No connections found.",
  "status": 204,
  "data": []
}
```

---


##  **Connection Request API Reference**



### **Send Connection Request**

```http
POST /api/v1/request/send/:status/:toUserId
```

| Parameter         | Type     | Description                                          | Required |
|-------------------|----------|------------------------------------------------------|----------|
| `authentication`  | `string` | Your token                                           | yes      |
| `status`          | `string` | Connection request status ('interested', 'ignored')   | yes      |
| `toUserId`        | `string` | The ID of the user to whom the connection is sent     | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/request/send/:status/:toUserId`
- **Functionality:** Sends a connection request from the logged-in user to another user. The status can be either 'interested' or 'ignored'.
- **Restrictions:** A user cannot send a connection request to themselves or send a duplicate request to the same user.

**Request Header:**
```json
{
  "authentication": "yourjsonwebtoken"
}
```

**Request Example:**
```http
POST /api/v1/request/send/interested/5f8f8c44b54764421b7156f2
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "error": false,
  "message": "Connection request sent successfully.",
  "status": 200,
  "data": {
    "_id": "60b6ae5d2f9b8e001f2e4177",
    "fromUserId": "60b6a7e5d2f9b8e001f2e4171",
    "toUserId": "5f8f8c44b54764421b7156f2",
    "status": "interested",
    "createdAt": "2023-01-15T10:01:34.879Z",
    "updatedAt": "2023-01-15T10:01:34.879Z"
  }
}
```
- **Error Responses:**
  - **(400) Sending request to self:**
  ```json
  {
    "success": false,
    "error": true,
    "message": "You cannot send a connection request to yourself.",
    "status": 400
  }
  ```
  - **(400) Invalid status:**
  ```json
  {
    "success": false,
    "error": true,
    "message": "Invalid status provided. Valid statuses are 'interested' or 'ignore'.",
    "status": 400
  }
  ```
  - **(400) Duplicate request:**
  ```json
  {
    "success": false,
    "error": true,
    "message": "A connection request between these users already exists.",
    "status": 400
  }
  ```
  - **(404) User not found:**
  ```json
  {
    "success": false,
    "error": true,
    "message": "The user you are trying to connect with does not exist.",
    "status": 404
  }
  ```

---

### **Review Connection Request**

```http
POST /api/v1/request/review/:status/:requestId
```

| Parameter         | Type     | Description                                         | Required |
|-------------------|----------|-----------------------------------------------------|----------|
| `authentication`  | `string` | Your token                                          | yes      |
| `status`          | `string` | Connection request review status ('accepted', 'rejected') | yes      |
| `requestId`       | `string` | The ID of the connection request to be reviewed     | yes      |

#### **Description:**

- **Endpoint:** `POST /api/v1/request/review/:status/:requestId`
- **Functionality:** Allows the recipient of a connection request to review it, accepting or rejecting the request.
- **Restrictions:** Only pending connection requests (status: 'interested') can be reviewed.

**Request Header:**
```json
{
  "authentication": "yourjsonwebtoken"
}
```

**Request Example:**
```http
POST /api/v1/request/review/accepted/60b6ae5d2f9b8e001f2e4177
```

**Response:**
- **Success (200):**
```json
{
  "success": true,
  "error": false,
  "message": "Connection request successfully accepted.",
  "status": 200,
  "data": {
    "_id": "60b6ae5d2f9b8e001f2e4177",
    "fromUserId": "60b6a7e5d2f9b8e001f2e4171",
    "toUserId": "60b6a8e5d2f9b8e001f2e4172",
    "status": "accepted",
    "createdAt": "2023-01-15T10:01:34.879Z",
    "updatedAt": "2023-01-15T10:10:23.879Z"
  }
}
```
- **Error Responses:**
  - **(400) Invalid status:**
  ```json
  {
    "success": false,
    "error": true,
    "message": "Invalid status provided. Valid statuses are 'rejected' or 'accepted'.",
    "status": 400
  }
  ```
  - **(404) Request not found:**
  ```json
  {
    "success": false,
    "error": true,
    "message": "Connection request not found or already reviewed.",
    "status": 404
  }
  ```

---



## Error Handling

The API utilizes `createHttpError` to manage error responses, ensuring a consistent approach to error handling. Below are some common error codes and their descriptions:

- **400 Bad Request**: Invalid request parameters or missing required fields.
- **401 Unauthorized**: Authentication failure or insufficient permissions to perform the action.
- **403 Forbidden**: Access is forbidden for the requested action, typically due to lack of authorization.
- **404 Not Found**: The requested resource could not be found.
- **409 Conflict**: Resource conflict, such as an existing user with the same email.
- **422 Unprocessable Entity**: Invalid or incomplete data provided, such as failed validation or a failed update.
- **500 Internal Server Error**: An unexpected error occurred on the server side.

These error codes provide a standardized way to communicate issues with the request or server, allowing for better debugging and handling of failures in the client application.


## Authentication Token

After logging in, the user will receive a JWT token, which should be passed in the `Authorization` header as `Bearer <token>` for requests requiring authentication.

---

## Cookie Management

The `authToken` is stored as a cookie. To logout, the `authToken` is cleared from the cookies.




# **Deployment**

To deploy this application, follow these steps:

## **Deploying to Production**

1. **Prepare Environment Variables**:
   Ensure that the necessary environment variables are set up in your production environment. This includes variables like:

- `DB_URI`: MongoDB connection string (ensure this points to your production MongoDB database).
- `PORT`: The port on which the app will run.
- `JWT_SECRET`: Secret key used for JWT token signing.
- Other environment-specific variables.

**Important**: Make sure to check the `.env.example` file for required environment variables. Copy the `.env.example` file to a new `.env` file, and fill in the necessary values for your production environment.

2. **Push your code to a Git repository**:
   If you are using a service like GitHub, GitLab, or Bitbucket, push your code to a remote repository.

3. **Set up a Hosting Service**:
   You can deploy the app on platforms like:

   - **Heroku**:
     - Install the Heroku CLI and log in.
     - Create a Heroku app with `heroku create`.
     - Deploy the app using `git push heroku master`.
     - Configure environment variables using `heroku config:set`.
     - For more up-to-date instructions, check the [Heroku documentation](https://devcenter.heroku.com/articles/deploying-nodejs) as it may update over time.
   - **Render**:
     - Sign up or log in to [Render](https://render.com/).
     - Create a new **Web Service** by connecting your GitHub (or GitLab) account and selecting the repository.
     - In the **Environment** section, select **Node** as the environment.
     - Under **Build & Deploy**, Render will automatically detect and install the required dependencies.
     - Add environment variables:
       - Go to the "Environment" section in your Render app dashboard and set environment variables like:
         ```bash
         DB_URI=your_mongo_db_connection_string
         JWT_SECRET=your_jwt_secret_key
         ```
     - Click **Create Web Service** to deploy your app.
       -. For more detailed and up-to-date instructions, check Render's [documentation](https://render.com/).

4. **Set up MongoDB**:
   - For production, ensure that MongoDB is either hosted on MongoDB Atlas or a self-hosted instance.
   - If using MongoDB Atlas, follow their [documentation](https://www.mongodb.com/cloud/atlas) to set up a cluster and get the connection string.
   - If using a self-hosted MongoDB instance, ensure it is properly configured and secured.

- Once deployed, your application will be live, and you can start interacting with it via the provided URL.

## **Contributing**

We welcome contributions from the community! Here’s how you can help:

### **How to Contribute**

1. **Fork the repository**:

   - Go to the project repository on GitHub and click on the **Fork** button to create a copy of the repository under your own GitHub account.

2. **Clone the repository**:

   - Clone your forked repository to your local machine:
     ```bash
     git clone https://github.com/saddamarbaa/node-express-mongodb-developer-match-rest-api
     ```

3. **Create a new branch**:

   - Create a new branch for your feature or bug fix:
     ```bash
     git checkout -b your-feature-branch
     ```

4. **Make your changes**:

   - Make your changes or additions to the project. Be sure to write clear, concise commit messages explaining your changes.

5. **Test your changes**:

   - Run tests and ensure everything works as expected.

6. **Commit your changes**:

   - Stage and commit your changes:
     ```bash
     git add .
     git commit -m "Add/Update feature description"
     ```

7. **Push your changes**:

   - Push your changes to your forked repository:
     ```bash
     git push origin your-feature-branch
     ```

8. **Create a Pull Request (PR)**:
   - Go to the **Pull Requests** tab of the original repository and click **New Pull Request**.
   - Select your branch and explain the changes you've made.
   - Submit the PR for review.

### **Code of Conduct**

By participating in this project, you agree to abide by the project's Code of Conduct. Please be respectful and kind to other contributors.

### **Issues and Bugs**

If you find a bug or want to request a feature:

1. **Check the issues**: Before opening a new issue, check if the problem or feature request already exists.
2. **Report a bug or request a feature**: If the issue hasn’t been reported, create a new issue with a clear description of the problem or feature request. Please include:
   - Steps to reproduce the issue (if applicable)
   - Expected and actual behavior
   - Any error messages or logs

### **Documentation**

If you're contributing to the documentation:

1. Ensure that any new or updated features are properly documented in the **README.md**.
2. Ensure that any API changes are reflected in the API documentation.

### **Thanks for your contributions!**

Your contributions help improve this project and make it better for everyone. Thank you for your help!

# **Project Status**

- **Current Status**: This project is in **active development**.
- **Upcoming Features**:
  - **Notifications**: Users will receive notifications for post likes, comments, mentions, follows, and other interactions.
  - **Content Moderation**: Admins will be able to flag posts or comments based on keywords, reports, or other indicators. Implement content filters (e.g., profanity filters, image moderation) for posts and comments. Users can report posts and comments as inappropriate.
- **Contributions**: Contributions are welcome! See the [Contributing](#contributing) section for more.
- **Known Issues**:
  - Issue 1: Add tests for admin endpoints.
  - See the [GitHub Issues page] for more.


# **Feedback**

We value your feedback and would love to hear from you! If you have any suggestions, improvements, or bugs to report, please feel free to:

- Open an issue on the [GitHub Issues page].
- Send us an email at [saddamarbaas@gmail.com].

Your feedback helps us improve the project and provide a better experience for everyone.

# **Support**

For support, email saddamarbaas@gmail.com.

# **License**

This project is licensed under the [MIT License](LICENSE).

You are free to use, modify, and distribute the code, but please ensure you follow the terms of the license. See the [LICENSE](LICENSE) file for more details.

# 🔗 Social Links

[![linkedin](https://img.shields.io/badge/linkedin-Code?style=for-the-badge&logo=linkedin&logoColor=white&color=0077B5)](https://www.linkedin.com/in/saddamarbaa/)

[![twitter](https://img.shields.io/badge/twitter-Code?style=for-the-badge&logo=twitter&logoColor=white&color=1DA1F2)](https://twitter.com/ArbaaSaddam)

# **Related Projects**



### Open Source Blog REST API built with Node.js, Express, MongoDB, and TypeScript
- [**GitHub Repo**](https://github.com/saddamarbaa/node-express-mongodb-typescript-blog-rest-api)
- A powerful RESTful API built with Node.js, Express, MongoDB, and TypeScript for managing blog posts, user authentication, and content moderation. Includes features like filtering, pagination, sorting, and full-text search. Easily customizable and scalable for various use cases.


### Dev Match App built with React, Vite, and TypeScript (Integrated with the current API)
- [**GitHub Repo**](https://github.com/saddamarbaa/developer-match-app-vite-react-typescript)
- A modern web application built with React, Vite, and TypeScript, integrated with the Developer Match API. It enables users to register, create and manage their profiles, and connect with other developers based on skills, interests, and technologies.

---

### **E-Commerce & Social API** built with Node.js, Express, MongoDB, and TypeScript

- [**API Repository**](https://github.com/saddamarbaa/node-express-mongodb-typescript-ecom-social-rest-api)
- An open-source RESTful API for User Authentication, E-commerce Management, and Social Media Post Management.
- Includes features such as Filter, Pagination, Sort, and Search APIs to enhance your application.


---

### **Twitter API** built with Node.js, Express, and MongoDB

- [**API Repository**](https://github.com/saddamarbaa/twitter-clone-api)
- A simple Twitter clone API for building a social media platform with features like user authentication, tweets, follows.

---

### **Netflix API** built with Node.js, Express, and MongoDB

- [**API Repository**](https://github.com/saddamarbaa/netflix-clone-api)
- A clone of Netflix's backend API that allows you to manage movies, users, and subscriptions, with features such as authentication and content management.

 