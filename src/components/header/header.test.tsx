/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomHeader } from "@/components/header/header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

interface NavLinkDestructured {
  to: string;
  children: JSX.Element;
}

describe("CustomHeader Component", () => {
  const mockPages = [
    { title: "Home", path: "/home" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  it("should render the header with the correct title", () => {
    render(
      <BrowserRouter>
        <CustomHeader title="My Website" pages={mockPages} />
      </BrowserRouter>
    );

    const title = screen.getByText("My Website");
    expect(title).toBeInTheDocument();
  });

  it("should render the correct number of navigation links", () => {
    render(
      <BrowserRouter>
        <CustomHeader title="My Website" pages={mockPages} />
      </BrowserRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockPages.length);
  });

  it("should render navigation links with correct titles", () => {
    render(
      <BrowserRouter>
        <CustomHeader title="My Website" pages={mockPages} />
      </BrowserRouter>
    );

    mockPages.forEach((page) => {
      const link = screen.getByText(page.title);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", page.path);
    });
  });

  it("should apply the active class to the active navigation link", () => {
    vi.mock("react-router", () => ({
      ...vi.importActual("react-router"),
      NavLink: ({ to, children }: NavLinkDestructured) => (
        <a
          href={to}
          className={to === "/home" ? "custom-header__pages--active" : ""}
        >
          {children}
        </a>
      ),
    }));

    render(
      <BrowserRouter>
        <CustomHeader title="My Website" pages={mockPages} />
      </BrowserRouter>
    );

    const activeLink = screen.getByText("Home");
    expect(activeLink).toHaveClass("custom-header__pages--active");
  });
});
