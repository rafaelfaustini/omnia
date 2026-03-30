import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import PathInput from "../PathInput/PathInput";
import PathContent from "../PathContent/PathContent";
import FileSystemObject from "../../constants/FileSystemObject";

function FileExplorer() {
    const [currentPath, setCurrentPath] = useState<string>("");

    const [pathContent, setPathContent] = useState<FileSystemObject[]>([]);

    const handlePathChange = (newPathString: string) => {
        setCurrentPath(newPathString);
    };

    async function handleFileSystemItemDoubleClick(fileSystemObject: FileSystemObject) {
        if(fileSystemObject.isFolder) {
            const separator = '/';
            let newPath = currentPath + separator + fileSystemObject.name;
            handlePathChange(newPath);
        }
    }

    async function getCurrentDirectory() {
        handlePathChange(await invoke("home_directory"));
    }

    async function getDirectoryContent(directory: string) {

        setPathContent(await invoke("directory_contents", { directory: directory }));
    }

    useEffect(() => {
        getCurrentDirectory();
    }, []);

    useEffect(() => {
        if (!currentPath) return;

        getDirectoryContent(currentPath);
    }, [currentPath]);
    
    return (
        <div>
            <PathInput currentPath={currentPath} onPathChange={handlePathChange} />
            <PathContent pathContent={pathContent} onFileSystemItemDoubleClicked={handleFileSystemItemDoubleClick} />
        </div>
    );
}

export default FileExplorer;