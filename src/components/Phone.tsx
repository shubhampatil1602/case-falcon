import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imagSrc: string;
  dark?: boolean;
}

const Phone = ({ imagSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
    >
      <img
        className='pointer-events-none z-50 select-none'
        src={dark ? '/phone-template-dark.png' : '/phone-template-white.png'}
        alt='phone template'
      />

      <div className='absolute -z-10 inset-0'>
        <img src={imagSrc} alt='phone image' className='object-cover' />
      </div>
    </div>
  );
};

export default Phone;
