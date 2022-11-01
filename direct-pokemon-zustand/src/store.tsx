import create from "zustand";

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

const searchAndSortPokemon = (pokemon: Pokemon[], search: string) =>
  pokemon
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10)
    .sort((a, b) => a.name.localeCompare(b.name));

export const usePokemon = create<{
  pokemon: Pokemon[];
  allPokemon: Pokemon[];
  setAllPokemon: (pokemon: Pokemon[]) => void;
  search: string;
  setSearch: (search: string) => void;
}>((set, get) => ({
  pokemon: [],
  allPokemon: [],
  setAllPokemon: (pokemon) =>
    set({
      allPokemon: pokemon,
      pokemon: searchAndSortPokemon(pokemon, get().search),
    }),
  search: "",
  setSearch: (search) =>
    set({ search, pokemon: searchAndSortPokemon(get().allPokemon, search) }),
}));

fetch("/pokemon.json")
  .then((response) => response.json())
  .then((pokemon) => {
    usePokemon.getState().setAllPokemon(pokemon);
  });
