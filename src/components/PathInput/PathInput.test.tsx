import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileSystemObject from '../../constants/FileSystemObject';
import { vi } from 'vitest';
import PathInput from './PathInput';


describe('PathContent', () => {
  describe('when input is clicked', () => {
    it('allows to write a path manually', async () => {
      const currentPathMock = "sample";
      const user = userEvent.setup();

      render(<PathInput currentPath={currentPathMock} onPathChange={vi.fn()} />);

      const toolbar = screen.getByRole("toolbar");
      await user.click(toolbar);

      const manualInput = await screen.findByRole("textbox");
      expect(manualInput).toHaveFocus();
    });
  });
});
