import FileSystemObject from "../../constants/FileSystemObject";
import classes from "./FileSystemItem.module.css";
import { FaFolderClosed } from "react-icons/fa6";
import { FaFile } from "react-icons/fa";



function FileSystemItem({ fileSystemObject, onDoubleClick }: { fileSystemObject: FileSystemObject; onDoubleClick: () => void } ) {

    return (
        <div className={classes["file-system-item"]} onDoubleClick={onDoubleClick}>
            <div className={classes["file-system-container"]}>
                <span className={classes["file-system-icon"]}>
                    {
                        fileSystemObject.isFolder ? <FaFolderClosed />
                        : <FaFile />

                    }
                </span>
                <label className={classes["file-system-label"]}>{fileSystemObject.name}</label>
            </div>
        </div>
    );
}
export default FileSystemItem;