import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onShowLowerReviews: () => void;
}

export default function ReviewPopup({ isOpen, onClose, onShowLowerReviews }: ReviewPopupProps) {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-lg w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking for the Lowdown?</h2>
            <p className="text-gray-600 mb-6">
              We're proud of our 4.9 average across 106 reviews—nobody's perfect, but we're close! Want the standard scoop or the real tea?
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={onShowLowerReviews}
                className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200"
              >
                See Reviews
              </button>
              <button
                onClick={() => {
                  router.push('/scoop-central');
                  onClose();
                }}
                className="w-full px-4 py-3 bg-[#CD2028] hover:bg-[#B01B22] text-white rounded-lg transition-colors duration-200"
              >
                What's the Scoop?
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 