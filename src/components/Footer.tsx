import { Link } from '@/context/RouteContext';
import { companyInfo, categories } from '@/data/catalog';
import { MapPin, Phone, Mail, Clock, Linkedin, Instagram, Facebook, Youtube, ShieldCheck, Award, BadgeCheck, FileText } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'What We Do', to: '/what-we-do' },
  { label: 'Quality', to: '/quality' },
  { label: 'Why Choose Us', to: '/why-choose-us' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Get a Quote', to: '/quote' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-conditions' },
  { label: 'Disclaimer', to: '/disclaimer' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
  { label: 'Shipping & Delivery', to: '/shipping-delivery' },
  { label: 'Cancellation & Refund', to: '/cancellation-refund' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Careers', to: '/careers' },
  { label: 'Grievance / Compliance', to: '/grievance' },
];

const certBadges = [
  { icon: ShieldCheck, label: 'FSSAI' },
  { icon: Award, label: 'APEDA' },
  { icon: BadgeCheck, label: 'ISO 22000' },
  { icon: FileText, label: 'GST' },
];

export function Footer() {
  return (
    <footer className="bg-field-700 text-rice-100">
      {/* Newsletter strip */}
      <div className="border-b border-field-600">
        <div className="container-page py-10">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div>
              <h3 className="font-serif text-xl text-white">Get updates on new arrivals & export opportunities</h3>
              <p className="mt-1 text-sm text-rice-200">Subscribe to our newsletter for agri-market insights and product updates.</p>
            </div>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl2 border border-field-500 bg-field-800 px-4 py-3 text-sm text-white placeholder-rice-300 focus:border-wheat-400 focus:outline-none"
              />
              <button type="submit" className="btn-primary shrink-0">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.svg" alt="KISAN MITRA RICE TRADING logo" className="h-10 w-10 shrink-0" />
              <div className="leading-tight">
                <div className="font-serif text-base font-bold text-white">KISAN MITRA</div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-wheat-400">Rice Trading</div>
              </div>
            </div>
            <p className="mb-4 text-sm italic text-rice-200">"From Farm to World — Trusted Agri Trading Partner"</p>
            <p className="text-sm font-semibold text-white">{companyInfo.legalName}</p>
            <div className="mt-3 space-y-2 text-sm text-rice-200">
              <p className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-wheat-400 mt-0.5" /> {companyInfo.address}</p>
              <p className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-wheat-400" /> {companyInfo.phone}</p>
              <p className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-wheat-400" /> {companyInfo.email}</p>
              <p className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-wheat-400" /> {companyInfo.hours}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-serif text-base text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-rice-200 transition-colors hover:text-wheat-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="mb-4 font-serif text-base text-white">Product Categories</h4>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/products/${cat.slug}`} className="text-sm text-rice-200 transition-colors hover:text-wheat-400">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-serif text-base text-white">Legal & Support</h4>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-rice-200 transition-colors hover:text-wheat-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cert badges */}
        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-field-600 pt-6">
          {certBadges.map(badge => (
            <div key={badge.label} className="flex items-center gap-2 rounded-lg bg-field-800 px-3 py-2">
              <badge.icon className="h-4 w-4 text-wheat-400" />
              <span className="text-xs font-medium text-rice-200">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-field-600">
        <div className="container-page py-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-rice-300">© 2026 {companyInfo.legalName}. All Rights Reserved.</p>
            <div className="flex items-center gap-3">
              <a href={companyInfo.social.linkedin} className="flex h-8 w-8 items-center justify-center rounded-lg bg-field-800 text-rice-200 transition-colors hover:bg-wheat-500 hover:text-field-700" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={companyInfo.social.instagram} className="flex h-8 w-8 items-center justify-center rounded-lg bg-field-800 text-rice-200 transition-colors hover:bg-wheat-500 hover:text-field-700" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={companyInfo.social.facebook} className="flex h-8 w-8 items-center justify-center rounded-lg bg-field-800 text-rice-200 transition-colors hover:bg-wheat-500 hover:text-field-700" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={companyInfo.social.youtube} className="flex h-8 w-8 items-center justify-center rounded-lg bg-field-800 text-rice-200 transition-colors hover:bg-wheat-500 hover:text-field-700" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
