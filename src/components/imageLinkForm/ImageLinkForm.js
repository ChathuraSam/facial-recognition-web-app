import React from "react";

const ImageLinkForm = ({onInputChange, onButtonSubmit})=>{
    return (
      <div>
        <p className="f3">
          Endless possibilities with Computer Vision and AI
        </p>
        <input
          className="outline pa2 w-60"
          type="text"
          onChange={onInputChange}
        />
        <button
          className="outline ma2 pa2 w-30"
          onClick={onButtonSubmit}
        >
          Detect Faces
        </button>
      </div>
    );
}

export default ImageLinkForm;