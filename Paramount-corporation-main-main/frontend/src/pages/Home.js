import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Globe, Shield, Truck, ChevronRight } from 'lucide-react';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Halal Certified',
      description: 'All products meet international Halal standards'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'HACCP Compliant',
      description: 'Stringent quality and safety protocols'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'APEDA Registered',
      description: 'Approved by Agricultural Export Authority'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Global Logistics',
      description: 'Efficient worldwide delivery network'
    }
  ];

  const featuredProducts = [
    { name: 'NO.1 MEENG', desc: 'Premium Buffalo Leg Tendon', img: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/6lqd7hmr_TANDON%20OF%20BUFFALOW%20LEG..jpg' },
    { name: 'OMASUM', desc: 'Buffalo Stomach', img: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/bigiopd7_OMASUM.jpg' },
    { name: 'CHEEK MEAT', desc: 'Premium Buffalo Meat', img: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/8wlsp1ie_CHEEK%20MEAT.jpg' }
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section with Parallax */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        data-testid="hero-section"
      >
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1680714401711-cfb7758cf88b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBtZWF0JTIwcHJvY2Vzc2luZyUyMHBsYW50JTIwaHlnaWVuZSUyMHN0YWlubGVzcyUyMHN0ZWVsfGVufDB8fHx8MTc3MjI3MzQ4OHww&ixlib=rb-4.1.0&q=85)'
            }}
          />
          <div className="absolute inset-0 bg-maroon-900/70" />
        </motion.div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.h1 
            {...fadeInUp}
            className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight"
            data-testid="hero-title"
          >
            Premium Buffalo Meat Export
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
            data-testid="hero-subtitle"
          >
            From India to the World - Delivering Quality and Excellence
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 text-lg font-medium hover:scale-105 transition-transform duration-300 shadow-xl"
              data-testid="hero-cta-button"
            >
              Explore Our Products
              <ChevronRight />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-white" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-4"
              data-testid="features-title"
            >
              Why Choose Us
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              We are one of the best meat processing exporters in India, committed to quality and excellence
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white border border-gray-200 p-8 hover:border-maroon transition-colors duration-300 group"
                data-testid={`feature-card-${index}`}
              >
                <div className="text-maroon mb-4 group-hover:text-gold transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gray-50" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-4"
              data-testid="featured-products-title"
            >
              Featured Products
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-lg"
            >
              Premium buffalo meat products for global markets
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white border border-gray-200 overflow-hidden hover:border-maroon transition-all duration-300 group"
                data-testid={`featured-product-${index}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-maroon text-white px-8 py-4 text-lg font-medium hover:scale-105 transition-transform duration-300"
              data-testid="view-all-products-button"
            >
              View All Products
              <ChevronRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-maroon text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-6"
            data-testid="cta-title"
          >
            Ready to Partner With Us?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8 text-gray-200"
          >
            Get in touch with us today for premium buffalo meat exports
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-gold text-black px-8 py-4 text-lg font-medium hover:scale-105 transition-transform duration-300"
              data-testid="cta-contact-button"
            >
              Contact Us
              <ChevronRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;