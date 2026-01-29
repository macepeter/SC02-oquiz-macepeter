import assert from "node:assert";
import { describe, it } from "node:test";
import { prisma } from "../models/index.ts"

describe("[GET] /api/levels", () => {
    it('should return 0 levels from database', async () => {
        // ARRANGE
        const databaseLevels = await prisma.level.findMany({ where: {} })
        // ACT
        const httpResponse = await fetch("http://localhost:7357/api/levels");
        const body = await httpResponse.json();
        //ASSERT
        assert.strictEqual(body.length, 0);
    })

    it("Should return 2 levels if there is 2 levels inside the database", async () => {
        // Arrange
        const databaseLevels = await prisma.level.createManyAndReturn({
            data: [
                { name: "difficile" },
                { name: "moyen" }
            ]
        })
        // Act
        const httpResponse = await fetch("http://localhost:7357/api/levels");
        const body = await httpResponse.json()
        // Assert
        assert.ok(Array.isArray(body))
        assert.strictEqual(body.length, 2)
        for (let i = 0; i <= 1; i++) {
            assert.strictEqual(body[i].name, databaseLevels[i].name)
        }
    })

    it("Should return all properties of levels", async () => {
        // Arrange
        const databaseLevels = await prisma.level.createManyAndReturn({
            data: [
                { name: "difficile" }
            ]
        })
        // Act
        const httpResponse = await fetch("http://localhost:7357/api/levels");
        const body = await httpResponse.json()
        // Assert
        assert.ok(body[0].id)
        assert.ok(body[0].name)
        assert.ok(body[0].created_at)
        assert.ok(body[0].updated_at)
    })
});
describe("[GET] getLevelById", () => {
    it("Should return the good properties of the level", async () => {
        // Arrange
        const databaseLevel = await prisma.level.create({
            data: { name: "difficile" }
        });

        // Act
        const httpResponse = await fetch(`http://localhost:7357/api/levels/${databaseLevel.id}`);
        const body = await httpResponse.json();

        // Assert
        assert.strictEqual(body.id, databaseLevel.id);
        assert.strictEqual(body.name, databaseLevel.name);
        assert.equal(body.created_at, databaseLevel.created_at.toISOString());
        assert.equal(body.updated_at, databaseLevel.updated_at.toISOString());
    });
    it("Should return an 404 error if levels doesn't exist", async () => {     
        // Act
            const httpResponse = await fetch(`http://localhost:7357/api/levels/10`);
            const body = await httpResponse.json()
        // Assert
            assert.equal(httpResponse.status, 404)
    })
});

describe("[POST] createLevel", () => {
    it("Should return all data of created level", async () => {
        // Arrange
            const levelToCreate = { name: "difficile" }
        // Act
            const httpResponse = await fetch(`http://localhost:7357/api/levels/`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(levelToCreate)
            });
            const body = await httpResponse.json()
        // Assert
            assert.equal(body.name, levelToCreate.name)
            assert.ok(body.id)
            assert.ok(body.created_at)
            assert.ok(body.updated_at)
    })

    it("Should return a 409 error if 2 request have the same name", () => {
        
    })
})
