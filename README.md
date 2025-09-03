# Number Verification App

A full-stack web application to **register users, verify Armstrong numbers, store results, and view user submissions**.

This project contains:
- **Backend** (`Number-Verification`) – Built with **Golang** + **PostgreSQL**
- **Frontend** (`number-verification-client`) – Built with **React (Vite)**

---

## 📂 Project Structure

```
├── Number-Verification/          # Backend (Golang)
│   ├── .env                     # Backend environment variables
│   └── ...
│
├── number-verification-client/   # Frontend (React + Vite)
│   ├── .env                     # Frontend environment variables
│   └── ...
```

---

## ⚙️ Prerequisites

Before running, make sure you have installed:
- [Go](https://go.dev/doc/install) (v1.18+)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 🔑 Environment Variables

### Backend (`Number-Verification/.env`)

```env
DB_HOST=<your-database-host>
DB_PORT=<your-database-port>
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
PORT=8080
JWT_SECRET=<your-secret-key>
```

### Frontend (`number-verification-client/.env`)

```env
VITE_API_URL=http://localhost:8080
```

---

## 🚀 Setup & Running

### 1. Clone the repository

```bash
git clone https://github.com/your-username/number-verification.git
cd number-verification
```

### 2. Backend Setup (Golang + PostgreSQL)

Navigate to the backend folder:
```bash
cd Number-Verification
```

Install dependencies:
```bash
go mod tidy
```

Set up PostgreSQL database:
```sql
CREATE DATABASE "number-verification";
```

Apply migrations (if included) or let the app create tables.

Run the backend:
```bash
go run main.go
```

The backend should now run on **http://localhost:8080**.

### 3. Frontend Setup (React + Vite)

Navigate to the frontend folder:
```bash
cd ../number-verification-client
```

Install dependencies:
```bash
npm install
# or
yarn install
```

Start the development server:
```bash
npm run dev
```

The frontend should now run on **http://localhost:5173**.

---

## 📖 Features

- **User Registration** (email-based)
- **Armstrong Number Verification** (backend validation + saving to DB)
- **User Dashboard** – View personal Armstrong numbers
- **Global Users Dashboard** – View all users and their numbers
- **Filtering, Pagination, and Search** support

---

## 🛠 Tech Stack

- **Backend:** Golang + PostgreSQL
- **Frontend:** React (Vite)
- **Auth:** JWT-based authentication

---

## 📌 Notes

- Make sure PostgreSQL is running before starting the backend
- Both backend and frontend require their respective `.env` files
- Update DB credentials in `Number-Verification/.env` if different from your local setup

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
postman collection:
[Number-Verification.postman_collection.json](https://github.com/user-attachments/files/22119601/Number-Verification.postman_collection.json)



https://github.com/user-attachments/assets/f47b4e8d-09eb-45f7-bb92-d21f4da183aa


