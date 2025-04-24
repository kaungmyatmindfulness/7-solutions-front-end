/**
 * For a detailed explanation regarding each configuration property, visit:
 * https:
 */

import type { Config } from "jest";

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	testEnvironment: "node",
	verbose: true,
	preset: "ts-jest",
	moduleNameMapper: {
		"^@/components/(.*)$": "<rootDir>/components/$1",
		"^@/features/(.*)$": "<rootDir>/features/$1",
		"^@/lib/(.*)$": "<rootDir>/lib/$1",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!some-module-that-needs-transpiling/.*)",
	],
};

export default config;
