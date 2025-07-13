import Link from 'next/link';
import { getFeaturedCars } from '@/lib/api';
import CarGrid from '@/components/CarGrid';
import { Car, Shield, Award, Globe } from 'lucide-react';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Simple translations for now
  const translations = {
    en: {
      title: "Premium Car Catalog",
      subtitle: "Discover our exclusive collection of premium vehicles",
      featured: "Featured Cars",
      viewAll: "View All Cars",
      gccSpec: "GCC Specification",
      koreanSpec: "Korean Specification",
      gccDescription: "Gulf Cooperation Council specification vehicles, perfectly suited for Middle Eastern conditions",
      koreanDescription: "Korean specification vehicles with advanced technology and premium features"
    },
    ar: {
      title: "كتالوج السيارات المميزة",
      subtitle: "اكتشف مجموعتنا الحصرية من المركبات المميزة",
      featured: "السيارات المميزة",
      viewAll: "عرض جميع السيارات",
      gccSpec: "مواصفات دول الخليج",
      koreanSpec: "مواصفات كورية",
      gccDescription: "مركبات بمواصفات مجلس التعاون الخليجي، مناسبة تماماً لظروف الشرق الأوسط",
      koreanDescription: "مركبات بمواصفات كورية مع تقنيات متقدمة وميزات مميزة"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const featuredCars = await getFeaturedCars();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Categories Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* GCC Spec */}
        <Link
          href={`/${locale}/gcc`}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
        >
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">{t.gccSpec}</h2>
            </div>
            <p className="text-blue-100 mb-6">
              {t.gccDescription}
            </p>
            <div className="inline-flex items-center text-white font-semibold">
              {t.viewAll} →
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>

        {/* Korean Spec */}
        <Link
          href={`/${locale}/korean`}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 to-green-800 p-8 text-white hover:from-green-700 hover:to-green-900 transition-all duration-300 transform hover:scale-105"
        >
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 mr-3" />
              <h2 className="text-2xl font-bold">{t.koreanSpec}</h2>
            </div>
            <p className="text-green-100 mb-6">
              {t.koreanDescription}
            </p>
            <div className="inline-flex items-center text-white font-semibold">
              {t.viewAll} →
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Link>
      </div>

      {/* Featured Cars Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t.featured}</h2>
          <Link
            href={`/${locale}/cars`}
            className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
          >
            {t.viewAll} →
          </Link>
        </div>
        
        <CarGrid cars={featuredCars} locale={locale} />
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why Choose Our Catalog?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Selection</h3>
            <p className="text-gray-600">
              Carefully curated collection of high-quality vehicles from trusted sources.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Quality</h3>
            <p className="text-gray-600">
              All vehicles undergo thorough inspection and come with detailed specifications.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Standards</h3>
            <p className="text-gray-600">
              Supporting both GCC and Korean specifications for diverse market needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
