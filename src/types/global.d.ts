import { types } from "util";

declare global {
  type UserType = {
    username: string;
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

  type ErrorType = {
    url: string;
    status: number;
    response: Response;
    isAbort: boolean;
    originalError: OriginalError;
    name: string;
    stack: string;
    message: string;
  };

  type OriginalError = {
    url: string;
    status: number;
    data: Response;
  };

  type Response = {
    code: number;
    message: string;
    data: Data;
  };

  type Data = {
    email: Email;
    password: Email;
    username: Email;
  };

  type Email = {
    code: string;
    message: string;
  };
}

{
}
