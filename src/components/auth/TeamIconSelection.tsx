import { useMemo, useState, useCallback, useEffect } from 'react';
import { AiOutlineDoubleLeft, AiOutlineSearch } from 'react-icons/ai';
import { IconType } from 'react-icons';

interface TeamIconSelectionProps {
  selectedIcon: string;
  selectedColor: string;
  onIconSelect: (iconName: string) => void;
}

interface IconData {
  name: string;
  component: IconType | null;
}

export default function TeamIconSelection({ selectedIcon, selectedColor, onIconSelect }: TeamIconSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [icons, setIcons] = useState<IconData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const iconsPerPage = 20;

  // Load icons dynamically
  useEffect(() => {
    const loadIcons = async () => {
      setLoading(true);
      try {
        const iconModule = await import('react-icons/gi');
        const iconNames = Object.keys(iconModule);
        const filteredIcons = iconNames
          .filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map(name => ({
            name,
            component: iconModule[name as keyof typeof iconModule] as IconType
          }));
        setIcons(filteredIcons);
        // Reset to page 1 when search changes
        setPage(1);
      } catch (error) {
        console.error('Error loading icons:', error);
      }
      setLoading(false);
    };

    loadIcons();
  }, [searchQuery]);

  // Calculate paginated icons
  const paginatedIcons = useMemo(() => {
    const start = (page - 1) * iconsPerPage;
    return icons.slice(start, start + iconsPerPage);
  }, [icons, page]);

  const totalPages = Math.ceil(icons.length / iconsPerPage);

  // Handle navigation
  const handlePrevious = useCallback(() => {
    setPage(prev => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setPage(prev => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // Render individual icon
  const renderIcon = useCallback((iconData: IconData) => {
    const { name, component: Icon } = iconData;
    const isSelected = name === selectedIcon;
    return Icon ? (
      <div
        key={name}
        className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all
          ${isSelected ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
        onClick={() => onIconSelect(name)}
        title={name}
      >
        <Icon 
          className="w-8 h-8" 
          style={{ color: isSelected ? selectedColor : '#6B7280' }} 
        />
      </div>
    ) : null;
  }, [selectedIcon, selectedColor, onIconSelect]);

  return (
    <div className="w-full space-y-4">
      <label className="block text-white mb-2">Team Icon</label>
      
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search icons..."
          className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Icons grid */}
      <div className="relative min-h-[200px]">
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {paginatedIcons.map(renderIcon)}
          </div>
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between">
        <button 
          type="button"
          className="p-2 text-white hover:bg-gray-700 rounded-full disabled:opacity-50"
          onClick={handlePrevious}
          disabled={page <= 1}
        >
          <AiOutlineDoubleLeft className="w-5 h-5" />
        </button>
        
        <span className="text-white">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          className="p-2 text-white hover:bg-gray-700 rounded-full disabled:opacity-50"
          onClick={handleNext}
          disabled={page >= totalPages}
        >
          <AiOutlineDoubleLeft className="w-5 h-5 transform rotate-180" />
        </button>
      </div>
    </div>
  );
}