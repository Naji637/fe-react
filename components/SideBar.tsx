"use client";

import Link from "next/link";
import {
  IconAnggota,
  IconBuku,
  IconDashboard,
  IconPeminjaman,
  IconChevronsLeft,
  IconChevronsRight,
} from "@/components/Icon";
import { usePathname } from "next/navigation";
import { useState } from "react";
const navItems = [
  {
    href: "/",
    label: "Dasboard",
    icon: IconDashboard,
  },
  {
    href: "/anggota",
    label: "Anggota",
    icon: IconAnggota,
  },
  {
    href: "/buku",
    label: "Buku",
    icon: IconBuku,
  },
  {
    href: "/peminjaman",
    label: "Peminjaman",
    icon: IconPeminjaman,
  },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <aside
        className={`relative shrink-0 border-muted/20 bg-surface flex flex-col gap-6 p-5 ${collapsed ? "w-[76px]" : "w-64"} `}
      >
        <div className="flex items-center gap-2 flex-row justify-between px-1">
          <div
            className={`flex items-center gap-2 ${collapsed ? "sr-only" : ""}`}
          >
            <span className="inline-block h-2.5 w-2.5 shrink-0  rounded-full bg-accent"></span>
            <span className="font-display text-xl font-semibold text-text">
              Perpustakaan
            </span>
          </div>
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <IconChevronsRight className="h-4 w-4" />
            ) : (
              <IconChevronsLeft className="h-4 w-4 " />
            )}
          </button>
        </div>
        <NavLinks collapsed={collapsed} />
      </aside>
    </>
  );
}

function NavLinks({ collapsed }: { collapsed: boolean }) {
  const pathName = usePathname();
  return (
    <nav className="flex flex-col  gap-1  ">
      {navItems.map((items, i) => {
        const Icon = items.icon;
        const active =
          items.href === "/"
            ? pathName === "/"
            : pathName.startsWith(items.href);
        return (
          <Link
            key={i}
            href={items.href}
            className={`flex gap-3 items-center px-4 py-2.5 rounded ${collapsed ? "justify-center px-0 " : ""}  ${active ? "bg-accent text-bg  " : "text-text hover:bg-bg"} `}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className={`font-semibold ${collapsed ? "sr-only" : ""}`}>
              {items.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
