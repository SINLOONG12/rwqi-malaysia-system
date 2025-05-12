
import React from 'react';
import { Map, Bell, History, Database, FileText } from 'lucide-react';

interface QuickActionsProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onQuickAction: (tabId: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  visible, 
  setVisible, 
  onQuickAction 
}) => {
  return (
    <div className={`${visible ? 'mb-8' : 'mb-0'}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Quick Actions</h2>
        <button 
          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {visible && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <button 
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all active:scale-95"
            onClick={() => onQuickAction("map")}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mb-2">
              <Map className="h-5 w-5" />
            </div>
            View Map
          </button>
          <button 
            className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-700 dark:text-red-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all active:scale-95"
            onClick={() => onQuickAction("alerts")}
          >
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mb-2">
              <Bell className="h-5 w-5" />
            </div>
            Alerts
          </button>
          <button 
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-700 dark:text-green-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all active:scale-95"
            onClick={() => onQuickAction("historical")}
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mb-2">
              <History className="h-5 w-5" />
            </div>
            Historical Data
          </button>
          <button 
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-700 dark:text-purple-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all active:scale-95"
            onClick={() => onQuickAction("analytics")}
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mb-2">
              <Database className="h-5 w-5" />
            </div>
            Analytics
          </button>
          <button 
            className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 text-amber-700 dark:text-amber-300 p-4 rounded-xl flex flex-col items-center text-xs font-medium hover:shadow-md transition-all active:scale-95"
            onClick={() => onQuickAction("reports")}
          >
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg mb-2">
              <FileText className="h-5 w-5" />
            </div>
            Reports
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
