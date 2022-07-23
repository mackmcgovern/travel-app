import { checkDates } from "../src/client/js/checkDates";

describe("compares two dates", () => {
    test("should be true", function() {
        expect(() => checkDates("04-12-2023", "03-25-2022")).toBeTruthy();
    });

});



