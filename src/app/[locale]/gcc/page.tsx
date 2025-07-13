import { getCars } from '@/lib/api';
import CarGrid from '@/components/CarGrid';
import { Shield } from 'lucide-react';

export default async function GCCPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const cars = await getCars('gcc');

  const translations = {
    en: {
      title: "GCC Specification Cars",
      description: "Gulf Cooperation Council specification vehicles, perfectly suited for Middle Eastern conditions",
      carsAvailable: "cars available"
    },
    ar: {
      title: "سيارات بمواصفات الخليج",
      description: "مركبات بمواصفات مجلس التعاون الخليجي، مناسبة تماماً لظروف الشرق الأوسط",
      carsAvailable: "سيارة متاحة"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          {t.description}
        </p>
        <div className="mt-4 text-sm text-gray-500">
          {cars.length} {t.carsAvailable}
        </div>
      </div>

      {/* Cars Grid */}
      <CarGrid cars={cars} locale={locale} />
    </div>
  );
}
