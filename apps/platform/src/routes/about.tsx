import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({ component: About });

function About() {
	return (
		<main className="page-wrap px-4 py-12">
			<section className="card rounded-2xl p-6 sm:p-8">
				<p className="badge-text mb-2">About Scratchpad</p>
				<h1 className="display-title mb-3 text-4xl font-bold text-(--ink) sm:text-5xl">
					Simple notes, zero friction.
				</h1>
				<p className="m-0 max-w-3xl text-base leading-8 text-(--ink-muted)">
					Scratchpad is a minimal notes demo built in this monorepo—TanStack
					Start for the frontend, Hono + Prisma for the API. Use it as a
					starting point or learning example.
				</p>
			</section>
		</main>
	);
}
