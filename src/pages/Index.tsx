
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Bell, Star, RefreshCw } from 'lucide-react';
import LaundryMap from '../components/LaundryMap';
import LaundryCard from '../components/LaundryCard';
import MachineStatus from '../components/MachineStatus';
import NotificationPanel from '../components/NotificationPanel';

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

interface Machine {
  id: string;
  type: 'washer' | 'dryer';
  status: 'available' | 'in-use' | 'maintenance';
  timeRemaining: number; // minutes
  capacity: string;
}

const Index = () => {
  const [laundryShops, setLaundryShops] = useState<LaundryShop[]>([]);
  const [selectedShop, setSelectedShop] = useState<LaundryShop | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - 실제로는 API에서 가져올 데이터
  useEffect(() => {
    const mockData: LaundryShop[] = [
      {
        id: '1',
        name: '24시 코인세탁소 홍대점',
        address: '서울시 마포구 홍익로 123',
        distance: 0.3,
        rating: 4.5,
        totalWashers: 8,
        totalDryers: 6,
        availableWashers: 3,
        availableDryers: 2,
        isOpen: true,
        washers: [
          { id: 'w1', type: 'washer', status: 'available', timeRemaining: 0, capacity: '8kg' },
          { id: 'w2', type: 'washer', status: 'in-use', timeRemaining: 23, capacity: '8kg' },
          { id: 'w3', type: 'washer', status: 'in-use', timeRemaining: 15, capacity: '12kg' },
          { id: 'w4', type: 'washer', status: 'available', timeRemaining: 0, capacity: '8kg' },
          { id: 'w5', type: 'washer', status: 'in-use', timeRemaining: 41, capacity: '12kg' },
          { id: 'w6', type: 'washer', status: 'available', timeRemaining: 0, capacity: '8kg' },
          { id: 'w7', type: 'washer', status: 'in-use', timeRemaining: 7, capacity: '8kg' },
          { id: 'w8', type: 'washer', status: 'in-use', timeRemaining: 33, capacity: '12kg' },
        ],
        dryers: [
          { id: 'd1', type: 'dryer', status: 'available', timeRemaining: 0, capacity: '8kg' },
          { id: 'd2', type: 'dryer', status: 'in-use', timeRemaining: 18, capacity: '8kg' },
          { id: 'd3', type: 'dryer', status: 'in-use', timeRemaining: 35, capacity: '12kg' },
          { id: 'd4', type: 'dryer', status: 'available', timeRemaining: 0, capacity: '8kg' },
          { id: 'd5', type: 'dryer', status: 'in-use', timeRemaining: 12, capacity: '12kg' },
          { id: 'd6', type: 'dryer', status: 'in-use', timeRemaining: 28, capacity: '8kg' },
        ]
      },
      {
        id: '2',
        name: '셀프세탁소 신촌점',
        address: '서울시 서대문구 신촌로 456',
        distance: 0.7,
        rating: 4.2,
        totalWashers: 6,
        totalDryers: 4,
        availableWashers: 1,
        availableDryers: 1,
        isOpen: true,
        washers: [
          { id: 'w1', type: 'washer', status: 'in-use', timeRemaining: 19, capacity: '8kg' },
          { id: 'w2', type: 'washer', status: 'in-use', timeRemaining: 25, capacity: '8kg' },
          { id: 'w3', type: 'washer', status: 'available', timeRemaining: 0, capacity: '12kg' },
          { id: 'w4', type: 'washer', status: 'in-use', timeRemaining: 8, capacity: '8kg' },
          { id: 'w5', type: 'washer', status: 'in-use', timeRemaining: 37, capacity: '12kg' },
          { id: 'w6', type: 'washer', status: 'in-use', timeRemaining: 14, capacity: '8kg' },
        ],
        dryers: [
          { id: 'd1', type: 'dryer', status: 'in-use', timeRemaining: 22, capacity: '8kg' },
          { id: 'd2', type: 'dryer', status: 'in-use', timeRemaining: 31, capacity: '8kg' },
          { id: 'd3', type: 'dryer', status: 'available', timeRemaining: 0, capacity: '12kg' },
          { id: 'd4', type: 'dryer', status: 'in-use', timeRemaining: 16, capacity: '8kg' },
        ]
      },
      {
        id: '3',
        name: '깨끗한세탁소 합정점',
        address: '서울시 마포구 합정로 789',
        distance: 1.2,
        rating: 4.0,
        totalWashers: 10,
        totalDryers: 8,
        availableWashers: 5,
        availableDryers: 3,
        isOpen: true,
        washers: Array.from({ length: 10 }, (_, i) => ({
          id: `w${i + 1}`,
          type: 'washer' as const,
          status: i < 5 ? 'available' as const : Math.random() > 0.5 ? 'in-use' as const : 'available' as const,
          timeRemaining: i < 5 ? 0 : Math.floor(Math.random() * 45) + 5,
          capacity: i % 3 === 0 ? '12kg' : '8kg'
        })),
        dryers: Array.from({ length: 8 }, (_, i) => ({
          id: `d${i + 1}`,
          type: 'dryer' as const,
          status: i < 3 ? 'available' as const : Math.random() > 0.3 ? 'in-use' as const : 'available' as const,
          timeRemaining: i < 3 ? 0 : Math.floor(Math.random() * 40) + 10,
          capacity: i % 2 === 0 ? '12kg' : '8kg'
        }))
      }
    ];
    setLaundryShops(mockData);
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, would fetch fresh data here
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                🧺 세탁소 찾기
              </h1>
              <p className="text-sm text-gray-600 mt-1">실시간 세탁기 현황을 확인하세요</p>
            </div>
            <button
              onClick={refreshData}
              disabled={isLoading}
              className={`p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors ${
                isLoading ? 'animate-spin' : ''
              }`}
            >
              <RefreshCw size={20} />
            </button>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              목록보기
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              지도보기
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {viewMode === 'map' ? (
          <LaundryMap shops={laundryShops} onShopSelect={setSelectedShop} />
        ) : (
          <div className="space-y-4">
            {laundryShops.map((shop) => (
              <LaundryCard
                key={shop.id}
                shop={shop}
                onSelect={() => setSelectedShop(shop)}
                isSelected={selectedShop?.id === shop.id}
              />
            ))}
          </div>
        )}

        {/* Selected Shop Detail */}
        {selectedShop && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedShop.name}</h2>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin size={16} />
                  {selectedShop.address}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{selectedShop.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{selectedShop.distance}km</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedShop(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <MachineStatus
                title="세탁기"
                machines={selectedShop.washers}
                available={selectedShop.availableWashers}
                total={selectedShop.totalWashers}
                type="washer"
              />
              <MachineStatus
                title="건조기"
                machines={selectedShop.dryers}
                available={selectedShop.availableDryers}
                total={selectedShop.totalDryers}
                type="dryer"
              />
            </div>
          </div>
        )}

        {/* Notification Panel */}
        <NotificationPanel />
      </div>
    </div>
  );
};

export default Index;
