<div align="center">
  <h1>🛍️ EasyShop</h1>
  <p>A modern, responsive, and feature-rich e-commerce platform built with React & TypeScript.</p>

  <!-- Badges -->
  <p>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss" alt="Tailwind CSS" /></a>
    <a href="https://redux-toolkit.js.org/"><img src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux" alt="Redux Toolkit" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" /></a>
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 📖 Overview

Welcome to the frontend repository of **EasyShop**. This project is a comprehensive e-commerce front-end that provides users with a seamless shopping experience. From secure authentication to product browsing, cart management, and secure checkout using Stripe, EasyShop covers all the essential features of a modern online store.

## 📸 Screenshots

*(Replace these with actual screenshots of your application)*

<div align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Home+Page+Screenshot" alt="Home Page" style="border-radius: 8px; margin-bottom: 20px;" />
  <img src="https://via.placeholder.com/800x400.png?text=Product+Details+Screenshot" alt="Product Details" style="border-radius: 8px; margin-bottom: 20px;" />
</div>

## 🚀 Features

- **Authentication**: Secure login, signup, and OTP/Phone verification.
- **Product Browsing**: View popular products, filter by categories, and search.
- **Shopping Cart & Wishlist**: Add products to cart, and save favorites.
- **Checkout & Payments**: Integrated with **Stripe** for secure transactions.
- **Order Management**: View order history and detailed order status.
- **User Profile**: Manage multiple shipping addresses (Add, Edit, View).
- **Responsive Design**: Beautiful, mobile-first UI built dynamically with Tailwind CSS v4.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Data Fetching**: Axios
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & React-Redux
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Payments**: [Stripe React Elements](https://stripe.com/docs/stripe-js/react)
- **Icons & UI Utilities**: Lucide React, React Icons, Swiper (sliders), React Toastify, React Country State City

## 📦 Prerequisites

Before running the project locally, make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn or pnpm
- A [Stripe Account](https://stripe.com/) (For testing payments)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ParthAcharya0/easy-shop.git
   ```

2. **Navigate to the frontend folder**
   ```bash
   cd easy-shop/frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the root directory (or use `.env.development`) based on the necessary keys:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key_here
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:5173/` (or another available port). Open this URL in your browser.

## 📜 Available Scripts

- `npm run dev` - Starts the development server locally with Fast Refresh.
- `npm run dev:prod` - Starts the development server simulating a production environment.
- `npm run build` - Type-checks the TypeScript code and bundles the app for production.
- `npm run preview` - Boots up a local static web server that serves the production build.
- `npm run lint` - Runs ESLint to identify code quality and stylistic issues.

## 📂 Folder Structure

```
src/
├── api/            # API call configurations (Axios instances)
├── assets/         # Static assets (images, logos, global icons)
├── components/     # Reusable UI components (atoms, molecules, pages)
├── constant/       # Global constants and static configurations
├── hooks/          # Custom React hooks
├── redux/          # Redux store configuration, slices, and async thunks
├── route/          # Protected and Public routing configurations
├── App.tsx         # Root layout and global context providers
├── index.css       # Global styles and Tailwind base imports
└── main.tsx        # Application entry point
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 📧 Contact

**Parth Acharya** - [GitHub Profile](https://github.com/ParthAcharya0)

Project Link: [https://github.com/ParthAcharya0/easy-shop](https://github.com/ParthAcharya0/easy-shop)
