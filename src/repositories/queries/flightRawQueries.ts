export function addRowLockForUpdate(flightId: number): string {
    return `SELECT * FROM "Flights" WHERE "Flights"."id" = ${flightId} FOR UPDATE`;
}