import { NextRequest } from "next/server";
const tokenAPI = process.env.IRRISTRAT_TOKEN;


export async function GET(request: NextRequest, {params}: {params: Promise<{stationID: string}>} ) {
  try {

    const{ stationID } = await params;
    if (!stationID) {
      return new Response(JSON.stringify({ error: "Station ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Create form data string instead of JSON
    const formData = new URLSearchParams();
    formData.append("token", tokenAPI || "");
    formData.append("option", "2");
    formData.append("id", stationID);

    // ✅ Make API request with URL-encoded body
    const response = await fetch("https://irristrat.com/ws/clients/meteoStations.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // ✅ Correct content type
      },
      body: formData.toString(), // ✅ Send as form data string
      next: { 
        revalidate: 43200 // 12 hours for daily data
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data for station ID: ${stationID}`);
    }

    const data = await response.json();

    // ✅ Extract correct station data
    const stationData = data[stationID] || data;
    if (!stationData) {
      return new Response(JSON.stringify({ error: "No data found for this station ID" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(stationData), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=21600" // 12 hours cache, stale for 6 more hours
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Unknown error occurred" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}