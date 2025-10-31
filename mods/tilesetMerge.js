// a_small_program_updated.js

const fs = require("fs");

/**
 * Extracts all unique IDs from the complex JSON structure into a Set for efficient lookup.
 * It handles cases where an "id" is a single string or an array of strings.
 *
 * @param {Array} data - The parsed JSON data.
 * @returns {Set<string>} - A Set containing all unique IDs.
 */
function getAllIds(data) {
    const idSet = new Set();

    for (const topLevelObject of data) {
        if (
            topLevelObject["tiles-new"] &&
            Array.isArray(topLevelObject["tiles-new"])
        ) {
            for (const tileGroup of topLevelObject["tiles-new"]) {
                if (tileGroup.tiles && Array.isArray(tileGroup.tiles)) {
                    for (const tile of tileGroup.tiles) {
                        if (tile.id) {
                            if (Array.isArray(tile.id)) {
                                // If the id is an array, add each id from the array
                                tile.id.forEach((id) => idSet.add(id));
                            } else {
                                // If the id is a single string
                                idSet.add(tile.id);
                            }
                        }
                    }
                }
            }
        }
    }
    return idSet;
}

/**
 * Filters objects from the first JSON data that do not have a matching 'id' in the second JSON data,
 * navigating through the nested structure.
 *
 * @param {string} jsonFile1Path - The file path for the first JSON file.
 * @param {string} jsonFile2Path - The file path for the second JSON file.
 * @returns {string} - A JSON string containing the filtered data.
 */
function filterUniqueObjects(jsonFile1Path, jsonFile2Path) {
    try {
        // Read and parse both JSON files
        const file1Content = fs.readFileSync(jsonFile1Path, "utf8");
        const file2Content = fs.readFileSync(jsonFile2Path, "utf8");

        const data1 = JSON.parse(file1Content);
        const data2 = JSON.parse(file2Content);

        // Get a set of all IDs from the second file for quick checking
        const idsToFilterOut = getAllIds(data2);

        // Create a deep copy of the first data to avoid modifying it while iterating
        const resultData = JSON.parse(JSON.stringify(data1));

        // Iterate through the structure and filter the 'tiles' arrays
        for (const topLevelObject of resultData) {
            if (
                topLevelObject["tiles-new"] &&
                Array.isArray(topLevelObject["tiles-new"])
            ) {
                for (const tileGroup of topLevelObject["tiles-new"]) {
                    if (tileGroup.tiles && Array.isArray(tileGroup.tiles)) {
                        // Filter the 'tiles' array in place
                        tileGroup.tiles = tileGroup.tiles.filter((tile) => {
                            if (!tile.id) return true; // Keep objects without an id

                            // Standardize the id to an array for uniform checking
                            const ids = Array.isArray(tile.id)
                                ? tile.id
                                : [tile.id];

                            // Check if any of the IDs for this object exist in the second file's ID set
                            const hasMatch = ids.some((id) =>
                                idsToFilterOut.has(id)
                            );

                            return !hasMatch; // Keep the tile if it has NO match
                        });
                    }
                }
                // Optional: Clean up any tile groups that are now empty
                topLevelObject["tiles-new"] = topLevelObject[
                    "tiles-new"
                ].filter(
                    (tileGroup) => tileGroup.tiles && tileGroup.tiles.length > 0
                );
            }
        }

        // Optional: Clean up any top-level objects that are now empty
        const finalResult = resultData.filter(
            (topLevelObject) =>
                topLevelObject["tiles-new"] &&
                topLevelObject["tiles-new"].length > 0
        );

        // Convert the filtered result back to a JSON string with pretty printing
        return JSON.stringify(finalResult, null, 2);
    } catch (error) {
        return `An error occurred: ${error.message}\nCheck that your JSON files are correctly formatted.`;
    }
}





// --- How to Use ---

// 2. Specify the paths to your JSON files.
const firstJsonFilePath = "chibi_tileset.json";
const secondJsonFilePath = "undead_tileset.json";

// 3. Call the function and store the result.
const finalJson = filterUniqueObjects(firstJsonFilePath, secondJsonFilePath);

// 4. Print the result to the console.
console.log(finalJson);

// Optional: Save the result to a new file
fs.writeFileSync("result.json", finalJson);
