import './InfoCards.css';

const D = () => <div className="ic-divider" />;
const E = ({ children }) => <a href="mailto:support@queenveloura.shop" style={{color:'var(--champagne)'}}>{children || 'support@queenveloura.shop'}</a>;

const CARDS = {
  guarantee: {
    icon: '🛡️', title: 'Quality Guarantee', scroll: false,
    content: (<>
      <strong>Every Veloura wig is covered by our 90-day Quality Guarantee.</strong><D/>
      <ul>
        <li><strong>Shedding free</strong> — minimal to zero shedding guaranteed for 90 days from delivery.</li>
        <li><strong>Lace integrity</strong> — HD lace will not split, fray, or discolour under normal wear.</li>
        <li><strong>Hair quality</strong> — 100% raw human hair, no synthetic blending. If otherwise, full replacement guaranteed.</li>
        <li><strong>Construction</strong> — double-weft stitching and hand-tied knots. Any defect is covered.</li>
      </ul>
      <D/>Contact us at <E/> within 90 days for a free replacement or full refund — no questions asked.
    </>),
  },
  returns: {
    icon: '↩️', title: 'Returns Policy', scroll: false,
    content: (<>
      <strong>Hassle-free returns within 30 days of delivery.</strong><D/>
      <ul>
        <li><strong>Unworn & unaltered</strong> — wig must be in original condition with lace uncut and tags attached.</li>
        <li><strong>30-day window</strong> — returns after 30 days cannot be accepted.</li>
        <li><strong>Free return shipping</strong> — we cover return postage for UK and US orders.</li>
        <li><strong>Refund timeline</strong> — processed within 5 business days of receiving the return.</li>
        <li><strong>Exchanges welcome</strong> — different length or colour? We'll exchange at no extra cost.</li>
      </ul>
      <D/>Email <E/> with your order number and reason.
    </>),
  },
  returnsFullOverlay: {
    icon: '↩️', title: 'Returns & Refunds', scroll: true,
    content: (<>
      <strong>Last Updated: March 19, 2026 · Queen Veloura</strong><br/>
      Due to the nature of human hair products, all sales are generally final. However, we accept returns under the following conditions.<D/>
      <strong>Eligible Returns</strong>
      <ul>
        <li>Item is <strong>unused</strong> and unaltered</li>
        <li>Original packaging and ties intact, lace uncut, tags attached</li>
        <li>Return requested <strong>within 7 days</strong> of delivery</li>
      </ul>
      <strong>Non-Returnable Items</strong>
      <ul>
        <li>Used wigs or bundles</li>
        <li>Hair that has been installed</li>
        <li>Customised or altered wigs</li>
        <li>Sale items</li>
      </ul>
      <strong>Damaged or Incorrect Orders</strong><br/>
      Contact us within <strong>48 hours</strong> of delivery with photos. We resolve all genuine issues promptly.<D/>
      <strong>Refund Processing</strong><br/>
      Approved refunds issued to the original payment method within <strong>5–10 business days</strong>.<D/>
      <strong>Exchanges</strong><br/>
      Prefer a different length or colour? We'll exchange within the return window at no extra cost.<D/>
      To initiate a return: <E/> — include your order number.
    </>),
  },
  about: {
    icon: '✦', title: 'Our Story', scroll: true,
    content: (<>
      <strong>Welcome to Queen Veloura — where luxury, confidence, and authenticity come together.</strong><D/>
      We specialise in 100% natural virgin human hair wigs, bundles, and extensions designed for women who want beauty, versatility, and premium quality they can trust.<D/>
      <strong>Our Mission</strong><br/>
      To empower women with premium, natural hair that enhances confidence and self-expression. Hair is more than a style — it's identity, culture, creativity, and confidence.<D/>
      <strong>Our Hair Quality</strong><br/>
      We provide 100% natural virgin human hair, carefully sourced and selected to ensure exceptional quality. Soft, full, and natural looking — you can wash, curl, straighten, dye, and style it just like your natural hair.<D/>
      <strong>Why Women Choose Veloura</strong>
      <ul>
        <li><strong>Premium Virgin Hair</strong> — only authentic virgin human hair, zero synthetic blends</li>
        <li><strong>Natural Appearance</strong> — designed to blend seamlessly for a flawless, undetectable look</li>
        <li><strong>Trusted Quality</strong> — trusted by customers, professional stylists, and beauty editors</li>
        <li><strong>Customer-First</strong> — excellent service, fast support, and a smooth shopping experience</li>
      </ul>
      <D/><em>Because when you look amazing, you feel unstoppable.</em>
    </>),
  },
  shipping: {
    icon: '📦', title: 'Shipping Policy', scroll: false,
    content: (<>
      <strong>Last Updated: March 19, 2026 · Queen Veloura</strong><D/>
      Every Veloura order is carefully packaged and dispatched with care.<D/>
      <strong>Processing Time</strong><br/>1–3 business days from order confirmation.<D/>
      <strong>Delivery Times</strong>
      <ul>
        <li><strong>United States:</strong> 3–7 business days</li>
        <li><strong>International:</strong> 7–15 business days</li>
      </ul>
      <strong>Tracking</strong><br/>You will receive a tracking number by email once your order has shipped.<D/>
      <strong>Free Shipping</strong><br/>Free standard shipping on all US orders. International shipping rates calculated at checkout.<D/>
      Questions? <E/>
    </>),
  },
  faq: {
    icon: '💬', title: 'FAQ', scroll: true,
    content: (<>
      <strong>Is the hair 100% human hair?</strong><br/>Yes. All Veloura wigs are made from 100% natural virgin human hair — no synthetic blends, ever.<D/>
      <strong>Can I colour and heat-style the hair?</strong><br/>Yes. You can wash, curl, straighten, dye, and style our hair exactly like your natural hair.<D/>
      <strong>How long will the hair last?</strong><br/>With proper care, Veloura wigs last 2–3 years. Our quality guarantee covers the first 90 days.<D/>
      <strong>How do I find my cap size?</strong><br/>Measure around your head at the hairline. Small: under 21.5", Medium: 21.5"–22.5", Large: over 22.5". When in doubt, Medium fits most.<D/>
      <strong>What is HD Lace?</strong><br/>HD (High Definition) lace is ultra-thin and melts into all skin tones for an undetectable hairline.<D/>
      <strong>How do I care for my wig?</strong><br/>Wash with sulphate-free shampoo, condition mid-length to ends, air dry on a wig stand, and store in a satin bag when not worn.<D/>
      <strong>How long does shipping take?</strong><br/>US orders: 3–7 business days after 1–3 day processing. International: 7–15 business days.<D/>
      <strong>Can I return my wig?</strong><br/>Yes, if unused and within 7 days of delivery. See our Returns Policy for full details.<D/>
      Still have questions? <E/>
    </>),
  },
  contact: {
    icon: '✉️', title: 'Contact Us', scroll: false,
    content: (<>
      We're here to help. Our team typically responds within 24 hours.<D/>
      <strong>General & Order Support</strong><br/><E/><br/>
      Please include your order number for order-related queries.<D/>
      <strong>Returns & Exchanges</strong><br/>Email with your order number and photos if applicable.<D/>
      <strong>Business, Press & Wholesale</strong><br/>Email with a subject line describing your enquiry.<D/>
      <strong>Beauty Circle</strong><br/>For membership, rewards, or account questions — include your registered email address.<D/>
      <strong>Website</strong><br/><a href="https://www.queenveloura.shop" style={{color:'var(--champagne)'}}>www.queenveloura.shop</a>
    </>),
  },
  privacy: {
    icon: '🔒', title: 'Privacy Policy', scroll: true,
    content: (<>
      <strong>Last Updated: March 19, 2026 · Queen Veloura</strong><D/>
      Your privacy is important to us. This policy explains how we collect, use, and protect your information.<D/>
      <strong>1. Information We Collect</strong>
      <ul>
        <li><strong>Personal:</strong> name, email, phone, shipping/billing address, payment info</li>
        <li><strong>Automatic:</strong> IP address, browser type, device info, pages visited, cookies</li>
      </ul>
      <strong>2. How We Use Your Information</strong>
      <ul>
        <li>Process and deliver orders</li>
        <li>Communicate about purchases and provide customer support</li>
        <li>Improve our website and services</li>
        <li>Send promotions and marketing emails (if opted in)</li>
        <li>Prevent fraud and protect our business</li>
      </ul>
      <D/><strong>3. Sharing Your Information</strong><br/>
      We do not sell your personal information. We may share it with trusted third parties — payment processors, shipping providers, and analytics — solely to perform services on our behalf.<D/>
      <strong>4. Data Security</strong><br/>
      We implement SSL encryption and secure payment processing.<D/>
      <strong>5. Your Rights</strong><br/>
      You may request access to, correction of, or deletion of your personal data. Contact <E/>.<D/>
      <strong>6. Changes to This Policy</strong><br/>
      We may update this policy periodically. Updates will be posted on this page with a revised date.
    </>),
  },
  terms: {
    icon: '📋', title: 'Terms of Service', scroll: true,
    content: (<>
      <strong>Last Updated: March 19, 2026 · Queen Veloura</strong><br/>
      By using Queen Veloura, you agree to the following terms.<D/>
      <strong>1. Website Use</strong><br/>
      You agree to use this website only for lawful purposes. You may not violate any laws, attempt unauthorised access to our systems, or use the website for fraudulent purposes.<D/>
      <strong>2. Product Information</strong><br/>
      We sell 100% natural virgin human hair wigs, bundles, and related products. We strive to ensure descriptions and images are accurate, but minor variations may occur.<D/>
      <strong>3. Pricing</strong><br/>
      All prices are in USD unless otherwise stated. We reserve the right to change prices, correct pricing errors, and cancel orders placed at incorrect prices.<D/>
      <strong>4. Orders</strong><br/>
      We reserve the right to refuse or cancel orders if payment cannot be verified, fraud is suspected, or products are unavailable.<D/>
      <strong>5. Intellectual Property</strong><br/>
      All content on this website — logos, images, text, graphics — is the property of Queen Veloura and may not be used without written permission.<D/>
      <strong>6. Limitation of Liability</strong><br/>
      To the fullest extent permitted by law, Queen Veloura will not be liable for indirect damages, loss of profits, or website interruptions.<D/>
      <strong>7. Governing Law</strong><br/>
      These terms are governed by the laws of the United States and the State of Maryland.<D/>
      <strong>8. Changes</strong><br/>
      We may update these terms at any time. Continued use of the website constitutes acceptance of the updated terms.
    </>),
  },
  dataSafety: {
    icon: '🔐', title: 'Data Safety', scroll: true,
    content: (<>
      <strong>Last Updated: March 19, 2026 · Queen Veloura</strong><br/>
      Protecting your data is a priority at Queen Veloura.<D/>
      <strong>1. Secure Payments</strong><br/>
      All payments are processed through secure, encrypted third-party payment providers. We do not store full credit card information on our servers.<D/>
      <strong>2. Data Storage</strong><br/>
      Customer information is stored on secure servers protected by SSL encryption, access controls, and monitoring systems.<D/>
      <strong>3. Limited Access</strong><br/>
      Only authorised employees and service providers access customer information, solely for order fulfilment, customer support, or technical maintenance.<D/>
      <strong>4. Data Retention</strong><br/>
      We retain personal information only as long as necessary to process orders, comply with legal requirements, and resolve disputes.<D/>
      <strong>5. Breach Notification</strong><br/>
      In the event of a data breach affecting customer information, we will promptly notify affected users and take all necessary steps to resolve the issue.
    </>),
  },
  buyerGuide: {
    icon: '📖', title: 'Wig Buyer Guide', scroll: true,
    content: (<>
      <strong>Before You Buy — What Every Customer Should Know</strong><D/>
      <strong>1. Human Hair is Natural</strong><br/>
      Each wig may have slight differences in texture or wave pattern. Colour tones may vary slightly between batches. These variations are normal and part of the beauty of authentic human hair.<D/>
      <strong>2. Choosing Length</strong><br/>
      Hair length is measured when fully stretched. Curly or wavy hair may appear shorter. For a fuller look, choose higher density wigs.<D/>
      <strong>3. Choosing Texture</strong>
      <ul>
        <li><strong>Straight</strong> — sleek and versatile</li>
        <li><strong>Body Wave</strong> — soft natural waves</li>
        <li><strong>Deep Wave</strong> — defined, voluminous waves</li>
        <li><strong>Curly / Kinky Curly</strong> — full natural curl pattern</li>
      </ul>
      <strong>4. Wig Density</strong>
      <ul>
        <li><strong>130%</strong> — natural everyday look</li>
        <li><strong>150%</strong> — full and popular choice</li>
        <li><strong>180%+</strong> — extra volume and glam styles</li>
      </ul>
      <strong>5. Lace Wig Expectations</strong><br/>
      You may need to trim the lace and customise baby hairs. Many customers have wigs installed by a professional stylist for best results.<D/>
      <strong>6. Colour Expectations</strong><br/>
      Most wigs are natural black or dark brown unless specified. If bleaching or dyeing, use a professional and perform a strand test first.<D/>
      <strong>7. Returns & Hygiene</strong><br/>
      We only accept returns if the hair has not been worn or installed and remains in original condition. See our Returns Policy for full details.<D/>
      Need help choosing? <E/>
    </>),
  },
  checkoutPolicy: {
    icon: '🛒', title: 'Checkout Policy', scroll: true,
    content: (<>
      <strong>Last Updated: March 19, 2026 · Queen Veloura</strong><br/>
      By completing a purchase you agree to the terms outlined below.<D/>
      <strong>1. Order Confirmation</strong><br/>
      You will receive a confirmation email after placing an order. If not received within a few minutes, check your spam folder.<D/>
      <strong>2. Payment Methods</strong><br/>
      We accept major credit and debit cards, PayPal, and approved digital payment options. All payments are processed through secure, encrypted third-party systems.<D/>
      <strong>3. Processing Time</strong><br/>
      Orders are typically processed within 1–3 business days, excluding weekends and holidays.<D/>
      <strong>4. Shipping</strong>
      <ul>
        <li><strong>United States:</strong> 3–7 business days</li>
        <li><strong>International:</strong> 7–15 business days</li>
      </ul>
      <strong>5. Address Accuracy</strong><br/>
      Customers are responsible for providing accurate shipping information. Contact us immediately if you notice an error.<D/>
      <strong>6. Order Changes or Cancellation</strong><br/>
      Orders may be modified or cancelled within 12 hours of purchase, provided the order has not yet been processed.<D/>
      <strong>7. Hygiene & Returns</strong><br/>
      Hair products must remain unused, unaltered, and in original packaging to qualify for a return.<D/>
      <strong>8. Fraud Prevention</strong><br/>
      For customer protection, we may perform order verification checks. Suspected fraudulent orders may be delayed or cancelled.<D/>
      Contact: <E/>
    </>),
  },
  hairMaintenance: {
    icon: '💧', title: 'Hair Care Guide', scroll: true,
    content: (<>
      <strong>Proper care will help your Veloura hair remain soft, beautiful, and manageable for months.</strong><D/>
      <strong>1. Washing</strong>
      <ul>
        <li>Gently detangle before washing</li>
        <li>Use lukewarm water and sulphate-free shampoo</li>
        <li>Massage gently from top to bottom — never rub or twist</li>
        <li>Apply moisturising conditioner, leave for a few minutes, then rinse</li>
        <li>Air dry when possible</li>
      </ul>
      <strong>2. Detangling</strong>
      <ul>
        <li>Use a wide-tooth comb or detangling brush</li>
        <li>Always start from the ends and work up to the roots</li>
        <li>For curly textures, detangle while slightly damp and conditioned</li>
      </ul>
      <strong>3. Heat Styling</strong>
      <ul>
        <li>Always apply heat protectant spray before using hot tools</li>
        <li>Keep styling tools below 350–400°F when possible</li>
        <li>Limit excessive heat styling to maintain hair health</li>
      </ul>
      <strong>4. Moisturising</strong>
      <ul>
        <li>Use light oils or hair serums to maintain shine</li>
        <li>Apply leave-in conditioner to prevent dryness</li>
        <li>Avoid heavy oils that can weigh the hair down</li>
      </ul>
      <strong>5. Nighttime Care</strong>
      <ul>
        <li>Wrap hair with a silk or satin scarf, or use a satin bonnet</li>
        <li>For long hair, loosely braid or tie into a low ponytail before sleeping</li>
      </ul>
      <strong>6. Storage</strong>
      <ul>
        <li>Place the wig on a wig stand to maintain shape</li>
        <li>Keep in a clean, dry place away from humidity</li>
      </ul>
      <strong>7. Chemical Treatments</strong><br/>
      Our virgin hair can be dyed, bleached, or chemically treated. Always use a professional and perform a strand test first. Over-processing is not covered under our quality guarantee.<D/>
      Questions about care? <E/>
    </>),
  },
  installGuide: {
    icon: '✂️', title: 'Installation Guide', scroll: true,
    content: (<>
      <strong>Installing your wig properly creates a natural appearance, secure fit, and long-lasting style.</strong><br/>
      If you are new to wigs, consider visiting a professional hairstylist for installation.<D/>
      <strong>1. Prepare Your Natural Hair</strong>
      <ul>
        <li>Braid hair into cornrows or create flat braids</li>
        <li>Wear a wig cap to keep natural hair flat and secure</li>
      </ul>
      <strong>2. Apply a Wig Cap</strong>
      <ul>
        <li>Place the wig cap over your head, ensuring all natural hair is tucked under</li>
        <li>Choose a nude or skin-tone cap for the most natural look</li>
      </ul>
      <strong>3. Trim the Lace</strong>
      <ul>
        <li>Place the wig on your head and mark where your natural hairline falls</li>
        <li>Carefully trim the lace with small scissors — take your time</li>
      </ul>
      <strong>4. Secure the Wig</strong>
      <ul>
        <li><strong>Wig glue or adhesive</strong> — longest hold</li>
        <li><strong>Wig tape</strong> — gentle on skin</li>
        <li><strong>Elastic bands or adjustable straps</strong> — glueless method</li>
      </ul>
      <strong>5. Style the Hairline</strong>
      <ul>
        <li>Pluck the hairline if necessary for natural density</li>
        <li>Style baby hairs along the edges</li>
        <li>Apply foundation or powder along the part to match your scalp tone</li>
      </ul>
      <strong>6. Style the Wig</strong><br/>
      After installation, style as desired. Always use heat protectant before hot tools.<D/>
      <strong>7. Wig Removal</strong>
      <ul>
        <li>Gently remove the wig and clean any adhesive residue</li>
        <li>Store on a wig stand or mannequin head</li>
      </ul>
      <D/>Need help? <E/>
    </>),
  },
  beautyCircle: {
    icon: '✦', title: 'The Beauty Circle', scroll: true,
    content: (<>
      <strong>Beauty is more fun when it's shared.</strong><D/>
      The Veloura Beauty Circle — our Wig Lovers Club — is a community for customers who love wigs, style, and beauty trends.<D/>
      <strong>Member Benefits</strong>
      <ul>
        <li>Early access to new hair collections</li>
        <li>Members-only discounts and promotions</li>
        <li>Special birthday rewards</li>
        <li>Invitations to beauty events and pop-up experiences</li>
        <li>Styling tips and wig care guides</li>
      </ul>
      <D/><em>Join free — create your account to activate membership.</em>
    </>),
  },
  hairCare: {
    icon: '🌿', title: 'Hair Care & Expectations', scroll: true,
    content: (<>
      <strong>We are committed to providing high-quality 100% natural virgin human hair.</strong><D/>
      <strong>1. Natural Hair Characteristics</strong>
      <ul>
        <li>Slight variations in texture, wave pattern, or colour tone may occur</li>
        <li>Hair may react differently to styling tools, humidity, or products</li>
        <li>Some minimal shedding is normal for human hair extensions and wigs</li>
      </ul>
      <D/><strong>2. Care Instructions</strong>
      <ul>
        <li>Wash with sulphate-free, moisturising shampoo</li>
        <li>Condition mid-length to ends only — avoid the roots/knots</li>
        <li>Air dry on a wig stand — avoid high heat when possible</li>
        <li>Store in a satin bag or on a wig stand when not worn</li>
        <li>Detangle gently from ends to roots with a wide-tooth comb</li>
      </ul>
      <D/><strong>3. Heat Styling</strong><br/>
      Always use a heat protectant. Keep temperatures below 380°F / 195°C to prevent damage.<D/>
      <strong>4. Longevity</strong><br/>
      With proper care, Veloura wigs last 2–3 years. The quality guarantee covers manufacturing defects for 90 days.
    </>),
  },
};

export default function InfoCards({ activeCard, onClose }) {
  const card = CARDS[activeCard];
  if (!card) return null;

  return (
    <div className="info-card-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`info-card ${card.scroll ? 'info-card-scroll' : ''}`}>
        <button className="info-card-close" onClick={onClose}>✕</button>
        <div className="info-card-icon">{card.icon}</div>
        <div className="info-card-title">{card.title}</div>
        <div className="info-card-body">{card.content}</div>
      </div>
    </div>
  );
}
