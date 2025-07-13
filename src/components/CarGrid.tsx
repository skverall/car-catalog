'use client';

import { CarWithDetails } from '@/lib/supabase';
import CarCard from './CarCard';

interface CarGridProps {
  cars: CarWithDetails[];
  loading?: boolean;
  locale?: string;
}

export default function CarGrid({ cars, loading, locale = 'en' }: CarGridProps) {

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🚗</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {locale === 'ar' ? 'لم يتم العثور على سيارات' : 'No cars found'}
        </h3>
        <p className="text-gray-600">
          {locale === 'ar'
            ? 'جرب تعديل المرشحات أو تحقق لاحقاً من الوصولات الجديدة'
            : 'Try adjusting your filters or check back later for new arrivals.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} locale={locale} />
      ))}
    </div>
  );
}
