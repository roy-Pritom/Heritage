# Node.js TypeScript Mongoose Application(Property Management System)

This is a sample Node.js application written in TypeScript and using Mongoose for MongoDB integration.With user authentication

## Requirements

Before you run locally, ensure that you must have the following requirements:

- Node.js installed
- npm package manager installed
- MongoDB installed and running locally
- typescript installed

## Getting Started

1. **First clone the repository:**

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2-b2-assignment-6-backend-roy-Pritom
   cd change the directory
2. **Install Dependencies:**

   ```bash
   npm install
3. **Configuration(.env):**

   ```bash
   Create a .env file in the root of your project
   PORT=server_port
   DATABASE_URL=Mongodb Uri(username,password)
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_ACCESSTOKEN_EXPIRESIN=your_access_token_expiresIN
   JWT_REFRESHTOKEN_EXPIRESIN=your_refresh_token_expiresIN
   SALT_ROUNDS=your_SALT_ROUNDS
   
4. **Build the typescript code:**

   ```bash
   npm run build
5. **Run Application(production):**

   ```bash
   npm run start:prod
5. **Run Application(development):**

   ```bash
   npm run start:dev
6. **See code problems(eslint):**

   ```bash
   npm run lint
8. **Api end point:**

   ```bash
   User Registration
   Endpoint: /api/v1/users/register
   Method:POST
   put appropriate json data

   User Login
   Endpoint: /api/v1/auth/login
   Method:POST

   Create a Property
   Endpoint: /api/v1/property/create-property
   Method:POST
   Request Headers:Authorization: <JWT_TOKEN>

   Get Paginated and Filtered Properties
   Endpoint: /api/v1/property?your_query
   Method: GET

   Get Property By Id
   Endpoint: /api/v1/property/:propertyId
   Method:Get
   
   Place A Property Bid
   Endpoint: /api/v1/property/place-bid/:propertyId
   Method:PARCH
   Request Headers:Authorization: <JWT_TOKEN>

   Get Win Property By User
   Endpoint: /api/v1/property/win-property
   Method:GET
   Request Headers:Authorization: <JWT_TOKEN>

   Create A Review
   Endpoint: /api/v1/review/create-review/:propertyId
   Method:POST
   Request Headers:Authorization: <JWT_TOKEN>

   Get Review By Property
   Endpoint: /api/v1/review/:propertyId
   Method:GET
   
   Update User Profile (Partial Update)
   Endpoint: /api/v1/users/update-user-profile
   Method:PATCH
   Request Headers:Authorization: <JWT_TOKEN>

   Get User Profile
   Endpoint: /api/v1/users/user-profile
   Method:GET
   Request Headers:Authorization: <JWT_TOKEN>
   
9. **Live link (vercel):**

   Live link: https://manage-property-system-server.vercel.app


   
   


  