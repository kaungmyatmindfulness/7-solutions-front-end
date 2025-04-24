import { transformUserData } from "./transform-user-data";
import { User } from "@/features/users/model/types/user.types";

const simpleMockUser: User[] = [
	{
		id: 1,
		firstName: "Emily",
		lastName: "Johnson",
		maidenName: "Smith",
		age: 28,
		gender: "female",
		email: "emily.johnson@x.dummyjson.com",
		phone: "+81 965-431-3024",
		username: "emilys",
		password: "emilyspass",
		birthDate: "1996-5-30",
		image: "https://dummyjson.com/icon/emilys/128",
		bloodGroup: "O-",
		height: 193.24,
		weight: 63.16,
		eyeColor: "Green",
		hair: {
			color: "Brown",
			type: "Curly",
		},
		ip: "42.48.100.32",
		address: {
			address: "626 Main Street",
			city: "Phoenix",
			state: "Mississippi",
			stateCode: "MS",
			postalCode: "29112",
			coordinates: {
				lat: -77.16213,
				lng: -92.084824,
			},
			country: "United States",
		},
		macAddress: "47:fa:41:18:ec:eb",
		university: "University of Wisconsin--Madison",
		bank: {
			cardExpire: "03/26",
			cardNumber: "9289760655481815",
			cardType: "Elo",
			currency: "CNY",
			iban: "YPUXISOBI7TTHPK2BR3HAIXL",
		},
		company: {
			department: "Engineering",
			name: "Dooley, Kozey and Cronin",
			title: "Sales Manager",
			address: {
				address: "263 Tenth Street",
				city: "San Francisco",
				state: "Wisconsin",
				stateCode: "WI",
				postalCode: "37657",
				coordinates: {
					lat: 71.814525,
					lng: -161.150263,
				},
				country: "United States",
			},
		},
		ein: "977-175",
		ssn: "900-590-289",
		userAgent:
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
		crypto: {
			coin: "Bitcoin",
			wallet: "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
			network: "Ethereum (ERC20)",
		},
		role: "admin",
	},
];

describe("transformUserData (Simple Cases)", () => {
	it("should correctly process a single user input", () => {
		const result = transformUserData(simpleMockUser);

		expect(result).toHaveProperty("Engineering");
		const engineeringStats = result["Engineering"];
		expect(engineeringStats.male).toBe(0);
		expect(engineeringStats.female).toBe(1);
		expect(engineeringStats.ageRange).toBe("28-28");
		expect(engineeringStats.hair).toEqual({ Brown: 1 });
		expect(engineeringStats.addressUser).toEqual({ "Emily Johnson": "29112" });
	});

	it("should return an empty object for an empty array", () => {
		const result = transformUserData([]);

		expect(result).toEqual({});
	});
});
