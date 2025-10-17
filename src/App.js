import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm";
import "tachyons";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/faceRecognition/FaceRecognition";
import Particles from "react-tsparticles";
import Signin from "./components/Signin/Signin";

const PAT = "3ec6a31fb1644f72944f591a8ee7442a";
const USER_ID = "ud3bzt4aic9m";
const APP_ID = "face-detection-app";
const MODEL_ID = "face-detection";

export default function App() {
  const [input, setInput] = useState();
  const [imageUrl, setImageUrl] = useState(
    "https://assets.weforum.org/article/image/XaHpf_z51huQS_JPHs-jkPhBp0dLlxFJwt-sPLpGJB0.jpg"
  );
  const [box, setBox] = useState();
  const [route, setRoute] = useState("");
  const [boxData, setBoxData] = useState([]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    // console.log(box);
    // this.setState({ box: box });
    setBox(box);
  };

  const handleImageSubmit = () => {
    console.log("submit button clicked");
    setImageUrl(input);

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((json) => json.outputs[0].data.regions)
      .then((boxData) => setBoxData(boxData));
  };

  const onRouteChange = (route) => {
    setRoute(route);
  };

  const particlesInit = (main) => {
    // console.log(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

  return (
    <div className="App">
      {/* <Particles
        className="particles"
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
      /> */}
      <Navigation onRouteChange={onRouteChange} />
      {route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <div>
          {" "}
          <Rank />
          <ImageLinkForm
            imageUrl={imageUrl}
            onInputChange={onInputChange}
            onButtonSubmit={handleImageSubmit}
          />
          <FaceRecognition imgSrc={imageUrl} boxData={boxData} />
        </div>
      )}
      ;
    </div>
  );
}
