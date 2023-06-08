export interface Source {
  id: string;
  name: string;
  category: string;
  country: string;
  language: string;
  url: string;
}

export interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image?: string;
  urlToImage?: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

type CategoriesId =
  | "general"
  | "business"
  | "entertainment"
  | "health"
  | "science"
  | "sports"
  | "technology";

export interface Category {
  name: string;
  id: CategoriesId;
}
