Charges vs Count:

- An item is count_by_charges if it has "stackable": true in JSON, is an AMMO subtype, or is a non-solid COMESTIBLE. 
- For count_by_charges items, charges is the quantity (e.g., 50 rounds of 9mm = one item object with charges = 50). For non-stackable items, charges tracks tool power/ammo level, and count() always returns 1

Part 2: Item Group Spawn Entries

This is where the confusion is most acute. In a spawn entry like { "item": "9mm", ... }:
Field	Meaning
count	How many separate item instances to create (repeats the spawn). Default [1,1].
charges	The charge/quantity value set on each spawned item.
For count_by_charges items (ammo, food, stackable)

    "charges": 20 → spawns 1 item object with charges = 20 (e.g., a stack of 20 rounds)
    "count": 3 → spawns 3 separate item objects, each with default charges
    "count": 3, "charges": 20 → spawns 3 separate item objects, each with 20 charges

For non-count_by_charges items (clothing, weapons, etc.)

    "count": 5 → spawns 5 separate items
    "charges" → sets tool battery/ammo level, not quantity

The critical asymmetry

For count_by_charges items, charges and count are not interchangeable:

    { "item": "9mm", "charges": 50 } → 1 item object, 50 rounds, merges into existing stacks
    { "item": "9mm", "count": 50, "charges": 1 } → 50 separate item objects, each with 1 round

Porting Between the Two
Porting charges → count (for a count_by_charges item)

Only valid when you want separate physical item instances instead of one merged stack.

// Before: one stack of 20 rounds  
{ "item": "9mm", "charges": 20 }

// After: 20 separate single-round items (NOT equivalent for stacking)  
{ "item": "9mm", "count": 20, "charges": 1 }

For the migration the project is doing (removing the charges system), the correct port is to make the item non-count_by_charges and use count for quantity. This requires:

    Removing "stackable": true (or changing from AMMO/liquid COMESTIBLE)
    Adjusting weight and volume to be per-item (not per-charge)
    Adjusting price similarly
    In spawn groups, replacing "charges": N with "count": N

Porting count → charges (for a non-stackable item becoming stackable)

// Before: 5 separate bandage items  
{ "item": "bandage", "count": 5 }

// After: one stack of 5 (requires item to have "stackable": true)  
{ "item": "bandage", "charges": 5 }

This also requires updating the item definition:

    Add "stackable": true
    Set "stack_size" to the logical stack size
    Change volume to mean "volume of stack_size charges" (multiply by stack_size)
    Change weight to mean "weight per single charge" (keep as-is if it was already per-item)
    Change price to mean "price for stack_size charges"

| Scenario                              | Use `charges`                    | Use `count`                              |
|---------------------------------------|----------------------------------|------------------------------------------|
| Ammo quantity in spawn                | `"charges": 50`                  | Wrong field                              |
| Multiple separate non-stackable items | Wrong field                      | `"count": 5`                             |
| Multiple separate stackable stacks    | `"charges": N, "count": M`       | `"count": M` (each gets default charges) |
| Tool battery level                    | `"charges": 100`                 | Wrong field                              |
| Item definition: default quantity     | `"charges": N` (default charges) | `"count": N` (ammo: pellets per shot)    |


# AI SUMMARY
# Cataclysm-DDA: charges vs count reference

## The core predicate: `count_by_charges()`
An item is "count_by_charges" if it is:
- AMMO subtype, OR
- non-solid COMESTIBLE subtype, OR
- has `"stackable": true` in its JSON definition

## Item definition JSON semantics
For `count_by_charges` items:
- `weight` = weight **per single charge**
- `volume` = volume of **`stack_size` charges** (NOT one charge)
- `price` = price for **`stack_size` charges**
- `stack_size` defaults to `charges_default()` if unset

For non-`count_by_charges` items:
- `weight`, `volume`, `price` = per single item instance

## Item group spawn entry semantics
- `count`: how many **separate item instances** to create (repeats the spawn). Default 1.
- `charges`: the **charge/quantity value** set on each spawned item.

For `count_by_charges` items (ammo, food, stackable):
- `"charges": 20` → 1 item object with charges=20 (one merged stack of 20)
- `"count": 3` → 3 separate item objects, each with default charges
- `"count": 3, "charges": 20` → 3 separate item objects, each with 20 charges
- These are NOT interchangeable: charges merges into one stack, count creates N separate objects

For non-`count_by_charges` items (clothing, weapons, etc.):
- `"count": 5` → 5 separate items
- `"charges"` → sets tool battery/ammo level only, not quantity

## Runtime
- `item::charges` = raw field; for count_by_charges items this IS the quantity
- `item::count()` = returns `charges` if count_by_charges, else `1`

## Porting count_by_charges item → non-stackable (charges → count)
1. Remove `"stackable": true` (or change away from AMMO/liquid COMESTIBLE type)
2. Adjust `volume` to be per-item (divide by old stack_size)
3. Adjust `price` to be per-item (divide by old stack_size)
4. `weight` stays the same (was already per-charge = per-item)
5. In spawn groups: replace `"charges": N` with `"count": N`

## Porting non-stackable item → count_by_charges (count → charges)
1. Add `"stackable": true` and set `"stack_size": N`
2. Adjust `volume` to mean "volume of stack_size charges" (multiply by stack_size)
3. Adjust `price` to mean "price for stack_size charges" (multiply by stack_size)
4. `weight` stays the same (already per-item = per-charge)
5. In spawn groups: replace `"count": N` with `"charges": N`  