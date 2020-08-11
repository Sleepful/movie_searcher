import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Search from "./";
import { unmountComponentAtNode } from "react-dom";

jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({ pathname: "" }),
    useHistory: () => ({ history: () => {} }),
    Route: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});
jest.mock("../../components/MovieList", () => {
  return () => <div></div>;
});

let container: HTMLElement | null = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container != null) {
    unmountComponentAtNode(container);
    container.remove();
  }
  container = null;
});

it("renders root component", () => {
  act(() => {
    container && render(<Search />, { container });
  });
  const labelText = "Search a movie";
  const buttonText = "Go!";
  expect(container?.textContent).toBe(labelText + buttonText);
});
