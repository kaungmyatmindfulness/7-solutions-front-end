"use client";

import { useUser } from "@/features/users/model/services/hooks/use-user";
import { transformUserData } from "@/features/users/model/utils/transform-user-data";
import React, { useMemo } from "react";

export default function UserPage() {
	const { data: userResponse, isLoading, error, refetch } = useUser();

	const processedData = useMemo(() => {
		if (userResponse?.users) {
			try {
				return transformUserData(userResponse.users);
			} catch (transformError) {
				console.error("Error transforming user data:", transformError);

				return null;
			}
		}
		return null;
	}, [userResponse?.users]);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">User Data</h1>
			<button
				onClick={refetch}
				className="mb-4 p-2 bg-blue-500 text-white rounded"
			>
				Refetch User Data
			</button>
			{isLoading && <p className="text-gray-500">Loading...</p>}
			{error && <p className="text-red-500">Error loading user data.</p>}
			{!processedData && !isLoading && !error && userResponse && (
				<p className="text-gray-500">No user data available.</p>
			)}
			{!processedData ||
				(Object.keys(processedData).length === 0 && (
					<p className="text-gray-500">No user data available.</p>
				))}
			{processedData && (
				<>
					<h2 className="text-xl font-semibold mb-2">Processed User Data</h2>
					<pre className="bg-gray-100 p-4 rounded">
						{JSON.stringify(processedData, null, 2)}
					</pre>
				</>
			)}
		</div>
	);
}
