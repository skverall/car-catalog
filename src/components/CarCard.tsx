'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CarWithDetails, LanguageCode } from '@/lib/supabase';
import { Eye, Calendar, Gauge, Fuel, Settings, Palette } from 'lucide-react';

interface CarCardProps {
  car: CarWithDetails;
  locale?: string;
}

export default function CarCard({ car, locale = 'en' }: CarCardProps) {
  // Simple translations
  const translations = {
    en: {
      year: 'Year',
      mileage: 'Mileage',
      fuelType: 'Fuel Type',
      transmission: 'Transmission',
      color: 'Color',
      viewDetails: 'View Details',
      km: 'km'
    },
    ar: {
      year: 'السنة',
      mileage: 'المسافة المقطوعة',
      fuelType: 'نوع الوقود',
      transmission: 'ناقل الحركة',
      color: 'اللون',
      viewDetails: 'عرض التفاصيل',
      km: 'كم'
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  
  // Get translation for current locale
  const translation = car.translations.find(tr => tr.language === locale as LanguageCode);
  const primaryImage = car.images.find(img => img.is_primary) || car.images[0];
  
  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage?: number) => {
    if (!mileage) return null;
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-AE').format(mileage);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.image_url}
            alt={primaryImage.alt_text || `${car.brand} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Spec Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${
            car.spec === 'gcc' ? 'bg-blue-600' : 'bg-green-600'
          }`}>
            {car.spec === 'gcc' ? 'GCC' : 'Korean'}
          </span>
        </div>

        {/* Featured Badge */}
        {car.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500 text-white">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {translation?.title || `${car.brand} ${car.model} ${car.year}`}
        </h3>

        {/* Price */}
        {car.price && (
          <div className="text-2xl font-bold text-blue-600 mb-3">
            {formatPrice(car.price)}
          </div>
        )}

        {/* Car Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{t.year}: {car.year}</span>
          </div>
          
          {car.mileage && (
            <div className="flex items-center text-sm text-gray-600">
              <Gauge className="w-4 h-4 mr-2" />
              <span>{t.mileage}: {formatMileage(car.mileage)} {t.km}</span>
            </div>
          )}
          
          {car.fuel_type && (
            <div className="flex items-center text-sm text-gray-600">
              <Fuel className="w-4 h-4 mr-2" />
              <span>{t.fuelType}: {car.fuel_type}</span>
            </div>
          )}
          
          {car.transmission && (
            <div className="flex items-center text-sm text-gray-600">
              <Settings className="w-4 h-4 mr-2" />
              <span>{t.transmission}: {car.transmission}</span>
            </div>
          )}
          
          {car.color && (
            <div className="flex items-center text-sm text-gray-600">
              <Palette className="w-4 h-4 mr-2" />
              <span>{t.color}: {car.color}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {translation?.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {translation.description}
          </p>
        )}

        {/* View Details Button */}
        <Link
          href={`/${locale}/cars/${car.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          {t.viewDetails}
        </Link>
      </div>
    </div>
  );
}
