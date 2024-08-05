import getFlags from "./getFlags";

describe("getFlags function returns a", () => {
  it("Should return a valid png source if given currency abbreviation", () => {
    const res = getFlags("MDX");
    expect(res).toBe("images/flags/md.png");
  });

  it("Should return fallback png source if given empty string", () => {
    const res = getFlags("");
    expect(res).toBe("images/flags/fallback.png");
  });

  it("Should return fallback png source if given three spaces", () => {
    const res = getFlags("   ");
    expect(res).toBe("images/flags/fallback.png");
  });

  it("Should log error to console if given empty string", () => {
    const logSpy = jest.spyOn(global.console, "error");

    getFlags("");

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Flag not provided");
  });
});
