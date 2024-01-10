export interface PokemonProps {
    name?: string;
    url?: string;
}
export interface PokemonListProps {
    count?: number;
    next?: string;
    previous?: string;
    results: Array<PokemonProps>;
}