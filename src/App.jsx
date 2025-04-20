import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rules } from './rules';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function App() {
  const [selectedRule, setSelectedRule] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const rulesPerPage = 12;

  const filteredRules = React.useMemo(() => 
    rules.filter(rule => 
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.content.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]
  );

  const totalPages = Math.ceil(filteredRules.length / rulesPerPage);
  const startIndex = (currentPage - 1) * rulesPerPage;
  const endIndex = startIndex + rulesPerPage;
  const currentRules = filteredRules.slice(startIndex, endIndex);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.8,
      opacity: 0,
      y: 20
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleSearchChange = React.useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePreviousPage = React.useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = React.useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handleRuleClick = React.useCallback((rule) => {
    setSelectedRule(rule);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setSelectedRule(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-custom-red-950 to-black text-white font-poppins">
      <header className="pt-32 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-custom-red-500/20 via-custom-red-900/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-bold mb-10 gradient-text tracking-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Friendship Rules
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed"
          >
            {rules.length} non-negotiable principles that define true friendship.
          </motion.p>
        </motion.div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative mb-12">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-custom-red-500" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/50 border-2 border-custom-red-900/30 focus:border-custom-red-500 transition-colors text-white placeholder-gray-500 outline-none backdrop-blur-sm"
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-custom-red-500">
            {searchQuery ? `Found ${filteredRules.length} rules` : `Page ${currentPage} of ${totalPages}`}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-6 py-2 rounded-lg bg-custom-red-500/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-custom-red-500/30 transition-colors backdrop-blur-sm border border-custom-red-500/30"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-6 py-2 rounded-lg bg-custom-red-500/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-custom-red-500/30 transition-colors backdrop-blur-sm border border-custom-red-500/30"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {currentRules.map((rule) => (
          <motion.div
            key={rule.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-lg border border-custom-red-500/20 rounded-2xl p-6 hover:border-custom-red-500/50 transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group relative overflow-hidden"
            onClick={() => handleRuleClick(rule)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-custom-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-custom-red-500 group-hover:text-custom-red-400 transition-colors">
                  {rule.id.toString().padStart(3, '0')}
                </span>
                <h3 className="text-xl font-medium text-white group-hover:text-custom-red-50 transition-colors">{rule.title}</h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-3">{rule.content}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedRule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-custom-red-900/30 to-black/80 border-2 border-custom-red-500/30 p-8 rounded-2xl max-w-2xl w-full shadow-2xl relative overflow-hidden backdrop-blur-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-custom-red-500/30 pb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-custom-red-500">
                      {selectedRule.id.toString().padStart(3, '0')}
                    </span>
                    <h2 className="text-3xl font-bold text-white">{selectedRule.title}</h2>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-white transition-colors text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-custom-red-500/20"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-300 text-xl leading-relaxed">{selectedRule.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;