import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getCarById } from '@/lib/api';
import { LanguageCode } from '@/lib/supabase';
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Zap,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface CarDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { locale, id } = await params;

  // Simple translations
  const translations = {
    en: {
      backToHome: "Back to Home",
      year: "Year",
      mileage: "Mileage",
      fuelType: "Fuel Type",
      transmission: "Transmission",
      color: "Color",
      contactDealer: "Contact Dealer",
      km: "km"
    },
    ar: {
      backToHome: "العودة للرئيسية",
      year: "السنة",
      mileage: "المسافة المقطوعة",
      fuelType: "نوع الوقود",
      transmission: "ناقل الحركة",
      color: "اللون",
      contactDealer: "اتصل بالوكيل",
      km: "كم"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  let car;
  try {
    car = await getCarById(id);
  } catch (error) {
    console.error('Error fetching car:', error);
    notFound();
  }

  if (!car) {
    notFound();
  }

  const translation = car.translations.find(t => t.language === locale as LanguageCode);
  const primaryImage = car.images.find(img => img.is_primary) || car.images[0];
  const otherImages = car.images.filter(img => !img.is_primary);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href={`/${locale}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t.backToHome}
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images Section */}
        <div>
          {/* Main Image */}
          <div className="relative h-96 mb-4 rounded-xl overflow-hidden">
            {primaryImage ? (
              <Image
                src={primaryImage.image_url}
                alt={primaryImage.alt_text || `${car.brand} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
            
            {/* Spec Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${
                car.spec === 'gcc' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {car.spec === 'gcc' ? 'GCC Spec' : 'Korean Spec'}
              </span>
            </div>
          </div>

          {/* Thumbnail Images */}
          {otherImages.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {otherImages.slice(0, 4).map((image, index) => (
                <div key={image.id} className="relative h-20 rounded-lg overflow-hidden">
                  <Image
                    src={image.image_url}
                    alt={image.alt_text || `${car.brand} ${car.model} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div>
          {/* Title and Price */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {translation?.title || `${car.brand} ${car.model} ${car.year}`}
            </h1>
            {car.price && (
              <div className="text-3xl font-bold text-blue-600">
                {formatPrice(car.price)}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">{t.year}</div>
                  <div className="font-semibold">{car.year}</div>
                </div>
              </div>

              {car.mileage && (
                <div className="flex items-center">
                  <Gauge className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">{t.mileage}</div>
                    <div className="font-semibold">{formatMileage(car.mileage)} {t.km}</div>
                  </div>
                </div>
              )}

              {car.fuel_type && (
                <div className="flex items-center">
                  <Fuel className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">{t.fuelType}</div>
                    <div className="font-semibold">{car.fuel_type}</div>
                  </div>
                </div>
              )}

              {car.transmission && (
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">{t.transmission}</div>
                    <div className="font-semibold">{car.transmission}</div>
                  </div>
                </div>
              )}

              {car.engine_size && (
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Engine Size</div>
                    <div className="font-semibold">{car.engine_size}</div>
                  </div>
                </div>
              )}

              {car.color && (
                <div className="flex items-center">
                  <Palette className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">{t.color}</div>
                    <div className="font-semibold">{car.color}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {translation?.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{translation.description}</p>
            </div>
          )}

          {/* Features */}
          {translation?.features && translation.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Features</h2>
              <div className="grid grid-cols-2 gap-2">
                {translation.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Dealer</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-700">+971 50 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-700">info@carcatalog.ae</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Dubai, UAE</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              {t.contactDealer}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
