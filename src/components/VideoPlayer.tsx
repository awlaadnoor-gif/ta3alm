import { Download, Play } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  title: string;
  description: string;
  url: string;
}

const getYouTubeId = (url: string): string | null => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const VideoPlayer = ({ title, description, url }: VideoPlayerProps) => {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(url);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
      {/* Video embed area */}
      <div className="relative w-full aspect-video bg-black">
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full group cursor-pointer"
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
              <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-primary-foreground fill-current mr-[-2px]" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-lg font-bold text-foreground">{title}</h4>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 text-sm font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            تحميل
          </a>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
