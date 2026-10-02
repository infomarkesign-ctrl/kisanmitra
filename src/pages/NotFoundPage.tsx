import { Link } from '@/context/RouteContext';
import { Wheat, Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-rice-50 px-4">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-field-100 text-field-600">
          <Wheat className="h-10 w-10" />
        </div>
        <h1 className="mt-8 font-serif text-6xl font-bold text-field-600">404</h1>
        <h2 className="mt-4 font-serif text-2xl font-bold text-charcoal-700">This page has wandered off the field</h2>
        <p className="mt-2 text-charcoal-500">Let's get you back home.</p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="mt-4">
          <Link to="/products" className="text-sm font-medium text-wheat-600 hover:text-wheat-700">
            Browse Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
