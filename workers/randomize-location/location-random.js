const axios = require('axios');

// Function to fetch nearest address within Indonesia that has a 'road' property
const getNearestAddress = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&countrycodes=ID`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Check if the 'address' object contains the 'road' property
        if (data.address && data.address.road) {
            const address = data.display_name;
            return address;
        } else {
            return null; // Return null if 'road' property is not found
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return null;
    }
};

// Delay function to handle rate limiting
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to generate a specific number of addresses with road property within a 50 km radius in Indonesia
const generateNearbyAddresses = async (lat, lon, numberOfAddresses = 5) => {
    const addresses = [];
    const maxOffset = 0.45; // 50 km offset approximation
    let attempts = 0; // Track attempts to avoid infinite loop

    while (addresses.length < numberOfAddresses) {
        await delay(1000); // Delay of 1 second between requests
        attempts++;

        // Randomly generate offsets within the 50 km range
        const latOffset = (Math.random() - 0.5) * maxOffset;
        const lonOffset = (Math.random() - 0.5) * maxOffset;

        const modifiedLat = lat + latOffset;
        const modifiedLon = lon + lonOffset;

        const address = await getNearestAddress(modifiedLat, modifiedLon);
        if (address) {
            addresses.push(address);
        }

        // Optional: Break if too many attempts have been made to avoid infinite loop (failsafe)
        if (attempts >= numberOfAddresses * 10) {
            console.warn(`Exceeded maximum attempts: ${attempts}, returning what we have.`);
            break;
        }
    }

    return addresses;
};

// Function to transform addresses into structured JSON format
const transformAddresses = (addresses) => {
    return addresses.map(address => {
        const parts = address.split(',').map(part => part.trim());

        // Extract parts based on their positions
        const street = parts.slice(0, 2).join(', ');
        const city = parts[2];
        let zipcode = parts[parts.length - 2];
        const country = parts[parts.length - 1];

        // Check if the zipcode is numeric, if not, set it to an empty string
        if (!/^\d+$/.test(zipcode)) {
            zipcode = "";
        }

        return {
            street: street,
            city: city,
            zipcode: zipcode,
            country: country
        };
    });
};

// Example usage
async function gate () {
    const lat = -6.2088; // Example latitude (Jakarta, Indonesia)
    const lon = 106.8456; // Example longitude (Jakarta, Indonesia)

    const rawAddresses = await generateNearbyAddresses(lat, lon, 1);
    // console.log('Raw Addresses:', rawAddresses);

    const structuredAddresses = transformAddresses(rawAddresses);
    // console.log('Structured Addresses:', structuredAddresses);

    return structuredAddresses
};

module.exports = gate;