# SwiftMart - Premium MERN E-commerce

SwiftMart is a high-performance, modern e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It features a sleek, responsive design, secure authentication, and a robust admin dashboard.

## 🚀 Deployment with Docker (Recommended)

The easiest way to get SwiftMart up and running is using Docker Compose.

### Prerequisites
- Docker and Docker Compose installed on your system.
- A MongoDB Atlas connection string (or a local MongoDB instance).
- Cloudinary, Razorpay, and SMTP credentials.

### Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd eccomerse
    ```

2.  **Configure Environment Variables**:
    Copy the `.env.example` file to `.env` in the root directory and fill in your actual credentials.
    ```bash
    cp .env.example .env
    ```

3.  **Launch the Application**:
    Run the following command to build and start the containers in detached mode:
    ```bash
    docker-compose up -d --build
    ```

4.  **Access the Application**:
    - **Frontend**: [http://localhost](http://localhost)
    - **Backend API**: [http://localhost/api](http://localhost/api) (Proxied via Nginx)

### Managing Containers
- **Stop**: `docker-compose stop`
- **Start**: `docker-compose start`
- **Down**: `docker-compose down` (Removes containers and networks)
- **Logs**: `docker-compose logs -f`

---

## 🛠️ Manual Development Setup

If you prefer to run the services manually without Docker:

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on `backend/.env.example`.
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create a `.env` file based on `frontend/.env.example`.
4. `npm run dev`

---

## ✨ Features
- **Premium UI**: Crafted with Tailwind CSS and Framer Motion for a luxury feel.
- **Fast Search**: Optimized product listing and filtering.
- **Secure Auth**: JWT-based authentication with `localStorage` persistence.
- **Admin Suite**: Comprehensive dashboard for managing products, orders, and users.
- **SEO Ready**: Semantic HTML and optimized meta tags.

---

## 📄 License
This project is licensed under the MIT License.
