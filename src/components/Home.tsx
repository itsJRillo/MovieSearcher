export default function Home({ data }: { data: MovieType[] | undefined }) {
  return (
    <>
      {data?.map(movie => {
        console.log(movie.original_title);
        console.log(movie.popularity);
      })}
    </>
  )
}
