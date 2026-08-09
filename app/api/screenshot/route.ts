import { NextResponse } from "next/server";

const fallbackSvg = (label: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#212121"/>
      <stop offset="1" stop-color="#FA6B48"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  <text x="800" y="440" font-family="sans-serif" font-size="44" fill="#EAE4D5" text-anchor="middle">${label}</text>
  <text x="800" y="500" font-family="sans-serif" font-size="24" fill="rgba(234,228,213,0.7)" text-anchor="middle">Screenshot unavailable</text>
</svg>
`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const width = searchParams.get("width") ?? "1600";
  const height = searchParams.get("height") ?? "900";

  if (!url) {
    return new NextResponse("Missing 'url' query parameter", { status: 400 });
  }

  const accessKey = process.env.APIFLASH_KEY;

  if (!accessKey) {
    const fallback = new NextResponse(fallbackSvg("Project Preview"), {
      headers: { "Content-Type": "image/svg+xml" },
    });
    fallback.headers.set("Cache-Control", "public, max-age=3600");
    return fallback;
  }

  const apiUrl = new URL("https://api.apiflash.com/v1/urltoimage");
  apiUrl.searchParams.set("access_key", accessKey);
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("format", "jpeg");
  apiUrl.searchParams.set("width", width);
  apiUrl.searchParams.set("height", height);

  try {
    const upstream = await fetch(apiUrl.toString(), { next: { revalidate: 86400 } });

    if (!upstream.ok) {
      const fallback = new NextResponse(
        fallbackSvg(`Preview for ${new URL(url).hostname}`),
        { headers: { "Content-Type": "image/svg+xml" } }
      );
      fallback.headers.set("Cache-Control", "public, max-age=3600");
      return fallback;
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse(fallbackSvg("Preview unavailable"), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}