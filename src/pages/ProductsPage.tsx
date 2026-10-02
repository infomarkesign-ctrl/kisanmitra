import { useState, useMemo } from 'react';
import { useRouter, Link } from '@/context/RouteContext';
import { useCart } from '@/context/CartContext';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { PageHero, CTABanner } from '@/components/Shared';
import { categories, products, companyInfo, getMaxQty, type CategorySlug } from '@/data/catalog';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

export function ProductsPage() {
  const { navigate } = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<CategorySlug | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high'>('popularity');

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCat !== 'all') result = result.filter(p => p.category === selectedCat);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    else result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return result;
  }, [search, selectedCat, sortBy]);

  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="50+ Products, One Trusted Source"
        subtitle="Browse our full catalogue of premium agri-commodities across 7 categories."
        image="https://images.pexels.com/photos/4224254/pexels-photo-4224254.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
      />

      {/* Category tiles */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={i * 80}>
                <Link to={`/products/${cat.slug}`} className="card card-hover group block overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={cat.image} alt={cat.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-field-800/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-wheat-400">{products.filter(p => p.category === cat.slug).length} Products</p>
                      <h3 className="mt-1 font-serif text-lg font-semibold text-white">{cat.name}</h3>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All Products with filters */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-charcoal-700">All Products</h2>
              <p className="mt-1 text-sm text-charcoal-500">{filtered.length} products found</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as typeof sortBy)}
                className="input-field cursor-pointer"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category filter chips */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCat('all')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCat === 'all' ? 'bg-field-500 text-white' : 'bg-white text-charcoal-600 hover:bg-rice-200'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCat(cat.slug)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCat === cat.slug ? 'bg-field-500 text-white' : 'bg-white text-charcoal-600 hover:bg-rice-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-charcoal-500">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        title="Need Bulk Quantities or Custom Packaging?"
        buttonText="Get a Quote"
        buttonLink="/quote"
      >
        Contact us for wholesale pricing, export enquiries, and private-label packaging options.
      </CTABanner>
    </>
  );
}

export function CategoryPage({ slug }: { slug: string }) {
  const cat = categories.find(c => c.slug === slug);
  const catProducts = useMemo(() => products.filter(p => p.category === slug), [slug]);

  if (!cat) return null;

  return (
    <>
      <PageHero
        eyebrow="Product Category"
        title={cat.name}
        subtitle={cat.description}
        image={cat.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: cat.name },
        ]}
      />

      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-charcoal-700">{catProducts.length} Products in {cat.name}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {catProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust blurb */}
      <section className="bg-rice-100 py-12">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-xl2 bg-field-50 p-8 text-center">
            <h3 className="font-serif text-xl font-bold text-field-700">Why Source {cat.name} From Us?</h3>
            <p className="mt-3 text-sm text-charcoal-500">
              We source {cat.name.toLowerCase()} directly from farms and FPOs across India, process them in our in-house facility with strict quality controls, and pack to export-grade standards. Our FSSAI-compliant operations and complete export documentation ensure you receive quality products with hassle-free logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-rice-50 py-12">
        <div className="container-page">
          <h3 className="mb-6 text-center font-serif text-xl font-bold text-charcoal-700">Explore Other Categories</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.filter(c => c.slug !== slug).map(c => (
              <Link key={c.slug} to={`/products/${c.slug}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal-600 shadow-soft transition-colors hover:bg-field-50 hover:text-field-600">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={`Need ${cat.name} in Bulk?`}
        buttonText="Get a Quote"
        buttonLink="/quote"
      >
        Get wholesale pricing and export-grade packaging for {cat.name.toLowerCase()}.
      </CTABanner>
    </>
  );
}

export function ProductDetailPage({ categorySlug, productSlug }: { categorySlug: string; productSlug: string }) {
  const product = products.find(p => p.category === categorySlug && p.slug === productSlug);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(product?.packSizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const { navigate } = useRouter();
  const { addItem } = useCart();

  if (!product) return null;

  const cat = categories.find(c => c.slug === product.category);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const maxQty = getMaxQty(product.id);
  const atLimit = quantity >= maxQty;

  const handleAddToCart = () => {
    addItem(product, selectedPack, quantity);
    navigate('/cart');
  };

  return (
    <>
      <section className="bg-rice-100 py-8">
        <div className="container-page">
          <nav className="flex items-center gap-1.5 text-sm text-charcoal-500">
            <Link to="/" className="hover:text-field-600">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-field-600">Products</Link>
            <span>/</span>
            <Link to={`/products/${product.category}`} className="hover:text-field-600">{cat?.name}</Link>
            <span>/</span>
            <span className="text-charcoal-700">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="bg-rice-50 py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="overflow-hidden rounded-xl2 shadow-card">
                <img src={product.gallery[activeImage]} alt={product.name} className="aspect-square w-full object-cover" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`overflow-hidden rounded-xl2 border-2 transition-colors ${i === activeImage ? 'border-field-500' : 'border-transparent hover:border-rice-300'}`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="aspect-square w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div>
              {cat && (
                <Link to={`/products/${product.category}`}>
                  <span className="inline-block rounded-full bg-field-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-field-600">{cat.name}</span>
                </Link>
              )}
              <h1 className="mt-3 font-serif text-3xl font-bold text-charcoal-700 sm:text-4xl">{product.name}</h1>
              <p className="mt-2 text-charcoal-500">{product.shortDesc}</p>

              {product.rating && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < product.rating! ? 'text-wheat-400' : 'text-rice-300'}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-charcoal-400">{product.rating}.0</span>
                </div>
              )}

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-field-600">₹{product.price}</span>
                <span className="text-charcoal-400">/{product.unit}</span>
              </div>

              <div className="mt-6">
                <p className="label-field">Pack Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.packSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedPack(size)}
                      className={`rounded-xl2 border-2 px-4 py-2 text-sm font-medium transition-colors ${
                        selectedPack === size ? 'border-field-500 bg-field-50 text-field-600' : 'border-rice-300 text-charcoal-600 hover:border-field-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="label-field">Quantity</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-10 w-10 items-center justify-center rounded-xl2 border border-rice-300 text-charcoal-600 hover:bg-rice-100">-</button>
                  <span className="w-12 text-center font-semibold text-charcoal-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                    disabled={atLimit}
                    className="flex h-10 w-10 items-center justify-center rounded-xl2 border border-rice-300 text-charcoal-600 hover:bg-rice-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    +
                  </button>
                </div>
                {atLimit && (
                  <p className="mt-2 text-xs text-terracotta-500">
                    Max {maxQty} per order online. Need more? Contact{' '}
                    <a href={`mailto:${companyInfo.email}`} className="font-semibold underline">{companyInfo.email}</a> to order in bulk.
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={handleAddToCart} className="btn-primary">
                  Add to Cart
                </button>
                <Link to="/quote" className="btn-outline">
                  Request Bulk Quote
                </Link>
              </div>

              <div className="mt-8 rounded-xl2 bg-rice-100 p-4">
                <p className="text-sm text-charcoal-500">
                  <strong className="text-charcoal-700">Origin:</strong> {product.origin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Specs */}
      <section className="bg-rice-100 py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="card p-8">
              <h2 className="font-serif text-2xl font-bold text-charcoal-700">Product Description</h2>
              <p className="mt-4 text-charcoal-500">{product.description}</p>
            </div>
            <div className="card p-8">
              <h2 className="font-serif text-2xl font-bold text-charcoal-700">Specifications</h2>
              <table className="mt-4 w-full">
                <tbody>
                  {product.specs.map(spec => (
                    <tr key={spec.label} className="border-b border-rice-200 last:border-0">
                      <td className="py-3 text-sm font-semibold text-charcoal-700">{spec.label}</td>
                      <td className="py-3 text-sm text-charcoal-500">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-pad bg-rice-50">
          <div className="container-page">
            <h2 className="mb-8 font-serif text-3xl font-bold text-charcoal-700">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title="Need This Product in Bulk?"
        buttonText="Get a Quote"
        buttonLink="/quote"
      >
        Contact us for wholesale pricing, export documentation, and custom packaging.
      </CTABanner>
    </>
  );
}
