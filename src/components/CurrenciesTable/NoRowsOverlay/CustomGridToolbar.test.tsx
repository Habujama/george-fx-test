import { render, screen } from "@testing-library/react";
import NoRowsOverlay from "./NoRowsOverlay";

describe("custom table toolbar is rendered properly", () => {
  render(<NoRowsOverlay />);
  it("renders overlay", () => {
    const overlay = screen.getByTestId("overlay");
    expect(overlay).toBeInTheDocument();
  });
});
