This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
# Pokémon Explorer

Pokémon Explorer is a React application that allows users to explore Pokémon data fetched from the PokeAPI. It includes features such as viewing Pokémon details, catching and releasing Pokémon, searching for specific Pokémon, and pagination through a list of Pokémon.

## Features

- **Home Page**:
  - Displays a search input to find specific Pokémon by name or ID.
  - Pagination controls to navigate through the list of Pokémon.
  - Option to view caught Pokémon.

- **PokemonDetails Component**:
  - Shows details of a selected Pokémon including its image, type, basic stats, and moves.
  - Provides options to catch the Pokémon and navigate back to the Home page.

- **CaughtPokemon Component**:
  - Lists Pokémon that have been caught.
  - Allows users to release caught Pokémon.

- **PokemonList Component**:
  - Displays a grid of Pokémon cards, each showing Pokémon name and image.
  - Clicking on a Pokémon card fetches and displays detailed information about that Pokémon.

- **usePokemonStore Hook**:
  - Manages global state including Pokémon list, selected Pokémon details, search input value, pagination, loading state, error handling, caught Pokémon list, and related actions using Zustand.
  - Utilizes localStorage to persist caught Pokémon across sessions.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
