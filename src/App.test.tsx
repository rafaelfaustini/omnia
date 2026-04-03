import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { mockIPC } from '@tauri-apps/api/mocks';

it('renders App component without crashing', async () => {
  mockIPC((cmd, args) => {
    
    if (cmd === 'home_directory') {
      return '/home/rafael/mock-folder';
    }
    if (cmd === 'directory_contents') {
      return [
        { name: 'Documents', extension: '', isFolder: true },
        { name: 'photo', extension: '.jpg', isFolder: false }
      ];
    }
  });

  render(<App />);
});