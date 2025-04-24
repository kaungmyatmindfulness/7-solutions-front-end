import { useCallback, useEffect, useRef, useState } from "react";

import { TimerRefs } from "@/common/model/types";
import { FRUIT_AND_VEGETABLES } from "@/features/todo-list/model/data/fruit-and-vegetable.data";
import { FruitAndVegetable } from "@/features/todo-list/model/types/fruit-and-vegetable.types";

const MOVE_BACK_DELAY_MS = 5000;

export function useAutoDeleteList(
	initialItems: FruitAndVegetable[] = FRUIT_AND_VEGETABLES
) {
	const [mainList, setMainList] = useState<FruitAndVegetable[]>(initialItems);
	const [fruitColumn, setFruitColumn] = useState<FruitAndVegetable[]>([]);
	const [vegetableColumn, setVegetableColumn] = useState<FruitAndVegetable[]>(
		[]
	);
	const timerRefs = useRef<TimerRefs>({});

	const clearTimerForItem = useCallback((itemId: string) => {
		if (timerRefs.current[itemId]) {
			clearTimeout(timerRefs.current[itemId]);
			delete timerRefs.current[itemId];
		}
	}, []);

	const handleMoveBackToList = useCallback(
		(item: FruitAndVegetable, isImmediateClick: boolean) => {
			if (isImmediateClick || timerRefs.current[item.name]) {
				clearTimerForItem(item.name);
			}
			if (item.type === "Fruit") {
				setFruitColumn((prev) => prev.filter((i) => i.name !== item.name));
			} else {
				setVegetableColumn((prev) => prev.filter((i) => i.name !== item.name));
			}
			setMainList((prev) => [...prev, item]);
		},
		[clearTimerForItem]
	);

	const startTimerForItem = useCallback(
		(item: FruitAndVegetable) => {
			clearTimerForItem(item.name);
			timerRefs.current[item.name] = setTimeout(() => {
				handleMoveBackToList(item, false);
				delete timerRefs.current[item.name];
			}, MOVE_BACK_DELAY_MS);
		},
		[clearTimerForItem, handleMoveBackToList]
	);

	const handleMoveToColumn = useCallback(
		(item: FruitAndVegetable) => {
			setMainList((prev) => prev.filter((i) => i.name !== item.name));
			if (item.type === "Fruit") {
				setFruitColumn((prev) => [...prev, item]);
			} else {
				setVegetableColumn((prev) => [...prev, item]);
			}
			startTimerForItem(item);
		},
		[startTimerForItem]
	);

	useEffect(() => {
		return () => {
			Object.values(timerRefs.current).forEach(clearTimeout);
			timerRefs.current = {};
		};
	}, []);

	return {
		mainList,
		fruitColumn,
		vegetableColumn,
		handleMoveToColumn,
		handleMoveBackToList,
	};
}
