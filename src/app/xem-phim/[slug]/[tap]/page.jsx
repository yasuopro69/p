import MoviePlayer from "./components/MoviePlayer";
import AdSenseAd from "@/components/template/AdSenseAd";
const XemPhim = async ({ params }) => {
  const urlApi = "https://phimapi.com/phim/";
  const slug = params.slug;
  // const tapSlug = params.tap;
  // const serverIndex = parseInt(searchParams.server) || 0;
  const res = await fetch(`${urlApi}${slug}`);
  if (!res.ok) throw new Error("Failed to fetch movie data");
  const data = await res.json();
  const episodesData = data.episodes || [];

  return (
    <>
      <AdSenseAd />
      <MoviePlayer
        initialData={{
          movie: data.movie,
          episodes: episodesData,
        }}
        params={params}
      />
    </>
  );
};

export default XemPhim;
