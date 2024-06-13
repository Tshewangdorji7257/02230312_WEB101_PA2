import { useEffect, useState } from 'react';
import Link from 'next/link'; // Importing Link component from Next.js for navigation
import usePokemonStore from '../store'; // Importing custom hook to access state and actions

export default function CaughtPokemon() {
    const caughtPokemon = usePokemonStore((state) => state.caughtPokemon); // Getting caughtPokemon array from store
    const releasePokemon = usePokemonStore((state) => state.releasePokemon); // Getting releasePokemon action from store
    const [isClient, setIsClient] = useState(false); // State to track if component is mounted on the client side

    useEffect(() => {
        // useEffect hook to set isClient to true when component mounts
        setIsClient(true);
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    const handleRelease = (pokemonId) => {
        releasePokemon(pokemonId); // Function to release (remove) a caught pokemon
    };

    return (
        <div className="container mx-auto p-4">
            {/* Link to navigate back to Home */}
            <div className="bg-blue-500 text-white px-4 py-2 rounded mt-6 inline-block cursor-pointer">
                <Link href="/">Back to Home</Link>
            </div>
            <h1 className="text-4xl font-bold text-blue-500 mb-6">Seen Pokemon</h1>
            {/* Conditional rendering based on isClient and caughtPokemon array */}
            {isClient && caughtPokemon.length > 0 ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {/* Mapping through caughtPokemon array to display each caught pokemon */}
                    {caughtPokemon.map((pokemon, index) => (
                        <li key={index} className="bg-white border-2 border-blue-500 rounded-lg p-4 flex flex-col items-center">
                            {/* Pokemon image */}
                            <img
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                className="w-24 h-24 mb-2"
                            />
                            {/* Pokemon name */}
                            <span className="capitalize text-lg font-bold text-center">{pokemon.name}</span>
                            {/* Release button */}
                            <button
                                onClick={() => handleRelease(pokemon.id)} // onClick handler to release the pokemon
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
                            >
                                Release
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                // If no pokemon are caught, display message
                <p className="text-xl">No Pokémon caught yet.</p>
            )}
        </div>
    );
}
