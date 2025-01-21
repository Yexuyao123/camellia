## step of create a new package

- run `mkdir -p packages/[package name]` at root directory
- bun init

```bath
cd packages/[package name]
bun init
```
- edit `package.json` file

```json
{
  "name": "@camellia/[package name]"
}
```

- import package to current app

```bath
cd apps/app
code package.json
```

```json
{
  "dependencies": {
    "@packages/[package name]": "workspace:*"
  }
}
```
