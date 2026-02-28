import { motion } from 'framer-motion';
import { Award, FileCheck, Shield, CheckCircle } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      icon: <Award className="w-16 h-16" />,
      title: 'Halal Certification',
      description: 'Internationally recognized Halal certification ensuring compliance with Islamic dietary laws',
      status: 'Active'
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: 'HACCP Compliance',
      description: 'Hazard Analysis Critical Control Point certification for food safety management',
      status: 'Active'
    },
    {
      icon: <FileCheck className="w-16 h-16" />,
      title: 'APEDA Registration',
      description: 'Agricultural and Processed Food Products Export Development Authority registration',
      status: 'Active'
    },
    {
      icon: <CheckCircle className="w-16 h-16" />,
      title: 'ISO Certification',
      description: 'International Organization for Standardization quality management certification',
      status: 'Active'
    },
    {
      icon: <Shield className="w-16 h-16" />,
      title: 'FDA Approved',
      description: 'Food and Drug Administration approval for international export',
      status: 'Active'
    },
    {
      icon: <Award className="w-16 h-16" />,
      title: 'Export License',
      description: 'Valid export license for global meat trade operations',
      status: 'Active'
    },
  ];

  return (
    <div data-testid="certificates-page">
      {/* Hero Section */}
      <section className="py-24 bg-maroon text-white" data-testid="certificates-hero-section">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-5xl md:text-6xl font-bold mb-6"
            data-testid="certificates-title"
          >
            Our Certifications
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Committed to international quality standards and compliance
          </motion.p>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-24 bg-gray-50" data-testid="certificates-grid-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white border-2 border-gold p-8 hover:shadow-xl transition-all duration-300 group"
                data-testid={`certificate-card-${index}`}
              >
                <div className="text-maroon mb-4 group-hover:text-gold transition-colors duration-300">
                  {cert.icon}
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-3">{cert.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{cert.description}</p>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle size={20} />
                  <span>{cert.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-24 bg-white" data-testid="quality-commitment-section">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-6" data-testid="quality-commitment-title">
              Our Commitment to Quality
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              At Paramount Food Corporation, we maintain the highest standards of quality, hygiene, and safety. Our certifications reflect our unwavering commitment to delivering excellence in every product we export. We continuously update our processes to meet and exceed international regulatory requirements.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-maroon mb-2">100%</div>
                <div className="text-gray-600">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-maroon mb-2">6+</div>
                <div className="text-gray-600">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-maroon mb-2">ISO</div>
                <div className="text-gray-600">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-maroon mb-2">Global</div>
                <div className="text-gray-600">Standards</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-maroon text-white" data-testid="certificates-cta-section">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6" data-testid="certificates-cta-title">
            Need Certificate Verification?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Contact us to request copies of our certificates or for verification purposes
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-gold text-black px-8 py-4 text-lg font-medium hover:scale-105 transition-transform duration-300"
            data-testid="certificates-cta-button"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Certificates;