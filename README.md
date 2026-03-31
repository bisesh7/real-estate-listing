# real-estate-listing

## Getting Started

### Backend

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with following template:

   ```env
   PG_USER=your_db_user
   PG_PASSWORD=your_db_password
   PG_NAME=your_db_name
   PG_HOST=localhost
   PG_PORT=5432
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   JWT_SECRET=your_jwt_secret
   PORT=5001
   ```

4. Start the backend:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the client folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

> The frontend uses a proxy to forward API calls to the backend.

---

## Seeding the Database

Seed the database with sample users and properties:

```bash
cd server
npm run seed
```

This creates admin/regular users and example property listings.

---

## API Reference

All protected routes require a `Bearer` JWT token in the `Authorization` header. Obtain a token by logging in or signing up.

### Authentication

| Method | Endpoint           | Description                     |
| ------ | ------------------ | ------------------------------- |
| `POST` | `/api/auth/login`  | Log in and receive a JWT token  |
| `POST` | `/api/auth/signup` | Sign up and receive a JWT token |

### Listings

| Method | Endpoint                        | Description                        |
| ------ | ------------------------------- | ---------------------------------- |
| `GET`  | `/api/listings?page=1&limit=10` | Get paginated listings             |
| `GET`  | `/api/listings/:id`             | Get details for a specific listing |

**Example request:**

```http
GET /api/listings?page=1&limit=10
Authorization: Bearer <JWT_TOKEN>
```
