# SumeetsCampusCart Frontend

Frontend application for **SumeetsCampusCart**, a marketplace platform where users can browse products, manage carts, and place orders.

The frontend communicates with a Node.js backend API and provides the user interface for the application.

---

## Live Application

https://sumeetscampuscart.netlify.app

Demo Login:

Email: test@gmail.com  
Password: 123456

---

## Tech Stack

- React
- Vite
- React Router
- Axios
- Context API
- CSS

---

## Features

- User signup and login
- Session-based authentication
- Product browsing
- Add products to cart
- Cart quantity management
- Order placement
- Order history
- Admin product management
- Protected routes
- Mobile responsive UI

---
project structure
src
components
Navbar.jsx
pages
Home.jsx
Login.jsx
Signup.jsx
Cart.jsx
Orders.jsx
CreateProduct.jsx
context
AuthContext.jsx
api
axios.js


---

## Installation

Clone repository


git clone https://github.com/Vidhan4444/campuscart-frontend.git


Install dependencies


npm install


Run development server


npm run dev


Application runs at


http://localhost:5173


---

## API Configuration

The frontend connects to the backend API.

File:


src/api/axios.js


Configuration:


baseURL: "https://campuscart-api.onrender.com/api
"


All requests include:


withCredentials: true


to support session authentication.

---

## Deployment

Frontend deployed on **Netlify**.

Steps:

1. Push repository to GitHub
2. Connect repository in Netlify
3. Configure build settings

Build command


npm run build


Publish directory


dist


4. Deploy

---

## Routing Fix for Netlify

React Router requires a redirect rule.

File:


public/_redirects


Content:


/* /index.html 200


This ensures direct navigation to routes like:


/orders
/cart
/login


works correctly.

---

## Author

Sumeet Salunke

## Project Structure
