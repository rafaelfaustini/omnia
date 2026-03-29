import { useMemo, useState } from "react";
import PathBreadcrumb from "../PathBreadcrumb/PathBreadcrumb";
import classes from "./PathInput.module.css";

function PathInput({currentPath, onPathChange}: {currentPath: string, onPathChange?: (newPath: string) => void}) {
    const [newPath, setNewPath] = useState<string>(currentPath); 

    const [isInputMode, setIsInputMode] = useState<boolean>(false);

    const handleInputModeChange = (isInputMode: boolean) => {
        setIsInputMode(isInputMode);
    };

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

    useMemo(() => {
        setNewPath(currentPath);
    }, [currentPath]);

    return (
        <div className={classes["path-input-wrapper"]}>
            {isInputMode ? (
                <input autoFocus className={classes["path-input"]} type="text" value={newPath} 
                    onKeyDown={handleKeyDown} onChange={(e) => setNewPath(e.target.value)} onBlur={handleInputBlur} />
            ) :
            (
                <PathBreadcrumb currentPath={currentPath} onPathChange={onPathChange} onInputModeChange={handleInputModeChange} />
            )}
        </div>
    );
}

export default PathInput