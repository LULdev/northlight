import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

export function Lightbox({
  images,
  captions,
  index,
  onIndex,
  onClose,
}: {
  images: string[];
  captions: string[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const prev = () => onIndex((index - 1 + images.length) % images.length);
  const next = () => onIndex((index + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [index, images.length, onClose, onIndex]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg/95 text-ink" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between px-3 py-2">
        <p className="px-2 text-sm tabular-nums text-muted">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-md hover:bg-paper"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        {images.length > 1 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 grid size-11 place-items-center rounded-md hover:bg-paper sm:left-4"
            aria-label="Previous"
          >
            <ChevronLeft className="size-6" />
          </button>
        )}
        <figure className="max-h-full max-w-5xl">
          <img
            src={images[index]}
            alt={captions[index] ?? ""}
            className="max-h-[min(78dvh,820px)] w-full object-contain"
          />
          {captions[index] && (
            <figcaption className="mt-3 text-center text-sm text-muted">{captions[index]}</figcaption>
          )}
        </figure>
        {images.length > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-2 grid size-11 place-items-center rounded-md hover:bg-paper sm:right-4"
            aria-label="Next"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>
    </div>
  );
}
