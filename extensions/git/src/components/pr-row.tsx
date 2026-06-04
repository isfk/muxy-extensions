import { useState } from "react";
import {
  ExternalLink,
  FileDiff,
  FolderGit2,
  GitBranchPlus,
  Loader2,
  XCircle,
} from "lucide-react";
import { open_pr_diff, open_url } from "@/lib/git";
import { pr_state } from "@/lib/git-prs";
import { PrStateIcon } from "./pr-state-icon";
import { PrChecksBadge } from "./pr-checks-badge";

export type RowAction = "checkout" | "worktree" | "close" | "diff";

interface PrRowProps {
  pr: MuxyGitPRListItem;
  onCheckout: (number: number) => Promise<void>;
  onCheckoutWorktree: (number: number) => Promise<void>;
  onClose: (number: number) => Promise<void>;
}

export function PrRow({ pr, onCheckout, onCheckoutWorktree, onClose }: PrRowProps) {
  const [pending, set_pending] = useState<RowAction | null>(null);
  const busy = pending !== null;
  const open = pr_state(pr) === "open";

  async function run(action: RowAction, fn: () => Promise<unknown>) {
    set_pending(action);
    try {
      await fn();
    } finally {
      set_pending(null);
    }
  }

  return (
    <li className="group flex items-center gap-2 border-b border-border px-3 py-1.5">
      <PrStateIcon pr={pr} size={13} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px] font-semibold text-muted-foreground">
            #{pr.number}
          </span>
          <span className="truncate text-[12px] font-medium text-foreground">{pr.title}</span>
        </div>
        <span className="truncate font-mono text-[10px] text-muted-foreground">
          {pr.author} · {pr.headBranch} → {pr.baseBranch}
        </span>
      </div>
      <div className="shrink-0 group-hover:hidden">
        <PrChecksBadge checks={pr.checks} />
      </div>
      <div className="hidden shrink-0 items-center gap-0.5 group-hover:flex">
        <Action
          icon={GitBranchPlus}
          title="Checkout this branch"
          loading={pending === "checkout"}
          disabled={busy}
          onClick={() => void run("checkout", () => onCheckout(pr.number))}
        />
        <Action
          icon={FolderGit2}
          title="Checkout to worktree"
          loading={pending === "worktree"}
          disabled={busy}
          onClick={() => void run("worktree", () => onCheckoutWorktree(pr.number))}
        />
        <Action
          icon={FileDiff}
          title="View diff"
          disabled={busy}
          onClick={() => void open_pr_diff(pr.number)}
        />
        <Action
          icon={ExternalLink}
          title="Open on GitHub"
          disabled={busy}
          onClick={() => open_url(pr.url)}
        />
        <Action
          icon={XCircle}
          title="Close PR"
          tone="danger"
          loading={pending === "close"}
          disabled={busy || !open}
          onClick={() => void run("close", () => onClose(pr.number))}
        />
      </div>
    </li>
  );
}

function Action({
  icon: Icon,
  title,
  disabled,
  loading,
  tone = "default",
  onClick,
}: {
  icon: typeof XCircle;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  tone?: "default" | "danger";
  onClick: () => void;
}) {
  const hover = tone === "danger" ? "hover:text-diff-remove" : "hover:text-foreground";
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-6 items-center justify-center rounded text-muted-foreground outline-none transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40 ${hover}`}
    >
      {loading ? (
        <Loader2 size={13} strokeWidth={2} className="animate-spin" />
      ) : (
        <Icon size={13} strokeWidth={2} />
      )}
    </button>
  );
}
