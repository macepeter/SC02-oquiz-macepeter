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
            assert.strictEqual(body[0].firstname, databaseUsers[0].firstname)
            assert.strictEqual(body[0].lastname, databaseUsers[0].lastname)
            assert.strictEqual(body[0].email, databaseUsers[0].email)
            assert.strictEqual(body[0].password, databaseUsers[0].password)
            assert.strictEqual(body[1].firstname, databaseUsers[1].firstname)
            assert.strictEqual(body[1].lastname, databaseUsers[1].lastname)
            assert.strictEqual(body[1].email, databaseUsers[1].email)
            assert.strictEqual(body[1].password, databaseUsers[1].password)
    })
})