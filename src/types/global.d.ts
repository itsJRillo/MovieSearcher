import { types } from "util";


declare global {
  type UserType = {
    username: string;
    email?: string;
    password: string;
  };

  type UserList = {};

  type MovieType = {
    type?: "movie";
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  type SerieType = {
    type?: "serie";
    backdrop_path: string;
    first_air_date: Date;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
  };

  type GenreType = {
    id: number;
    name: string;
  };

  type JSONImageType = {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: null;
    vote_average: number;
    vote_count: number;
    width: number;
  };

  type MovieDetails = {
    type?: "movie";
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection;
    budget: number;
    genres: GenreType[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: Date;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };

  type TVDetails = {
    type?: "tv";
    adult: boolean;
    backdrop_path: string;
    created_by: any[];
    episode_run_time: number[];
    first_air_date: Date;
    genres: GenreType[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: Date;
    last_episode_to_air: LastEpisodeToAir;
    name: string;
    next_episode_to_air: null;
    networks: any[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: any[];
    production_countries: any[];
    seasons: Season[];
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
  };

  type BelongsToCollection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };

  type ProductionCompany = {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
  };

  type ProductionCountry = {
    iso_3166_1: string;
    name: string;
  };

  type SpokenLanguage = {
    english_name: string;
    iso_639_1: string;
    name: string;
  };

  type LastEpisodeToAir = {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: Date;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: null;
  };

  type Season = {
    air_date: Date;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  };
}
