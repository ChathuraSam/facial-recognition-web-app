import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({ imgSrc, boxData }) => {
  const imageDivName = "inputImage";
  // const image = document.getElementById(imageDivName);
  const width = 520;
  const height = 280;

//   console.log(boxData);

  const boxes = boxData.map((box, index) => {
    const { top_row, left_col, bottom_row, right_col } = box.region_info.bounding_box;
    return (
      <div
        key={index}
        className="bounding-box"
        style={{
          left: left_col * width,
          right: right_col * width,
          top: top_row * height,
          bottom: bottom_row * height,
        }}
      >
      </div>
    );

    
});

  /**
   * leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
   */

  return (
    <div className="tc ma mt2 absolute">
      <img
        id="inputImage"
        src={imgSrc}
        alt=""
        width={width}
        height={height}
      />
      <h1>No of faces identified: {boxData.length}</h1>
    </div>
  );
};
export default FaceRecognition;
