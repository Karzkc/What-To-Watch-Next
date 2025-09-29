export interface SlidesData {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  poster_path?: string;
  backdrop_path?:string;
  type: 'movie' | 'tv';
}