import { useEffect } from "react";
import { useThumbnails } from "@/builder/hooks/use-thumbnail-cache";

interface SlideThumbProps {
  fileKey: string;
}

export function SlideThumb({ fileKey }: SlideThumbProps) {
  const { getUrl, requestCapture, rev } = useThumbnails();
  const url = getUrl(fileKey);

  useEffect(() => {
    if (!url) requestCapture(fileKey);
  }, [fileKey, url, requestCapture]);

  return (
    <div className="aspect-video relative overflow-hidden rounded-t-lg bg-neutral-100">
      {url ? (
        <img
          src={url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          // rev ensures React re-reads getUrl after cache updates
          key={rev}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
