export const getPokemonId = (url: string) => {
  const regex = /\/(\d+)\/$/;
  const match = url.match(regex);

  return match[1];
};
