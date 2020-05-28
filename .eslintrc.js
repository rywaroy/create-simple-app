module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        'no-console': 0,
        "import/extensions": [2, "never", { "ts": "never" }],
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['.js', '.ts']
                    }
                }
            }
        },
    },
};
