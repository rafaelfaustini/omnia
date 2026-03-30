import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FileExplorer from './FileExplorer';
import { mockIPC } from '@tauri-apps/api/mocks';
import { vi } from 'vitest';

test('Navigate into a folder on linux', async () => {
  const user = userEvent.setup();

  interface DirectoryArgs {
   directory: string;
  }

  const mockHandler = vi.fn((cmd, args) => {
    
    if (cmd === 'home_directory') {
      return '/home';
    }
    if (cmd === 'directory_contents') {
        const { directory } = args as unknown as DirectoryArgs;
        if (directory === '/home') {
            return [{ name: 'Documents', extension: '', isFolder: true  }];
        }
        if (directory === '/home/Documents') {
            return [{ name: 'Resume', extension: '.pdf', isFolder: false }];
      }
      return [];
    }
  });

  mockIPC(mockHandler)

  render(<FileExplorer />);

  const folder = await screen.findByText(/Documents/i);
  expect(folder).toBeInTheDocument();

  await user.dblClick(folder);

  const childFile = await screen.findByText(/Resume/i);
  expect(childFile).toBeInTheDocument();

  expect(mockHandler).toHaveBeenCalledWith('directory_contents', { directory: '/home/Documents' });
});

test('Navigate into a folder on windows', async () => {
  const user = userEvent.setup();

  interface DirectoryArgs {
   directory: string;
  }

  const mockHandler = vi.fn((cmd, args) => {
    
    if (cmd === 'home_directory') {
      return 'C:\\Users\\omnia';
    }
    if (cmd === 'directory_contents') {
        const { directory } = args as unknown as DirectoryArgs;
        if (directory === 'C:\\Users\\omnia') {
            return [{ name: 'Documents', extension: '', isFolder: true  }];
        }
        if (directory === 'C:\\Users\\omnia\\Documents') {
            return [{ name: 'Resume', extension: '.pdf', isFolder: false }];
      }
      return [];
    }
  });

  mockIPC(mockHandler)

  render(<FileExplorer />);

  const folder = await screen.findByText(/Documents/i);
  expect(folder).toBeInTheDocument();

  await user.dblClick(folder);

  const childFile = await screen.findByText(/Resume/i);
  expect(childFile).toBeInTheDocument();

  expect(mockHandler).toHaveBeenCalledWith('directory_contents', { directory: 'C:\\Users\\omnia\\Documents' });
});