
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface Machine {
  id: string;
  type: 'washer' | 'dryer';
  status: 'available' | 'in-use' | 'maintenance';
  timeRemaining: number;
  capacity: string;
}

interface LaundryShop {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  totalWashers: number;
  totalDryers: number;
  availableWashers: number;
  availableDryers: number;
  washers: Machine[];
  dryers: Machine[];
  isOpen: boolean;
}

interface LaundryMapProps {
  shops: LaundryShop[];
  onShopSelect: (shop: LaundryShop) => void;
}

const LaundryMap: React.FC<LaundryMapProps> = ({ shops, onShopSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin size={20} />
            주변 세탁소 지도
          </h2>
          <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1">
            <Navigation size={14} />
            내 위치
          </button>
        </div>
      </div>

      {/* Simulated Map Area */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Map Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Simulated Roads */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-0 right-0 h-2 bg-gray-300"></div>
          <div className="absolute bottom-32 left-0 right-0 h-2 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 right-1/3 w-2 bg-gray-300"></div>
        </div>

        {/* Current Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-600 whitespace-nowrap">
            현재 위치
          </div>
        </div>

        {/* Laundry Shop Markers */}
        {shops.map((shop, index) => {
          const positions = [
            { top: '25%', left: '60%' },
            { top: '60%', left: '30%' },
            { top: '70%', left: '70%' }
          ];
          const position = positions[index] || positions[0];

          return (
            <div
              key={shop.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={position}
              onClick={() => onShopSelect(shop)}
            >
              {/* Marker */}
              <div className="relative">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold transition-transform group-hover:scale-110 ${
                  shop.availableWashers + shop.availableDryers > 0 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`}>
                  {shop.availableWashers + shop.availableDryers}
                </div>
                
                {/* Info Popup */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-white rounded-lg shadow-xl p-3 min-w-48 border">
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{shop.name}</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>세탁기:</span>
                        <span className="font-medium">{shop.availableWashers}/{shop.totalWashers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>건조기:</span>
                        <span className="font-medium">{shop.availableDryers}/{shop.totalDryers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>거리:</span>
                        <span className="font-medium">{shop.distance}km</span>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Legend */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">사용가능한 기계 있음</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-700">모든 기계 사용중</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-gray-700">내 위치</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaundryMap;
