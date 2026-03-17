import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			<section className="card rise-in relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14">
				<p className="badge-text mb-3">Scratchpad</p>
				<h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-(--ink) sm:text-6xl">
					Capture ideas, keep it simple.
				</h1>
				<p className="mb-8 max-w-2xl text-base text-(--ink-muted) sm:text-lg">
					A minimal notes app that runs in your stack. No accounts, no
					complexity—just quick capture.
				</p>
				<div className="flex flex-wrap gap-3">
					<Link
						to="/about"
						className="rounded-full border border-(--accent-deep)/30 bg-(--accent)/15 px-5 py-2.5 text-sm font-semibold text-(--accent-deep) no-underline transition hover:-translate-y-0.5 hover:bg-(--accent)/25"
					>
						About
					</Link>
					<Link
						to="/notes"
						className="rounded-full border border-(--card-border) bg-white/80 px-5 py-2.5 text-sm font-semibold text-(--ink) no-underline transition hover:-translate-y-0.5 hover:border-(--ink)/25"
					>
						Try notes
					</Link>
				</div>
			</section>
			<section className="mt-8 grid gap-4 sm:grid-cols-3">
				{[
					["Quick capture", "Add notes in seconds. Title, content, done."],
					["No account required", "Notes stay in this demo. Use it your way."],
					[
						"Runs in your stack",
						"TanStack Start + Hono + Prisma. Full control.",
					],
				].map(([title, desc], index) => (
					<article
						key={title}
						className="card feature-card rise-in rounded-2xl p-5"
						style={{ animationDelay: `${index * 90 + 80}ms` }}
					>
						<h2 className="mb-2 text-base font-semibold text-(--ink)">
							{title}
						</h2>
						<p className="m-0 text-sm text-(--ink-muted)">{desc}</p>
					</article>
				))}
			</section>
		</main>
	);
}
