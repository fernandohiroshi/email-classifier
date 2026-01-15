export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const CATEGORIES = {
  PRODUTIVO: "Produtivo",
  IMPRODUTIVO: "Improdutivo",
} as const;

export const COLORS = {
  // Paleta inspirada nos tons da imagem (azul/verde água, laranja quente, magenta)
  productive: "#0f9fa8", // teal/ciano
  unproductive: "#f97316", // laranja quente
  primary: "#d946ef", // magenta/roxo
  secondary: "#22c1c3", // ciano mais claro
};
