import { getPokemonDetails } from "api/PokemonAPi/pokemonApi";
import { getPokemonId } from "helpers/helpers";
import type { PokemonProps } from "interfaces/pokemonInterfaces";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface PokemonCardProps {
  item?: PokemonProps;
  loading?: boolean;
  setError?: (err: string) => void;
}

interface PokemonTypeProps {
  slot?: string;
  type?: {
    name?: string;
    url?: string;
  };
}

const PokemonCard = ({ item, loading, setError }: PokemonCardProps) => {
  const [types, setTypes] = useState<PokemonTypeProps[]>([]);
  const pokemonId = getPokemonId(item.url);

  useEffect(() => {
    try {
      getPokemonDetails(item.url)
        .then((data) => {
          setTypes(data.types);
        })
        .catch((err) => setError(err));
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return loading ? (
    <div className="box-border py-5 px-0 md:px-5 w-[250px]">
      <div className="shadow h-full flex flex-col">
        <div className="h-40 overflow-hidden w-full">
          <Skeleton count={4} height={160} width={"100%"} />
        </div>
        <div className="px-4 pb-5 flex flex-col flex-grow">
          <Skeleton count={1} width={"100%"} />
          <div className="flex my-2 justify-around">
            <Skeleton count={1} width={80} />
            <Skeleton count={1} width={80} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="box-border py-5 px-0 md:px-2 w-full sm:w-[250px] rounded-md">
      <div className="shadow-xl border hover:shadow-md h-full flex flex-col rounded-md">
        <div className="h-autooverflow-hidden w-full bg-[#EEF5FF]">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={item.name}
            className="w-full object-contain"
          />
        </div>
        <div className="px-4 pb-5 flex flex-col flex-grow items-cente">
          <div className="my-1 text-center">
            <p className="text-gray-400 text-base font-semibold">{item.name}</p>
            <p className="flex gap-x-3 my-2 justify-around text-xl">
              {types?.map((pokeType, index) => (
                <span
                  style={{ color: index % 2 === 0 ? "red" : "green" }}
                  className="border px-2 py-1"
                  key={index}
                >
                  {pokeType.type.name}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
