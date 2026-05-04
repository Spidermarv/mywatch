export const GET = async () => {
  const response = new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://hurahwatch.com/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://hurahwatch.com/movies</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://hurahwatch.com/series</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>`.trim()
  );

  response.headers.set('Content-Type', 'application/xml');
  return response;
};
