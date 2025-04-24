"use client";

import { useState, useEffect } from "react";

import { UserResponse } from "@/features/users/model/types/user.types";
import { getUsers } from "@/features/users/model/services/user.service";

interface UseUserReturn {
	data: UserResponse | null;
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
}

export const useUser = (): UseUserReturn => {
	const [data, setData] = useState<UserResponse | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const [refetchIndex, setRefetchIndex] = useState<number>(0);

	const refetch = () => {
		setData(null);
		setError(null);
		setRefetchIndex((prevIndex) => prevIndex + 1);
	};

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const result = await getUsers();
				if (isMounted) {
					setData(result);
				}
			} catch (err) {
				console.error("Failed to fetch user data:", err);
				if (isMounted) {
					setError(
						err instanceof Error ? err : new Error("An unknown error occurred")
					);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [refetchIndex]);

	return { data, isLoading, error, refetch };
};
