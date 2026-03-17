export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-20 border-t border-(--card-border) px-4 pb-14 pt-10 text-(--ink-muted)">
			<div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
				<p className="m-0 text-sm">&copy; {year} Scratchpad</p>
				<p className="badge-text m-0">Monorepo demo</p>
			</div>
		</footer>
	);
}
