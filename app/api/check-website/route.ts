import https from "https";
import http from "http";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const website = searchParams.get("website");

  if (!website) {
    return NextResponse.json(
      { error: "Website URL is required" },
      { status: 400 },
    );
  }

  // Check if the URL starts with http or https
  const isHttps = website.startsWith("https://");
  const protocol = isHttps ? https : http;

  try {
    return new Promise((resolve, reject) => {
      protocol
        .get(website, (response) => {
          const statusCode = response.statusCode;
          const hasSSL = isHttps;

          resolve(NextResponse.json({ statusCode, hasSSL }));
        })
        .on("error", (err) => {
          reject(
            NextResponse.json(
              { error: "Failed to reach the website", details: err.message },
              { status: 500 },
            ),
          );
        });
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error occurred", details: error.message },
      { status: 500 },
    );
  }
}
