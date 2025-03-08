

export default async function findNearestStore(
  latitude,
  longitude,
  radius = 1000
) {
  const overpassURL = "https://overpass-api.de/api/interpreter";

  const query = `
    [out:json];
    (
      node["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
      way["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
      relation["amenity"="pharmacy"](around:${radius},${latitude},${longitude});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = ""
    // await fetch(overpassURL, {
    //   method: "POST",

    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: `data=${encodeURIComponent(query)}`,
    // });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    const data = await response.json();
    
    // If no pharmacies found
    if (!data.elements || data.elements.length === 0) {
      return {
        found: false,
        message: `No medical stores found within ${radius} meters`,
      };
    }

    // console.log(data.elements);

    const pharmacies = data.elements
      .filter(
        (element) =>
          element.type === "node" &&
          element.tags &&
          element.tags.amenity === "pharmacy"
      )
      .map((element) => {
        return {
          id: element.id,
          name: element.tags.name || "Unnamed Pharmacy",
          lat: element.lat,
          lon: element.lon,
          // distance: distance, // in meters
          address: element.tags["addr:street"]
            ? `${element.tags["addr:housenumber"] || ""} ${
                element.tags["addr:street"] || ""
              }, ${element.tags["addr:city"] || ""}`.trim()
            : "Address not available",
          phone: element.tags.phone || "Not available",
          website: element.tags.website || null,
          opening_hours: element.tags.opening_hours || "Not available",
        };
      })
      .sort((a, b) => a.distance - b.distance);
    
      return {
        found: pharmacies.length > 0,
        total: pharmacies.length,
        nearest: pharmacies[0],
        all: pharmacies
      };

    

  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    return {
      found: false,
      error: error.message,
    };
  }
}
