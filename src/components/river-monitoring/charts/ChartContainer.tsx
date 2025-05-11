
import React from 'react';

interface ChartContainerProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
}

/**
 * A wrapper component for charts to ensure proper dimensions
 * Helps prevent the "width(0) and height(0)" warnings from Recharts
 */
const ChartContainer: React.FC<ChartContainerProps> = ({
  children,
  height = 300,
  className = ""
}) => {
  return (
    <div 
      className={`w-full ${className}`}
      style={{ 
        height: `${height}px`, 
        minHeight: `${height}px`, 
        position: 'relative' 
      }}
    >
      {children}
    </div>
  );
};

export default ChartContainer;
