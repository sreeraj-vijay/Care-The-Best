// ImageCropper.js
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './Croputils';

const ImageCropper = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropChange = useCallback((newCrop) => {
    setCrop(newCrop);
  }, []);

  const onZoomChange = useCallback((newZoom) => {
    setZoom(newZoom);
  }, []);

  const handleCropComplete = useCallback(async (_, croppedAreaPixels) => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImageBlob);
      onCropComplete(croppedImageBlob); // Pass the cropped image blob to the parent component
    } catch (error) {
      console.error('Error cropping image:', error.message);
    }
  }, [imageSrc, onCropComplete]);

  const handleSave = () => {
    // Implement your save logic here using the croppedImage state
    console.log('Cropped image saved:', croppedImage);
    // Reset the croppedImage state if needed
    // setCroppedImage(null);
  };

  return (
    <div>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3} // Set your desired aspect ratio
        onCropChange={onCropChange}
        onZoomChange={onZoomChange}
        onCropComplete={handleCropComplete}
      />

      {/* Save button */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ImageCropper;
