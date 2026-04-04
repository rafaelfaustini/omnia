import FileSystemObject from "../constants/FileSystemObject";

function getPathSeparator(path: string): string {
    return path.includes('\\') ? '\\' : '/';
}

function assemblePathSegment(basePath: string, segment: string): string {
    if (!basePath) {
        return segment;
    }

    const separator = getPathSeparator(basePath);
    const cleanedBasePath = basePath.endsWith(separator) ? basePath.slice(0, -1) : basePath;
    return `${cleanedBasePath}${separator}${segment}`;
}

function normalizeExtension(extension: string): string {
    if (!extension) {
        return "";
    }

    return extension.startsWith('.') ? extension : `.${extension}`;
}

function assembleFolderPath(currentPath: string, fileSystemObject: FileSystemObject): string {
    if (!fileSystemObject.isFolder) {
        throw new Error("The system object is not a folder");
    }

    return assemblePathSegment(currentPath, fileSystemObject.name);
}

function assembleFilePath(currentPath: string, fileSystemObject: FileSystemObject): string {
    if (fileSystemObject.isFolder) {
        throw new Error("The system object is not a file");
    }

    const fileName = `${fileSystemObject.name}${normalizeExtension(fileSystemObject.extension)}`;
    return assemblePathSegment(currentPath, fileName);
}

export {
    getPathSeparator,
    assembleFolderPath,
    assembleFilePath,
};