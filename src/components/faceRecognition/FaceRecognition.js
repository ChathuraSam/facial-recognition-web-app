import React from 'react';
import './faceRecognition.css'

const FaceRecognition = ({imgSrc, box})=>{
    return(
        <div className='tc ma mt2 absolute'>
            <img id='inputImage' src={imgSrc} alt='' width='500px' height='auto'/>
            <div className='bounding-box' 
            style={{
                top: box.topRow,
                right:box.rightCol,
                bottom:box.bottomRow,
                left:box.leftCol
            }}></div>
        </div>
    )
}
export default FaceRecognition;