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
