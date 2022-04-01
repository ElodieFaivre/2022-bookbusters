module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
    },
    overrides: [
        {
            files: ['**/tests/**/*.test.js', '**/tests/**/*.spec.js'],
            env: { jest: true, node: true, es6: true },
            plugins: ['jest'],
            extends: [
                'eslint:recommended',
                'plugin:prettier/recommended',
                'plugin:jest/all',
            ],
            rules: {
                'node/no-unpublished-require': 0,
                'node/no-missing-require': 0,
                'jest/no-hooks': [
                    'error',
                    { allow: ['beforeAll', 'afterAll'] },
                ],
                'jest/prefer-lowercase-title': [
                    'error',
                    { ignore: ['describe'] },
                ],
            },
        },
    ],
};
