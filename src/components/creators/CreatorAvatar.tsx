"use client";

import { useEffect, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

// Geometry of the profile picture inside Instagram's profile embed rendered 320px wide:
// the picture is centred at (52, 73). We show a 46px circle there, which leaves out the grey
// border and the story ring.
const EMBED_WIDTH = 320;
const EMBED_HEIGHT = 160;
const CROP = { x: 29, y: 50, size: 46 };

const PX = { sm: 32, md: 44, lg: 56, xl: 80 } as const;
const USERNAME_RE = /^[A-Za-z0-9._]{1,30}$/;

interface CreatorAvatarProps {
  name: string;
  username: string;
  size?: keyof typeof PX;
  ring?: boolean;
  className?: string;
}

/**
 * Instagram profile picture, cropped out of Instagram's profile embed (an iframe, so it is clipped
 * and scaled rather than styled). Initials show underneath until it loads, or if the profile is unavailable.
 */
const CreatorAvatar = ({ name, username, size = "md", ring, className }: CreatorAvatarProps) => {
  const [loaded, setLoaded] = useState(false);
  // Mount the iframe client-side only, so onLoad can't fire before React attaches it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const px = PX[size];
  const scale = px / CROP.size;
  const valid = USERNAME_RE.test(username);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        ring && "ring-[3px] ring-white shadow-soft",
        className,
      )}
      style={{ width: px, height: px }}
    >
      <span className="absolute inset-0">
        <Avatar name={name} seed={username} size={size} />
      </span>
      {valid && mounted && (
        <iframe
          key={username}
          src={`https://www.instagram.com/${encodeURIComponent(username)}/embed`}
          title={`${name} on Instagram`}
          aria-hidden
          tabIndex={-1}
          loading="lazy"
          scrolling="no"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={cn(
            "pointer-events-none absolute max-w-none border-0 transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: EMBED_WIDTH,
            height: EMBED_HEIGHT,
            left: -CROP.x * scale,
            top: -CROP.y * scale,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        />
      )}
    </span>
  );
};

export default CreatorAvatar;
