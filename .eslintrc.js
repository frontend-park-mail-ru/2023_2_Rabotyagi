module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:all"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [".eslintrc.{mjs,js}"],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "prefer-const": [
            "error", {
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
