

export default async function findNearestStore(
  latitude,
  longitude,
  radius = 1000,
  filter = "pharmacy"
) {
  const overpassURL = "https://overpass-api.de/api/interpreter";

  const query = `
    [out:json];
    (
      node["amenity"=${filter}](around:${radius},${latitude},${longitude});
      way["amenity"=${filter}](around:${radius},${latitude},${longitude});
      relation["amenity"=${filter}](around:${radius},${latitude},${longitude});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = ""
    await fetch(overpassURL, {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    const data = await response.json();
    console.log(data)
    
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

        const distance = calculateDistance(latitude, longitude, element.lat, element.lon);
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
          distance:distance
        };
      })
      .sort((a, b) => a.distance - b.distance);
      
      console.log("pharmacies>>", pharmacies)
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

// To calculate distance between two positions
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; 
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c; //  in meters
}