import { PageHero } from '@/components/Shared';
import { companyInfo } from '@/data/catalog';
import { Reveal } from '@/components/Reveal';
import { Link } from '@/context/RouteContext';

interface LegalPageProps {
  title: string;
  eyebrow: string;
  sections: { heading: string; body: string }[];
  image?: string;
}

function LegalPageLayout({ title, eyebrow, sections, image }: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        image={image || 'https://images.pexels.com/photos/4224259/pexels-photo-4224259.jpeg?auto=compress&cs=tinysrgb&w=1920'}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: title }]}
      />
      <section className="section-pad bg-rice-50">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="card p-8 lg:p-12">
                <div className="prose prose-sm max-w-none">
                  {sections.map((section, i) => (
                    <div key={i} className="mb-8 last:mb-0">
                      <h2 className="font-serif text-xl font-bold text-charcoal-700">{section.heading}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-charcoal-500 whitespace-pre-line">{section.body}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-xl2 bg-rice-100 p-4 text-sm text-charcoal-500">
                  For any questions regarding this policy, please contact us at <a href={`mailto:${companyInfo.email}`} className="font-semibold text-field-600">{companyInfo.email}</a> or call <a href={`tel:${companyInfo.phone}`} className="font-semibold text-field-600">{companyInfo.phone}</a>.
                </div>
                <Link to="/" className="btn-ghost mt-6">← Back to Home</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicyPage() {
  return <LegalPageLayout title="Privacy Policy" eyebrow="Legal" sections={[
    { heading: 'Introduction', body: `KISAN MITRA RICE TRADING PRIVATE LIMITED ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.` },
    { heading: 'Information We Collect', body: `We collect the following types of information:\n\n• Personal Information: Name, email address, phone number, company name, and delivery address when you place an order or request a quote.\n• Order Information: Product selections, quantities, pack sizes, and order history.\n• Communication Data: Messages you send us via contact forms, email, or WhatsApp.\n• Usage Data: Pages visited, time spent on pages, and other analytics data.` },
    { heading: 'How We Use Your Information', body: `We use your information to:\n\n• Process and deliver your orders\n• Respond to your quote requests and enquiries\n• Provide customer support\n• Send order confirmations and delivery updates\n• Improve our website and services\n• Send newsletters (only if you have opted in)` },
    { heading: 'Third-Party Sharing', body: `We do not sell or rent your personal information to third parties. We may share your information only with:\n\n• Delivery partners for order fulfillment\n• Payment processors (if applicable)\n• Regulatory authorities when required by law\n\nAll third parties are bound by confidentiality obligations.` },
    { heading: 'Cookies', body: `We use cookies to enhance your browsing experience and analyse website traffic. You can manage your cookie preferences through your browser settings. See our Cookie Policy for more details.` },
    { heading: 'Data Security', body: `We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. Access to your personal information is restricted to authorised personnel only.` },
    { heading: 'Your Rights', body: `You have the right to:\n\n• Access your personal information\n• Correct inaccurate information\n• Request deletion of your data\n• Opt out of marketing communications\n• Withdraw consent at any time\n\nTo exercise these rights, contact us at ${companyInfo.email}.` },
    { heading: 'Grievance Officer', body: `For any privacy-related grievances, please contact our Grievance Officer at ${companyInfo.email} or ${companyInfo.phone}. We acknowledge complaints within 48 hours and resolve them within 30 days.` },
  ]} />;
}

export function TermsPage() {
  return <LegalPageLayout title="Terms & Conditions" eyebrow="Legal" sections={[
    { heading: 'Acceptance of Terms', body: `By accessing and using this website, you accept and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.` },
    { heading: 'Use of Website', body: `You agree to use this website only for lawful purposes. You must not misuse the website by introducing viruses, attempting to gain unauthorised access, or interfering with its normal operation.` },
    { heading: 'Orders & Acceptance', body: `All orders placed through this website are subject to acceptance by KISAN MITRA RICE TRADING PRIVATE LIMITED. We reserve the right to decline or cancel any order at our discretion. Order confirmation does not guarantee availability; we will contact you if any item is unavailable.` },
    { heading: 'Pricing & Availability', body: `All prices are listed in Indian Rupees (₹) and are subject to change without notice. While we strive for accuracy, pricing errors or availability changes may occur. We will notify you of any discrepancies before processing your order.` },
    { heading: 'Payment', body: `Orders placed through this website are fulfilled on a Cash on Delivery (COD) basis. Payment must be made in cash at the time of delivery. We do not currently accept online payments, UPI, cards, or wallets through this website.` },
    { heading: 'Intellectual Property', body: `All content on this website, including text, images, logos, and design, is the property of KISAN MITRA RICE TRADING PRIVATE LIMITED and is protected by intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.` },
    { heading: 'Limitation of Liability', body: `KISAN MITRA RICE TRADING PRIVATE LIMITED shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our products. Our maximum liability shall not exceed the value of the order in question.` },
    { heading: 'Governing Law', body: `These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Gondia, Maharashtra, India.` },
  ]} />;
}

export function DisclaimerPage() {
  return <LegalPageLayout title="Disclaimer" eyebrow="Legal" sections={[
    { heading: 'Product Images', body: `Product images displayed on this website are representative and for illustration purposes only. Actual products may vary slightly in colour, texture, packaging, or appearance due to photographic lighting, screen settings, or natural variations in agricultural produce.` },
    { heading: 'Seasonal Availability', body: `Agricultural produce is subject to seasonal availability. Some products may not be available year-round or may have varying supply quantities depending on harvest cycles and weather conditions.` },
    { heading: 'Product Specifications', body: `Specifications such as grain length, broken percentage, and moisture content are indicative ranges based on typical batches. Actual values may vary slightly between batches while remaining within acceptable quality standards.` },
    { heading: 'Third-Party Logistics', body: `KISAN MITRA RICE TRADING PRIVATE LIMITED is not liable for delays caused by third-party logistics providers, shipping companies, or customs authorities. We strive to ensure timely delivery but cannot guarantee specific delivery dates for international shipments.` },
    { heading: 'Pricing Information', body: `Prices displayed on this website are indicative retail prices. Actual prices for bulk orders, export enquiries, and custom packaging may differ. Please request a quote for accurate pricing.` },
    { heading: 'No Warranty', body: `While we take every care to provide accurate information, we make no warranties or representations regarding the completeness or accuracy of the information on this website.` },
  ]} />;
}

export function CookiePolicyPage() {
  return <LegalPageLayout title="Cookie Policy" eyebrow="Legal" sections={[
    { heading: 'What Are Cookies', body: `Cookies are small text files stored on your device when you visit a website. They help the website remember your actions and preferences over a period of time.` },
    { heading: 'Types of Cookies We Use', body: `We use the following types of cookies:\n\n• Essential Cookies: Required for the website to function correctly (e.g., shopping cart, cookie consent).\n• Analytics Cookies: Help us understand how visitors use our website so we can improve it.\n• Preference Cookies: Remember your settings and choices (e.g., language, region).` },
    { heading: 'Managing Cookies', body: `You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Disabling essential cookies may affect website functionality.` },
    { heading: 'Third-Party Cookie Tools', body: `We may use third-party analytics tools such as Google Analytics that use cookies to collect anonymous usage data. These tools have their own privacy policies governing the use of this data.` },
    { heading: 'Updates to This Policy', body: `We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.` },
  ]} />;
}

export function ShippingPage() {
  return <LegalPageLayout title="Shipping & Delivery Policy" eyebrow="Legal" sections={[
    { heading: 'Delivery Timelines', body: `Domestic orders are typically delivered within 5–7 business days from dispatch. Remote areas may take 7–10 business days. International/export delivery timelines vary by destination and shipping method (15–30 days for sea freight, 5–10 days for air freight).` },
    { heading: 'Payment Method', body: `All orders placed through this website are on a Cash on Delivery (COD) basis. Payment must be made in cash to the delivery agent at the time of receiving your order.` },
    { heading: 'Packaging Standards', body: `All products are packed in compliance with food safety standards. We use PP bags, jute bags, vacuum packs, and retail pouches depending on the product and pack size. Export orders include additional protective packaging for international transit.` },
    { heading: 'Delivery Partners', body: `We partner with reputed domestic and international logistics providers to ensure reliable delivery. You will receive tracking information once your order is dispatched.` },
    { heading: 'Undeliverable / Return-to-Origin', body: `If a delivery is unsuccessful due to an incorrect address, the customer being unavailable, or refusal to accept the delivery, the order will be returned to our facility. We will contact you to arrange re-delivery or cancellation. Additional shipping charges may apply for re-delivery.` },
    { heading: 'Order Tracking', body: `Once your order is dispatched, you will receive a tracking number via email or SMS. You can use this to track your delivery status online.` },
  ]} />;
}

export function RefundPage() {
  return <LegalPageLayout title="Cancellation & Refund Policy" eyebrow="Legal" sections={[
    { heading: 'Cancellation Window', body: `Orders can be cancelled free of charge before dispatch. To cancel an order, please contact us at ${companyInfo.email} or ${companyInfo.phone} with your order number. Once an order has been dispatched, cancellation is not possible.` },
    { heading: 'Non-Cancellable After Dispatch', body: `For perishable items and agricultural produce, orders cannot be cancelled once dispatched. This is due to the nature of the products and the logistics involved in returning them.` },
    { heading: 'Refund Policy (COD Orders)', body: `Since all orders through this website are Cash on Delivery, no advance payment is collected. Therefore, refunds are not applicable for COD orders unless:\n\n• The wrong product was delivered\n• The product arrived damaged or spoiled\n• There was a packaging or quality issue` },
    { heading: 'Replacement Policy', body: `If you receive a damaged, spoiled, or incorrect product, please contact us within 48 hours of delivery with photographic evidence. We will arrange a free replacement at no additional cost. Replacements are typically dispatched within 3–5 business days.` },
    { heading: 'Refund Timeline', body: `For any applicable refunds (e.g., prepaid bulk orders), refunds are processed within 7–10 business days to the original payment method.` },
    { heading: 'How to Request', body: `To request a cancellation, replacement, or refund, please contact us at ${companyInfo.email} or ${companyInfo.phone}. Include your order number, a description of the issue, and supporting photographs if applicable.` },
  ]} />;
}

export function CareersPage() {
  return <LegalPageLayout title="Careers" eyebrow="Support" sections={[
    { heading: 'Join Our Team', body: `At KISAN MITRA RICE TRADING PRIVATE LIMITED, we believe in building a team that shares our passion for agriculture, quality, and farmer welfare. We are always looking for talented individuals who want to make a difference in the agri-commodity trading space.` },
    { heading: 'Company Culture', body: `We foster a culture of integrity, collaboration, and continuous learning. Our team members work closely with farmers, processing units, and international clients — gaining exposure to the full agri-commodity value chain. We value transparency, fair practices, and a farmer-first approach in everything we do.` },
    { heading: 'Current Openings', body: `No current openings — check back soon! We post new positions as they become available. Follow us on social media for updates.` },
    { heading: 'How to Apply', body: `To apply or express interest in future opportunities, please email your resume and a brief cover letter to careers@kisanmitrarice.com. Include the role or area of interest in the subject line. We keep all applications on file and reach out when relevant positions open up.` },
  ]} />;
}

export function GrievancePage() {
  return <LegalPageLayout title="Grievance / Compliance" eyebrow="Support" sections={[
    { heading: 'Grievance Redressal', body: `KISAN MITRA RICE TRADING PRIVATE LIMITED is committed to addressing grievances in a fair and timely manner, in compliance with the Consumer Protection (E-Commerce) Rules, 2020 and applicable Indian laws.` },
    { heading: 'Grievance Officer', body: `Name: [To be updated]\nDesignation: Grievance Officer\nEmail: grievance@kisanmitrarice.com\nPhone: ${companyInfo.phone}\nAddress: ${companyInfo.address}` },
    { heading: 'Escalation Process', body: `Step 1: Contact our customer support team at ${companyInfo.email} or ${companyInfo.phone}.\nStep 2: If unresolved, escalate to the Grievance Officer at grievance@kisanmitrarice.com.\nStep 3: If still unresolved, you may approach the appropriate consumer forum as per applicable law.` },
    { heading: 'Response Time', body: `We acknowledge all grievances within 48 hours of receipt. We aim to resolve all complaints within 30 days. Complex cases may take longer, and we will keep you informed of the progress.` },
    { heading: 'Compliance', body: `We comply with all applicable Indian laws and regulations, including but not limited to the Consumer Protection Act, 2019, the Food Safety and Standards Act, 2006, and the Digital Personal Data Protection Act, 2023.` },
  ]} />;
}
