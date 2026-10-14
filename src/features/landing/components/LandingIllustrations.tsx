import type { SVGProps } from "react";

type IllustrationProps = SVGProps<SVGSVGElement>;

const INK = "#103a32";
const PAPER = "#fbfaf6";
const LEAF = "#a8ce7a";
const TEAL = "#028090";
const YELLOW = "#f2c64f";

export function TrackingRouteIllustration({ className, ...props }: IllustrationProps) {
  return (
    <svg viewBox="0 0 760 196" className={className} aria-hidden="true" focusable="false" {...props}>
      <path d="M80 112c68 0 118-42 200-42s130 56 200 56 130-36 200-36" fill="none" stroke={LEAF} strokeWidth="12" strokeLinecap="round" />
      <path d="M80 112c68 0 118-42 200-42s130 56 200 56 130-36 200-36" fill="none" stroke={PAPER} strokeWidth="3.5" strokeDasharray="8 13" strokeLinecap="round" />
      <g>
        <circle cx="80" cy="112" r="35" fill={PAPER} stroke={INK} strokeWidth="4.5" />
        <path d="m60 113 20-17 20 17v20H60z" fill={LEAF} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M76 133v-13h9v13" fill={PAPER} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      </g>
      <g>
        <circle cx="280" cy="70" r="35" fill={PAPER} stroke={INK} strokeWidth="4.5" />
        <path d="M261 67h38v23h-38z" fill={PAPER} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="m258 67 5-14h34l5 14z" fill={LEAF} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M274 90V76h12v14" fill={YELLOW} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M264 71h32" stroke={TEAL} strokeWidth="3.5" />
      </g>
      <g>
        <circle cx="480" cy="126" r="35" fill={PAPER} stroke={INK} strokeWidth="4.5" />
        <path d="m480 103 21 12-21 12-21-12z" fill={YELLOW} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M459 115v24l21 12v-24m21-12v24l-21 12" fill={YELLOW} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M480 127v24" stroke={TEAL} strokeWidth="4.5" />
      </g>
      <g>
        <circle cx="680" cy="90" r="35" fill={PAPER} stroke={INK} strokeWidth="4.5" />
        <path d="m662 90 12 12 25-27" fill="none" stroke={TEAL} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
