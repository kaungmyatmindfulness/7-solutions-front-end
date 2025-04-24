import { UserResponse } from "@/features/users/model/types/user.types";

export const getUsers = async (): Promise<UserResponse> => {
	const response = await fetch("https://dummyjson.com/users");
	if (!response.ok) {
		throw new Error("Failed to fetch users");
	}
	const data = await response.json();
	return data as UserResponse;
};
