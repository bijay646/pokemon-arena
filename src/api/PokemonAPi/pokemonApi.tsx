import axios from "axios";
import { BASE_URL } from "constants/apiConstants";
import type { PokemonListProps } from "interfaces/pokemonInterfaces";

const CACHE_KEY = "pokemonListCache";
const CACHE_TIMEOUT_MS = 3600000;

export const getPokemonList = async (
  currentPage?: number
): Promise<PokemonListProps> => {
  const cachedData = localStorage.getItem(CACHE_KEY);

  if (cachedData) {
    const { data, currentPage: cachedPage } = JSON.parse(cachedData);
    if (currentPage === cachedPage) {
      return data;
    }
  }

  const GET_POKEMON = `${BASE_URL}pokemon?limit=20${
    currentPage ? `&offset=${currentPage * 20}` : ""
  }`;

  try {
    const response = await axios.get<PokemonListProps>(GET_POKEMON);

    storeDataInCache(response.data, currentPage);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

function storeDataInCache(data: PokemonListProps, currentPage: number) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, currentPage }));
  setTimeout(() => {
    localStorage.removeItem(CACHE_KEY);
  }, CACHE_TIMEOUT_MS);
}

export const getPokemonDetails = async (url: string): Promise<any> => {
  const GET_POKEMON_DETAILS = url;

  try {
    const response = await axios.get<any>(GET_POKEMON_DETAILS);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
