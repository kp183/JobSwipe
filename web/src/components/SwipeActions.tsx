import { XMarkIcon, HeartIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface SwipeActionsProps {
  onPass: () => void;
  onApply: () => void;
  onRewind: () => void;
  disabled?: boolean;
  rewindCredits: number;
  canRewind: boolean;
}

export default function SwipeActions({ onPass, onApply, onRewind, disabled, rewindCredits, canRewind }: SwipeActionsProps) {
  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Pass Button */}
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={onPass}
        disabled={disabled}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-200 shadow-lg
          ${disabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
          }
        `}
      >
        <XMarkIcon className="w-8 h-8 text-white" />
      </motion.button>

      {/* Rewind Button (Middle Notch) */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: (!canRewind || disabled) ? 1 : 1.1 }}
          whileTap={{ scale: (!canRewind || disabled) ? 1 : 0.95 }}
          onClick={onRewind}
          disabled={!canRewind || disabled}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-200 shadow-lg relative
            ${(!canRewind || disabled)
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700'
            }
          `}
        >
          <ArrowUturnLeftIcon className="w-6 h-6 text-white" />
        </motion.button>
        
        {/* Rewind Credits Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {rewindCredits}
        </div>
        
        {/* Rewind Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
          Rewind ({rewindCredits} left)
        </div>
      </div>

      {/* Apply Button */}
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        onClick={onApply}
        disabled={disabled}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-200 shadow-lg
          ${disabled 
            ? 'bg-gray-300 cursor-not-allowed' 
            : 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
          }
        `}
      >
        <HeartIcon className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}