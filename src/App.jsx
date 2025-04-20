import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [selectedRule, setSelectedRule] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rules = [
    { id: 1, title: "Respect My Time and Boundaries", content: "If you waste my time or disrespect my limits, we're done. I value my energy, and I expect others to treat it with the same importance." },
    { id: 2, title: "Don't Play Games", content: "If you're not being real with me, then you're out. I don't deal with manipulation or pretending." },
    { id: 3, title: "Be Honest", content: "Say what's real. If you lie or play with words, you're breaking my trust, and we're done." },
    { id: 4, title: "Mutual Effort", content: "I match energy. If I give, I expect to receive. Relationships go both ways, always." },
    { id: 5, title: "No Backstabbing", content: "Talk behind my back, and you're done. Loyalty and realness come first, always." },
    { id: 6, title: "No Toxic Behavior", content: "Drama, lies, or negativity? Keep it away from me. I want peace, not poison." },
    { id: 7, title: "Respect My Family and Loved Ones", content: "You disrespect them—you disrespect me. Period." },
    { id: 8, title: "Show Appreciation", content: "If I help you, support you, or do anything for you, I expect gratitude—not entitlement." },
    { id: 9, title: "Don't Take Me for Granted", content: "I won't always be around. If you can't appreciate me when I'm here, don't come running later." },
    { id: 10, title: "Own Your Mistakes", content: "I respect people who admit when they're wrong. Excuses don't mean growth." },
    { id: 11, title: "No Drama", content: "If you have a problem, say it to my face. I don't want stories, just the truth." },
    { id: 12, title: "Be There When Needed", content: "Support goes both ways. Be there like I'm there for you." },
    { id: 13, title: "No Half-Hearted Efforts", content: "If you're in, be all in. I don't accept half-friendships." },
    { id: 14, title: "Respect My Growth", content: "I'm constantly evolving. If you don't respect who I'm becoming, then step aside." },
    { id: 15, title: "Don't Compare Me to Others", content: "I'm not anyone else—I'm me. Respect me for who I am, not for how I stack up to someone else." },
    { id: 16, title: "Respect My Independence", content: "I don't need anyone—I choose people. Don't mistake that." },
    { id: 17, title: "No Making Fun of Me", content: "If you joke at my expense, in public or private, it's over. That's not respect." },
    { id: 18, title: "Show Me You're Worth My Time", content: "Time and energy are earned. Show me why I should give you mine." },
    { id: 19, title: "Take Accountability", content: "No blame games. Own what you do—good or bad." },
    { id: 20, title: "Don't Hold Me Back", content: "I'm growing. Don't try to keep me down or pull me backwards." },
    { id: 21, title: "No Fake People", content: "Be real or be gone." },
    { id: 22, title: "I Will Not Change for Anyone", content: "This is who I am. If that's not good enough, walk away." },
    { id: 23, title: "Be Real with Me", content: "Speak clearly, speak real. Say what you mean so I can understand without confusion." },
    { id: 24, title: "Respect My Boundaries on Social Media", content: "Don't cross lines online that you wouldn't cross in person." },
    { id: 25, title: "Help Each Other Out", content: "Friendship means support. I've got you—do you got me?" },
    { id: 26, title: "I Won't Compromise My Values", content: "If you can't handle my standards, it's not gonna work." },
    { id: 27, title: "No Victim Mentality", content: "You're responsible for your life. Don't expect me to fix it if you won't work on it." },
    { id: 28, title: "I Will Match Your Energy", content: "Give respect, get respect. I mirror the energy you give me." },
    { id: 29, title: "Prove You're Worthy of My Time", content: "I don't chase anyone. If you want my time, show why you deserve it." },
    { id: 30, title: "If You Can't Respect Everything, We're Done", content: "I'm not begging anyone to be in my life. If this feels like too much, go." },
    { id: 31, title: "Don't Make Fun of Me or Hide Disrespect Behind Jokes", content: "Disrespect in disguise is still disrespect. If you joke to put me down, I see it—and I'll walk." },
    { id: 32, title: "Every Day I'm Getting Better", content: "I'm healing, growing, and changing. If I let you close, don't use it against me." },
    { id: 33, title: "I Do Not Exaggerate", content: "I'm done with side stories and fake energy. Be a main part of my life, or stay out of it." },
    { id: 34, title: "Tell Me Straight Up", content: "If you want to be my friend or continue being in my life, say it straight. Don't waste my time wondering. Let me know, or I'll move on." },
    { id: 35, title: "These Rules May Change or Grow", content: "I'm always learning and evolving. So my standards may grow too. I know life. I've been through enough to see what's real." },
    { id: 36, title: "Don't Try to Look Better by Putting Me Down", content: "Whether in public or private—don't ever try to look superior by trashing me in front of others. You'll lose access to me, forever." }
  ];

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

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700 z-50"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: "0%" }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />
      
      <header className="pt-24 pb-20 text-center bg-gradient-to-r from-red-900 to-black border-b border-red-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent)] pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent"
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
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed font-light"
          >
            These rules are non-negotiable. If you want to be or continue to be my friend,
            understand and respect these principles without exception.
          </motion.p>
        </motion.div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {rules.map((rule) => (
          <motion.div
            key={rule.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-red-900/50 rounded-xl p-6 hover:border-red-500 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-900/20 group relative overflow-hidden"
            onClick={() => setSelectedRule(rule)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-red-500 group-hover:text-red-400 transition-colors">
                  {rule.id.toString().padStart(2, '0')}
                </span>
                <h4 className="text-xl font-medium text-white group-hover:text-red-50 transition-colors">{rule.title}</h4>
              </div>
              <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors">{rule.content}</p>
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
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRule(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 p-8 rounded-2xl max-w-2xl w-full shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-red-900/30 pb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold bg-gradient-to-br from-red-500 to-red-700 bg-clip-text text-transparent">
                      {selectedRule.id.toString().padStart(2, '0')}
                    </span>
                    <h2 className="text-3xl font-bold text-white">{selectedRule.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedRule(null)}
                    className="text-gray-500 hover:text-white transition-colors text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-900/20"
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

      <footer className="text-center py-12 bg-gradient-to-r from-black to-red-900 mt-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15),transparent)] pointer-events-none"></div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-300 font-medium text-xl max-w-3xl mx-auto px-4"
        >
          These standards are my foundation. Respect them or move on.
        </motion.p>
      </footer>
    </div>
  );
}

export default App;