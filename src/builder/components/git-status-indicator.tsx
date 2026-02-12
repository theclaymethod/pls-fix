import { useGitStatus } from "../hooks/use-git-status";

export function GitStatusIndicator() {
  const git = useGitStatus();

  if (git.unpushedCount === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-amber-100 text-amber-700 tabular-nums">
        {git.unpushedCount} unpushed
      </span>

      <button
        onClick={git.push}
        disabled={git.pushing}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-md hover:bg-neutral-800 disabled:opacity-50 transition-colors"
      >
        {git.pushing ? (
          <>
            <svg className="w-3 h-3 animate-spin" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round" />
            </svg>
            Pushing…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 12V4M5 7l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Push
          </>
        )}
      </button>

      {git.pushError && (
        <span className="text-[11px] text-red-600">{git.pushError}</span>
      )}
    </div>
  );
}
