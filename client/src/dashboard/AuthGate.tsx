import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Logo from "@/components/Logo";
import { useGetMeQuery, useLoginMutation } from "@/services/api";
import { logout, setAdmin, setCredentials } from "@/store/authSlice";

/**
 * Gates the dashboard behind a real login. A stored token is verified against
 * the server on mount, so an expired or revoked one drops straight back to the
 * form instead of rendering a dashboard that can't load anything.
 */
export default function AuthGate({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const admin = useAppSelector((s) => s.auth.admin);

  const { data: me, isError, isLoading } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (me) dispatch(setAdmin(me));
  }, [me, dispatch]);

  useEffect(() => {
    if (isError) dispatch(logout());
  }, [isError, dispatch]);

  if (token && (admin || me)) return <>{children}</>;
  if (token && isLoading) return <Verifying />;

  return <LoginScreen />;
}

function Verifying() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-paper-50/50">
        Verifying session…
      </span>
    </div>
  );
}

function LoginScreen() {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
    } catch (err) {
      const status = (err as { status?: number }).status;
      setError(
        status === 429
          ? "Too many attempts. Please wait a few minutes and try again."
          : "That email and password combination didn't work.",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6 text-paper-50" dir="ltr">
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute -left-20 -top-40 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-16 h-64 w-64 rounded-full bg-brand-green/15 blur-3xl" />

        <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <Logo mark className="h-10 w-10" />
            <span className="font-display text-2xl">
              PORT<span className="text-brand-orange">-</span>4
            </span>
          </div>

          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-50/50">
            Dashboard
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-tighter2 text-paper-50">Sign in</h1>
          <p className="mt-3 text-[14px] text-paper-50/70">
            Use the administrator account seeded from your server&rsquo;s environment file.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              required
              autoFocus
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@port-4.dev"
              className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-paper-50 outline-none transition-colors placeholder:text-paper-50/40 focus:border-brand-orange"
            />
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-paper-50 outline-none transition-colors placeholder:text-paper-50/40 focus:border-brand-orange"
            />

            {error && <p className="text-[13px] text-brand-orangeSoft">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-brand-orange py-3 text-sm font-medium text-paper-50 transition-colors hover:bg-paper-50 hover:text-ink-950 disabled:opacity-60"
            >
              {isLoading ? "Signing in…" : "Sign in →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
