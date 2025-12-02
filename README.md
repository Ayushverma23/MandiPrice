# Khet-Bazaar

## Title & Description

A modern **Next.js** marketplace that connects **farmers** with **buyers** for agricultural produce. It offers a premium, responsive UI and a robust backend powered by **Supabase**, featuring authentication, role‑based access, inventory management, real‑time notifications, payments, cart & wishlist, order negotiation, and input validation.

---

## How to Install

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayushverma23/MandiPrice.git
   cd khet-bazaar
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables** – copy `.env.example` to `.env.local` and set your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SUPABASE_BUCKET=public   # optional storage bucket
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How to Use

- **Sign up / Login** – Choose a role (farmer, buyer, arthiya) during signup.
- **Farmer Dashboard** – Create sell listings, view orders, manage inventory, and see payment status.
- **Buyer Dashboard** – Browse marketplace, add items to cart or wishlist, place orders, and negotiate prices.
- **Real‑time Updates** – Receive notifications for new orders and status changes.
- **Payments** – Farmers can view pending and verified payments; buyers can record payments via the UI.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, ensuring code follows existing style and passes linting.
4. Run tests (if any) and verify the app builds.
5. Commit and push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request describing the changes.

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## Examples / Samples

- **Demo Screenshots** – Add screenshots of the farmer dashboard, buyer marketplace, and payment page in the `docs/` folder.
- **Sample Data** – Use the Supabase seed scripts in `supabase/seed.sql` to populate example listings, users, and orders.

---

*This README reflects the current state of the project, outlining its purpose, installation steps, usage, contribution process, licensing, and sample resources.*
