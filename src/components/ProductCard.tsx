import { useState } from 'react';
import { Link } from '@/context/RouteContext';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data/catalog';
import { categories } from '@/data/catalog';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const cat = categories.find(c => c.slug === product.category);

  const handleAdd = () => {
    addItem(product, product.packSizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="card card-hover group flex flex-col overflow-hidden">
      <Link to={`/products/${product.category}/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {cat && (
          <span className="absolute left-3 top-3 rounded-full bg-field-500/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {cat.shortName}
          </span>
        )}
        {product.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-wheat-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-charcoal-800">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/products/${product.category}/${product.slug}`}>
          <h3 className="font-serif text-base font-semibold text-charcoal-700 transition-colors group-hover:text-field-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-charcoal-500 line-clamp-2">{product.shortDesc}</p>

        <div className="mt-2 flex items-center gap-1">
          {product.rating && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < product.rating! ? 'fill-wheat-400 text-wheat-400' : 'text-rice-300'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {product.packSizes.slice(0, 3).map(size => (
            <span key={size} className="rounded-md bg-rice-100 px-2 py-0.5 text-[10px] font-medium text-charcoal-500">
              {size}
            </span>
          ))}
          {product.packSizes.length > 3 && (
            <span className="rounded-md bg-rice-100 px-2 py-0.5 text-[10px] font-medium text-charcoal-500">
              +{product.packSizes.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex items-baseline justify-between">
            <div>
              <span className="font-serif text-lg font-bold text-field-600">₹{product.price}</span>
              <span className="text-xs text-charcoal-400">/{product.unit}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/products/${product.category}/${product.slug}`}
              className="btn-ghost flex-1 px-3 py-2 text-xs"
            >
              View Details
            </Link>
            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1.5 rounded-xl2 px-3 py-2 text-xs font-semibold transition-all ${
                added ? 'bg-field-500 text-white' : 'btn-primary'
              }`}
            >
              {added ? (
                'Added!'
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardCarousel({ product }: ProductCardProps) {
  return (
    <div className="card card-hover group flex min-w-[280px] max-w-[280px] flex-col overflow-hidden">
      <Link to={`/products/${product.category}/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/products/${product.category}/${product.slug}`}>
          <h3 className="font-serif text-sm font-semibold text-charcoal-700 transition-colors group-hover:text-field-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-charcoal-500 line-clamp-2">{product.shortDesc}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-serif text-base font-bold text-field-600">₹{product.price}<span className="text-xs text-charcoal-400">/{product.unit}</span></span>
          <Link to={`/products/${product.category}/${product.slug}`} className="text-xs font-semibold text-wheat-600 hover:text-wheat-700">
            Details <ArrowRight className="inline h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
