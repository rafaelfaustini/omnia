import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import PathInput from './PathInput';


describe('PathInput', () => {
  const user = userEvent.setup();
  describe('when input is clicked', () => {
    it('enters input mode and focuses the textbox', async () => {
      const currentPathMock = "sample";
      render(<PathInput currentPath={currentPathMock} onPathChange={vi.fn()} />);

      const toolbar = screen.getByRole("toolbar");
      await user.click(toolbar);

      const manualInput = await screen.findByRole("textbox");
      expect(manualInput).toHaveFocus();
    });
    it('exits input mode on Enter', async () => {
      const currentPathMock = "home/mocked/path";
      const onPathChange = vi.fn();
      render(<PathInput currentPath={currentPathMock} onPathChange={onPathChange} />);

      const toolbar = screen.getByRole("toolbar");
      await user.click(toolbar);

      const manualInput = await screen.findByRole("textbox");

      await user.type(manualInput, '{enter}')
      expect(manualInput).not.toBeInTheDocument();

      expect(onPathChange).toHaveBeenCalledWith("home/mocked/path")
    });
  });

  test('blur resets newPath to currentPath and exits input mode', async () => {
      const user = userEvent.setup();
      const onPathChange = vi.fn();
      render(<PathInput currentPath="/home/user" onPathChange={onPathChange} />);

      const wrapper = screen.getByRole('toolbar');
      await user.click(wrapper);

      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, '/home/modified');
      await user.tab();

      const lastSegment = await screen.findByRole('button', { name: 'user' });
      expect(lastSegment).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  describe('when breadcrumb is clicked', () => {
    it("doesn't show manual input", async () => {
      const currentPathMock = "sample";
      render(<PathInput currentPath={currentPathMock} onPathChange={vi.fn()} />);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    })
  })
});
