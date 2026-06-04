export type PrFilter = "open" | "closed" | "merged" | "all";

const FILTERS: { value: PrFilter; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "merged", label: "Merged" },
  { value: "closed", label: "Closed" },
  { value: "all", label: "All" },
];

export function PrFilterTabs({
  value,
  onChange,
}: {
  value: PrFilter;
  onChange: (filter: PrFilter) => void;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-border px-2 py-1.5">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => onChange(f.value)}
          className={`rounded px-2 py-1 text-[11px] font-medium outline-none transition-colors ${
            value === f.value
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
