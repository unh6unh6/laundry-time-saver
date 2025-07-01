
import React from 'react';
import { MapPin, Star, Clock } from 'lucide-react';

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

interface LaundryCardProps {
  shop: LaundryShop;
  onSelect: () => void;
  isSelected: boolean;
}

const LaundryCard: React.FC<LaundryCardProps> = ({ shop, onSelect, isSelected }) => {
  const getStatusColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio >= 0.5) return 'text-green-600 bg-green-100';
    if (ratio >= 0.25) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getNextAvailable = (machines: Machine[]) => {
    const inUseMachines = machines
      .filter(m => m.status === 'in-use')
      .sort((a, b) => a.timeRemaining - b.timeRemaining);
    
    return inUseMachines.length > 0 ? inUseMachines[0].timeRemaining : null;
  };

  const nextWasherTime = getNextAvailable(shop.washers);
  const nextDryerTime = getNextAvailable(shop.dryers);

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border-2 p-6 ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{shop.name}</h3>
          <p className="text-gray-600 flex items-center gap-1 text-sm mb-1">
            <MapPin size={14} />
            {shop.address}
          </p>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="font-medium">{shop.rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{shop.distance}km</span>
            <span className="text-gray-400">•</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              shop.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {shop.isOpen ? '영업중' : '영업종료'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 세탁기 현황 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">🧽 세탁기</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              getStatusColor(shop.availableWashers, shop.totalWashers)
            }`}>
              {shop.availableWashers}/{shop.totalWashers} 사용가능
            </span>
          </div>
          {shop.availableWashers === 0 && nextWasherTime && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} />
              다음 사용가능: {nextWasherTime}분 후
            </p>
          )}
        </div>

        {/* 건조기 현황 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">🌪️ 건조기</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              getStatusColor(shop.availableDryers, shop.totalDryers)
            }`}>
              {shop.availableDryers}/{shop.totalDryers} 사용가능
            </span>
          </div>
          {shop.availableDryers === 0 && nextDryerTime && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock size={12} />
              다음 사용가능: {nextDryerTime}분 후
            </p>
          )}
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-blue-600 font-medium">상세 정보를 확인하려면 클릭하세요</p>
        </div>
      )}
    </div>
  );
};

export default LaundryCard;
