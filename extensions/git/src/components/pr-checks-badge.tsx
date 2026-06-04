import { CheckCircle2, CircleDot, Loader2, XCircle } from "lucide-react";

export function PrChecksBadge({ checks }: { checks: MuxyGitPRChecks }) {
  if (checks.status === "none") return null;

  if (checks.status === "pending") {
    return (
      <Badge tone="muted" icon={<Loader2 size={11} className="animate-spin" />}>
        {checks.pending || checks.total} running
      </Badge>
    );
  }
  if (checks.status === "failure") {
    return (
      <Badge tone="negative" icon={<XCircle size={11} />}>
        {checks.failing} failing
      </Badge>
    );
  }
  if (checks.status === "success") {
    return (
      <Badge tone="positive" icon={<CheckCircle2 size={11} />}>
        {checks.passing} passing
      </Badge>
    );
  }
  return (
    <Badge tone="muted" icon={<CircleDot size={11} />}>
      {checks.total} checks
    </Badge>
  );
}

function Badge({
  tone,
  icon,
  children,
}: {
  tone: "positive" | "negative" | "muted";
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const color =
    tone === "positive"
      ? "text-diff-add"
      : tone === "negative"
        ? "text-diff-remove"
        : "text-muted-foreground";
  return (
    <span className={`flex items-center gap-1 text-[10px] font-medium ${color}`}>
      {icon}
      {children}
    </span>
  );
}
