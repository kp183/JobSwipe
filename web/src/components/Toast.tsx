import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50"
        >
          <div className={`
            flex items-center p-4 rounded-lg shadow-lg max-w-sm
            ${type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
            }
          `}>
            {type === 'success' ? (
              <CheckCircleIcon className="w-6 h-6 mr-3" />
            ) : (
              <XCircleIcon className="w-6 h-6 mr-3" />
            )}
            <span className="font-medium">{message}</span>
            <button
              onClick={onClose}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}