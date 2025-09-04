export default [
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                global: 'readonly',
                globalThis: 'readonly',
                window: 'readonly',
                document: 'readonly'
            }
        },
        rules: {
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'prefer-const': 'error',
            'no-var': 'error',
            'no-trailing-spaces': 'error',
            'eol-last': 'error',
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'space-in-parens': ['error', 'never'],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }],
            'keyword-spacing': 'error',
            'space-before-blocks': 'error',
            'space-infix-ops': 'error',
            'brace-style': ['error', '1tbs'],
            'curly': ['error', 'all'],
            'eqeqeq': ['error', 'always'],
            'no-multi-spaces': 'error',
            'no-multiple-empty-lines': ['error', { max: 2 }]
        }
    },
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            '*.min.js',
            'pets/**' // Skip pet files for now as they have many similar patterns
        ]
    }
];
