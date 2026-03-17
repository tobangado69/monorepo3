import { Button } from "@raymn/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/")({ component: RouteComponent });

function RouteComponent() {
	return (
		<div>
			<Button>Hello</Button>
		</div>
	);
}
