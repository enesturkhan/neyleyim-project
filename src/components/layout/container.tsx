import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  width?: "wide" | "standard";
  className?: string;
};

export function Container({
  children,
  as: Tag = "div",
  width = "standard",
  className,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        width === "wide" ? "container-wide" : "container-standard",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
