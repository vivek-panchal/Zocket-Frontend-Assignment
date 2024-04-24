import React, { useState } from "react";
import { SketchPicker } from "react-color";
import CanvasLayers from "./CanvasLayers";

function EditSection() {
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState("#f7df1e");
  const [colorHistory, setColorHistory] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editableText, setEditableText] = useState(
    "Treat yourself to a divine Blueberry Cake - INR 900.00!"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [maskImage, setMaskImage] = useState("https://www.homecookingadventure.com/wp-content/uploads/2023/05/Poppy-Seed-Blueberry-Cake-main2.webp");

  const handleColorChange = (color) => {
    const newColor = color.hex;
    setCanvasBackgroundColor(newColor);
    setShowColorPicker(false);
    setColorHistory((prevHistory) => {
      const newHistory = [...prevHistory, newColor];
      return newHistory.slice(-5);
    });
  };

  const handleTextChange = (event) => {
    setEditableText(event.target.innerText);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMaskImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row h-full">
      {/***********  Canvas ***********/}
      <div className=" flex w-1/2 bg-gray-200 items-center justify-center">
        <CanvasLayers
          backgroundColor={canvasBackgroundColor}
          editableText={editableText}
          maskImage={maskImage}
        />
      </div>

      {/*********** Right Section ***********/}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
        <div className="mb-8 w-full text-center">
          <h2 className="text-lg font-extrabold mb-0 text-black text-center mx-auto">Ad Customization</h2>
          <p>Customize your ad and get the template accordingly</p>
        </div>
        <div className="border text-left border-gray-300 rounded-md px-4 py-2 mb-6 w-full">
          <div className="flex-col">
            <i className="far fa-image"></i>
            Change the ad creative image.
            <label
              htmlFor="imageInput"
              style={{ color: "blue", cursor: "pointer" }}
            >
              Select file
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/*********** Content Editing ***********/}
        <div className="mb-8 w-full text-left">
          <div className="text-center relative mb-4">
            <hr className="absolute w-full border-b border-gray-400 top-1/2" />
            <span className="relative bg-gray-100 px-2">Edit contents</span>
          </div>
          {/*********** Add content editing tools/buttons here ***********/}
          <div className="border border-gray-300 rounded-md px-4 py-2 mb-4">
            <div className="flex justify-between items-center">
              <div className="heading">
                <p>Ad Content</p>
              </div>
              {/*********** Button to toggle edit mode ***********/}
              <button onClick={handleEditToggle}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
            {/*********** Conditionally render content editable based on edit mode ***********/}
            {isEditing ? (
              <div
                className="border border-gray-300 rounded-md px-2 py-1"
                contentEditable={true}
                onInput={handleTextChange}
                
              >
                {editableText}
              </div>
            ) : (
              <div>{editableText}</div>
            )}
          </div>
          <div className="border border-gray-300 rounded-md px-4 py-2 mb-4">
            <div className="heading">
              <p>CTA</p>
            </div>
            <div>Contact Us</div>
          </div>
          <div className="mb-4">
            <p>Choose your color</p>
            <button className="bg-[#f7df1e]  px-2 font-extrabold text-black rounded-full size-10" onClick={() => setShowColorPicker(!showColorPicker)}>
              {" + "}
            </button>
            {showColorPicker && (
              <SketchPicker
                color={canvasBackgroundColor}
                onChange={handleColorChange}
              />
            )}
          </div>
          <div>
            <p>Last 5 used colors:</p>
            <div>
              {colorHistory.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: 20,
                    height: 20,
                    display: "inline-block",
                    marginRight: 5,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSection;