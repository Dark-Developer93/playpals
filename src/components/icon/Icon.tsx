import React from 'react';
import { icons } from './icons';

interface IconProps {
  icon: string;
  width: string;
  height: string;
  fill?: string;
  stroke?: string;
}

const Icon = ({ fill, height, icon, stroke, width }: IconProps) => {
  return (
    <span
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: icons[icon]
          .replace('#width', width)
          .replace('#height', height)
          .replace('#fill', fill || 'none')
          .replaceAll('#stroke', stroke || 'none'),
      }}
    />
  );
};

export default Icon;
