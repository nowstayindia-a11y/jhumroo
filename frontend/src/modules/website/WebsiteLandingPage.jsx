import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlay, 
  FiSmartphone, 
  FiUsers, 
  FiZap, 
  FiLayers, 
  FiShield, 
  FiGlobe,
  FiArrowRight,
  FiDownload,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiX
} from 'react-icons/fi';
import './WebsiteLandingPage.css';

// Import Assets for Production
import LogoImg from '../../assets/loginPage/Logo.png';
import HeroImg from '../../assets/jhumroo_hero.png';
import LandingImg from '../../assets/landing.png';

const WebsiteLandingPage = () => {
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const [isRefundOpen, setIsRefundOpen] = React.useState(false);
  const [isSafetyOpen, setIsSafetyOpen] = React.useState(false);

  useEffect(() => {
    document.body.classList.add('app-website-route');
    return () => {
      document.body.classList.remove('app-website-route');
    };
  }, []);

  return (
    <div className="website-landing">
      {/* Terms Modal */}
      {isTermsOpen && (
        <div className="w-modal-overlay" onClick={() => setIsTermsOpen(false)}>
          <div className="w-modal-container" onClick={e => e.stopPropagation()}>
            <div className="w-modal-header">
              <h2>Terms & Conditions</h2>
              <div className="w-modal-close" onClick={() => setIsTermsOpen(false)}>
                <FiX />
              </div>
            </div>
            <div className="w-modal-body">
              <p>Welcome to Jhumroo. By using our platform, you agree to the following terms and conditions. Please read them carefully.</p>
              
              <h3>1. General Terms</h3>
              <p>Jhumroo is a creative platform for short-form video content. Users are responsible for the content they post and must ensure it complies with local laws and our community guidelines.</p>
              
              <h3>2. User Content</h3>
              <p>You retain ownership of the content you create, but by posting on Jhumroo, you grant us a worldwide, non-exclusive license to use, display, and distribute your content within the platform.</p>
              
              <h3>3. Prohibited Conduct</h3>
              <p>Users are strictly prohibited from posting content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.</p>
              
              <h3>4. Privacy</h3>
              <p>Your privacy is important to us. Please refer to our Privacy Policy section for details on how we handle your personal data.</p>
              
              <h3>5. Modifications</h3>
              <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
              
              <div className="w-hero-actions" style={{ marginTop: '40px' }}>
                 <button className="w-btn-primary" onClick={() => setIsTermsOpen(false)} style={{ width: '100%' }}>I Accept These Terms</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="w-modal-overlay" onClick={() => setIsContactOpen(false)}>
          <div className="w-modal-container" onClick={e => e.stopPropagation()}>
            <div className="w-modal-header">
              <h2>Contact Us</h2>
              <div className="w-modal-close" onClick={() => setIsContactOpen(false)}>
                <FiX />
              </div>
            </div>
            <div className="w-modal-body">
              <p>Have a question, feedback, or a business inquiry? Fill out the form below and our team will get back to you shortly.</p>
              
              <form className="w-contact-form" onSubmit={(e) => { e.preventDefault(); setIsContactOpen(false); alert('Message sent successfully!'); }}>
                <div className="w-form-row">
                  <div className="w-form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="Enter your full name" required />
                  </div>
                  <div className="w-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter your email" required />
                  </div>
                </div>
                
                <div className="w-form-row">
                  <div className="w-form-group">
                    <label htmlFor="username">Username (Optional)</label>
                    <input type="text" id="username" placeholder="@username" />
                  </div>
                  <div className="w-form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" required>
                      <option value="">Select a subject...</option>
                      <option value="support">General Support</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="business">Business Inquiry</option>
                      <option value="report">Report a Problem</option>
                    </select>
                  </div>
                </div>
                
                <div className="w-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows="4" placeholder="How can we help you?" required></textarea>
                </div>
                
                <div className="w-hero-actions" style={{ marginTop: '30px' }}>
                  <button type="submit" className="w-btn-primary" style={{ width: '100%' }}>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Refund Policy Modal */}
      {isRefundOpen && (
        <div className="w-modal-overlay" onClick={() => setIsRefundOpen(false)}>
          <div className="w-modal-container" onClick={e => e.stopPropagation()}>
            <div className="w-modal-header">
              <h2>Refund Policy</h2>
              <div className="w-modal-close" onClick={() => setIsRefundOpen(false)}>
                <FiX />
              </div>
            </div>
            <div className="w-modal-body">
              <p>At Jhumroo, we strive to provide the best digital experience. Please read our refund policy below regarding in-app purchases and subscriptions.</p>
              
              <h3>1. Digital Goods</h3>
              <p>Since Jhumroo offers intangible, irrevocable digital goods (such as virtual coins, gifts, and premium filters), we do not issue refunds after the purchase is completed, except in specific cases outlined by consumer protection laws.</p>
              
              <h3>2. Accidental Purchases</h3>
              <p>If an accidental purchase occurs, you must contact our support team within 48 hours. Refunds for accidental purchases are granted at the sole discretion of the Jhumroo team and only if the purchased digital items have not been used or transferred.</p>
              
              <h3>3. Subscription Cancellations</h3>
              <p>You can cancel any premium subscription at any time. Your access will remain active until the end of your current billing period. We do not provide prorated refunds for canceled subscriptions.</p>
              
              <h3>4. Account Bans</h3>
              <p>If your account is banned or suspended due to a violation of our Community Guidelines or Terms of Service, you forfeit any right to a refund for past purchases or remaining subscription time.</p>
              
              <h3>5. Contact Us</h3>
              <p>If you believe you have been charged in error or have any questions about this policy, please reach out to our support team via the Contact Us form.</p>
              
              <div className="w-hero-actions" style={{ marginTop: '40px' }}>
                 <button className="w-btn-primary" onClick={() => setIsRefundOpen(false)} style={{ width: '100%' }}>I Understand</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Center Modal */}
      {isSafetyOpen && (
        <div className="w-modal-overlay" onClick={() => setIsSafetyOpen(false)}>
          <div className="w-modal-container" onClick={e => e.stopPropagation()}>
            <div className="w-modal-header">
              <h2>Safety Center</h2>
              <div className="w-modal-close" onClick={() => setIsSafetyOpen(false)}>
                <FiX />
              </div>
            </div>
            <div className="w-modal-body">
              <p>Your safety is our top priority at Jhumroo. We are committed to providing a secure and positive environment for all our users. Here are some of our key safety features and resources:</p>
              
              <h3>1. Reporting Abuse & Violations</h3>
              <p>If you encounter content or behavior that violates our Community Guidelines, you can easily report it directly from the app. Our moderation team reviews reports 24/7 to take swift action against inappropriate content, harassment, or bullying.</p>
              
              <h3>2. Privacy Controls</h3>
              <p>You have full control over your experience. In your account settings, you can make your profile private, restrict who can comment on your videos, filter specific keywords, and block users you no longer wish to interact with.</p>
              
              <h3>3. Minor Safety & Parental Controls</h3>
              <p>We restrict certain features for users under 18 to ensure their safety. Parents and guardians can also use our 'Family Pairing' features to manage screen time limits, restrict direct messaging, and manage content visibility for their teens.</p>
              
              <h3>4. Digital Well-being</h3>
              <p>We encourage healthy app usage. You can set daily screen time limits and schedule 'Sleep Reminders' to help you manage the time you spend on Jhumroo.</p>
              
              <h3>5. Law Enforcement Support</h3>
              <p>We cooperate with law enforcement agencies globally to respond to valid legal requests and ensure the safety of our users in emergency situations.</p>

              <div className="w-hero-actions" style={{ marginTop: '40px' }}>
                 <button className="w-btn-primary" onClick={() => setIsSafetyOpen(false)} style={{ width: '100%' }}>I Understand</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="w-nav">
        <Link to="/" className="w-logo">
          <div className="w-logo-box">
            <img src={LogoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          Jhumroo
        </Link>
        <div className={`w-nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#features" className="w-nav-link" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#about" className="w-nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
          <div className="w-nav-link" style={{ cursor: 'pointer' }} onClick={() => { setIsTermsOpen(true); setIsMenuOpen(false); }}>Terms & Conditions</div>
          <Link to="/login" className="w-btn-primary" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
        </div>
        
        {isMenuOpen && <div className="w-nav-overlay" onClick={() => setIsMenuOpen(false)}></div>}

        <div className="w-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <div className="w-hamburger"><span></span><span></span><span></span></div>}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-hero">
        <div className="w-hero-content">
          <div className="w-hero-badge">✨ Next Generation Entertainment</div>
          <h1 className="w-hero-title">
            <span>CREATE.</span>
            <span>CONNECT.</span>
            <span style={{ color: 'var(--w-lavender-primary)' }}>SHINE.</span>
          </h1>
          <p className="w-hero-desc">
            Experience the world's most dynamic short-video community. 
            From viral trends to niche passions, Jhumroo is where your 
            creativity finds its home and your voice finds an audience.
          </p>
          <div className="w-hero-actions">
            <Link to="/signup" className="w-btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
              Join Jhumroo Now
            </Link>
            <a href="#features" className="w-app-btn" style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)' }}>
              Explore Features <FiArrowRight />
            </a>
          </div>
        </div>

        <div className="w-hero-visual">
          {/* Floating Cards for premium feel */}
          <div className="w-floating-card w-card-1">
            <div style={{ padding: '8px', background: 'var(--w-lavender-soft)', borderRadius: '10px' }}>
              <FiPlay size={20} color="var(--w-lavender-primary)" />
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>1.2M+ Views</div>
              <div style={{ fontSize: '12px', opacity: 0.5 }}>Trending Now</div>
            </div>
          </div>

          <div className="w-floating-card w-card-2">
            <FiUsers size={24} color="var(--w-lavender-primary)" />
            <div style={{ fontWeight: '700' }}>Live Stream</div>
          </div>

          <div className="w-main-img-container">
            <img 
              src={HeroImg} 
              alt="Hero" 
              className="w-hero-img" 
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-features">
        <div className="w-section-header">
          <h2 className="w-section-title">Designed for Creators</h2>
          <p style={{ opacity: 0.5, fontSize: '18px', marginTop: '16px' }}>Everything you need to grow your digital presence.</p>
        </div>

        <div className="w-features-grid">
          <div className="w-feature-card">
            <div className="w-f-icon"><FiZap /></div>
            <h3 className="w-f-title">Ultra-Fast Editing</h3>
            <p className="w-f-desc">Create professional quality content in seconds with our intuitive, lightning-fast editor and massive effects library.</p>
          </div>

          <div className="w-feature-card">
            <div className="w-f-icon"><FiLayers /></div>
            <h3 className="w-f-title">Immersive Effects</h3>
            <p className="w-f-desc">Access thousands of AR filters, royalty-free music, and dynamic transitions to make your content stand out from the crowd.</p>
          </div>

          <div className="w-feature-card">
            <div className="w-f-icon"><FiGlobe /></div>
            <h3 className="w-f-title">Global REACH</h3>
            <p className="w-f-desc">Our intelligent algorithm ensures your content reaches the right audience, helping you build a loyal global community.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="w-about">
        <div className="w-about-bg-text">
          <span>JHUMROO</span>
          <span>THE BEST APP</span>
        </div>
        <div className="w-about-content">
          <div className="w-about-image-container">
            <img 
              src={LandingImg} 
              alt="About Jhumroo" 
              className="w-about-img" 
            />
          </div>
          <div className="w-about-info">
            <span className="w-about-label">About Us</span>
            <h2 className="w-about-title">Revolutionizing Digital Creativity</h2>
            <p className="w-about-text">
              Jhumroo is a leading short-video platform dedicated to empowering individual creators. 
              We believe in giving everyone a stage to showcase their unique talents to the world.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-cta">
        <div className="w-cta-card">
          <h2 className="w-cta-title">Ready to start your journey?</h2>
          <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.8 }}>Download Jhumroo today and become part of the future.</p>
          <div className="w-cta-apps">
            <a href="#" className="w-app-btn">
              <FiSmartphone size={24} />
              App Store
            </a>
            <a href="#" className="w-app-btn">
              <FiDownload size={24} />
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-footer">
        <div className="w-footer-brand">
          <Link to="/" className="w-logo">
            <div className="w-logo-box">
              <img src={LogoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            Jhumroo
          </Link>
          <p>The premier short-video platform for the next generation of creative minds.</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
            <FiInstagram size={20} style={{ cursor: 'pointer' }} />
            <FiTwitter size={20} style={{ cursor: 'pointer' }} />
            <FiYoutube size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        
        <div className="w-footer-col">
          <h4>Platform</h4>
          <div className="w-footer-links">
            <a href="#features" className="w-footer-link">How it works</a>
            <a href="#features" className="w-footer-link">Creator Fund</a>
            <div className="w-footer-link" style={{ cursor: 'pointer' }} onClick={() => setIsSafetyOpen(true)}>Safety Center</div>
          </div>
        </div>

        <div className="w-footer-col">
          <h4>Info and support</h4>
          <div className="w-footer-links">
            <div className="w-footer-link" style={{ cursor: 'pointer' }} onClick={() => setIsContactOpen(true)}>Contact Us</div>
            <a href="mailto:Info@jhumroo.in" className="w-footer-link" style={{ marginTop: '10px' }}>Info@jhumroo.in</a>
            <a href="tel:+919970907005" className="w-footer-link">Contact 9970907005</a>
          </div>
        </div>

        <div className="w-footer-col">
          <h4>Company</h4>
          <div className="w-footer-links">
            <a href="#about" className="w-footer-link">About Us</a>
            <div className="w-footer-link" style={{ cursor: 'pointer' }} onClick={() => setIsTermsOpen(true)}>Privacy Policy</div>
            <div className="w-footer-link" style={{ cursor: 'pointer' }} onClick={() => setIsTermsOpen(true)}>Terms of Service</div>
            <div className="w-footer-link" style={{ cursor: 'pointer' }} onClick={() => setIsRefundOpen(true)}>Refund Policy</div>
          </div>
        </div>
      </footer>

      <div className="w-footer-bottom">
        <div>© 2026 Jhumroo. All Rights Reserved.</div>
        <div className="w-powered-by">
          Powered by <strong>Vrushahi digital Entertainment Company</strong>
        </div>
      </div>
    </div>
  );
};

export default WebsiteLandingPage;
