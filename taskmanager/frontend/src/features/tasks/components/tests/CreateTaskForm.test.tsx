import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateTaskForm from "../CreateTaskForm";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { renderWithProviders } from "./utils/renderWithProviders";

vi.mock("../api", () => ({
  postTask: vi.fn(() => Promise.resolve({ id: "1" })),
  getTaskById: vi.fn(),
  updateTask: vi.fn(),
}));

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <CreateTaskForm />
    </BrowserRouter>
  );
};

describe("CreateTaskForm", () => {
  it("should disable submit if invalid", () => {
    renderWithRouter();
    const submitButton = screen.getByRole("button", { name: /add task/i });
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit when valid", async () => {
    renderWithRouter();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "My Task" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Some long valid description" } });
    fireEvent.change(screen.getByLabelText(/deadline/i), { target: { value: "2099-12-31" } });

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /add task/i })).not.toBeDisabled();
    });
  });
  
  it("should show validation messages", async () => {
    renderWithRouter();

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: "M" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Not valid" } });

    await waitFor(() => {
      expect(screen.getByText(/Title must be at least 2 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/Description must be at least 10 characters long/i)).toBeInTheDocument();
    });
  });
  
});
