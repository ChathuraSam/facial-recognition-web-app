import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import 'tachyons'
import Rank from './components/rank/Rank';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Particles from "react-tsparticles";
import { Component } from 'react/cjs/react.production.min';
import Clarifai from 'clarifai'
import Signin from './components/Signin/Signin';
import Register from './components/register/Register';

const app = new Clarifai.App({
  apiKey: 'd01258c0061e402f84d8980cda6c78f3'
 });


class App extends Component {

  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box:{},
      route:'signin'
    }
  }

  onInputChange = (event)=>{
    console.log(event.target.value);
    this.setState({input:event.target.value})
  }

  calculateFaceLocation = (data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=>{
    console.log(box);
    this.setState({box:box});
  }

  onButtonSubmit = (event)=>{
    console.log("submitted");
    this.setState({imageUrl:this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then((res) => this.displayFaceBox(this.calculateFaceLocation(res))
      .catch(err=>console.log(err))
    );
  }

  onRouteChange = (route)=>{
    this.setState({route:route})
  }
  

  render (){
    const particlesInit = (main) => {console.log(main);};
  
    const particlesLoaded = (container) => {console.log(container);};
    return (
      <div className="App">
      <Particles className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#16a085",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      /> 
       <Navigation onRouteChange={this.onRouteChange}/>
       {
         this.state.route === 'signin' 
         ?<Signin onRouteChange={this.onRouteChange}/>
         :<div> <Rank/>
       
       <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imgSrc={this.state.imageUrl} box={this.state.box}/></div>
       }
       
      </div>
    );
      }

  
}

export default App;
