import { exec } from "child_process"
import fs from "fs"


export async function blobToBase64(blob, callback: (base64audio: any) => void) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader?.result?.split(',')[1];
      callback(base64String);
      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error('Unable to read the Blob as Base64'));
    };

    reader.readAsDataURL(blob);
  });
}

export const execCommands = (commands:string) => {
  return new Promise((resolve, reject) => {
    exec(commands, (error, stdout, stderr) => {
      let returnCode = 0;
      if (error) {
        // If there's an error, resolve with returnCode and error
        return resolve({ returnCode, error: error.message });
      }
      if (stderr) {
        // If there's stderr, set returnCode to 1 and resolve with stderr
        returnCode = 1;
        return resolve({ returnCode, stderr });
      }
      // If there's stdout, set returnCode to 2 and resolve with stdout
      returnCode = 2;
      return resolve({ returnCode, stdout });
    });
  });
}

export const createFile = (path: string, fileData: string) => {
  fs.writeFile(path, fileData, function (err) {
    if (err) {
      console.error('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
      return { "message": "Successfully wrote file" }
    }
  })
}