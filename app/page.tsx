import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
	return (
		<div className="container flex items-center justify-center min-h-screen p-4 mx-auto">
			<Card className="w-full max-w-lg">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						This is the 7 Solutions Frontend Assignment
					</CardTitle>

					<CardDescription className="pt-2 text-center">
						This application demonstrates the solutions for the frontend
						assignments. Please use the links below to navigate to the specific
						sub-assignments.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center space-y-4">
					<Link
						href="/auto-delete-list"
						className={cn(
							buttonVariants({ variant: "outline" }),
							"w-full sm:w-auto"
						)}
					>
						Go to Auto Delete List Assignment
					</Link>

					<Link
						href="/users"
						className={cn(
							buttonVariants({ variant: "outline" }),
							"w-full sm:w-auto"
						)}
					>
						Go to Users Transform Assignment
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}
