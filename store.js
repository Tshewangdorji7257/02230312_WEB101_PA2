import create from 'zustand'; // Import create function from Zustand for creating store

const usePokemonStore = create((set) => {
    const isClient = typeof window !== 'undefined'; // Check if running on client-side (browser)
    const savedCaughtPokemon = isClient ? JSON.parse(localStorage.getItem('caughtPokemon')) || [] : []; // Retrieve caughtPokemon from localStorage if available

    return {
        pokemonList: [], // Array to store fetched Pokemon list
        selectedPokemon: null, // Store currently selected Pokemon details
        inputValue: '', // Store input value for search
        currentPage: 1, // Store current page number for pagination
        pokemonPerPage: 20, // Number of Pokemon to display per page
        caughtPokemon: savedCaughtPokemon, // Array to store caught Pokemon
        loading: false, // Flag to indicate loading state
        error: '', // Store error message if any operation fails

        // Setter functions to update state
        setPokemonList: (list) => set({ pokemonList: list }), // Update pokemonList state
        setSelectedPokemon: (pokemon) => set({ selectedPokemon: pokemon }), // Update selectedPokemon state
        setInputValue: (value) => set({ inputValue: value }), // Update inputValue state
        setCurrentPage: (page) => set({ currentPage: page }), // Update currentPage state
        setLoading: (loading) => set({ loading }), // Update loading state
        setError: (error) => set({ error }), // Update error state

        // Action to catch a new Pokemon
        catchPokemon: (pokemon) => set((state) => {
            const alreadyCaught = state.caughtPokemon.some(p => p.id === pokemon.id); // Check if Pokemon is already caught
            if (!alreadyCaught) {
                const newCaughtPokemon = [...state.caughtPokemon, pokemon]; // Add new Pokemon to caughtPokemon array
                if (isClient) {
                    localStorage.setItem('caughtPokemon', JSON.stringify(newCaughtPokemon)); // Update localStorage with new caughtPokemon array
                }
                return { caughtPokemon: newCaughtPokemon }; // Return updated caughtPokemon array
            }
            return state; // Return current state if Pokemon is already caught
        }),

        // Action to release a caught Pokemon
        releasePokemon: (pokemonId) => set((state) => {
            const updatedCaughtPokemon = state.caughtPokemon.filter(p => p.id !== pokemonId); // Remove released Pokemon from caughtPokemon array
            if (isClient) {
                localStorage.setItem('caughtPokemon', JSON.stringify(updatedCaughtPokemon)); // Update localStorage with updated caughtPokemon array
            }
            return { caughtPokemon: updatedCaughtPokemon }; // Return updated caughtPokemon array
        }),

        // Action to reset selectedPokemon state to null
        resetSelectedPokemon: () => set({ selectedPokemon: null }),

        // Action to reset error state to empty string
        resetError: () => set({ error: '' }),
    };
});

export default usePokemonStore; // Export usePokemonStore hook
