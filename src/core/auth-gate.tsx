import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { deckConfig } from "../../deck.config";

export function useAuth() {
  const authDisabled = !deckConfig.auth.enabled;
  const [isAuthenticated, setIsAuthenticated] = useState(authDisabled);
  const [isLoading, setIsLoading] = useState(!authDisabled);

  useEffect(() => {
    if (authDisabled) return;
    const stored = sessionStorage.getItem("deck-auth");
    setIsAuthenticated(stored === "true");
    setIsLoading(false);
  }, [authDisabled]);

  const login = (password: string) => {
    if (password === deckConfig.auth.password) {
      sessionStorage.setItem("deck-auth", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return { isAuthenticated, isLoading, login };
}

export function AuthGate({ onAuthenticated }: { onAuthenticated: () => void }) {
  const auth = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      onAuthenticated();
    }
  }, [auth.isAuthenticated, onAuthenticated]);

  if (auth.isLoading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "var(--color-bg-cream)" }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.3em] animate-pulse"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}
        >
          Loading presentation...
        </div>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-bg-cream)" }}
    >
      <div className="w-full max-w-md bg-white rounded-lg p-8 md:p-12 shadow-xl border border-neutral-100">
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-bg-dark)" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="var(--color-primary)"
            >
              <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1
            className="text-2xl mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Presentation Access
          </h1>
          <p
            className="text-[12px]"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
            }}
          >
            Enter the password to view this presentation.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const success = auth.login(password);
            if (!success) {
              setError(true);
              setPassword("");
            }
          }}
          className="space-y-4"
        >
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              className={cn(
                "w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm",
                error
                  ? "border-red-500 focus:border-red-500 bg-red-50"
                  : "border-neutral-200 focus:border-black bg-neutral-50"
              )}
              style={{ fontFamily: "var(--font-body)" }}
              autoFocus
            />
            {error && (
              <p
                className="text-red-500 text-xs mt-2 font-medium"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white rounded-lg text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "var(--color-primary)",
              fontFamily: "var(--font-body)",
            }}
          >
            Enter Presentation
          </button>
        </form>
      </div>
    </div>
  );
}
