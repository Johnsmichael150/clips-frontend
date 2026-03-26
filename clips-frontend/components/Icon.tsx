import { InstagramIcon } from "./icons/InstagramIcon";
import { TikTokIcon } from "./icons/TikTokIcon";
import { YouTubeIcon } from "./icons/YouTubeIcon";
import { TwitchIcon } from "./icons/TwitchIcon";
import { UserIcon } from "./icons/UserIcon";

export type IconName = "instagram" | "tiktok" | "youtube" | "twitch" | "user";

interface IconProps {
  name: IconName;
  className?: string;
  "aria-hidden"?: boolean;
}

const iconMap = {
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
  twitch: TwitchIcon,
  user: UserIcon,
};

export function Icon({ name, className, "aria-hidden": ariaHidden }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  return <IconComponent className={className} aria-hidden={ariaHidden} />;
}
