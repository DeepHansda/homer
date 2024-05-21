const { exec } = require('child_process');
const fs = require("fs")

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

export const execCommands = async (commands:string) => {
  exec(commands, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return error;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return stderr;
    }
    console.log(`Stdout: ${stdout}`);
    return stdout;
  });
}

export const createFile = (path:string, fileData:string) => {
  fs.writeFile(path, fileData, function (err) {
    if (err) {
      console.error('Error writing file', err);
    } else {
      console.log('Successfully wrote file');
      return { "message": "Successfully wrote file" }
    }
  })
}