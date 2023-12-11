global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    // error: jest.fn(),
};
process.env = {
    port: 8000,
}