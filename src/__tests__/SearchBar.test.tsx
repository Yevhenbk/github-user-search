import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  test("renders search input with correct placeholder", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    const input = screen.getByPlaceholderText(/search github users/i);
    expect(input).toBeInTheDocument();
  });

  test("displays the provided value", () => {
    const testValue = "octocat";
    render(<SearchBar value={testValue} onChange={() => {}} />);
    
    const input = screen.getByDisplayValue(testValue);
    expect(input).toBeInTheDocument();
  });

  test("calls onChange when user types", () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText(/search github users/i);
    fireEvent.change(input, { target: { value: "new search" } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("new search");
  });

  test("handles empty input gracefully", () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="some text" onChange={mockOnChange} />);
    
    const input = screen.getByDisplayValue("some text");
    fireEvent.change(input, { target: { value: "" } });
    
    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});
