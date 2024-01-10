import { atom } from "nanostores";
import type { PokemonListProps } from "interfaces/pokemonInterfaces";

export const pokemonStore = atom<PokemonListProps | null>(null);
