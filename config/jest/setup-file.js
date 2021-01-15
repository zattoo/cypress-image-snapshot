global.Cypress = {
    env: () => undefined,
    log: () => null,
    config: () => '/cypress/screenshots',
    Commands: {
        add: jest.fn(),
    },
};

global.cy = {
    wrap: (subject) => subject,
};
