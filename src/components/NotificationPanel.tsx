
import React, { useState } from 'react';
import { Bell, Clock, X, Plus } from 'lucide-react';

interface Notification {
  id: string;
  shopName: string;
  machineId: string;
  timeRemaining: number;
  type: 'wash' | 'dry';
  isActive: boolean;
}

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      shopName: '24시 코인세탁소 홍대점',
      machineId: 'W2',
      timeRemaining: 23,
      type: 'wash',
      isActive: true
    },
    {
      id: '2',
      shopName: '24시 코인세탁소 홍대점',
      machineId: 'D2',
      timeRemaining: 18,
      type: 'dry',
      isActive: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}분`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes}분`;
  };

  if (notifications.length === 0 && !showAddForm) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div className="text-center">
          <Bell size={48} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">알림 설정</h3>
          <p className="text-gray-600 mb-4">세탁 완료 시간을 알림으로 받아보세요</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <Plus size={16} />
            알림 추가
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bell size={20} />
          내 알림
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
        >
          <Plus size={16} />
          추가
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                {notification.type === 'wash' ? '🧽' : '🌪️'}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {notification.shopName} - {notification.machineId}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock size={14} />
                  {formatTime(notification.timeRemaining)} 후 완료 예정
                </p>
              </div>
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* 알림 설정 팁 */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 mt-0.5">💡</div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">알림 팁</h4>
            <p className="text-sm text-yellow-700">
              세탁 완료 5분 전과 완료 시점에 푸시 알림을 받을 수 있습니다. 
              알림을 허용하면 더 정확한 타이밍에 세탁소를 방문할 수 있어요!
            </p>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">새 알림 추가</h4>
          <div className="space-y-3">
            <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
              <option>세탁소 선택</option>
              <option>24시 코인세탁소 홍대점</option>
              <option>셀프세탁소 신촌점</option>
              <option>깨끗한세탁소 합정점</option>
            </select>
            <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
              <option>기계 선택</option>
              <option>세탁기 W1</option>
              <option>세탁기 W2</option>
              <option>건조기 D1</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                알림 설정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
