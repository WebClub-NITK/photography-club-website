import { useState } from 'react'
import { FiCheck, FiX, FiUser } from 'react-icons/fi'
import Button from '../../components/Button'
import AdminModal from './adminModal'
import ApprovalControls from '../../components/admin/ApprovalControls'

export default function PhotographApprovals() {
  // This would come from your backend
  const [pendingPhotos, setPendingPhotos] = useState([
    {
      id: 1,
      images: [
        'https://placehold.co/1920x1080',
        'https://placehold.co/1920x900',
        'https://placehold.co/1920x1200'
      ],
      title: 'Landscape Series',
      caption: 'A collection of landscape photographs showcasing different aspect ratios (16:9, 16:10, and others) to test the grid layout.',
      photographer: 'John Doe',
      photographerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      submittedAt: '2024-03-20T10:30:00Z'
    },
    {
      id: 2,
      images: [
        'https://placehold.co/600x700',
        'https://placehold.co/600x500',
        'https://placehold.co/500x800'
      ],
      title: 'Portrait Collection',
      caption: 'Testing vertical and portrait orientations with different aspect ratios.',
      photographer: 'Jane Smith',
      photographerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      submittedAt: '2024-03-21T14:20:00Z'
    },
    {
      id: 3,
      images: [
        'https://placehold.co/600x600',
        'https://placehold.co/400x400',
        'https://placehold.co/900x900'
      ],
      title: 'Square Format Study',
      caption: 'A series of square format images in different sizes to test grid consistency.',
      photographer: 'Alex Johnson',
      photographerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      submittedAt: '2024-03-22T09:15:00Z'
    },
    {
      id: 4,
      images: [
        'https://placehold.co/720x1280',
        'https://placehold.co/1080x1920',
        'https://placehold.co/900x1600'
      ],
      title: 'Mobile Photography',
      caption: 'Vertical shots from mobile devices in various common aspect ratios (9:16, 10:16).',
      photographer: 'Sam Wilson',
      photographerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
      submittedAt: '2024-03-23T16:45:00Z'
    },
    {
      id: 5,
      images: [
        'https://placehold.co/1280x800',
        'https://placehold.co/900x600',
        'https://placehold.co/1600x900'
      ],
      title: 'Wide Landscapes',
      caption: 'Testing wide landscape formats with different aspect ratios.',
      photographer: 'Emma Davis',
      photographerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      submittedAt: '2024-03-24T11:30:00Z'
    }
  ])

  const [filteredPhotos, setFilteredPhotos] = useState(pendingPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showCaption, setShowCaption] = useState(false)

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPhotos(pendingPhotos)
      return
    }
    const term = searchTerm.toLowerCase()
    const filtered = pendingPhotos.filter(photo => 
      photo.title.toLowerCase().includes(term) ||
      photo.photographer.toLowerCase().includes(term) ||
      photo.caption.toLowerCase().includes(term)
    )
    setFilteredPhotos(filtered)
  }

  const handleApproveAll = () => {
    console.log('Approving all photos')
    // Implement your approve all logic here
  }

  const handleRejectAll = () => {
    console.log('Rejecting all photos')
    // Implement your reject all logic here
  }

  const handleApprove = (id) => {
    console.log('Approved photo:', id)
  }

  const handleReject = (id) => {
    console.log('Rejected photo:', id)
  }

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedPhoto.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === selectedPhoto.images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <>
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <h2 className="font-playfair text-xl md:text-2xl font-medium text-gray-900">
          Pending Photographs
        </h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium w-fit">
          {pendingPhotos.length} pending
        </span>
      </div>

      <ApprovalControls
        onSearch={handleSearch}
        onApproveAll={handleApproveAll}
        onRejectAll={handleRejectAll}
        totalItems={pendingPhotos.length}
        itemType="photograph"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-full flex flex-col"
          >
            {/* Image Container with Fixed Aspect Ratio */}
            <div 
              className="aspect-[4/3] overflow-hidden cursor-pointer relative group bg-gray-100"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={photo.images[0]}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {photo.images.length > 1 && (
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-full text-white text-xs">
                  {photo.images.length} photos
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 md:p-4 space-y-3 md:space-y-4 flex-grow flex flex-col">
              {/* Title and Photographer */}
              <div>
                <h3 className="font-medium text-gray-900 text-sm md:text-base">{photo.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <FiUser className="h-3 w-3 md:h-4 md:w-4" />
                  <span>{photo.photographer}</span>
                </div>
              </div>

              {/* Caption Preview */}
              <div 
                className="text-xs md:text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors line-clamp-2 flex-grow"
                onClick={() => setShowCaption(photo)}
              >
                {photo.caption}
              </div>

              {/* Submission Time */}
              <div className="text-xs md:text-sm text-gray-500">
                Submitted {new Date(photo.submittedAt).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-auto">
                <Button
                  onClick={() => handleApprove(photo.id)}
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs md:text-sm py-1.5 md:py-2"
                >
                  <FiCheck className="h-3 w-3 md:h-4 md:w-4" />
                  Approve
                </Button>
                <Button
                  onClick={() => handleReject(photo.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs md:text-sm py-1.5 md:py-2"
                >
                  <FiX className="h-3 w-3 md:h-4 md:w-4" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-gray-500 text-sm md:text-base">No pending photographs to review</p>
        </div>
      )}
    </div>
    {/* Photo Carousel Modal */}
    <AdminModal
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        type="image-carousel"
        content={selectedPhoto?.images || []}
        currentImageIndex={currentImageIndex}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        totalImages={selectedPhoto?.images.length || 0}
      />

      {/* Caption Modal */}
      <AdminModal
        isOpen={!!showCaption}
        onClose={() => setShowCaption(null)}
        type="text"
        content={showCaption?.caption || ''}
      />
    </>
  )
}
