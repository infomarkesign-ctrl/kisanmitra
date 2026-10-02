import { useState, useEffect, useCallback } from 'react';
import { Link } from '@/context/RouteContext';
import { Reveal } from '@/components/Reveal';
import { ProductCardCarousel } from '@/components/ProductCard';
import { CTABanner, SectionHeading } from '@/components/Shared';
import { FestivalOfferBanner } from '@/components/FestivalOfferBanner';
import {
  heroSlides, trustStats, categories, products, testimonials,
  processSteps, whyChooseUs, companyInfo,
} from '@/data/catalog';
import {
  ChevronLeft, ChevronRight, Star, ArrowRight, Wheat, Ship,
  Factory, ShieldCheck, Sprout, Package, Globe, Handshake,
  MapPin, Phone, Quote,
} from 'lucide-react';

const iconMap: Record<string, typeof Wheat> = {
  Wheat, Ship, Factory, ShieldCheck, Sprout, Package, Globe, Handshake,
};

export function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextSlide = useCallback(() => setSlideIndex(i => (i + 1) % heroSlides.length), []);
  const prevSlide = useCallback(() => setSlideIndex(i => (i - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 12);

  return (
    <>
      <FestivalOfferBanner />

      {/* Hero Carousel */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === slideIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.headline} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-field-800/85 via-field-700/60 to-transparent" />
            </div>
            <div className="container-page relative z-10 flex h-full items-center">
              <div className="max-w-2xl">
                <p className={`eyebrow text-wheat-400 transition-all duration-700 ${i === slideIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {slide.eyebrow}
                </p>
                <h1 className={`mt-3 font-serif text-4xl font-bold text-white transition-all duration-700 delay-100 sm:text-5xl lg:text-6xl ${i === slideIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {slide.headline}
                </h1>
                <p className={`mt-4 max-w-xl text-lg text-rice-100 transition-all duration-700 delay-200 ${i === slideIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {slide.subtext}
                </p>
                <div className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 delay-300 ${i === slideIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <Link to={slide.cta.link} className="btn-primary">{slide.cta.label}</Link>
                  <Link to={slide.cta2.link} className="btn border-2 border-white text-white hover:bg-white hover:text-field-700">{slide.cta2.label}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30" aria-label="Previous slide">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30" aria-label="Next slide">
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`h-2 rounded-full transition-all ${i === slideIndex ? 'w-8 bg-wheat-400' : 'w-2 bg-white/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-field-700 py-10">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {trustStats.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Wheat;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 bg-field-600 text-wheat-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-rice-200">{stat.label}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Snapshot */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative">
                <div className="overflow-hidden rounded-xl2 shadow-card">
                  <img
                    src="https://images.pexels.com/photos/34718922/pexels-photo-34718922.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Processing facility"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 hidden rounded-xl2 bg-wheat-500 p-6 shadow-card-hover sm:block">
                  <div className="font-serif text-3xl font-bold text-charcoal-800">50+</div>
                  <div className="text-xs font-medium text-charcoal-700">Products Traded</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="eyebrow">About Kisan Mitra</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-charcoal-700 sm:text-4xl">Rooted in Trust, Growing Globally</h2>
                <div className="mt-4 space-y-4 text-charcoal-500">
                  <p>
                    Based in Gondia, Maharashtra — a region historically known as the "Rice Bowl of Maharashtra" — KISAN MITRA RICE TRADING PRIVATE LIMITED connects Indian farmers to global markets through quality-driven agri-commodity trading.
                  </p>
                  <p>
                    From premium basmati rice to wholesome pulses, dry fruits, and masalas, we source, process, pack, and export 50+ products across 7 categories. Our in-house processing and packing units ensure quality control from farm to final dispatch.
                  </p>
                  <p>
                    With FSSAI compliance, export documentation expertise, and a farmer-first sourcing approach, we are your trusted partner for agri-commodity import, export, and trading.
                  </p>
                </div>
                <Link to="/about" className="btn-outline mt-6">
                  Read Our Story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Our Products"
            title="Explore Our Categories"
            subtitle="50+ products across 7 categories — sourced, processed, and packed to export-grade quality."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Wheat;
              return (
                <Reveal key={cat.slug} delay={i * 80}>
                  <Link to={`/products/${cat.slug}`} className="card card-hover group block overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={cat.image} alt={cat.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-field-800/80 via-field-700/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 text-wheat-400">
                          <Icon className="h-5 w-5" />
                          <span className="text-[10px] font-semibold uppercase tracking-wide">{products.filter(p => p.category === cat.slug).length} Products</span>
                        </div>
                        <h3 className="mt-1 font-serif text-lg font-semibold text-white">{cat.name}</h3>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
            <Reveal delay={categories.length * 80}>
              <Link to="/products" className="card card-hover group flex aspect-[4/3] items-center justify-center bg-field-600 text-center">
                <div className="p-4">
                  <div className="font-serif text-2xl font-bold text-white">View All</div>
                  <div className="mt-1 text-sm text-rice-200">50+ Products →</div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">Best Sellers</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-charcoal-700 sm:text-4xl">Featured Products</h2>
            </div>
            <Link to="/products" className="hidden btn-ghost sm:inline-flex">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {featuredProducts.map(product => (
              <ProductCardCarousel key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/products" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Process Strip */}
      <section className="section-pad bg-field-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="What We Do"
            title="End-to-End Agri Commodity Solutions"
            subtitle="From sourcing at the farm to shipping across the globe — we manage every step of the supply chain."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon] || Wheat;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="card card-hover relative h-full p-6 text-center">
                    <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-wheat-500 font-serif text-sm font-bold text-charcoal-800">
                      {i + 1}
                    </div>
                    <div className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 font-serif text-base font-semibold text-charcoal-700">{step.title}</h3>
                    <p className="mt-2 text-sm text-charcoal-500">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Why Choose Us"
            title="Why Businesses & Customers Choose Kisan Mitra"
            subtitle="Six reasons we are the preferred agri-commodity trading partner."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] || Wheat;
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="card card-hover h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-wheat-100 text-wheat-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal-700">{item.title}</h3>
                    <p className="mt-2 text-sm text-charcoal-500">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance Banner */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-xl2 shadow-card">
                <img
                  src="https://images.pexels.com/photos/8540029/pexels-photo-8540029.jpeg?auto=compress&cs=tinysrgb&w=1920"
                  alt="Quality control lab"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="eyebrow">Quality Assurance</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-charcoal-700 sm:text-4xl">Quality You Can Measure, Trust You Can Rely On</h2>
                <p className="mt-4 text-charcoal-500">
                  Every batch undergoes a rigorous multi-stage quality control process — from raw material inspection to final dispatch checks. Our lab tests for moisture, foreign matter, broken grain percentage, pesticide residues, and aflatoxin levels.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {['FSSAI Licensed', 'APEDA Registered', 'ISO 22000 / HACCP', 'GST Compliant'].map(cert => (
                    <span key={cert} className="flex items-center gap-2 rounded-xl2 bg-field-50 px-4 py-2 text-sm font-medium text-field-600">
                      <ShieldCheck className="h-4 w-4" /> {cert}
                    </span>
                  ))}
                </div>
                <Link to="/quality" className="btn-outline mt-6">
                  See Our Quality Standards <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad bg-field-700">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Testimonials"
            title="What Our Partners Say"
            subtitle="Trusted by businesses across India and around the world."
          />
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === testimonialIndex ? 'opacity-100' : 'absolute inset-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="card p-8 text-center">
                    <Quote className="mx-auto h-10 w-10 text-wheat-400" />
                    <div className="mt-4 flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`h-5 w-5 ${s < t.rating ? 'fill-wheat-400 text-wheat-400' : 'text-rice-300'}`} />
                      ))}
                    </div>
                    <p className="mx-auto mt-4 max-w-2xl font-serif text-xl text-charcoal-700">"{t.quote}"</p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                      <div className="text-left">
                        <div className="font-semibold text-charcoal-700">{t.name}</div>
                        <div className="text-sm text-charcoal-500">{t.business} • {t.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === testimonialIndex ? 'w-8 bg-wheat-400' : 'w-2 bg-white/30'}`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Looking to Import, Export or Source in Bulk?"
        buttonText="Get a Quote"
        buttonLink="/quote"
      >
        Get in touch with our team for bulk orders, export enquiries, or custom packaging requirements.
      </CTABanner>

      {/* Contact Quick Info */}
      <section className="bg-rice-50 py-12">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Reveal>
              <div className="card flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">Visit Us</div>
                  <div className="text-sm text-charcoal-600">{companyInfo.address}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-wheat-100 text-wheat-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">Call Us</div>
                  <div className="text-sm text-charcoal-600">{companyInfo.phone}</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="card flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-terracotta-100 text-terracotta-600">
                  <Ship className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">Export Enquiries</div>
                  <div className="text-sm text-charcoal-600">{companyInfo.email}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
