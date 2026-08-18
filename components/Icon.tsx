import React from "react";
import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconDashboard(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" />
      <rect x="13" y="12" width="8" height="9" rx="1.5" />
      <rect x="3" y="15" width="8" height="6" rx="1.5" />
    </svg>
  );
}

export function IconAnggota(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 20c.7-3.3 3-5 5.5-5s4.8 1.7 5.5 5" />
      <path d="M16 4.5c1.5.3 2.75 1.6 2.75 3.5S17.5 11.2 16 11.5" />
      <path d="M15.5 15c2.3.3 4 1.9 4.5 5" />
    </svg>
  );
}

export function IconBuku(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4.5C4 3.7 4.7 3 5.5 3H12v18H5.5c-.8 0-1.5-.7-1.5-1.5v-15Z" />
      <path d="M20 4.5c0-.8-.7-1.5-1.5-1.5H12v18h6.5c.8 0 1.5-.7 1.5-1.5v-15Z" />
      <path d="M12 3v18" />
    </svg>
  );
}

export function IconPeminjaman(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h13" />
      <path d="M14 3.5 17.5 7 14 10.5" />
      <path d="M20 17H7" />
      <path d="M10 20.5 6.5 17 10 13.5" />
    </svg>
  );
}

export function IconChevronsLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 6l-6 6 6 6" />
      <path d="M19 6l-6 6 6 6" />
    </svg>
  );
}

export function IconChevronsRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11 6l6 6-6 6" />
      <path d="M5 6l6 6-6 6" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}


