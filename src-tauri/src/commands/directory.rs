use std::fs;
use serde::Serialize;

#[derive(Serialize)]
pub struct FileInfo {
    name: String,
    extension: String,
    isFolder: bool,
}

#[tauri::command]
pub fn home_directory() -> Result<String, String>{
    let home_path = std::env::home_dir()
        .ok_or_else(|| "Could not find home directory".to_string())?
        .to_string_lossy().into_owned();

    Ok(home_path)
}

#[tauri::command]
pub fn directory_contents(directory: &str) -> Result<Vec<FileInfo>, String> {
    let entries = fs::read_dir(directory).map_err(|e| e.to_string())?;

    let mut file_infos = Vec::new();

    for entry in entries {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();
        let metadata = entry.metadata().map_err(|e| e.to_string())?;

        let name = path.file_name()
            .map(|n| n.to_string_lossy().into_owned())
            .unwrap_or_else(|| "Unknown".to_string());

        let extension = path.extension()
            .map(|e| e.to_string_lossy().into_owned())
            .unwrap_or_default();

        file_infos.push(FileInfo {
            name,
            extension,
            isFolder: metadata.is_dir(),
        });
    }

    Ok(file_infos)
   }