import { useState } from 'react'
import { FiCheck, FiX, FiUser, FiCalendar, FiClock } from 'react-icons/fi'
import Button from '../../components/Button'
import AdminModal from './adminModal'
import ApprovalControls from '../../components/admin/ApprovalControls'

export default function BlogApprovals() {

  // This would come from your backend
  const [pendingBlogs, setPendingBlogs] = useState([
    {
      id: 1,
      title: 'The Art of Street Photography',
      excerpt: 'Discover the essential techniques and mindset needed to capture compelling street photographs that tell powerful stories...',
      content: `
## Introduction

Street photography is one of the most challenging yet rewarding genres of photography. It requires quick thinking, good observation skills, and the ability to capture decisive moments.

## Key Techniques

1. **Be Invisible**
   - Blend into the crowd
   - Use small, unobtrusive cameras
   - Avoid drawing attention

2. **Anticipate Moments**
   - Study human behavior
   - Look for interesting backgrounds
   - Wait for the right moment

## Equipment

You don't need expensive gear. Here's what works:
- Any camera with manual controls
- 35mm or 50mm lens
- Comfortable shoes!

> "The best camera is the one you have with you" - Chase Jarvis
      `,
      banner: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      author: 'Jane Smith',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      submittedAt: '2024-03-19T15:45:00Z',
      readTime: '5 min read'
    },
    {
      id: 1,
      title: 'The Art of Street Photography',
      excerpt: 'Discover the essential techniques and mindset needed to capture compelling street photographs that tell powerful stories...',
      content: `
## Introduction

Street photography is one of the most challenging yet rewarding genres of photography. It requires quick thinking, good observation skills, and the ability to capture decisive moments.

## Key Techniques

1. **Be Invisible**
   - Blend into the crowd
   - Use small, unobtrusive cameras
   - Avoid drawing attention

2. **Anticipate Moments**
   - Study human behavior
   - Look for interesting backgrounds
   - Wait for the right moment

## Equipment

You don't need expensive gear. Here's what works:
- Any camera with manual controls
- 35mm or 50mm lens
- Comfortable shoes!

> "The best camera is the one you have with you" - Chase Jarvis
      `,
      banner: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      author: 'Jane Smith',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      submittedAt: '2024-03-19T15:45:00Z',
      readTime: '5 min read'
    },
    {
      id: 1,
      title: 'The Art of Street Photography',
      excerpt: 'Discover the essential techniques and mindset needed to capture compelling street photographs that tell powerful stories...',
      content: `
## Introduction

Street photography is one of the most challenging yet rewarding genres of photography. It requires quick thinking, good observation skills, and the ability to capture decisive moments.

## Key Techniques

1. **Be Invisible**
   - Blend into the crowd
   - Use small, unobtrusive cameras
   - Avoid drawing attention

2. **Anticipate Moments**
   - Study human behavior
   - Look for interesting backgrounds
   - Wait for the right moment

## Equipment

You don't need expensive gear. Here's what works:
- Any camera with manual controls
- 35mm or 50mm lens
- Comfortable shoes!

> "The best camera is the one you have with you" - Chase Jarvis
      `,
      banner: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      author: 'Jane Smith',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      submittedAt: '2024-03-19T15:45:00Z',
      readTime: '5 min read'
    },
    // Add more mock data as needed
  ])

  const [filteredBlogs, setFilteredBlogs] = useState(pendingBlogs)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [showBanner, setShowBanner] = useState(null)

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(pendingBlogs)
      return
    }
    const term = searchTerm.toLowerCase()
    const filtered = pendingBlogs.filter(blog => 
      blog.title.toLowerCase().includes(term) ||
      blog.author.toLowerCase().includes(term) ||
      blog.excerpt.toLowerCase().includes(term) ||
      blog.content.toLowerCase().includes(term)
    )
    setFilteredBlogs(filtered)
  }

  const handleApproveAll = () => {
    console.log('Approving all blogs')
    // Implement your approve all logic here
  }

  const handleRejectAll = () => {
    console.log('Rejecting all blogs')
    // Implement your reject all logic here
  }

  const handleApprove = (id) => {
    console.log('Approved blog:', id)
  }

  const handleReject = (id) => {
    console.log('Rejected blog:', id)
  }

  return (
    <>
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <h2 className="font-playfair text-xl md:text-2xl font-medium text-gray-900">
          Pending Blog Posts
        </h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium w-fit">
          {pendingBlogs.length} pending
        </span>
      </div>

      <ApprovalControls
        onSearch={handleSearch}
        onApproveAll={handleApproveAll}
        onRejectAll={handleRejectAll}
        totalItems={pendingBlogs.length}
        itemType="blog post"
      />

      <div className="space-y-3 md:space-y-4">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 p-4 md:p-6"
          >
            {/* Content */}
            <div 
              className="cursor-pointer relative"
              onClick={() => setSelectedBlog(blog)}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-grow">
                  <h3 className="font-playfair text-lg md:text-xl font-medium text-gray-900">
                    {blog.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FiUser className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{new Date(blog.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Banner Thumbnail */}
                {blog.banner && (
                  <div 
                    className="w-full sm:w-[150px] h-[75px] rounded-lg overflow-hidden cursor-pointer flex-shrink-0 border border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowBanner(blog)
                    }}
                  >
                    <img
                      src={blog.banner}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <p className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600">
                {blog.excerpt}
              </p>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleApprove(blog.id)
                  }}
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs md:text-sm py-1.5 md:py-2"
                >
                  <FiCheck className="h-3 w-3 md:h-4 md:w-4" />
                  Approve
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleReject(blog.id)
                  }}
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

      {filteredBlogs.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-gray-500 text-sm md:text-base">No pending blog posts to review</p>
        </div>
      )}

    </div>

    {/* Blog Content Modal */}
    <AdminModal
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        type="markdown"
        content={selectedBlog?.content || ''}
      />

      {/* Banner Image Modal */}
      <AdminModal
        isOpen={!!showBanner}
        onClose={() => setShowBanner(null)}
        type="single-image"
        content={showBanner?.banner || ''}
      />
      
    </>
  )
}
