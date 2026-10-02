import { Reveal } from '@/components/Reveal';
import { PageHero, CTABanner, SectionHeading } from '@/components/Shared';
import { qualityControlSteps, labParameters, certifications } from '@/data/catalog';
import { Search, Wind, FlaskConical, Factory, Package, Truck, ShieldCheck, Award, BadgeCheck, FileText, Leaf, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, typeof Search> = { Search, Wind, FlaskConical, Factory, Package, Truck, ShieldCheck, Award, BadgeCheck, FileText };

export function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="Quality You Can Measure, Trust You Can Rely On"
        subtitle="Our commitment to food safety, traceability, and consistency is backed by rigorous lab testing at every stage."
        image="https://images.pexels.com/photos/8540029/pexels-photo-8540029.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Quality' }]}
      />

      {/* Quality Philosophy */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow">Our Philosophy</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-charcoal-700 sm:text-4xl">A Culture of Quality</h2>
              <p className="mt-4 text-charcoal-500">
                At KISAN MITRA RICE TRADING, quality is not an afterthought — it is the foundation of everything we do. From the farms we source from to the containers we ship, every step is guided by our commitment to food safety, traceability, and consistency. We believe that trust is built grain by grain, batch by batch, shipment by shipment.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QC Process Timeline */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <SectionHeading center eyebrow="Our Process" title="Quality Control Process" subtitle="Six stages of inspection and testing ensure every product meets our standards." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {qualityControlSteps.map((step, i) => {
              const Icon = iconMap[step.icon] || Search;
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="card card-hover relative h-full p-6">
                    <div className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-wheat-500 font-serif text-xs font-bold text-charcoal-800">
                      {i + 1}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal-700">{step.title}</h3>
                    <p className="mt-2 text-sm text-charcoal-500">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <SectionHeading center eyebrow="Compliance" title="Certifications & Compliance" subtitle="We operate under the regulatory frameworks required for domestic and international trade." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, i) => {
              const Icon = iconMap[cert.icon] || ShieldCheck;
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="card card-hover p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl2 bg-wheat-100 text-wheat-600">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 font-serif text-base font-semibold text-charcoal-700">{cert.name}</h3>
                    <p className="mt-1 text-xs text-charcoal-400">{cert.number}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lab Testing Parameters */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <SectionHeading center eyebrow="Lab Testing" title="Testing Parameters" subtitle="Every batch is tested against these key quality parameters." />
          <Reveal>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl2 shadow-card">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-field-600 text-left text-white">
                    <th className="px-6 py-4 text-sm font-semibold">Parameter</th>
                    <th className="px-6 py-4 text-sm font-semibold">Standard</th>
                    <th className="px-6 py-4 text-sm font-semibold">Test Method</th>
                  </tr>
                </thead>
                <tbody>
                  {labParameters.map((row, i) => (
                    <tr key={row.parameter} className={i % 2 === 0 ? 'bg-rice-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-charcoal-700">{row.parameter}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-500">{row.standard}</td>
                      <td className="px-6 py-4 text-sm text-charcoal-500">{row.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sustainability */}
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-xl2 shadow-card">
                <img src="https://images.pexels.com/photos/11070641/pexels-photo-11070641.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Farmer in field" className="aspect-[4/3] w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                  <Leaf className="h-7 w-7" />
                </div>
                <h2 className="mt-4 font-serif text-3xl font-bold text-charcoal-700">Sustainability & Farmer Welfare</h2>
                <p className="mt-4 text-charcoal-500">
                  We believe that sustainable agriculture starts with fair sourcing. Our direct farmer and FPO tie-ups ensure that the people who grow our food receive fair compensation for their produce.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    'Fair pricing for farmers across the Vidarbha rice belt',
                    'Support for local farming communities in Gondia region',
                    'Quality-first procurement that rewards good farming practices',
                    'Long-term partnerships with Farmer Producer Organisations',
                  ].map(point => (
                    <div key={point} className="flex items-center gap-2 text-sm text-charcoal-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-field-500" /> {point}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad bg-rice-100">
        <div className="container-page">
          <SectionHeading center eyebrow="Gallery" title="Inside Our Quality Operations" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { img: 'https://images.pexels.com/photos/8540029/pexels-photo-8540029.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'QC Lab' },
              { img: 'https://images.pexels.com/photos/11589239/pexels-photo-11589239.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Testing Equipment' },
              { img: 'https://images.pexels.com/photos/21958122/pexels-photo-21958122.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Packed Goods' },
              { img: 'https://images.pexels.com/photos/14020705/pexels-photo-14020705.jpeg?auto=compress&cs=tinysrgb&w=940', label: 'Ready for Dispatch' },
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
        title="Have Questions About Our Quality Standards?"
        buttonText="Contact Us"
        buttonLink="/contact"
      >
        Our team is ready to share detailed quality reports and certification details.
      </CTABanner>
    </>
  );
}
