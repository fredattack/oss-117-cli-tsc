export interface Quote {
  sentence: string;
  author: string;
  image: string;
  character: {
    name: string;
    slug: string;
  };
  movie: string;
}
export interface Character {
  name: string;
  slug: string;
}

export interface FetchQuotesParams {
  number?: number;
  character?: string;
  keyword?: string;
}
