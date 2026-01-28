import assert from "node:assert";
import { describe, it } from "node:test";
import { prisma } from "../models/index.ts"

describe("[GET] /api/levels", () => {
    it('should return 0 levels from database', async () => {
        // ARRANGE
            const databaseLevels = await prisma.level.findMany({where: {}})
        // ACT
            const httpResponse = await fetch("http://localhost:7357/api/levels");
            const body = await httpResponse.json();
        //ASSERT
        assert.strictEqual(body.length, 0);
    })

    it('should return 2 levels from database', async () => {
        // ARRANGE
            const databaseLevels = await prisma.level.createMany({
                data: [
                    { name: "Beginner" },
                    { name: "Intermediate" }
                ]
            })
        // ACT
            const httpResponse = await fetch("http://localhost:7357/api/levels");
            const body = await httpResponse.json();
        // ASSERT
        assert.strictEqual(body.length, 2);
    })
})