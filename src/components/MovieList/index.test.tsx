import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import MovieList from "./";
import axios from "axios";
import { unmountComponentAtNode } from "react-dom";

jest.mock("react-router-dom", () => {
  return {
    useParams: () => ({ id: "Her" }),
  };
});
jest.mock("axios");

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

it("renders movie list", async () => {
  const movieList = [{ Title: "movie1" }, { Title: "movie2" }];
  const axiosResult = {
    data: {
      Search: movieList,
      totalResults: 2,
    },
  };

  (axios.get as jest.Mock).mockImplementation(() => {
    return Promise.resolve(axiosResult);
  });

  await act(async () => {
    container && render(<MovieList />, { container });
  });
  const firstMovie = "movie1";
  const secondMovie = "movie2";
  const resultsInfo = "Results 0-10 of 2";
  console.log(container?.textContent);
  expect(container?.querySelector("ul")?.textContent).toBe(
    firstMovie + secondMovie
  );
  expect(container?.querySelector("section")?.textContent).toBe(resultsInfo);
});
