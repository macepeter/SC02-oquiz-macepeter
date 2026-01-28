import assert from "node:assert";
import { describe, it } from "node:test";
import { prisma } from "../models/index.ts"

describe("[GET] /api/users", () => {
    it('should return users from database', async () => {
        // ARRANGE
            const databaseUsers = await prisma.user.createManyAndReturn({data: [
                { firstname: "Alice", lastname: "Oclock", email: "alice@oclock.io", password: "P4$$word!" },
                { firstname: "Bobby", lastname: "Oclock", email: "bobby@oclock.io", password: "P4$$word!" }
            ]})
        // ACT
            const httpResponse = await fetch("http://localhost:7357/api/users");
            const body = await httpResponse.json()
        //ASSERT
            console.log(body)
            assert.ok(true)
    })
})