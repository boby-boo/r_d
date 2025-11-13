import { render, screen } from "@testing-library/react";
import TasksList from "../TasksList";
import type { Task } from "../../types";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("TasksList", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Test Task 1",
      description: "Description 1",
      createdAt: new Date().toISOString(),
      status: "todo",
      priority: "low",
      deadline: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Test Task 2",
      description: "Description 2",
      createdAt: new Date().toISOString(),
      status: "in_progress",
      priority: "medium",
      deadline: new Date().toISOString(),
    },
  ];

  it("should renders list items correctly", () => {
    const onDeleteTask = vi.fn();
    renderWithRouter(
      <TasksList tasks={mockTasks} onDeleteTask={onDeleteTask} isLoading={false} error={null} />
    );

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
  });

  it("should shows empty state if no tasks", () => {
    renderWithRouter(
      <TasksList tasks={[]} onDeleteTask={vi.fn()} isLoading={false} error={null} />
    );

    expect(screen.getByText(/No tasks found/i)).toBeInTheDocument();
  });

  it("should shows error message on error", () => {
    renderWithRouter(
      <TasksList tasks={[]} onDeleteTask={vi.fn()} isLoading={false} error="Something went wrong" />
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
