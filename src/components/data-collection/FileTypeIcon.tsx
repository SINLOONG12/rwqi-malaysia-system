
import React from 'react';
import { Camera, FileText, FileVideo } from 'lucide-react';

interface FileTypeIconProps {
  type: string;
  size?: 'sm' | 'lg';
}

const FileTypeIcon: React.FC<FileTypeIconProps> = ({ type, size = 'lg' }) => {
  const iconSize = size === 'lg' ? 'h-8 w-8' : 'h-4 w-4';
  
  switch (type) {
    case 'video':
      return <FileVideo className={`${iconSize} text-slate-400`} />;
    case 'pdf':
    case 'word':
    case 'excel':
      return <FileText className={`${iconSize} text-slate-400`} />;
    default:
      return <Camera className={`${iconSize} text-slate-400`} />;
  }
};

export default FileTypeIcon;
