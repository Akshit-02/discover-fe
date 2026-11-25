const TILE_GRADIENTS = [
  "from-[#F36B4A] to-[#FFAD66]",
  "from-[#202124] to-[#55565C]",
  "from-[#E04E2B] to-[#F7A38A]",
  "from-[#FF9533] to-[#FFD6B0]",
  "from-[#3C3D42] to-[#F36B4A]",
  "from-[#B93B1D] to-[#FFAD66]",
];

const hash = (value: string) =>
  Array.from(value).reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);

export const listGradient = (id: string) => TILE_GRADIENTS[hash(id) % TILE_GRADIENTS.length];
