import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { PageHero } from '@/components/Shared';
import { categories, companyInfo } from '@/data/catalog';
import { Send, CheckCircle2, Clock, Phone, MessageCircle, ShieldCheck, FileText, Truck } from 'lucide-react';

export function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', country: '', category: '', product: '', quantity: '', packaging: '', delivery: '', notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const trustPoints = [
    { icon: Clock, title: 'Fast Response', desc: 'Average response time within 24 hours' },
    { icon: ShieldCheck, title: 'Quality Assured', desc: 'FSSAI-compliant, lab-tested products' },
    { icon: FileText, title: 'Complete Documentation', desc: 'COO, phytosanitary, fumigation certs' },
    { icon: Truck, title: 'Reliable Delivery', desc: 'Domestic & international shipping' },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get a Quote"
        title="Request a Bulk Quote"
        subtitle="Fill out the form below with your requirements and our team will provide a customised quote within 24 hours."
        image="https://images.pexels.com/photos/21958122/pexels-photo-21958122.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Get a Quote' }]}
      />

      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="card p-8">
                  {submitted && (
                    <div className="mb-6 flex items-center gap-2 rounded-xl2 bg-field-50 p-4 text-sm text-field-600">
                      <CheckCircle2 className="h-5 w-5" /> Thank you! Your quote request has been submitted. Our team will contact you within 24 hours.
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label-field" htmlFor="name">Full Name *</label>
                        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="input-field" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="company">Company Name</label>
                        <input id="company" name="company" type="text" value={form.company} onChange={handleChange} className="input-field" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label-field" htmlFor="email">Email *</label>
                        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="input-field" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="phone">Phone *</label>
                        <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="input-field" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label-field" htmlFor="country">Country</label>
                        <input id="country" name="country" type="text" value={form.country} onChange={handleChange} className="input-field" placeholder="For export enquiries" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="category">Product Category *</label>
                        <select id="category" name="category" required value={form.category} onChange={handleChange} className="input-field cursor-pointer">
                          <option value="">Select a category</option>
                          {categories.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label-field" htmlFor="product">Specific Product(s)</label>
                        <input id="product" name="product" type="text" value={form.product} onChange={handleChange} className="input-field" placeholder="e.g., Basmati Rice, Toor Dal" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="quantity">Quantity Required *</label>
                        <input id="quantity" name="quantity" type="text" required value={form.quantity} onChange={handleChange} className="input-field" placeholder="e.g., 500 kg, 10 MT" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label-field" htmlFor="packaging">Packaging Preference</label>
                        <input id="packaging" name="packaging" type="text" value={form.packaging} onChange={handleChange} className="input-field" placeholder="e.g., 25kg PP bags, 50kg jute" />
                      </div>
                      <div>
                        <label className="label-field" htmlFor="delivery">Delivery Location</label>
                        <input id="delivery" name="delivery" type="text" value={form.delivery} onChange={handleChange} className="input-field" placeholder="City, State / Country" />
                      </div>
                    </div>
                    <div>
                      <label className="label-field" htmlFor="notes">Additional Notes</label>
                      <textarea id="notes" name="notes" rows={4} value={form.notes} onChange={handleChange} className="input-field resize-none" placeholder="Any specific requirements, quality grades, or delivery timelines" />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      <Send className="h-4 w-4" /> Submit Quote Request
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            {/* Sidebar */}
            <Reveal delay={150}>
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="font-serif text-xl font-bold text-charcoal-700">Why Request a Quote With Us?</h3>
                  <div className="mt-4 space-y-4">
                    {trustPoints.map(point => (
                      <div key={point.title} className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                          <point.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-charcoal-700">{point.title}</div>
                          <div className="text-xs text-charcoal-500">{point.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card p-6 bg-field-600 text-white">
                  <h3 className="font-serif text-lg font-bold text-white">Prefer to Talk Directly?</h3>
                  <p className="mt-2 text-sm text-rice-200">Call or WhatsApp us for immediate assistance.</p>
                  <a href={`tel:${companyInfo.phone}`} className="btn mt-4 w-full bg-wheat-500 text-charcoal-800 hover:bg-wheat-400">
                    <Phone className="h-4 w-4" /> {companyInfo.phone}
                  </a>
                  <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn mt-2 w-full bg-[#25D366] text-white hover:opacity-90">
                    <MessageCircle className="h-4 w-4" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
