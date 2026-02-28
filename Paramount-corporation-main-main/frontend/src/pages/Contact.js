import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        toast.success('Thank you! Your inquiry has been received. We will contact you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again or contact us directly.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      {/* Hero Section */}
      <section className="py-24 bg-maroon text-white" data-testid="contact-hero-section">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-5xl md:text-6xl font-bold mb-6"
            data-testid="contact-title"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Get in touch with us for inquiries, orders, or partnership opportunities
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white" data-testid="contact-content-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl font-bold text-maroon mb-8" data-testid="contact-info-title">
                Get In Touch
              </h2>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                We're here to answer your questions and discuss how we can serve your buffalo meat import needs. Reach out to us through any of the following channels.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4" data-testid="contact-address">
                  <div className="bg-maroon-50 p-3 rounded">
                    <MapPin className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600">Sambhal road Moradabad-244001<br />Uttar Pradesh, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-phone">
                  <div className="bg-maroon-50 p-3 rounded">
                    <Phone className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a href="tel:+919045859114" className="text-gray-600 hover:text-maroon transition-colors">
                      +91 90458 59114
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="contact-email">
                  <div className="bg-maroon-50 p-3 rounded">
                    <Mail className="w-6 h-6 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a href="mailto:info.paramountfoodcorporation@gmail.com" className="text-gray-600 hover:text-maroon transition-colors break-all">
                      info.paramountfoodcorporation@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8" data-testid="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.4567!2d78.7719!3d28.8386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDUwJzE5LjAiTiA3OMKwNDYnMTguOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-2 border-gold"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 p-8 lg:p-12 border border-gray-200"
            >
              <h2 className="font-playfair text-3xl font-bold text-maroon mb-6" data-testid="contact-form-title">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} data-testid="contact-form">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      data-testid="contact-form-name"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      data-testid="contact-form-email"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      data-testid="contact-form-subject"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      data-testid="contact-form-message"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20 transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="contact-form-submit"
                    className="w-full bg-maroon text-white px-6 py-4 font-medium hover:bg-maroon-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;