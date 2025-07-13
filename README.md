# Premium Car Catalog

A modern, bilingual car catalog application built with Next.js 15, featuring both English and Arabic language support with RTL layout. Perfect for car dealers and showrooms to showcase their inventory.

## 🚗 Features

- **Bilingual Support**: Full English and Arabic language support with RTL layout
- **Mobile-First Design**: Optimized for mobile devices (90% of users)
- **Car Categories**: Support for GCC and Korean specification vehicles
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Database Integration**: Powered by Supabase for reliable data storage
- **Image Gallery**: High-quality car images with primary/secondary views
- **Detailed Car Pages**: Comprehensive car specifications and details
- **Touch-Friendly**: Optimized for mobile touch interactions

## 🛠 Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel deployment

## 📱 Pages

1. **Home Page** (`/en` or `/ar`)
   - Featured cars showcase
   - Category navigation (GCC/Korean)
   - Bilingual content

2. **Category Pages** (`/en/gcc` or `/en/korean`)
   - Filtered car listings by specification
   - Grid layout with car cards

3. **Car Detail Page** (`/en/cars/[id]`)
   - Detailed car information
   - Image gallery
   - Specifications table
   - Contact dealer section

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Database Schema

The application uses the following main tables:

- **cars**: Main car information (brand, model, year, price, etc.)
- **car_translations**: Multilingual content (title, description, features)
- **car_images**: Car photos with primary/secondary designation

## 🌐 Internationalization

- **English**: `/en/*` routes
- **Arabic**: `/ar/*` routes with RTL layout
- Language switcher in navigation
- Localized content and formatting

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly button sizes (44px minimum)
- Optimized images
- Fast loading times
- Mobile-first CSS approach

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
