import { NextResponse } from "next/server";

const fallbackSvg = (label: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1620" height="1080" viewBox="0 0 1620 1080">
  <rect width="1620" height="1080" fill="#171717"/>
  <text x="810" y="520" font-family="sans-serif" font-size="64" fill="#FA6B48" text-anchor="middle">${label}</text>
  <text x="810" y="590" font-family="sans-serif" font-size="28" fill="rgba(234,228,213,0.6)" text-anchor="middle">Screenshot unavailable</text>
</svg>
`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const width = searchParams.get("width") ?? "1620";
  const height = searchParams.get("height") ?? "1080";

  if (!url) {
    return new NextResponse("Missing 'url' query parameter", { status: 400 });
  }

  const accessKey = process.env.APIFLASH_KEY;

  if (!accessKey) {
    const fallback = new NextResponse(fallbackSvg("Preview"), {
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
      const fallback = new NextResponse(fallbackSvg("Preview"), {
        headers: { "Content-Type": "image/svg+xml" },
      });
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
    return new NextResponse(fallbackSvg("Preview"), {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}