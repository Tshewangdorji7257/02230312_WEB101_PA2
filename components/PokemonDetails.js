import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePokemonStore from '../store';

const PokemonDetails = ({ pokemon, onBack }) => {
    // Accessing the catchPokemon function from custom hook usePokemonStore
    const catchPokemon = usePokemonStore((state) => state.catchPokemon);

    // State variables to toggle visibility of different sections
    const [showStats, setShowStats] = useState(false);
    const [showMoves, setShowMoves] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    // Handler to catch the pokemon and then navigate back
    const handleCatch = () => {
        catchPokemon(pokemon); // Call the catchPokemon function with the current pokemon
        onBack(); // Call the onBack function passed as prop to go back to the previous view
    };

    // Toggle function for showing/hiding stats section
    const toggleStats = () => {
        setShowStats(!showStats); // Toggle showStats state
    };

    // Toggle function for showing/hiding moves section
    const toggleMoves = () => {
        setShowMoves(!showMoves); // Toggle showMoves state
    };

    // Toggle function for showing/hiding about section
    const toggleAbout = () => {
        setShowAbout(!showAbout); // Toggle showAbout state
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="capitalize text-2xl font-bold mb-4">{pokemon.name}</h2>
            <div className="flex items-center mb-4">
                <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-32 h-32 border-2 border-blue-500 rounded-full"
                />
                <div className="ml-4">
                    {/* Button to toggle 'About' section */}
                    <button
                        onClick={toggleAbout}
                        className={`bg-white text-black px-4 py-2 rounded hover:bg-blue-100 ${
                            showAbout ? 'bg-blue-100' : ''
                        }`}
                    >
                        About
                    </button>
                    {/* Render 'About' section if showAbout is true */}
                    {showAbout && (
                        <div className="mt-2 p-4 bg-white border rounded-lg">
                            <table className="w-full">
                                <tbody>
                                    {/* Display type, height, and weight of the pokemon */}
                                    <tr className="bg-gray-100 hover:bg-gray-200">
                                        <td className="px-4 py-2 font-semibold">Type</td>
                                        <td className="px-4 py-2">
                                            {pokemon.types.map((type) => type.type.name).join(', ')}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100 hover:bg-gray-200">
                                        <td className="px-4 py-2 font-semibold">Height</td>
                                        <td className="px-4 py-2">{pokemon.height / 10}m</td>
                                    </tr>
                                    <tr className="bg-gray-100 hover:bg-gray-200">
                                        <td className="px-4 py-2 font-semibold">Weight</td>
                                        <td className="px-4 py-2">{pokemon.weight / 10}kg</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {/* Button to toggle 'Basic Stats' section */}
            <div className="mb-4">
                <button
                    onClick={toggleStats}
                    className={`bg-white text-black px-4 py-2 rounded hover:bg-blue-100 ${
                        showStats ? 'bg-blue-100' : ''
                    }`}
                >
                    Basic Stats
                </button>
                {/* Render 'Basic Stats' section if showStats is true */}
                {showStats && (
                    <div className="mt-2 p-4 bg-white border rounded-lg">
                        <table className="w-full">
                            <tbody>
                                {/* Display individual stats of the pokemon */}
                                {pokemon.stats.map((stat) => (
                                    <tr
                                        key={stat.stat.name}
                                        className="bg-gray-100 hover:bg-gray-200"
                                    >
                                        <td className="px-4 py-2 font-semibold">
                                            {stat.stat.name}
                                        </td>
                                        <td className="px-4 py-2">{stat.base_stat}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Button to toggle 'Moves' section */}
            <div className="mb-4">
                <button
                    onClick={toggleMoves}
                    className={`bg-white text-black px-4 py-2 rounded hover:bg-blue-100 ${
                        showMoves ? 'bg-blue-100' : ''
                    }`}
                >
                    Moves
                </button>
                {/* Render 'Moves' section if showMoves is true */}
                {showMoves && (
                    <div className="mt-2 p-4 bg-white border rounded-lg">
                        <table className="w-full">
                            <tbody>
                                {/* Display up to 5 moves of the pokemon */}
                                {pokemon.moves.slice(0, 5).map((move) => (
                                    <tr
                                        key={move.move.name}
                                        className="bg-gray-100 hover:bg-gray-200"
                                    >
                                        <td className="px-4 py-2">{move.move.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Buttons to catch the pokemon and go back */}
            <div className="flex justify-between">
                <button
                    onClick={handleCatch}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Catch
                </button>
                <button
                    onClick={onBack}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

// PropTypes for type-checking props passed to PokemonDetails component
PokemonDetails.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        sprites: PropTypes.shape({
            front_default: PropTypes.string.isRequired,
        }).isRequired,
        types: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired
        ).isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                stat: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
                base_stat: PropTypes.number.isRequired,
            }).isRequired
        ).isRequired,
        moves: PropTypes.arrayOf(
            PropTypes.shape({
                move: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
            }).isRequired
        ).isRequired,
    }).isRequired,
    onBack: PropTypes.func.isRequired, // onBack function prop is required
};

export default PokemonDetails;
