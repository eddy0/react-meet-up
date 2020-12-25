
import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PhotoCropper = ({setImage, imagePreview}) => {
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };
  
  const cropImage = (cropper) => {
    if (typeof cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    cropper.getCroppedCanvas().toBlob(blob => {
      setImage(blob)
    }, 'image/jpeg')
  }
  
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}

      initialAspectRatio={1}
      guides={false}
      viewMode={1}
      preview={'.img-preview'}
      scalable={true}
      dragMode={'move'}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};
export default PhotoCropper