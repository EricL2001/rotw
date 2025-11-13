'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  text: string;
}

export function ShareButton({ url, text }: ShareButtonsProps) {

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: text,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6 mb-5 justify-right">
      
      {/* Native Share (mobile) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          onClick={handleNativeShare}
          variant="outline"
          size="sm"
          className="border-orange-500/70 bg-orange-500/70 hover:bg-orange-500/90 text-white rounded-full w-10 h-10 p-0"
        >
          <Share2 className="w-4 h-4 text-white" />
        </Button>
      )}
    </div>
  );
}