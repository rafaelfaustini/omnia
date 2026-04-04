import { useEffect, useState } from "react";
import PathBreadcrumb from "../PathBreadcrumb/PathBreadcrumb";
import classes from "./PathInput.module.css";

function PathInput({currentPath, onPathChange}: {currentPath: string, onPathChange?: (newPath: string) => void}) {
    const [newPath, setNewPath] = useState<string>(currentPath); 

    const [isInputMode, setIsInputMode] = useState<boolean>(false);

    function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
        const isButtonClick = (e.target as HTMLElement).closest('button');
        if (!isButtonClick) {
            setIsInputMode(true);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter") {
            onPathChange?.(newPath);
            setIsInputMode(false);
        }
    }

    function handleInputBlur() {
        setIsInputMode(false);
        setNewPath(currentPath);
    }

    useEffect(() => {
        setNewPath(currentPath);
    }, [currentPath]);

    return (
        <div role="toolbar" className={classes["path-input-wrapper"]} onClick={handleContainerClick}>
            {isInputMode ? (
                <input autoFocus className={classes["path-input"]} type="text" value={newPath} 
                    onKeyDown={handleKeyDown} onChange={(e) => setNewPath(e.target.value)} onBlur={handleInputBlur} />
            ) :
            (
                <PathBreadcrumb currentPath={currentPath} onPathChange={onPathChange} />
            )}
        </div>
    );
}

export default PathInput