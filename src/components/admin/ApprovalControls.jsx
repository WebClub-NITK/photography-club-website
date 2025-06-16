import { FiSearch, FiCheck, FiX } from 'react-icons/fi'
import Button from '../Button'

export default function ApprovalControls({ 
  onSearch, 
  onApproveAll, 
  onRejectAll,
  totalItems,
  itemType 
}) {
  return (
    <div className="space-y-4">
      {/* Search and Filter Area */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={`Search ${itemType}...`}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onSearch(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={onApproveAll}
            variant="primary"
            size="sm"
            className="text-xs md:text-sm py-1.5 md:py-2"
          >
            <FiCheck className="h-3 w-3 md:h-4 md:w-4" />
            Approve All
          </Button>
          <Button
            onClick={onRejectAll}
            variant="outline"
            size="sm"
            className="text-xs md:text-sm py-1.5 md:py-2"
          >
            <FiX className="h-3 w-3 md:h-4 md:w-4" />
            Reject All
          </Button>
        </div>
      </div>
    </div>
  )
} 