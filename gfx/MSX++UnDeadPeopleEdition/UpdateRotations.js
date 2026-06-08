#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function swap4(fg) {
	if (
		Array.isArray(fg) &&
		fg.length === 4 &&
		fg.every((x) => typeof x === "number")
	) {
		return [fg[0], fg[3], fg[2], fg[1]];
	}
	return fg;
}

function fixTile(tile) {
	let changed = false;
	if ("fg" in tile) {
		const newFg = swap4(tile.fg);
		if (JSON.stringify(newFg) !== JSON.stringify(tile.fg)) {
			console.log(`  [fg] ${JSON.stringify(tile.fg)} -> ${JSON.stringify(newFg)}`);
			tile.fg = newFg;
			changed = true;
		}
	}
	if (Array.isArray(tile.additional_tiles)) {
		for (const subtile of tile.additional_tiles) {
			if ("fg" in subtile) {
				const newFg = swap4(subtile.fg);
				if (JSON.stringify(newFg) !== JSON.stringify(subtile.fg)) {
					console.log(`  [additional_tiles.${subtile.id}.fg] ${JSON.stringify(subtile.fg)} -> ${JSON.stringify(newFg)}`);
					subtile.fg = newFg;
					changed = true;
				}
			}
		}
	}
	return changed;
}

function processTilesNew(tilesNewArray) {
	let totalChanged = 0;
	for (const sheet of tilesNewArray) {
		const tiles = sheet.tiles ?? [];
		console.log(`  Sheet "${sheet.file ?? "?"}": ${tiles.length} tiles`);
		for (const tile of tiles) {
			if (fixTile(tile)) totalChanged++;
		}
	}
	return totalChanged;
}

const inputPath = process.argv[2];
if (!inputPath) {
	console.error(`Usage: node fix_rotations.js <tileset.json>`);
	process.exit(1);
}

const outputPath = path.join(path.dirname(inputPath), "tile_config_new.json");

const raw = fs.readFileSync(inputPath, "utf8");
const data = JSON.parse(raw);

let changed = 0;

if (Array.isArray(data)) {
	console.log(`Top-level: array with ${data.length} entries`);
	for (const entry of data) {
		if (entry?.["tiles-new"]) {
			console.log(`Found tiles-new with ${entry["tiles-new"].length} sheets`);
			changed += processTilesNew(entry["tiles-new"]);
		} else {
			console.log(`Entry has no tiles-new. Keys: ${Object.keys(entry ?? {}).join(", ")}`);
		}
	}
} else if (data && typeof data === "object") {
	console.log(`Top-level: object. Keys: ${Object.keys(data).join(", ")}`);
	if (data["tiles-new"]) {
		console.log(`Found tiles-new with ${data["tiles-new"].length} sheets`);
		changed += processTilesNew(data["tiles-new"]);
	} else {
		console.log("No tiles-new found at root level.");
	}
}

console.log(`\nTotal tiles changed: ${changed}`);
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf8");
console.log(`Written: ${outputPath}`);