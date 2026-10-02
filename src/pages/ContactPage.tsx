import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { PageHero } from '@/components/Shared';
import { companyInfo } from '@/data/catalog';
import { MapPin, Phone, Mail, Clock, MessageCircle, Linkedin, Instagram, Facebook, Youtube, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', enquiryType: 'General', message: '',
  });

  const [disputeSubmitted, setDisputeSubmitted] = useState(false);
  const [disputeError, setDisputeError] = useState('');
  const [disputeLoading, setDisputeLoading] = useState(false);
  const [dispute, setDispute] = useState({
    email: '', subject: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', company: '', email: '', phone: '', enquiryType: 'General', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleDisputeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDispute({ ...dispute, [e.target.name]: e.target.value });
  };

  const handleDisputeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispute.email || !dispute.subject || !dispute.message) {
      setDisputeError('All fields are required');
      return;
    }

    setDisputeLoading(true);
    setDisputeError('');

    try {
      const res = await fetch(`${API_URL}/api/contact/dispute`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dispute),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setDisputeSubmitted(true);
      setDispute({ email: '', subject: '', message: '' });
      setTimeout(() => setDisputeSubmitted(false), 5000);
    } catch (err) {
      setDisputeError(err instanceof Error ? err.message : 'Failed to submit dispute');
    } finally {
      setDisputeLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Talk Business"
        subtitle="Have a question, need a quote, or want to discuss a partnership? We're here to help."
        image="https://images.pexels.com/photos/4224259/pexels-photo-4224259.jpeg?auto=compress&cs=tinysrgb&w=1920"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
      />

      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form */}
            <Reveal>
              <div className="card p-8">
                <h2 className="font-serif text-2xl font-bold text-charcoal-700">Send Us a Message</h2>
                <p className="mt-2 text-sm text-charcoal-500">Fill out the form below and our team will get back to you within 24 hours.</p>
                {submitted && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl2 bg-field-50 p-4 text-sm text-field-600">
                    <CheckCircle2 className="h-5 w-5" /> Thank you! Your message has been sent. We'll be in touch shortly.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label-field" htmlFor="name">Name *</label>
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
                  <div>
                    <label className="label-field" htmlFor="enquiryType">Enquiry Type</label>
                    <select id="enquiryType" name="enquiryType" value={form.enquiryType} onChange={handleChange} className="input-field cursor-pointer">
                      <option>General</option>
                      <option>Bulk Order</option>
                      <option>Export Enquiry</option>
                      <option>Career</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-field" htmlFor="message">Message *</label>
                    <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className="input-field resize-none" />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              </div>
            </Reveal>

            {/* Contact Details */}
            <Reveal delay={150}>
              <div className="space-y-6">
                <div className="card p-8">
                  <h2 className="font-serif text-2xl font-bold text-charcoal-700">Contact Details</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">Address</div>
                        <div className="text-sm text-charcoal-600">{companyInfo.address}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl2 bg-wheat-100 text-wheat-600">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">Phone</div>
                        <div className="text-sm text-charcoal-600">{companyInfo.phone}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl2 bg-terracotta-100 text-terracotta-600">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">Email</div>
                        <div className="text-sm text-charcoal-600">{companyInfo.email}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl2 bg-field-100 text-field-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">Business Hours</div>
                        <div className="text-sm text-charcoal-600">{companyInfo.hours}</div>
                      </div>
                    </div>
                  </div>
                  <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn mt-6 w-full bg-[#25D366] text-white hover:opacity-90">
                    <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                  </a>
                  <div className="mt-4 flex gap-3">
                    <a href={companyInfo.social.linkedin} className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-field-100 text-field-600 transition-colors hover:bg-field-500 hover:text-white" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                    <a href={companyInfo.social.instagram} className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-field-100 text-field-600 transition-colors hover:bg-field-500 hover:text-white" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
                    <a href={companyInfo.social.facebook} className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-field-100 text-field-600 transition-colors hover:bg-field-500 hover:text-white" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
                    <a href={companyInfo.social.youtube} className="flex h-10 w-10 items-center justify-center rounded-xl2 bg-field-100 text-field-600 transition-colors hover:bg-field-500 hover:text-white" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
                  </div>
                </div>

                {/* Map */}
                <div className="card overflow-hidden">
                  <iframe
                    title="Kisan Mitra Rice Trading Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.1!2d80.2!3d21.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI3JzM2MC4wIk4gODDCsDEyJzAwLjAiRQ!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dispute Section */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <Reveal>
            <div className="mb-12 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-terracotta-100">
                  <AlertCircle className="h-8 w-8 text-terracotta-600" />
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-terracotta-600 mb-2">Dispute Resolution</p>
              <h2 className="font-serif text-3xl font-bold text-charcoal-700 mb-4">Report a Dispute</h2>
              <p className="text-charcoal-600 max-w-2xl mx-auto">
                If you have an issue with your order or need to report a dispute, please fill out the form below and our team will investigate promptly.
              </p>
            </div>

            <div className="max-w-2xl mx-auto card p-8">
              {disputeSubmitted && (
                <div className="mb-6 flex items-center gap-3 rounded-xl2 bg-field-50 p-4 text-sm text-field-600">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  Thank you! Your dispute has been submitted. We'll contact you within 24 hours.
                </div>
              )}

              {disputeError && (
                <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl2">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{disputeError}</p>
                </div>
              )}

              <form onSubmit={handleDisputeSubmit} className="space-y-4">
                <div>
                  <label className="label-field" htmlFor="dispute-email">Your Email *</label>
                  <input
                    id="dispute-email"
                    name="email"
                    type="email"
                    required
                    value={dispute.email}
                    onChange={handleDisputeChange}
                    placeholder="your@email.com"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label-field" htmlFor="dispute-subject">Subject *</label>
                  <input
                    id="dispute-subject"
                    name="subject"
                    type="text"
                    required
                    value={dispute.subject}
                    onChange={handleDisputeChange}
                    placeholder="Briefly describe the issue"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label-field" htmlFor="dispute-message">Message *</label>
                  <textarea
                    id="dispute-message"
                    name="message"
                    rows={5}
                    required
                    value={dispute.message}
                    onChange={handleDisputeChange}
                    placeholder="Please provide detailed information about your dispute..."
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={disputeLoading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {disputeLoading ? 'Submitting...' : 'Submit Dispute'}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-rice-200">
                <p className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-4">Email for disputes:</p>
                <a href="mailto:dispute@kisanmitratrading.store" className="text-terracotta-600 font-bold hover:text-terracotta-700">
                  dispute@kisanmitratrading.store
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
