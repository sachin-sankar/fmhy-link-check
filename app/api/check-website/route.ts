import https from "https";
import http from "http";
import { NextResponse } from "next/server";

const httpStatusMessages: Record<number, string> = {
  200: "OK",
  301: "Moved Permanently",
  302: "Found",
  400: "Bad Request",
  404: "Not Found",
  500: "Internal Server Error",
  // Add more status codes as needed
};

export async function GET(req: Request) {
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
    return new Promise<Response>((resolve, reject) => {
      protocol
        .get(website, (response) => {
          const statusCode = response.statusCode;
          const statusMessage =
            // @ts-expect-error The status code will be available
            httpStatusMessages[statusCode] || "Unknown Status";
          const hasSSL = isHttps;

          resolve(NextResponse.json({ statusCode, statusMessage, hasSSL }));
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
      // @ts-expect-error Its an error
      { error: "Unexpected error occurred", details: error.message },
      { status: 500 },
    );
  }
}
