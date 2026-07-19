"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import styles from "./Navbar.module.css";

type NavigationLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavigationLink({
  href,
  label,
  className,
  onNavigate,
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(styles.navLink, isActive && styles.navLinkActive, className)}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
