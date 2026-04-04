import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { mockIPC } from '@tauri-apps/api/mocks';
import { vi } from 'vitest';
import { assembleFilePath, assembleFolderPath, getPathSeparator } from './pathUtils';
import FileSystemObject from '../constants/FileSystemObject';

describe("PathUtils", () => {
    describe("getPathSeparator", () => {
        it('gives the windows path separator', () => {
            const mockedPath = "C:\\User\\Program Files\\omni";
            const separator = getPathSeparator(mockedPath);
            expect(separator).toBe("\\");
        })
        it('gives the linux path separator', () => {
            const mockedPath = "home/omni/files";
            const separator = getPathSeparator(mockedPath);
            expect(separator).toBe("/");
        })
    }) 
    describe("assembleFolderPath", () => {
        it('tries to assemble folder path passing a file', () => {
            const currentPathMock = "A:\\projects";
            const fileSystemObjectMock: FileSystemObject = {
                name: "omni",
                extension: "txt",
                isFolder: false
            };

            expect(() => assembleFolderPath(currentPathMock, fileSystemObjectMock)).toThrow(/folder/);
        })
        it('assembles a folder path in linux', () => {
            const currentPathMock = "/home/user/documents/";
            const fileSystemObjectMock: FileSystemObject = {
                name: "omni-files",
                extension: "",
                isFolder: true
            };
            const assembledFolder = assembleFolderPath(currentPathMock, fileSystemObjectMock);
            expect(assembledFolder).toBe("/home/user/documents/omni-files");
        })
        it('assembles a folder path in windows', () => {
            const currentPathMock = "C:\\Program Files\\Google\\Chrome\\";
            const fileSystemObjectMock: FileSystemObject = {
                name: "Application",
                extension: "",
                isFolder: true
            };
            const assembledFolder = assembleFolderPath(currentPathMock, fileSystemObjectMock);
            expect(assembledFolder).toBe("C:\\Program Files\\Google\\Chrome\\Application");
        })
    }) 
    describe("assembleFilePath", () => {
        it('tries to assemble file path passing a folder', () => {
            const currentPathMock = "A:\\projects";
            const fileSystemObjectMock: FileSystemObject = {
                name: "omni",
                extension: "",
                isFolder: true
            };

            expect(() => assembleFilePath(currentPathMock, fileSystemObjectMock)).toThrow(/file/);
        })
        it('assembles a file path in linux', () => {
            const currentPathMock = "/var/log/syslog";
            const fileSystemObjectMock: FileSystemObject = {
                name: "sys",
                extension: "log",
                isFolder: false
            };
            const assembledFolder = assembleFilePath(currentPathMock, fileSystemObjectMock);
            expect(assembledFolder).toBe("/var/log/syslog/sys.log");
        })
        it('assembles a file path in windows', () => {
            const currentPathMock = "C:\\Program Files\\Google\\Chrome\\";
            const fileSystemObjectMock: FileSystemObject = {
                name: "chrome",
                extension: "exe",
                isFolder: false
            };
            const assembledFolder = assembleFilePath(currentPathMock, fileSystemObjectMock);
            expect(assembledFolder).toBe("C:\\Program Files\\Google\\Chrome\\chrome.exe");
        })
    }) 

});