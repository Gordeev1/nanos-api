# Nanos API

## Setup

```bash
# development
$ npm run dev
```

> API available at `localhost:3000` by default. Can be changed by `.env`.

## Additional setup

App launched by `npm run dev` reacts only on changes in `src` folder. If you want more control, you can install dependencies and manage app by `@nestjs/cli` (common scripts available in `package.json`)

```bash
$ npm i
$ npm i -g @nestjs/cli
$ npm run start:dev
```

## Stack

-   [Nest](https://github.com/nestjs/nest)
-   MongoDB with [Typegoose](https://github.com/typegoose/typegoose);
