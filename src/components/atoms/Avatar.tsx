import React from 'react';
import { generateAvatarUrl } from '../../utils/avatar';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ name, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <img
      src={generateAvatarUrl(name)}
      alt={`${name}'s avatar`}
      className={`${sizeClasses[size]} rounded-full bg-gray-700/50`}
    />
  );
}