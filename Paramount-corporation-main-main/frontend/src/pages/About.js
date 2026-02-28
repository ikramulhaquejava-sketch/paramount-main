import { motion } from 'framer-motion';
import { Target, Heart, Truck, Users } from 'lucide-react';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Our Mission',
      description: 'To provide the highest quality buffalo meat products to global markets while maintaining strict hygiene and safety standards.'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Quality First',
      description: 'Every product undergoes rigorous quality checks ensuring only the finest meat reaches our customers worldwide.'
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: 'Global Reach',
      description: 'Our efficient logistics network ensures timely delivery to customers across continents with maintained cold chain integrity.'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Customer Trust',
      description: 'Building long-term relationships through transparency, reliability, and consistent quality in every shipment.'
    }
  ];

  return (
    <div data-testid="about-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-maroon text-white" data-testid="about-hero-section">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1725399490099-51b3c4d3edbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxjb250YWluZXIlMjBzaGlwJTIwb2NlYW4lMjBsb2dpc3RpY3MlMjBleHBvcnR8ZW58MHx8fHwxNzcyMjczNDg5fDA&ixlib=rb-4.1.0&q=85)'
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            {...fadeInUp}
            className="font-playfair text-5xl md:text-6xl font-bold mb-6"
            data-testid="about-title"
          >
            About Paramount Food Corporation
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
          >
            One of India's Leading Buffalo Meat Exporters
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white" data-testid="story-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-6" data-testid="story-title">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Paramount Food Corporation stands as a beacon of excellence in India's meat processing and export industry. Based in Moradabad, Uttar Pradesh, we have established ourselves as one of the most trusted names in buffalo meat exports.
                </p>
                <p>
                  With state-of-the-art processing facilities and adherence to international quality standards, we serve discerning customers across the globe. Our commitment to hygiene, quality, and customer satisfaction has earned us recognition as one of the best meat processing exporters in India.
                </p>
                <p>
                  Every product that leaves our facility carries the promise of premium quality, ethical sourcing, and meticulous processing. We take pride in representing India on the global stage, delivering excellence in every shipment.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1680714401711-cfb7758cf88b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBtZWF0JTIwcHJvY2Vzc2luZyUyMHBsYW50JTIwaHlnaWVuZSUyMHN0YWlubGVzcyUyMHN0ZWVsfGVufDB8fHx8MTc3MjI3MzQ4OHww&ixlib=rb-4.1.0&q=85"
                alt="Processing Facility"
                className="w-full h-[500px] object-cover border-4 border-gold"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-4" data-testid="values-title">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that drive our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white border border-gray-200 p-8 hover:border-maroon transition-colors duration-300 group"
                data-testid={`value-card-${index}`}
              >
                <div className="text-maroon mb-4 group-hover:text-gold transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Highlight */}
      <section className="py-24 bg-maroon text-white" data-testid="certifications-highlight-section">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6" data-testid="certifications-highlight-title">
              Internationally Certified
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              We maintain the highest standards with Halal Certification, APEDA Registration, and HACCP Compliance, ensuring quality and safety in every product.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span>Halal Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span>APEDA Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span>HACCP Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
                <span>ISO Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;