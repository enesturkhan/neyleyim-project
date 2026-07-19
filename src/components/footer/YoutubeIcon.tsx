type YoutubeIconProps = {
  className?: string;
};

export function YoutubeIcon({ className }: YoutubeIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M21.6 8.2a2.7 2.7 0 0 0-1.9-1.9C17.9 5.9 12 5.9 12 5.9s-5.9 0-7.7.4A2.7 2.7 0 0 0 2.4 8.2 28.4 28.4 0 0 0 2 12a28.4 28.4 0 0 0 .4 3.8 2.7 2.7 0 0 0 1.9 1.9c1.8.4 7.7.4 7.7.4s5.9 0 7.7-.4a2.7 2.7 0 0 0 1.9-1.9A28.4 28.4 0 0 0 22 12a28.4 28.4 0 0 0-.4-3.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.4 14.7V9.3L14.9 12l-4.5 2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
