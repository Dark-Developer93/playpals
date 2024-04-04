'use client';

import React, { useState } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useWindowSize from 'hooks/useWindowSize';

interface Props {
  children: React.ReactNode;
}

const validationsMessages = [
  'Password must be at least 8 characters long',
  'Password must contain at least one capital letter',
  'Password must contain at least one number',
];

const PasswordValidationsInfo = ({ children }: Props): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const { isSize } = useWindowSize();

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger
          asChild
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent side={isSize('md') ? 'left' : 'top'}>
          <ul className="p-4 flex flex-col gap-3">
            {validationsMessages.map((message) => (
              <li key={message} className="text-secondary list-disc">
                {message}
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PasswordValidationsInfo;
