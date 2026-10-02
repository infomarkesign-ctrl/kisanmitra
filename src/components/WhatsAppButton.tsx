import { companyInfo } from '@/data/catalog';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${companyInfo.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  );
}
