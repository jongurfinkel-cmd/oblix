import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Marketing Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-900 hover:text-slate-700"
          >
            Oblix
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm text-slate-600">
            <Link
              href="/how-it-works"
              className="hover:text-slate-900 transition"
            >
              How it works
            </Link>

            <Link
              href="/pricing"
              className="hover:text-slate-900 transition"
            >
              Pricing
            </Link>

            <Link
              href="/contact"
              className="hover:text-slate-900 transition"
            >
              Contact
            </Link>

            <span className="h-5 w-px bg-slate-200 mx-1" />

            <Link
              href="/login"
              className="hover:text-slate-900 transition"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main>{children}</main>
    </>
  );
}
