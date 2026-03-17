import { serve } from "@hono/node-server";
import { log } from "@raymn/logger";
import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();

app.use("*", cors());

app.get("/", (c) => {
	log("API is running");
	return c.text("API is running");
});

app.get("/notes", async (c) => {
	try {
		const notes = await prisma.note.findMany({
			orderBy: { createdAt: "desc" },
		});
		return c.json(notes);
	} catch (e) {
		console.error("Failed to fetch notes:", e);
		return c.json({ error: "Failed to fetch notes" }, 500);
	}
});

app.post("/notes", async (c) => {
	try {
		const body = await c.req.json();
		const newNote = await prisma.note.create({
			data: {
				title: body.title,
				content: body.content,
			},
		});
		return c.json(newNote, 201);
	} catch (e) {
		console.error("Failed to create note:", e);
		return c.json({ error: "Failed to create note" }, 500);
	}
});

app.delete("/notes/:id", async (c) => {
	const id = c.req.param("id");
	try {
		await prisma.note.delete({
			where: { id },
		});
		return c.json({ success: true });
	} catch (_e) {
		return c.json({ success: false, error: "Failed to delete note" }, 404);
	}
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

serve(
	{
		fetch: app.fetch,
		port: port,
	},
	(info) => {
		log(`Server is running on http://localhost:${info.port}`);
	},
);
