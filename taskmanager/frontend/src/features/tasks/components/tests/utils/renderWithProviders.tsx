import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { FiltersProvider } from "../../../../../context/FiltersContext";

type Options = {
    initialEntries?: MemoryRouterProps["initialEntries"];
};

  
export const renderWithProviders = (ui: ReactElement, options = {}) => {
const { initialEntries = ["/"] } = options as Options;
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FiltersProvider>{ui}</FiltersProvider>
    </MemoryRouter>,
    options
  );
}
