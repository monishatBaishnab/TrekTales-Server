### Backend Setup Process

#### 1. **Clone the Repository**
   
Start by cloning the repository for the backend:

```bash
git clone https://github.com/monishatBaishnab/TrekTales-Server
cd TrekTales-Server
```

#### 2. **Install Dependencies**

Make sure Node.js and npm are installed. Then, install the project dependencies:

```bash
npm install
```

#### 3. **Configure Environment Variables**

Create a `.env` file in the root directory to configure environment variables. Here's an example of what it should contain:

```bash
NODE_ENV=development
PORT=5000

# MongoDB connection string
DATABASE_URL=<your-mongodb-url>

# Bcrypt settings
BCRYPT_SALT_ROUNDS=12

# JWT secret keys
JWT_ACCESS_SECRET=<your-jwt-access-secret>

# JWT token expiration
JWT_ACCESS_EXPIRES_IN=10d
JWT_REFRESH_EXPIRES_IN=365d

# Aamarpay payment gateway
AMARPAY_BASE_URL=<your-aamarpay-base-url>
STORE_ID=<your-store-id>
SIGNATURE_KEY=<your-signature-key>

# Cloudinary image hosting
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Replace the placeholders (`<your-mongodb-url>`, `<your-jwt-access-secret>`, etc.) with your actual credentials.

#### 4. **Database Setup**

- For a **local MongoDB instance**, set the `DATABASE_URL` to something like `mongodb://localhost:27017/your-database-name`.
- For a **remote MongoDB Atlas** instance, use the MongoDB Atlas connection string.

#### 5. **Run the Server**

To start the backend server, run the following command:

```bash
npm run dev
```

This will launch the server in development mode and make it accessible at `http://localhost:5000`.

---

### Backend Overview

#### **Express.js** Application

- **RESTful API**: The API provides endpoints for managing users, posts, images, and payments.
- **Authentication**: Uses **JWT** tokens for access and refresh tokens.
- **Image Hosting**: Integration with **Cloudinary** to manage image uploads.
- **Payments**: Integration with **Aamarpay** for payment processing.

#### API Features

1. **Authentication**
   - User registration, login, and refresh token endpoints.
2. **Travel Story Management**
   - Create, update, and delete stories.
3. **Image Uploads**
   - Upload images to Cloudinary.
4. **Payment Handling**
   - Process payments via Aamarpay.

Make sure to configure the `.env` file with proper credentials to enable these features.