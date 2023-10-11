module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended", "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "prefer-const": [
            "warning", {
                "destructuring": "any",
                "ignoreReadBeforeAssign": false
            }
        ],
        "object-curly-spacing": [
            "error", "always"
        ],
        "array-bracket-spacing": [
            "error", "always"
        ],
        "computed-property-spacing": ["error", "always"]

    }
}
