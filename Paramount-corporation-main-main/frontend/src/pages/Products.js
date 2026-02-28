import { motion } from 'framer-motion';
import { useState } from 'react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { name: 'NO.1 MEENG', description: 'Premium Tendon of Buffalo Leg', category: 'tendons', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/6lqd7hmr_TANDON%20OF%20BUFFALOW%20LEG..jpg' },
    { name: 'GUDDY NO. 03', description: 'Buffalo Leg Part - Premium Cut', category: 'meat', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/2fbingos_GUDDY.jpg' },
    { name: 'ROD NO. 02', description: 'Selected Buffalo Leg Part', category: 'meat', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/275isqjr_ROD.jpg' },
    { name: 'DRY TENDON', description: 'Dried Buffalo Leg Tendon', category: 'tendons', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/g9nv8opy_DRY%20TENDON.jpg' },
    { name: 'OMASUM', description: 'Buffalo Stomach - Premium Grade', category: 'offal', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/bigiopd7_OMASUM.jpg' },
    { name: 'PETTY BAG', description: 'Buffalo Neck Band', category: 'offal', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/k9v1ld4w_PETTY%20BAG.jpg' },
    { name: 'CHEEK MEAT', description: 'Premium Buffalo Cheek Meat', category: 'meat', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/8wlsp1ie_CHEEK%20MEAT.jpg' },
    { name: 'TENDON LINE', description: 'Buffalo Vertebra - Tendon Line', category: 'tendons', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/n5oq2awg_TENDON%20LINE.jpg' },
    { name: 'SHINGSHANG', description: 'Buffalo Bone Meat', category: 'meat', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/2v5kzv10_SHINGSHANG.jpg' },
    { name: 'FQ & HQ', description: 'Buffalo Upper Sides & Ribs', category: 'meat', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/eiih977a_FQ%20%26%20HQ.jpg' },
    { name: 'CHAKTENDON', description: 'Buffalo Leg Tendon Part', category: 'tendons', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/lsfhya0p_CHAKTENDON.jpg' },
    { name: 'HOKETENDON', description: 'Premium Buffalo Leg Tendon', category: 'tendons', image: 'https://customer-assets.emergentagent.com/job_meat-processing-hub/artifacts/0c1zjq09_HOKETENDON.jpg' },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'meat', name: 'Premium Meat' },
    { id: 'tendons', name: 'Tendons' },
    { id: 'offal', name: 'Offal' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div data-testid="products-page">
      {/* Hero Section */}
      <section className="py-24 bg-maroon text-white" data-testid="products-hero-section">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-5xl md:text-6xl font-bold mb-6"
            data-testid="products-title"
          >
            Our Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Premium buffalo meat products exported to global markets
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b" data-testid="category-filter-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`category-filter-${category.id}`}
                className={`px-6 py-3 font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-maroon text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-gray-50" data-testid="products-grid-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-gray-200 overflow-hidden hover:border-maroon transition-all duration-300 group"
                data-testid={`product-card-${index}`}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white" data-testid="products-cta-section">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-6" data-testid="products-cta-title">
            Interested in Our Products?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us for bulk orders, pricing, and export details
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-maroon text-white px-8 py-4 text-lg font-medium hover:scale-105 transition-transform duration-300"
            data-testid="products-cta-button"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Products;