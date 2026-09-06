import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BuilderPage from "@/pages/BuilderPage";

describe("BuilderPage render test", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <BuilderPage />
      </BrowserRouter>
    );
  });
});
