import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { FiImage, FiEdit3, FiMenu, FiX } from 'react-icons/fi'
import PhotographApprovals from './photographApprovals'
import BlogApprovals from './blogApprovals'

export default function AdminPortal() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('photographs')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  // Check for correct admin credentials
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const checkAdmin = async () => {
      const response = { ok: true }
      if (response.ok) {
        setIsAdmin(true)
      } else {
        navigate('/admin/login')
      }
    }
    checkAdmin()
  }, [])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-[80px] right-4 z-30 p-2 px-4 bg-white rounded-full shadow-lg border border-gray-200 flex items-center gap-2"
      >
        <span className='text-sm font-medium'>Admin Menu</span>
        {isSidebarOpen ? (
          <FiX className="h-5 w-5 text-gray-600" />
        ) : (
          <FiMenu className="h-5 w-5 text-gray-600" />
        )}
      </button>

      <div className="min-h-[calc(100vh-65px)] flex">
        {/* Side Panel */}
        <div 
          className={`fixed lg:static inset-y-[65px] left-0 z-12 w-64 bg-white border-r border-gray-200 p-6 flex flex-col transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <h2 className='text-2xl font-bold text-gray-900'>Admin Portal</h2>
          <p className='text-sm text-gray-500 mb-6 font-medium'>Signed in as <span className='font-bold'>Admin</span></p>

          {/* Category */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-tertiary tracking-wider uppercase">Approvals</h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveTab('photographs')
                  setIsSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                  ${activeTab === 'photographs' 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiImage className="h-4 w-4" />
                Photographs
              </button>
              <button
                onClick={() => {
                  setActiveTab('blogs')
                  setIsSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                  ${activeTab === 'blogs' 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <FiEdit3 className="h-4 w-4" />
                Blogs
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 bg-gray-50 p-4 md:p-6 lg:p-8 pt-16 lg:pt-8">
          {activeTab === 'photographs' ? <PhotographApprovals /> : <BlogApprovals />}
        </div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  )
}
