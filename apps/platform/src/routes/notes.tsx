import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/notes")({
	component: NotesPage,
});

type NoteItem = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
};

function NotesPage() {
	const [list, setList] = useState<NoteItem[]>([]);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);

	const fetchNotes = useCallback(async () => {
		try {
			const res = await fetch("http://localhost:8000/notes");
			const data = await res.json();
			setList(
				data.map(
					(n: {
						id: string;
						title: string;
						content: string;
						createdAt: string;
					}) => ({
						id: n.id,
						title: n.title,
						content: n.content,
						createdAt: n.createdAt,
					}),
				),
			);
		} catch (e) {
			console.error("Failed to fetch notes:", e);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchNotes();
	}, [fetchNotes]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title || !content) return;
		try {
			await fetch("http://localhost:8000/notes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, content }),
			});
			setTitle("");
			setContent("");
			fetchNotes();
		} catch (_e) {
			alert("Failed to save note.");
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this note?")) return;
		await fetch(`http://localhost:8000/notes/${id}`, { method: "DELETE" });
		fetchNotes();
	};

	return (
		<div className="page-wrap px-4 py-8">
			<h1 className="display-title mb-6 border-b-2 border-(--card-border) pb-3 text-2xl font-bold text-(--ink)">
				My notes
			</h1>
			<form onSubmit={handleSubmit} className="card mb-8 rounded-xl p-5">
				<div className="mb-4">
					<label
						htmlFor="note-title"
						className="mb-1 block text-sm font-medium text-(--ink)"
					>
						Title
					</label>
					<input
						id="note-title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full rounded-lg border border-(--card-border) bg-white px-3 py-2 text-(--ink) focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)"
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="note-content"
						className="mb-1 block text-sm font-medium text-(--ink)"
					>
						Content
					</label>
					<textarea
						id="note-content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="w-full rounded-lg border border-(--card-border) bg-white px-3 py-2 text-(--ink) focus:border-(--accent) focus:outline-none focus:ring-1 focus:ring-(--accent)"
						rows={4}
					/>
				</div>
				<button
					type="submit"
					className="rounded-lg bg-(--accent) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--accent-deep)"
				>
					Save
				</button>
			</form>
			{loading ? (
				<p className="text-(--ink-muted)">Loading…</p>
			) : (
				<div className="space-y-4">
					{list.map((n) => (
						<div key={n.id} className="card rounded-xl p-5">
							<h2 className="mb-2 text-lg font-semibold text-(--ink)">
								{n.title}
							</h2>
							<p className="mb-3 text-sm text-(--ink-muted)">{n.content}</p>
							<div className="flex items-center justify-between text-xs text-(--ink-muted)">
								<span>Created {new Date(n.createdAt).toLocaleString()}</span>
								<button
									type="button"
									onClick={() => handleDelete(n.id)}
									className="text-(--accent-deep) hover:underline"
								>
									Delete
								</button>
							</div>
						</div>
					))}
					{list.length === 0 && (
						<p className="text-(--ink-muted)">No notes yet.</p>
					)}
				</div>
			)}
		</div>
	);
}
