import { cn, getSizeClasses, getColorClasses } from "../classNames";

describe("classNames utilities", () => {
  describe("cn function", () => {
    it("combines multiple class names", () => {
      expect(cn("class1", "class2", "class3")).toBe("class1 class2 class3");
    });

    it("handles undefined and null values", () => {
      expect(cn("class1", undefined, "class2", null, "class3")).toBe(
        "class1 class2 class3",
      );
    });

    it("handles boolean values", () => {
      expect(cn("class1", true && "class2", false && "class3")).toBe(
        "class1 class2",
      );
    });

    it("handles empty input", () => {
      expect(cn()).toBe("");
    });

    it("handles mixed inputs", () => {
      const isActive = true;
      const isDisabled = false;
      expect(
        cn(
          "base-class",
          isActive && "active",
          isDisabled && "disabled",
          undefined,
          "final-class",
        ),
      ).toBe("base-class active final-class");
    });

    it("handles only falsy values", () => {
      expect(cn(false, null, undefined)).toBe("");
    });
  });

  describe("getSizeClasses function", () => {
    it("returns default (md) size classes when no size provided", () => {
      expect(getSizeClasses()).toBe("text-sm px-4 py-2");
    });

    it.each([
      ["xs", "text-xs px-2 py-1"],
      ["sm", "text-sm px-3 py-1.5"],
      ["md", "text-sm px-4 py-2"],
      ["lg", "text-base px-5 py-2.5"],
      ["xl", "text-lg px-6 py-3"],
    ])("returns correct classes for %s size", (size, expectedClasses) => {
      expect(getSizeClasses(size as "xs" | "sm" | "md" | "lg" | "xl")).toBe(
        expectedClasses,
      );
    });

    it("handles undefined size gracefully", () => {
      expect(getSizeClasses(undefined)).toBe("text-sm px-4 py-2");
    });
  });

  describe("getColorClasses function", () => {
    it("returns default primary solid classes when no parameters provided", () => {
      expect(getColorClasses()).toBe(
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      );
    });

    it("returns default solid variant when only color provided", () => {
      expect(getColorClasses("success")).toBe(
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      );
    });

    describe("Primary color variants", () => {
      it.each([
        [
          "solid",
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        ],
        [
          "outline",
          "border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
        ],
        ["ghost", "text-blue-600 hover:bg-blue-50 focus:ring-blue-500"],
        [
          "soft",
          "bg-blue-50 text-blue-600 hover:bg-blue-100 focus:ring-blue-500",
        ],
      ])(
        "returns correct classes for primary %s variant",
        (variant, expectedClasses) => {
          expect(getColorClasses("primary", variant)).toBe(expectedClasses);
        },
      );
    });

    describe("Success color variants", () => {
      it.each([
        [
          "solid",
          "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        ],
        [
          "outline",
          "border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500",
        ],
        ["ghost", "text-green-600 hover:bg-green-50 focus:ring-green-500"],
        [
          "soft",
          "bg-green-50 text-green-600 hover:bg-green-100 focus:ring-green-500",
        ],
      ])(
        "returns correct classes for success %s variant",
        (variant, expectedClasses) => {
          expect(getColorClasses("success", variant)).toBe(expectedClasses);
        },
      );
    });

    describe("Danger color variants", () => {
      it.each([
        ["solid", "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"],
        [
          "outline",
          "border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
        ],
        ["ghost", "text-red-600 hover:bg-red-50 focus:ring-red-500"],
        ["soft", "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500"],
      ])(
        "returns correct classes for danger %s variant",
        (variant, expectedClasses) => {
          expect(getColorClasses("danger", variant)).toBe(expectedClasses);
        },
      );
    });

    describe("All color types", () => {
      it.each([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ])("returns valid classes for %s color", (color) => {
        const result = getColorClasses(color, "solid");
        expect(result).toBeTruthy();
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
      });
    });

    describe("Fallback behavior", () => {
      it("returns primary solid for unknown color", () => {
        expect(getColorClasses("unknown-color")).toBe(
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        );
      });

      it("returns primary solid for unknown variant", () => {
        expect(getColorClasses("primary", "unknown-variant")).toBe(
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        );
      });

      it("returns primary solid for both unknown color and variant", () => {
        expect(getColorClasses("unknown-color", "unknown-variant")).toBe(
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        );
      });
    });

    describe("Edge cases", () => {
      it("handles empty string inputs", () => {
        expect(getColorClasses("", "")).toBe(
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        );
      });

      it("handles undefined inputs", () => {
        expect(getColorClasses(undefined, undefined)).toBe(
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        );
      });
    });

    describe("Class structure validation", () => {
      it("returns classes containing background, text, hover, and focus states for solid variants", () => {
        const classes = getColorClasses("primary", "solid");
        expect(classes).toMatch(/bg-\w+/); // background color
        expect(classes).toMatch(/text-\w+/); // text color
        expect(classes).toMatch(/hover:bg-\w+/); // hover background
        expect(classes).toMatch(/focus:ring-\w+/); // focus ring
      });

      it("returns classes containing border for outline variants", () => {
        const classes = getColorClasses("primary", "outline");
        expect(classes).toMatch(/border-\w+/); // border color
        expect(classes).toMatch(/text-\w+/); // text color
        expect(classes).toMatch(/hover:bg-\w+/); // hover background
        expect(classes).toMatch(/focus:ring-\w+/); // focus ring
      });

      it("returns classes without background for ghost variants", () => {
        const classes = getColorClasses("primary", "ghost");
        expect(classes).not.toMatch(/^bg-/); // no initial background
        expect(classes).toMatch(/text-\w+/); // text color
        expect(classes).toMatch(/hover:bg-\w+/); // hover background
        expect(classes).toMatch(/focus:ring-\w+/); // focus ring
      });
    });
  });
});
