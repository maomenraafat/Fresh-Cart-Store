# Fresh-Cart-Store

**Fresh-Cart-Store** is a fully responsive and dynamic e-commerce web application built with Angular 19, Tailwind CSS, Flowbite, and Sass. Designed to deliver a seamless shopping experience with a clean UI, smooth navigation, and API-driven data handling.

---

## Features

- **Product Browsing:**

  - View products by **categories** and **brands**.
  - Dynamic routing to **product details**, **category details**, and **brand details** pages.
  - Reusable `card-item` component for consistent product display.

- **Search Functionality:**

  - Full-featured search bar to find products by name.
  - Real-time search results for a seamless user experience.

- **Wishlist Management:**

  - Add/remove products to/from the wishlist.
  - Toggle wishlist status with a heart icon (turns red when added).
  - View wishlist and add items directly to the cart.

- **Cart Management:**

  - Add/remove products to/from the cart.
  - Dynamically update cart item count in real-time.
  - Checkout options: **online payment** and **cash on delivery**.

- **Order Tracking:**

  - View order history with pagination.
  - Detailed order information displayed in a modal.

- **Authentication:**

  - Full authentication flow: **register**, **login**, and **logout**.
  - Password reset functionality.
  - Token management using `localStorage`.

- **Error Handling & Loading States:**

  - Global error handling with **toast notifications**.
  - Loading spinner (`ngx-spinner`) for API requests.

- **Responsive Design:**

  - Fully responsive layout optimized for all devices.
  - Modern and clean UI built with **Tailwind CSS** and **Sass**.

- **Server-Side Rendering (SSR):**

  - Configured SSR for dynamic routes (`productDetails/:id`, `categories/:id`, `brands/:id`).
  - Prerender mode for static routes to improve performance.

- **API Integration:**

  - Integrated with **ecommerce.routemisr.com** for product data.
  - Token injection for authenticated API requests.

- **UI Enhancements:**
  - Improved forms with better validation and user experience.
  - Reusable input and error message components.
  - Enhanced product details page with better usability and design.

---

### **Key Enhancements:**

- **Design and Responsiveness:**

  - Improved layout and responsiveness for multiple components.
  - Updated Tailwind CSS and styles for consistency.

- **Code Organization:**

  - Refactored and organized the codebase for better readability.
  - Removed outdated and unnecessary comments.

- **Checkout Enhancements:**

  - Added `type="tel"` input for phone numbers.
  - Implemented pattern validation for phone numbers.

- **Navigation:**

  - Enabled navigation to category and brand details from the card component.

- **Performance:**
  - Configured server routes for deployment with SSR and prerender mode.

---

## Tech Stack

- **Frontend**: Angular
- **Styling**: Tailwind CSS, Sass
- **API**: [Store API](https://ecommerce.routemisr.com)

---

## Live Demo

Check out the live demo of **Fresh-Cart-Store** here:  
[Live Demo Link](https://fresh-cart-store.vercel.app/) <!-- Add your live demo link here -->

---

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js (v16 or higher)
- Angular CLI (v15 or higher)
- Git (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maomenraafat/Fresh-Cart-Store.git
   cd Fresh-Cart
   ```

# Fresh-Cart

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
ng serve
```

### 3. Open the app in your browser

Navigate to `http://localhost:4200` to view the application.

---

## Project Structure

```
products-gallery/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── interceptors/        # HTTP interceptors (loading & error handling)
│   │   │   │   ├── error/
│   │   │   │   │   ├── error.interceptor.spec.ts
│   │   │   │   │   ├── error.interceptor.ts
│   │   │   │   ├── loading.interceptor.spec.ts
│   │   │   │   ├── loading.interceptor.ts
│   │   ├── layout/
│   │   │   ├── footer/
│   │   │   ├── navbar/
│   │   │   ├── notfound/
│   │   ├── features/
│   │   │   ├── pages/
│   │   │   │   ├── home/
│   │   │   │   ├── interfaces/
│   │   │   │   ├── product-details/
│   │   ├── shared/
│   │   │   ├── components/          # Reusable UI components
│   │   │   ├── interfaces/
│   │   │   │   ├── product.ts
│   │   ├── services/                 # API and data handling services
│   │   │   ├── flowbite/
│   │   │   ├── product/    # Main module
│   │   ├── assets/                 # Static assets (e.g., images)
│   │    ├── styles.css              # Global styles
│   │    ├── angular.json            # Angular configuration
│   │    ├── package.json            # Project dependencies
│   │    ├── README.md               # Project documentation
```

---

## Error Handling & Interceptors

This project uses **HTTP Interceptors** to handle:

- **Loading State**: `loading.interceptor.ts` displays a spinner when making API calls.
- **Error Handling**: `error.interceptor.ts` captures and displays user-friendly error messages.

---

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch:
   ```bash
   git checkout -b feature/maomenraafat
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/maomenraafat
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Store API](https://ecommerce.routemisr.com) for providing the product data.
- Angular and Tailwind CSS, Flowbite, and Sass for making this project possible.
