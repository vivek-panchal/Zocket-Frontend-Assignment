import React, { useEffect, useRef } from "react";

class Layer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  draw() {}
}

class BackgroundLayer extends Layer {
  constructor(canvas, color) {
    super(canvas);
    this.color = color;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, 240, this.canvas.height);
  }
}

class DesignPatternLayer extends Layer {
  constructor(canvas, pattern) {
    super(canvas);
    this.pattern = pattern;
  }

  draw() {
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;

    const numberOfLines = 16;
    const maxSpacing = this.canvas.width / (numberOfLines + 1);
    const minSpacing = 10;
    const spacing = Math.min(maxSpacing, minSpacing);
    const lineLength = 120;
    const tiltAngle = Math.PI / 12;

    for (let i = 1; i <= numberOfLines; i++) {
      const startX = i * spacing - lineLength * Math.cos(tiltAngle);
      const startY =
        this.canvas.height / 2 -
        lineLength / 2 +
        (lineLength / 2) * Math.sin(tiltAngle);
      const endX = startX + lineLength * Math.cos(tiltAngle);
      const endY = this.canvas.height / 2 + lineLength / 2;

      if (endX < this.canvas.width / 2) {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
      }
    }
  }
}

class TextLayer extends Layer {
  constructor(canvas, text) {
    super(canvas);
    this.text = text;
  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.font = "12px Arial";
    this.ctx.fillText(this.text, 20, 350);
  }
}

class ImageMaskLayer extends Layer {
    constructor(canvas, imageUrl) {
      super(canvas);
      this.imageUrl = imageUrl;
    }
  
    draw() {
      const img = new Image();
      img.src = this.imageUrl;
      img.onload = () => {
        const radius = 20; // Adjust the radius to control the curvature
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(50 + radius, 50);
        this.ctx.lineTo(50 + 300 - radius, 50);
        this.ctx.quadraticCurveTo(50 + 300, 50, 50 + 300, 50 + radius);
        this.ctx.lineTo(50 + 300, 50 + 250 - radius);
        this.ctx.quadraticCurveTo(50 + 300, 50 + 250, 50 + 300 - radius, 50 + 250);
        this.ctx.lineTo(50 + radius, 50 + 250);
        this.ctx.quadraticCurveTo(50, 50 + 250, 50, 50 + 250 - radius);
        this.ctx.lineTo(50, 50 + radius);
        this.ctx.quadraticCurveTo(50, 50, 50 + radius, 50);
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(img, 50, 50, 300, 250);
        this.ctx.restore();
      };
    }
  }

  const CanvasLayers = ({ backgroundColor, editableText, maskImage }) => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      const backgroundLayer = new BackgroundLayer(canvas, backgroundColor);
      const designPatternLayer = new DesignPatternLayer(canvas, "...");
      const textLayer = new TextLayer(canvas, editableText);
      const imageMaskLayer = new ImageMaskLayer(canvas, maskImage);
  
      backgroundLayer.draw();
      designPatternLayer.draw();
      textLayer.draw();
      imageMaskLayer.draw();
    }, [backgroundColor, editableText, maskImage]);
  
    return <canvas ref={canvasRef} width={400} height={400} />;
  };
export default CanvasLayers;
