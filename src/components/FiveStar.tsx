import { cn } from '@/lib/utils';

import { Star } from 'lucide-react';

const FiveStar = ({ className }: { className?: string }) => {
  return (
    <>
      <Star
        className={cn(`h-4 w-4 text-orange-600 fill-orange-600`, className)}
      />
      <Star
        className={cn(`h-4 w-4 text-orange-600 fill-orange-600`, className)}
      />
      <Star
        className={cn(`h-4 w-4 text-orange-600 fill-orange-600`, className)}
      />
      <Star
        className={cn(`h-4 w-4 text-orange-600 fill-orange-600`, className)}
      />
      <Star
        className={cn(`h-4 w-4 text-orange-600 fill-orange-600`, className)}
      />
    </>
  );
};

export default FiveStar;
