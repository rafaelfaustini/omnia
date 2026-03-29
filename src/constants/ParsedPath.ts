import PathSegment from "./PathSegment";

interface ParsedPath {
    segments: PathSegment[];
    isAbsolute: boolean;
}

export default ParsedPath;