// cropUtils.js
export const getCroppedImg = async (imageSrc, pixelCrop, onSave) => {
    const image = new Image();
    image.src = imageSrc;
  
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            // Reject if blob is null (e.g., if the image is not fully loaded)
            console.error('Error creating blob for cropped image.');
            reject(new Error('Error creating blob for cropped image.'));
            return;
          }
  
          // Invoke onSave callback with the cropped image blob
          onSave(blob);
          resolve(blob);
        },
        'image/jpeg' // Adjust the format as needed (jpeg, png, etc.)
      );
    });
  };
  