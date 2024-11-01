export const generateAvatarUrl = (name: string): string => {
  // Using DiceBear API with pixel-art style
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}&backgroundColor=b6e3f4`;
};