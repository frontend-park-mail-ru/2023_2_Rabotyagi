module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base", "prettier"
    ],
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
    "rules": {}
}
