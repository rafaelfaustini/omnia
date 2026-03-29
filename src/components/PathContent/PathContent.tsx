import FileSystemObject from "../../constants/FileSystemObject";
import FileSystemItem from "../FileSystemItem/FileSystemItem";
import classes from "./PathContent.module.css";
function PathContent({ pathContent, onFileSystemItemDoubleClicked }: { pathContent: FileSystemObject[]; onFileSystemItemDoubleClicked: (fileSystemObject: FileSystemObject) => void }) {
    return (
        <div className={classes["path-content"]}>
            {pathContent.map((item: FileSystemObject, index: number) => (
                <FileSystemItem key={item.name+item.extension} fileSystemObject={item} onDoubleClick={() => onFileSystemItemDoubleClicked(item)} />
            ))}
        </div>
    );
}
export default PathContent;