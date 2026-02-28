import { Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-maroon-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <img
              src="https://customer-assets.emergentagent.com/job_054b88c3-1328-4de1-b926-812e077bbf20/artifacts/q478d0aj_WhatsApp%20Image%202026-02-25%20at%2012.39.18%20AM.jpeg"
              alt="Paramount Food Corporation"
              className="h-16 mb-6 brightness-0 invert"
            />
            <p className="text-gray-300 leading-relaxed">
              Premium Buffalo Meat Exporter from India. Delivering quality and excellence worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl mb-6 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-gold transition-colors" data-testid="footer-home-link">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors" data-testid="footer-about-link">About Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-gold transition-colors" data-testid="footer-products-link">Products</Link></li>
              <li><Link to="/certificates" className="text-gray-300 hover:text-gold transition-colors" data-testid="footer-certificates-link">Certificates</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors" data-testid="footer-contact-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl mb-6 text-gold">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-gray-300">Sambhal road Moradabad-244001 U.P India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <a href="tel:+919045859114" className="text-gray-300 hover:text-gold transition-colors" data-testid="footer-phone-link">+91 90458 59114</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gold flex-shrink-0" />
                <a href="mailto:info.paramountfoodcorporation@gmail.com" className="text-gray-300 hover:text-gold transition-colors break-all" data-testid="footer-email-link">info.paramountfoodcorporation@gmail.com</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" data-testid="footer-youtube-link">
                <Youtube size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" data-testid="footer-facebook-link">
                <Facebook size={24} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" data-testid="footer-x-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/30 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Paramount Food Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;