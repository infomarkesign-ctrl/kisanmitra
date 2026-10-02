import { RouteProvider, useRouter } from '@/context/RouteContext';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CookieConsent } from '@/components/CookieConsent';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProductsPage, CategoryPage, ProductDetailPage } from '@/pages/ProductsPage';
import { WhatWeDoPage, ServiceDetailPage } from '@/pages/WhatWeDoPage';
import { QualityPage } from '@/pages/QualityPage';
import { WhyChooseUsPage } from '@/pages/WhyChooseUsPage';
import { ContactPage } from '@/pages/ContactPage';
import { QuotePage } from '@/pages/QuotePage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage, OrderConfirmationPage } from '@/pages/CheckoutPage';
import LoginPage from '@/pages/LoginPage';
import {
  PrivacyPolicyPage, TermsPage, DisclaimerPage, CookiePolicyPage,
  ShippingPage, RefundPage, CareersPage, GrievancePage,
} from '@/pages/LegalPages';
import { NotFoundPage } from '@/pages/NotFoundPage';

function Router() {
  const { path } = useRouter();

  if (path === '/login') return <LoginPage />;
  if (path === '/') return <HomePage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/products') return <ProductsPage />;
  if (path === '/what-we-do') return <WhatWeDoPage />;
  if (path === '/quality') return <QualityPage />;
  if (path === '/why-choose-us') return <WhyChooseUsPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/quote') return <QuotePage />;
  if (path === '/cart') return <CartPage />;
  if (path === '/checkout') return <CheckoutPage />;
  if (path === '/order-confirmation') return <OrderConfirmationPage />;

  // Legal pages
  if (path === '/privacy-policy') return <PrivacyPolicyPage />;
  if (path === '/terms-conditions') return <TermsPage />;
  if (path === '/disclaimer') return <DisclaimerPage />;
  if (path === '/cookie-policy') return <CookiePolicyPage />;
  if (path === '/shipping-delivery') return <ShippingPage />;
  if (path === '/cancellation-refund') return <RefundPage />;
  if (path === '/careers') return <CareersPage />;
  if (path === '/grievance') return <GrievancePage />;

  // What We Do sub-pages
  if (path.startsWith('/what-we-do/')) {
    const slug = path.replace('/what-we-do/', '');
    return <ServiceDetailPage slug={slug} />;
  }

  // Product category pages
  if (path.startsWith('/products/')) {
    const parts = path.replace('/products/', '').split('/');
    if (parts.length === 1) {
      return <CategoryPage slug={parts[0]} />;
    }
    if (parts.length === 2) {
      return <ProductDetailPage categorySlug={parts[0]} productSlug={parts[1]} />;
    }
  }

  return <NotFoundPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <RouteProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
            <WhatsAppButton />
            <CookieConsent />
          </div>
        </CartProvider>
      </RouteProvider>
    </AuthProvider>
  );
}
