import { Reveal } from '@/components/Reveal';
import { PageHero, CTABanner, SectionHeading } from '@/components/Shared';
import { whyChooseUs, comparisonData } from '@/data/catalog';
import { Sprout, Factory, Globe, ShieldCheck, Package, Handshake, Check, X } from 'lucide-react';

const iconMap: Record<string, typeof Sprout> = { Sprout, Factory, Globe, ShieldCheck, Package, Handshake };

export function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="Why Businesses & Customers Choose Kisan Mitra"
        subtitle="Six reasons we are the preferred agri-commodity trading partner for businesses across India and the world."
        image="https://images.pexels.com/photos/2164437/pexels-photo-2164437.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Why Choose Us' }]}
      />

      {/* Icon Grid */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] || Sprout;
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="card card-hover h-full p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-wheat-100 text-wheat-600">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-bold text-charcoal-700">{item.title}</h3>
                    <p className="mt-3 text-sm text-charcoal-500">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <SectionHeading center eyebrow="The Difference" title="Kisan Mitra vs. Typical Traders" subtitle="See what sets us apart from the competition." />
          <Reveal>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl2 shadow-card">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-field-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-wheat-400">Kisan Mitra</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Typical Trader</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-rice-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-charcoal-700">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.kisanMitra === true ? (
                          <Check className="mx-auto h-5 w-5 text-field-500" />
                        ) : (
                          <span className="text-sm text-charcoal-500">{row.kisanMitra}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.typicalTrader === false ? (
                          <X className="mx-auto h-5 w-5 text-terracotta-400" />
                        ) : (
                          <span className="text-sm text-charcoal-400">{row.typicalTrader}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Ready to Partner With Us?"
        buttonText="Get a Quote"
        buttonLink="/quote"
      >
        Experience the Kisan Mitra difference — quality, transparency, and reliability.
      </CTABanner>
    </>
  );
}
