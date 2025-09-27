export interface Movie {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    poster_path: string;
}

export interface SliderProps {
  params: string;
  options?: boolean;
  todayData: Movie[];
  weekData: Movie[];
  mediaType: "movie" | "tv";
}
