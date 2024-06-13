import React from 'react';

const PokemonList = ({ pokemonList, onPokemonClick }) => {
    return (
        // Container for the grid layout with Tailwind CSS classes
        <ul className="grid grid-cols-4 gap-6">
            {/* Map through each pokemon in pokemonList array */}
            {pokemonList.map((pokemon, index) => (
                <li
                    key={index} // Unique key for React rendering optimization
                    className="bg-white border-2 border-blue-500 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:transform hover:scale-105 transition-transform"
                    onClick={() => onPokemonClick(pokemon.name)} // Click handler for each pokemon card
                >
                    {/* Pokemon image */}
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                        alt={pokemon.name} // Alt text for accessibility
                        className="w-24 h-24" // Fixed size for pokemon images
                    />
                    {/* Pokemon name */}
                    <span className="capitalize text-lg font-bold">{pokemon.name}</span>
                </li>
            ))}
        </ul>
    );
};

export default PokemonList;
