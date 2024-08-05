const getFlag = (flagName?: string): string => {
  if (flagName === "   " || !flagName) {
    console.error(`Flag not provided`);
    return "images/flags/fallback.png";
  }
  const shortenedFlagName = flagName?.substring(0, 2).toLowerCase();
  const flagSrc = `images/flags/${shortenedFlagName}.png`;
  return flagSrc;
};

export default getFlag;
