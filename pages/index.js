import { useEffect } from 'react';
import Link from 'next/link'; // Importing Link component from Next.js for navigation
import PokemonList from '../components/PokemonList'; // Importing PokemonList component
import PokemonDetails from '../components/PokemonDetails'; // Importing PokemonDetails component
import usePokemonStore from '../store'; // Importing custom hook to access state and actions

export default function Home() {
    // Destructuring state and actions from usePokemonStore hook
    const {
        pokemonList,
        selectedPokemon,
        inputValue,
        currentPage,
        pokemonPerPage,
        loading,
        error,
        setPokemonList,
        setSelectedPokemon,
        setInputValue,
        setCurrentPage,
        setLoading,
        setError,
        catchPokemon,
        resetSelectedPokemon,
        resetError,
    } = usePokemonStore();

    // Effect to fetch Pokemon list from PokeAPI
    useEffect(() => {
        async function fetchPokemonList() {
            try {
                setLoading(true); // Set loading state to true
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025'); // Fetching Pokemon list from PokeAPI
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon list'); // Throw error if response is not ok
                }
                const data = await response.json(); // Parse response to JSON
                setPokemonList(data.results); // Update pokemonList state with fetched data
            } catch (error) {
                setError(error.message); // Set error state if fetch fails
            } finally {
                setLoading(false); // Set loading state to false after fetch completes
            }
        }

        fetchPokemonList(); // Call fetchPokemonList function when component mounts
    }, [setPokemonList, setLoading, setError]); // Dependency array ensures useEffect runs once on mount and when setPokemonList, setLoading, or setError change

    // Effect to load caught pokemon from localStorage on component mount
    useEffect(() => {
        const savedCaughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || []; // Retrieve caught pokemon from localStorage
        savedCaughtPokemon.forEach(pokemon => catchPokemon(pokemon)); // Add each caught pokemon to state using catchPokemon action
    }, [catchPokemon]); // Dependency array ensures useEffect runs once on mount and when catchPokemon changes

    // Function to fetch detailed Pokemon data by name or ID
    async function fetchPokemonData(pokemonNameOrId) {
        try {
            setLoading(true); // Set loading state to true
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId.toLowerCase()}`); // Fetch detailed Pokemon data
            if (!response.ok) {
                throw new Error('Pokemon not found'); // Throw error if Pokemon data not found
            }
            const data = await response.json(); // Parse response to JSON
            setSelectedPokemon(data); // Update selectedPokemon state with fetched data
        } catch (error) {
            setError(error.message); // Set error state if fetch fails
        } finally {
            setLoading(false); // Set loading state to false after fetch completes
        }
    }

    // Function to handle search button click
    const handleSearch = () => {
        if (inputValue.trim() !== '') {
            fetchPokemonData(inputValue); // Call fetchPokemonData with current inputValue
        }
    };

    // Function to handle "Back" button click in PokemonDetails component
    const handleBack = () => {
        resetSelectedPokemon(); // Reset selectedPokemon state
        setInputValue(''); // Clear inputValue state
    };

    // Calculate indexes for pagination
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = pokemonList.slice(indexOfFirstPokemon, indexOfLastPokemon); // Slice pokemonList to get current page's pokemon

    // Function to handle "Previous" button click for pagination
    const paginatePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Decrement currentPage if not on the first page
        }
    };

    // Function to handle "Next" button click for pagination
    const paginateNext = () => {
        const totalPages = Math.ceil(pokemonList.length / pokemonPerPage); // Calculate total pages
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1); // Increment currentPage if not on the last page
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Conditionally render loading spinner */}
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : !selectedPokemon ? ( // Conditionally render search form and pokemon list if no pokemon is selected
                <>
                    <img src="/image.png" alt="Poke Ball" className="w-32 mx-auto mb-8" />
                    <h1 className="text-4xl font-bold text-blue-500 mb-6 text-center">Who are you looking for?</h1>
                    <div className="flex mb-4 justify-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} // Update inputValue state on change
                            className="w-full p-2 border-2 border-blue-500 rounded mr-4"
                        />
                        <button
                            onClick={handleSearch} // Call handleSearch on button click
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                    <div className="bg-blue-500 text-white px-4 py-2 rounded mt-2 inline-block cursor-pointer hover:bg-blue-600 text-center">
                        <Link href="/caught">View Seen Pokemon</Link> {/* Link to navigate to caught pokemon page */}
                    </div>

                    <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">Pokemon List</h2>
                    <PokemonList pokemonList={currentPokemon} onPokemonClick={fetchPokemonData} /> {/* Render PokemonList component with currentPokemon */}
                    {/* Pagination buttons */}
                    <div className="flex justify-between mt-4 space-x-4">
                        <button
                            onClick={paginatePrevious} // Call paginatePrevious on button click
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={currentPage <= 1} // Disable button if on first page
                        >
                            Previous
                        </button>
                        <span className="text-xl font-bold">
                            Page {currentPage} of {Math.ceil(pokemonList.length / pokemonPerPage)} {/* Display current page and total pages */}
                        </span>
                        <button
                            onClick={paginateNext} // Call paginateNext on button click
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={currentPage >= Math.ceil(pokemonList.length / pokemonPerPage)} // Disable button if on last page
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <PokemonDetails pokemon={selectedPokemon} onBack={handleBack} /> // Render PokemonDetails component if a pokemon is selected
            )}
        </div>
    );
}
