import Link from "next/link";

import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function TextLink({
  href,
  children,
  className,
  external = false,
}: TextLinkProps) {
  const classes = cn(
    "relative inline-flex items-center font-sans text-sm tracking-[0.03em] text-foreground",
    "underline decoration-transparent underline-offset-[0.4em] transition-[color,text-decoration-color] duration-300",
    "hover:text-foreground-soft hover:decoration-accent/70",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
