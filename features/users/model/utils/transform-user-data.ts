import { User } from "@/features/users/model/types/user.types";

type DepartmentStats = {
	male: number;
	female: number;
	minAge: number;
	maxAge: number;
	ageRange: string;
	hair: Record<string, number>;
	addressUser: Record<string, string>;
};

type ProcessedUserData = Record<
	string,
	Omit<DepartmentStats, "minAge" | "maxAge">
>;

export function transformUserData(users: User[]): ProcessedUserData {
	const departmentsMap = new Map<string, DepartmentStats>();

	if (!users || users.length === 0) {
		return {};
	}

	for (const user of users) {
		const { company, gender, age, hair, firstName, lastName, address } = user;

		const department = company?.department;
		const hairColor = hair?.color;
		const postalCode = address?.postalCode;

		if (!department) {
			console.warn(
				`User with id ${user.id} skipped due to missing department.`
			);
			continue;
		}

		let stats = departmentsMap.get(department);

		if (!stats) {
			stats = {
				male: 0,
				female: 0,
				minAge: Infinity,
				maxAge: -Infinity,
				ageRange: "",
				hair: {},
				addressUser: {},
			};
			departmentsMap.set(department, stats);
		}

		if (gender === "male") {
			stats.male++;
		} else if (gender === "female") {
			stats.female++;
		}

		if (typeof age === "number") {
			stats.minAge = Math.min(stats.minAge, age);
			stats.maxAge = Math.max(stats.maxAge, age);
		}

		if (hairColor) {
			stats.hair[hairColor] = (stats.hair[hairColor] || 0) + 1;
		}

		if (firstName && lastName && postalCode) {
			const fullName = `${firstName} ${lastName}`;

			stats.addressUser[fullName] = postalCode;
		}
	}

	const groupedData: ProcessedUserData = {};

	for (const [department, stats] of departmentsMap.entries()) {
		let ageRange = "";
		if (stats.minAge !== Infinity && stats.maxAge !== -Infinity) {
			ageRange = `${stats.minAge}-${stats.maxAge}`;
		}

		groupedData[department] = {
			male: stats.male,
			female: stats.female,
			ageRange: ageRange,
			hair: stats.hair,
			addressUser: stats.addressUser,
		};
	}

	return groupedData;
}
