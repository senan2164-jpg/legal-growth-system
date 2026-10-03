import type { ModuleId } from "@/lib/content";

const common = { width: 26, height: 26, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.4, "aria-hidden": true } as const;

export function ModuleIcon({ id }: { id: ModuleId }) {
  switch (id) {
    case "visibility":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="3" />
          <path d="M16 6a10 10 0 0 1 10 10M16 2a14 14 0 0 1 14 14" opacity=".5" />
          <path d="M6 16a10 10 0 0 0 10 10" />
          <circle cx="26" cy="16" r="1.4" fill="currentColor" />
        </svg>
      );
    case "acquisition":
      return (
        <svg {...common}>
          <path d="M4 7h7l5 9M4 16h12M4 25h7l5-9" />
          <path d="M16 16h8" />
          <rect x="24" y="12.5" width="5" height="7" rx="1.2" />
        </svg>
      );
    case "conversion":
      return (
        <svg {...common}>
          <circle cx="5" cy="22" r="2" />
          <circle cx="13" cy="14" r="2" />
          <circle cx="20" cy="18" r="2" />
          <path d="M6.5 20.5 11.5 15.5M15 15l3 2" />
          <rect x="23" y="5" width="6" height="6" rx="1.2" />
          <path d="M24.6 8l1 1 1.9-2M21.5 16.5 25 11" />
        </svg>
      );
    case "automation":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="9" height="7" rx="1.5" />
          <rect x="20" y="19" width="9" height="7" rx="1.5" />
          <path d="M12 9.5h6a4 4 0 0 1 4 4V19" />
          <path d="M20 22.5h-6a4 4 0 0 1-4-4V13" opacity=".5" />
          <path d="m20 17 2 2 2-2" />
        </svg>
      );
    case "intelligence":
      return (
        <svg {...common}>
          <path d="M4 26h24" opacity=".5" />
          <path d="M5 21l6-6 5 3 10-10" />
          <circle cx="26" cy="8" r="2" fill="currentColor" />
          <path d="M5 5h2M5 9h2M11 5h2" opacity=".5" />
        </svg>
      );
  }
}
