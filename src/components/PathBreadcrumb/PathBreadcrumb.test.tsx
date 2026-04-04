import userEvent from "@testing-library/user-event";
import { describe, vi } from "vitest";
import PathBreadcrumb from "./PathBreadcrumb";
import { render, screen } from "@testing-library/react";


describe('PathBreadcrumb', () => {
  const user = userEvent.setup();
  describe('renders segments', () => {
    it('renders buttons for each path segment', async () => {
      const currentPathMock = "/etc/network/interfaces";
      render(<PathBreadcrumb currentPath={currentPathMock} onPathChange={vi.fn()} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
      expect(screen.getByRole('button', { name: 'etc' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'network' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'interfaces' })).toBeInTheDocument();
    });
  });
});
  