'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ExpertImageProps {
  size: 'small' | 'large';
  name: string;
  className?: string;
}

export default function ExpertImage({ size, name, className = '' }: ExpertImageProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-16 h-16',
    large: 'w-32 h-32'
  };

  const textSizes = {
    small: 'text-sm',
    large: 'text-2xl'
  };

  const imageSizes = {
    small: 64,
    large: 128
  };

  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} bg-gray-300 rounded-full flex items-center justify-center ${className}`}>
        <span className={`text-gray-600 font-semibold ${textSizes[size]}`}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} bg-gray-300 rounded-full overflow-hidden ${className}`}>
      <Image
        src="/images/marit-reiersgard.jpg"
        alt={`${name}, Enneagram-ekspert`}
        width={imageSizes[size]}
        height={imageSizes[size]}
        className="w-full h-full object-cover"
        priority={size === 'large'}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
