import Image from "next/image";
import Link from "next/link";
import { YouTubeIcon } from "@/components/icons/YouTubeIcon";
import { TwitchIcon } from "@/components/icons/TwitchIcon";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

type PlatformItem = {
  label: string;
  icon: React.FC<{ className?: string; "aria-hidden"?: boolean }>;
  href: string;
};

type LegalItem = {
  label: string;
  href: string;
};

const PLATFORM_ITEMS: PlatformItem[] = [
  { label: "YouTube", icon: YouTubeIcon, href: "#" },
  { label: "Twitch", icon: TwitchIcon, href: "#" },
  { label: "TikTok", icon: TikTokIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
];

const LEGAL_ITEMS: LegalItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "API Documentation", href: "/api-docs" },
  { label: "Pricing", href: "/pricing" },
];

export default function Footer() {
  return (
    <footer
      className={[
        "w-full border-t border-white/[0.07]",
        "bg-[#0A0A0ACC] backdrop-blur-xl",
        "px-4 md:px-6 py-8",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="ClipCash logo"
            height={100}
            width={400}
            className="object-cover w-28 h-auto"
          />
          <span className="text-gray-400 text-xs text-center">
            © 2024 ClipCash AI. Built for the future of content creation.
          </span>
        </div>

        <div className="flex items-center gap-6">
          {LEGAL_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={[
                "text-xs text-gray-400",
                "hover:text-gray-300 hover:underline",
                "transition-colors duration-150",
              ].join(" ")}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <nav aria-label="Partner platforms" className="flex items-center gap-6">
          {PLATFORM_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <item.icon aria-hidden />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
