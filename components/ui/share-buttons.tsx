'use client';

import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  text: string;
}

export function ShareButtons({ url, text }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

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
    <div className="flex flex-wrap gap-4 mt-6 mb-2 justify-end">
      
      {/* Native Share (mobile) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <Button
          onClick={handleNativeShare}
          variant="outline"
          size="sm"
          className="border-orange-500 hover:bg-orange-500 text-white"
        >
          <Share2 className="w-4 h-4 mr-2 text-white" />
          Share
        </Button>
      )}

      {/* Copy URL */}
      <Button
        onClick={handleCopyUrl}
        variant="outline"
        size="sm"
        className="border-orange-500 hover:bg-orange-500 text-white"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
}