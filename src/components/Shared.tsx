import { type ReactNode } from 'react';
import { Link } from '@/context/RouteContext';
import { ChevronRight } from 'lucide-react';
import { companyInfo } from '@/data/catalog';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs?: { label: string; to?: string }[];
}

export function PageHero({ eyebrow, title, subtitle, image, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[40vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-field-800/90 via-field-700/80 to-field-600/70" />
      </div>
      <div className="container-page relative z-10 py-16">
        {breadcrumbs && (
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-rice-200">
            {breadcrumbs.map((bc, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {bc.to ? (
                  <Link to={bc.to} className="transition-colors hover:text-wheat-400">{bc.label}</Link>
                ) : (
                  <span className="text-wheat-400">{bc.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow text-wheat-400">{eyebrow}</p>}
        <h1 className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-rice-100">{subtitle}</p>}
      </div>
    </section>
  );
}

interface CTABannerProps {
  title: string;
  buttonText: string;
  buttonLink: string;
  children?: ReactNode;
}

export function CTABanner({ title, buttonText, buttonLink, children }: CTABannerProps) {
  return (
    <section className="bg-field-600 py-16">
      <div className="container-page text-center">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        {children && <p className="mx-auto mt-3 max-w-2xl text-rice-100">{children}</p>}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link to={buttonLink} className="btn-primary">{buttonText}</Link>
          <a href={`tel:${companyInfo.phone}`} className="btn border-2 border-wheat-400 text-wheat-400 hover:bg-wheat-400 hover:text-field-700">
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, center }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'mx-auto max-w-2xl text-center' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-serif text-3xl font-bold text-charcoal-700 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-charcoal-500">{subtitle}</p>}
    </div>
  );
}
