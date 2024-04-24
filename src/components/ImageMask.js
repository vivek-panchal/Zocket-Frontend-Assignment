import React, { useEffect, useRef } from 'react';

const ImageMaskCanvas = ({ imageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawImageWithMask = () => {
      
      const img = new Image();
      img.onload = () => {
        
        ctx.drawImage(img, 0, 0);

        
        const maskCanvas = document.createElement('canvas');
        const maskCtx = maskCanvas.getContext('2d');
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;

        
        maskCtx.beginPath();
        maskCtx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 3, 0, Math.PI * 2);
        maskCtx.closePath();
        maskCtx.fill();

        
        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(maskCanvas, 0, 0);

       
        ctx.globalCompositeOperation = 'source-over';
      };

      img.src = imageUrl;
    };

    drawImageWithMask();
  }, [imageUrl]);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

export default ImageMaskCanvas;
