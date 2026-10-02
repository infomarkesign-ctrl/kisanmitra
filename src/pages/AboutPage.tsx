import { Reveal } from '@/components/Reveal';
import { PageHero, CTABanner, SectionHeading } from '@/components/Shared';
import { companyInfo, companySnapshot, milestones, natureOfBusiness } from '@/data/catalog';
import { Target, Eye, MapPin, Calendar, Building2, FileText, Award, Sprout } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Rooted in Trust, Growing Globally"
        subtitle="From the Rice Bowl of Maharashtra to markets across the world — discover the story of KISAN MITRA RICE TRADING."
        image="https://images.pexels.com/photos/11070641/pexels-photo-11070641.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      {/* Our Story */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-xl2 shadow-card">
                <img
                  src="https://images.pexels.com/photos/30400839/pexels-photo-30400839.jpeg?auto=compress&cs=tinysrgb&w=1920"
                  alt="Farmer in rice field"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <p className="eyebrow">Our Story</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-charcoal-700 sm:text-4xl">From Gondia to the World</h2>
                <div className="mt-4 space-y-4 text-charcoal-500">
                  <p>
                    KISAN MITRA RICE TRADING PRIVATE LIMITED was founded in Gondia, Maharashtra — a region historically celebrated as the "Rice Bowl of Maharashtra" for its rich paddy cultivation heritage. Our mission is to bridge the gap between Indian farmers and global markets.
                  </p>
                  <p>
                    What began as a rice trading enterprise has grown into a comprehensive agri-commodity house, offering 50+ products across 7 categories. We source directly from farmers and FPOs, process in our own facility, pack to specification, and export to 15+ countries.
                  </p>
                  <p>
                    Our name — "Kisan Mitra" or "Farmer's Friend" — reflects our farmer-first philosophy. We believe fair sourcing practices and quality-first processing are the foundations of a sustainable agri-trading business.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-bold text-charcoal-700">Our Mission</h3>
                <p className="mt-3 text-charcoal-500">
                  To deliver quality agricultural produce with integrity, efficiency, and farmer-first sourcing — connecting Indian farms to global markets while maintaining the highest standards of quality and service.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="card h-full p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-wheat-100 text-wheat-600">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-bold text-charcoal-700">Our Vision</h3>
                <p className="mt-3 text-charcoal-500">
                  To become a globally recognized name in agri-commodity trading, import-export, and processing — known for quality, transparency, and our commitment to farmer welfare and customer satisfaction.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Nature of Business */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <SectionHeading center eyebrow="Business Scope" title="Nature of Business" />
              <div className="card p-8">
                <p className="text-lg leading-relaxed text-charcoal-600">{natureOfBusiness}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Company Snapshot */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <SectionHeading center eyebrow="Company Details" title="Company Snapshot" />
          <Reveal>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl2 shadow-card">
              <table className="w-full bg-white">
                <tbody>
                  {companySnapshot.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-rice-50' : 'bg-white'}>
                      <td className="w-1/3 px-6 py-4 text-sm font-semibold text-charcoal-700">{row.label}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-500">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <SectionHeading center eyebrow="Our Journey" title="Milestones" />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-field-200 sm:left-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className="hidden sm:block sm:w-1/2" />
                    <div className="absolute left-4 top-2 z-10 h-3 w-3 rounded-full bg-wheat-500 ring-4 ring-rice-50 sm:left-1/2 sm:-translate-x-1/2" />
                    <div className="flex-1 pl-12 sm:pl-0 sm:w-1/2">
                      <div className={`card p-5 ${i % 2 === 0 ? 'sm:mr-8' : 'sm:ml-8'}`}>
                        <span className="inline-block rounded-full bg-wheat-100 px-3 py-1 text-xs font-bold text-wheat-700">{m.year}</span>
                        <h3 className="mt-2 font-serif text-lg font-semibold text-charcoal-700">{m.title}</h3>
                        <p className="mt-1 text-sm text-charcoal-500">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <SectionHeading center eyebrow="Infrastructure" title="Our Facilities" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { img: 'https://images.pexels.com/photos/34718922/pexels-photo-34718922.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Processing Unit' },
              { img: 'https://images.pexels.com/photos/21958122/pexels-photo-21958122.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Warehouse & Storage' },
              { img: 'https://images.pexels.com/photos/8540029/pexels-photo-8540029.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Quality Lab' },
              { img: 'https://images.pexels.com/photos/14020705/pexels-photo-14020705.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Loading & Dispatch' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card card-hover overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={f.img} alt={f.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-sm font-semibold text-charcoal-700">{f.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Partner With Us"
        buttonText="Get a Quote"
        buttonLink="/quote"
      >
        Whether you're looking to source, import, export, or trade agri-commodities, we're here to help.
      </CTABanner>
    </>
  );
}
