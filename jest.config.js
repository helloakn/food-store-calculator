export default {
    automock: false,
    resetMocks: false,
    setupFiles: ["./jest.setup.js"],
    verbose: false,
    moduleNameMapper: {
        // "app/(.*)": "<rootDir>/$1",
        // "app/lib": "<rootDir>/lib/index.js",
        // "app/routes": "<rootDir>/routes/index.js",
        // "app/controller": "<rootDir>/controller/index.js",
        // "app/core": "<rootDir>/core/index.js",
        // "app/services": "<rootDir>/services/index.js"
        "^app/models/(.*)$": "<rootDir>/src/models/$1"
    },
    transformIgnorePatterns: ["./node_modules/"]
};
