module.exports = {
    "extends": [
        "eslint-config-google",
        "eslint:recommended",
    ],
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module",
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": 0
    }
};