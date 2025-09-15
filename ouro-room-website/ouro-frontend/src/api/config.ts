const raw = import.meta.env.VITE_API as string | undefined;

function normalize(base: string)
{
  return base.replace(/\/+$/, "");
}

export const API = raw && raw.trim().length > 0 ? normalize(raw): "";