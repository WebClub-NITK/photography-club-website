import { useEffect } from 'react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import PropTypes from 'prop-types'
import MarkdownPreview from '@uiw/react-markdown-preview'

export default function AdminModal({ 
  isOpen, 
  onClose, 
  type,
  content,
  currentImageIndex = 0,
  onPrevImage,
  onNextImage,
  totalImages = 1
}) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-gradient-to-t from-black/90 to-black/20 bg-opacity-80 backdrop-blur-md
        transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      onClick={onClose}
    >
      <div 
        className="w-[95%] h-[90vh] md:h-[85vh] max-w-[1400px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white transition-colors outline-dashed outline-2"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="h-full overflow-y-auto">
          {type === 'image-carousel' && (
            <div className="h-full flex items-center justify-center bg-gray-100/60 relative">
              <img
                src={content[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
              
              {/* Navigation arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onPrevImage()
                    }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onNextImage()
                    }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <FiChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs md:text-sm">
                    {currentImageIndex + 1} / {totalImages}
                  </div>
                </>
              )}
            </div>
          )}

          {type === 'single-image' && (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <img
                src={content}
                alt="Blog banner"
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
          )}

          {type === 'text' && (
            <div className="p-4 md:p-6 h-full">
              <p className="text-gray-700 whitespace-pre-wrap text-sm md:text-base">{content}</p>
            </div>
          )}

          {type === 'markdown' && (
            <div className="p-4 md:p-6 h-full">
              <MarkdownPreview
                wrapperElement={{
                  "data-color-mode": "light"
                }}
                source={content}
                className="wmde-markdown text-sm md:text-base"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

AdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['image-carousel', 'single-image', 'text', 'markdown']).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  currentImageIndex: PropTypes.number,
  onPrevImage: PropTypes.func,
  onNextImage: PropTypes.func,
  totalImages: PropTypes.number
}
