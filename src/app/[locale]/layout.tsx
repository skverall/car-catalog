import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900">
                    {locale === 'ar' ? 'كتالوج السيارات' : 'Car Catalog'}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <a href={`/${locale}`} className="text-gray-700 hover:text-blue-600">
                    {locale === 'ar' ? 'الرئيسية' : 'Home'}
                  </a>
                  <a href={`/${locale}/cars`} className="text-gray-700 hover:text-blue-600">
                    {locale === 'ar' ? 'جميع السيارات' : 'All Cars'}
                  </a>
                  <a href={`/${locale}/gcc`} className="text-gray-700 hover:text-blue-600">
                    {locale === 'ar' ? 'مواصفات الخليج' : 'GCC Spec'}
                  </a>
                  <a href={`/${locale}/korean`} className="text-gray-700 hover:text-blue-600">
                    {locale === 'ar' ? 'مواصفات كورية' : 'Korean Spec'}
                  </a>
                  <a href={locale === 'en' ? '/ar' : '/en'} className="text-blue-600 hover:text-blue-700">
                    {locale === 'en' ? 'العربية' : 'English'}
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
