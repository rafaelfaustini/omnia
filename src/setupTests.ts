import '@testing-library/jest-dom/vitest';
import { mockWindows } from "@tauri-apps/api/mocks";

// This helps RTL and Tauri play nice together
mockWindows("main");