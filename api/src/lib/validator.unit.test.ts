import { describe, it } from "node:test";
import assert from "node:assert";
import { isValidPassword } from "./validator.ts";

// describe permet de faire un groupement de tests
// describe est facultatif
describe("isValidPassword", () => {
    // it permet de réaliser son test
    // Il est composé d'une chaine de caractère qui est là pour documenter votre test
    // Il est composé également d'une fonction qui vous sert à faire le test
    it("should return true when the password is valid", () => {
        //On va utiliser la methode AAA
        // Arrange: Mise en place des données nécessaire au test 
        const password = "Azertyuiop123456*";
        // Act: Execution de la fonction à tester
        const isValid = isValidPassword(password);
        // Assert: Notre test
        assert.ok(isValid);
    })

      it("Should return false when the password doesn't contains special caracters", () => {
        // On va utiliser la méthode AAA
        // Arrange: Mise en place des données nécessaire au test 
        const password = "Azertyuiop123456";
        // Act: Execution de la fonction à tester
        const isValid = isValidPassword(password);
        // Assert: C'est là où on vérifie notre test
        assert.ok(!isValid);
    })
}) 