import { Fragment, useMemo } from "react";
import classes from "./PathBreadcrumb.module.css";
import ParsedPath from "../../constants/ParsedPath";
import PathSegment from "../../constants/PathSegment";

function PathBreadcrumb({ currentPath, onPathChange }: { currentPath: string; onPathChange?: (newPath: string) => void; }) {

    const parsedPath = useMemo(() => {
        const isAbsolutePath = currentPath?.startsWith("/") ?? false;
        const segments = currentPath?.split(/[/\\]/).filter(Boolean) ?? [];
        const parsedSegments = segments.map((segment, index) => ({ id: index, value: segment } as PathSegment));

        return { segments: parsedSegments, isAbsolute: isAbsolutePath } as ParsedPath;
    }, [currentPath]);


    function handleSegmentClick(index: number) {
        if(!onPathChange) return;
        let newPath = parsedPath.segments.slice(0, index + 1).map(s => s.value).join("/");

        if (parsedPath.isAbsolute) {
            newPath = "/" + newPath;
        }
        onPathChange(newPath);
    }

    function isActiveSegment(index: number) {
        return index === parsedPath.segments.length - 1;
    }

    return (
        <div className={classes["path-breadcrumb"]}>
            {parsedPath.segments.map((segment, index) => (
                <Fragment key={segment.id}>
                <button className={`${classes.segment} ${isActiveSegment(index) ? classes.active : ''}`} onClick={() => handleSegmentClick(index)}>
                    {segment.value}
                </button>
                {index < parsedPath.segments.length - 1 && <div className={classes.separator}>
                    /
                </div>} 

                </Fragment>
            ))}
        </div>
    );
}
export default PathBreadcrumb;



