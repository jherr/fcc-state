import { proxy } from "valtio";
import { derive } from "valtio/utils";

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

export const search = proxy({
  query: "",
});

const allPokemon = proxy({
  pokemon: [] as Pokemon[],
});

export const pokemon = derive({
  list: (get) => {
    const query = get(search).query.toLowerCase();
    return get(allPokemon)
      .pokemon.filter((p) => p.name.toLowerCase().includes(query))
      .slice(0, 10)
      .sort((a, b) => a.name.localeCompare(b.name));
  },
});

fetch("/pokemon.json")
  .then((res) => res.json())
  .then((pokemon) => {
    allPokemon.pokemon = pokemon;
  });
