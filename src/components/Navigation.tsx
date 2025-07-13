'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Car } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isRTL = locale === 'ar';

  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/gcc`, label: t('gcc') },
    { href: `/${locale}/korean`, label: t('korean') },
  ];

  return (
    <nav className={`bg-white shadow-lg sticky top-0 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 rtl:space-x-reverse">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              {locale === 'ar' ? 'كتالوج السيارات' : 'Car Catalog'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href ? 'text-blue-600 bg-blue-50' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Globe className="h-4 w-4 text-gray-500" />
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Link
                  href={getLocalizedPath('en')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    locale === 'en'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </Link>
                <Link
                  href={getLocalizedPath('ar')}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    locale === 'ar'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  العربية
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{t('language')}</span>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Link
                    href={getLocalizedPath('en')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors text-center ${
                      locale === 'en'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    English
                  </Link>
                  <Link
                    href={getLocalizedPath('ar')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors text-center ${
                      locale === 'ar'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    العربية
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
