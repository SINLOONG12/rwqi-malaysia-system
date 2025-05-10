
import React from 'react';
import { FileText, FileVideo, FileImage, FileSpreadsheet, Camera } from 'lucide-react';

interface FileTypeIconProps {
  type: string;
  size?: 'sm' | 'lg';
}

const FileTypeIcon: React.FC<FileTypeIconProps> = ({ type, size = 'lg' }) => {
  const iconSize = size === 'lg' ? 'h-8 w-8' : 'h-4 w-4';
  
  switch (type.toLowerCase()) {
    case 'video':
      return <FileVideo className={`${iconSize} text-slate-400`} />;
    case 'pdf':
      return <FileText className={`${iconSize} text-rose-400`} />;
    case 'word':
      return <FileText className={`${iconSize} text-blue-400`} />;
    case 'excel':
      return <FileSpreadsheet className={`${iconSize} text-green-400`} />;
    case 'image':
      return <FileImage className={`${iconSize} text-slate-400`} />;
    default:
      return <Camera className={`${iconSize} text-slate-400`} />;
  }
};

export default FileTypeIcon;
