import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { type PokemonProps } from "interfaces/pokemonInterfaces";
import { pokemonStore } from "nanoStores/pokemonStore";
import { useStore } from "@nanostores/react";
import { getPokemonList } from "api/PokemonAPi/pokemonApi";
import PokemonCard from "components/PokemonCard/PokemonCard";

const PokemonList = () => {
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const $pokemonStore = useStore(pokemonStore);

  const handleInputChange = (searchedItem?: string) => {
    setSearch(searchedItem);
  };

  useEffect(() => {
    try {
      getPokemonList(currentPage)
        .then((data) => {
          pokemonStore.set(data);
          setError("");
        })
        .catch((err) => setError(err));
    } catch (error) {
      setError(error.message);
    }
  }, [currentPage]);

  useEffect(() => {
    if (!$pokemonStore) return;
    setPokemons($pokemonStore.results);
    setTotalPage(Math.ceil($pokemonStore.count / 20));
  }, [$pokemonStore]);

  const filteredPokemons =
    search === ""
      ? pokemons
      : pokemons.filter((item) => {
          const lowercaseItem = item.name as string;
          return lowercaseItem
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(search.toLowerCase().replace(/\s+/g, ""));
        });

  return (
    <div className="flex flex-col h-full w-full">
      <div>
        <input
          type="text"
          placeholder="Enter a pokemon name"
          className="px-5 rounded-md py-2 border w-full sm:w-1/2 text-sm"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {Array.isArray(filteredPokemons) && filteredPokemons.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex my-5 justify-center flex-wrap gap-4">
            {filteredPokemons.map((item, i) => (
              <PokemonCard
                item={item}
                key={i}
                loading={false}
                setError={setError}
              />
            ))}
          </div>
          <Pagination
            defaultCurrent={1}
            total={totalPage}
            onChange={(page) => setCurrentPage(page)}
            className="mt-auto mb-10 pb-10"
          />
        </div>
      ) : (
        <p className="my-9 text-2xl">No Pokemon Found</p>
      )}
      {error && <p className="text-red-800 text-2xl">{error}</p>}
    </div>
  );
};

export default PokemonList;
