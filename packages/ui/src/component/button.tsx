import type * as React from "react";

interface ButtonProps {
	children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
	return (
		<button type="button" className="text-blue-500">
			{props.children}
		</button>
	);
};
