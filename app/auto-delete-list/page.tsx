"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAutoDeleteList } from "@/features/todo-list/model/hooks/useAutoDeleteList";
import { FruitAndVegetable } from "@/features/todo-list/model/types/fruit-and-vegetable.types";

export default function AutoDeleteListPage() {
	const {
		mainList,
		fruitColumn,
		vegetableColumn,
		handleMoveToColumn,
		handleMoveBackToList,
	} = useAutoDeleteList();

	const renderItemButton = (item: FruitAndVegetable, onClick: () => void) => (
		<Button
			key={item.name}
			variant="outline"
			className="m-1 transition-all duration-300 ease-in-out"
			onClick={onClick}
			aria-label={`Move ${item.name}`}
		>
			{item.name} ({item.type})
		</Button>
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
			<Card>
				<CardHeader>
					<CardTitle>Todo Items</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-start min-h-[200px]">
					{mainList.length === 0 && (
						<p className="text-muted-foreground text-sm">No items in list.</p>
					)}
					{mainList.map((item) =>
						renderItemButton(item, () => handleMoveToColumn(item))
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Fruits (Disappears in 5s)</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-start min-h-[200px]">
					{fruitColumn.length === 0 && (
						<p className="text-muted-foreground text-sm">No fruits here.</p>
					)}
					{fruitColumn.map((item) =>
						renderItemButton(item, () => handleMoveBackToList(item, true))
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Vegetables (Disappears in 5s)</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-start min-h-[200px]">
					{vegetableColumn.length === 0 && (
						<p className="text-muted-foreground text-sm">No vegetables here.</p>
					)}
					{vegetableColumn.map((item) =>
						renderItemButton(item, () => handleMoveBackToList(item, true))
					)}
				</CardContent>
			</Card>
		</div>
	);
}
