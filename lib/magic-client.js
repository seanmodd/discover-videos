import { Magic } from 'magic-sdk';

const createMagic = () =>
  typeof window !== 'undefined' &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY); // ✨
export const magic = createMagic();
