import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PathContent from './PathContent';
import FileSystemObject from '../../constants/FileSystemObject';
import { vi } from 'vitest';


describe('PathContent', () => {
  describe('when pathContent is empty', () => {
    it('renders nothing', () => {
      render(<PathContent pathContent={[]} onFileSystemItemDoubleClicked={vi.fn()} />);
      expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });
  });

  describe('when pathContent has items', () => {
    it('renders all items as FileSystemItem components', () => {
      const items: FileSystemObject[] = [
        { name: 'file1', extension: '.txt', isFolder: false },
        { name: 'folder1', extension: '', isFolder: true },
      ];
        render(
          <PathContent pathContent={items} onFileSystemItemDoubleClicked={vi.fn()} />
        );
      expect(screen.getByText('file1')).toBeInTheDocument();
      expect(screen.getByText('folder1')).toBeInTheDocument();
    });
  });
});
