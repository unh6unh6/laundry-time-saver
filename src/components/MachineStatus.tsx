
import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Machine {
  id: string;
  type: 'washer' | 'dryer';
  status: 'available' | 'in-use' | 'maintenance';
  timeRemaining: number;
  capacity: string;
}

interface MachineStatusProps {
  title: string;
  machines: Machine[];
  available: number;
  total: number;
  type: 'washer' | 'dryer';
}

const MachineStatus: React.FC<MachineStatusProps> = ({ title, machines, available, total, type }) => {
  const getStatusIcon = (status: Machine['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'in-use':
        return <Clock size={16} className="text-blue-500" />;
      case 'maintenance':
        return <AlertCircle size={16} className="text-red-500" />;
    }
  };

  const getStatusText = (machine: Machine) => {
    switch (machine.status) {
      case 'available':
        return '사용가능';
      case 'in-use':
        return `${machine.timeRemaining}분 남음`;
      case 'maintenance':
        return '점검중';
    }
  };

  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'available':
        return 'border-green-200 bg-green-50';
      case 'in-use':
        return 'border-blue-200 bg-blue-50';
      case 'maintenance':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {type === 'washer' ? '🧽' : '🌪️'} {title}
        </h3>
        <div className="text-sm">
          <span className="text-green-600 font-semibold">{available}</span>
          <span className="text-gray-500">/{total} 사용가능</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className={`border-2 rounded-lg p-3 transition-colors ${getStatusColor(machine.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {machine.id.toUpperCase()}
              </span>
              {getStatusIcon(machine.status)}
            </div>
            
            <div className="text-xs text-gray-600 mb-1">
              {machine.capacity}
            </div>
            
            <div className="text-sm font-medium">
              {getStatusText(machine)}
            </div>
            
            {machine.status === 'in-use' && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.max(0, 100 - (machine.timeRemaining / 45) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 빠른 통계 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">평균 대기시간:</span>
          <span className="font-medium">
            {machines
              .filter(m => m.status === 'in-use')
              .reduce((acc, m) => acc + m.timeRemaining, 0) / 
              Math.max(1, machines.filter(m => m.status === 'in-use').length)
            }분
          </span>
        </div>
      </div>
    </div>
  );
};

export default MachineStatus;
