import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-maroon text-white py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="mailto:info.paramountfoodcorporation@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="top-email-link">
              <Mail size={16} />
              <span className="hidden md:inline">info.paramountfoodcorporation@gmail.com</span>
            </a>
            <a href="tel:+919045859114" className="flex items-center gap-2 hover:text-gold transition-colors" data-testid="top-phone-link">
              <Phone size={16} />
              <span>+91 90458 59114</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" data-testid="youtube-link">
              <Youtube size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" data-testid="facebook-link">
              <Facebook size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors" data-testid="x-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
        } border-b border-gold`}
        data-testid="main-navbar"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center" data-testid="logo-link">
              <img
                src="https://customer-assets.emergentagent.com/job_054b88c3-1328-4de1-b926-812e077bbf20/artifacts/q478d0aj_WhatsApp%20Image%202026-02-25%20at%2012.39.18%20AM.jpeg"
                alt="Paramount Food Corporation"
                className="h-12 md:h-16"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`uppercase tracking-widest text-sm font-medium transition-colors hover:text-maroon ${
                    location.pathname === link.path ? 'text-maroon' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-maroon"
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gold overflow-hidden"
              data-testid="mobile-menu"
            >
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`block uppercase tracking-widest text-sm font-medium transition-colors hover:text-maroon ${
                      location.pathname === link.path ? 'text-maroon' : 'text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;