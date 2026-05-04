export function generateMovieJsonLd(movie: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "url": `https://hurahwatch.com/movie/${movie.id}`,
    "image": `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    "description": movie.overview,
    "datePublished": movie.release_date,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": movie.vote_average,
      "bestRating": "10",
      "ratingCount": movie.vote_count
    }
  };
}

export function generateTVJsonLd(series: any) {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": series.name,
    "url": `https://hurahwatch.com/tv/${series.id}`,
    "image": `https://image.tmdb.org/t/p/w500${series.poster_path}`,
    "description": series.overview,
    "startDate": series.first_air_date,
    "numberOfSeasons": series.number_of_seasons,
    "numberOfEpisodes": series.number_of_episodes,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": series.vote_average,
      "bestRating": "10",
      "ratingCount": series.vote_count
    }
  };
}
