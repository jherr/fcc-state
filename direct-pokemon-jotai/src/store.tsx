import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";

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

export const searchAtom = atom("");

const [allPokemon] = atomsWithQuery<Pokemon[]>(() => ({
  queryKey: ["pokemon"],
  queryFn: () => fetch("/pokemon.json").then((res) => res.json()),
}));

export const pokemonAtom = atom((get) => {
  const search = get(searchAtom).toLowerCase();
  const all = get(allPokemon);
  return all.filter((p) => p.name.toLowerCase().includes(search));
});

export const sortedPokemonAtom = atom((get) => {
  const pokemon = get(pokemonAtom);
  return pokemon.slice(0, 10).sort((a, b) => a.name.localeCompare(b.name));
});
