import { describe, expect, it } from "vitest";
import { toReadableDate } from "./utils";

describe("toReadableDate", () => {
    it("should return the date in french", () => {
        // Arrange
        const date = new Date("2026/01/28")

        // Act
        const result = toReadableDate(date)

        // Assert
        expect(result).toBe("mercredi 28 janvier 2026")
    })
    it("should not display the 0-before a small number", () => {
        // Arrange
            const date = new Date("2026/01/01")
        // Act
            const result = toReadableDate(date)
        // Assert
            expect(result).toBe("jeudi 1 janvier 2026")
    })
})