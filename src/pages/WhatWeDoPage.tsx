import { Reveal } from '@/components/Reveal';
import { PageHero, CTABanner, SectionHeading } from '@/components/Shared';
import { whatWeDoSections } from '@/data/catalog';
import { Link } from '@/context/RouteContext';
import { Ship, TrendingUp, Factory, Package, Sprout, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, typeof Ship> = { Ship, TrendingUp, Factory, Package, Sprout };

export function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="End-to-End Agri Commodity Solutions"
        subtitle="From sourcing at the farm to shipping across the globe — we manage every step of the agri-commodity supply chain."
        image="https://images.pexels.com/photos/14020705/pexels-photo-14020705.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'What We Do' }]}
      />

      {/* Sub-navigation */}
      <section className="bg-field-50 py-6">
        <div className="container-page">
          <div className="flex flex-wrap justify-center gap-3">
            {whatWeDoSections.map(s => (
              <Link key={s.slug} to={`/what-we-do/${s.slug}`} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal-600 shadow-soft transition-colors hover:bg-field-100 hover:text-field-600">
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      {whatWeDoSections.map((section, i) => {
        const Icon = iconMap[section.icon] || Ship;
        return (
          <section key={section.slug} id={section.slug} className={`section-pad ${i % 2 === 0 ? 'bg-rice-50' : 'bg-rice-100'}`}>
            <div className="container-page">
              <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <Reveal>
                  <div className={`overflow-hidden rounded-xl2 shadow-card ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img src={section.image} alt={section.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={150}>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-wheat-600">0{i + 1}</span>
                    </div>
                    <h2 className="mt-4 font-serif text-3xl font-bold text-charcoal-700">{section.title}</h2>
                    <p className="mt-4 text-charcoal-500">{section.desc}</p>
                    <div className="mt-6 space-y-2">
                      {section.highlights.map(h => (
                        <div key={h} className="flex items-center gap-2 text-sm text-charcoal-600">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-field-500" /> {h}
                        </div>
                      ))}
                    </div>
                    <Link to="/quote" className="btn-outline mt-6">
                      Enquire Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <CTABanner
        title="Ready to Partner With Us?"
        buttonText="Get a Quote"
        buttonLink="/quote"
      >
        Whether you need sourcing, processing, packing, trading, or export services — we've got you covered.
      </CTABanner>
    </>
  );
}

export function ServiceDetailPage({ slug }: { slug: string }) {
  const section = whatWeDoSections.find(s => s.slug === slug);
  if (!section) return null;
  const Icon = iconMap[section.icon] || Ship;
  const others = whatWeDoSections.filter(s => s.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title={section.title}
        subtitle={section.desc}
        image={section.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'What We Do', to: '/what-we-do' },
          { label: section.title },
        ]}
      />

      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="mt-5 font-serif text-3xl font-bold text-charcoal-700">{section.title}</h2>
              <p className="mt-4 text-charcoal-500">{section.desc}</p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {section.highlights.map(h => (
                  <div key={h} className="card flex items-center gap-3 p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-field-500" />
                    <span className="text-sm text-charcoal-600">{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="card p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal-700">Other Services</h3>
                <div className="mt-4 space-y-2">
                  {others.map(o => (
                    <Link key={o.slug} to={`/what-we-do/${o.slug}`} className="flex items-center justify-between rounded-xl2 px-4 py-3 text-sm text-charcoal-600 transition-colors hover:bg-rice-100 hover:text-field-600">
                      {o.title}
                      <ArrowRight className="h-4 w-4 text-wheat-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title={`Interested in Our ${section.title} Services?`}
        buttonText="Get a Quote"
        buttonLink="/quote"
      />
    </>
  );
}
