import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";

function App() {
  const [count, setCount] = useState(0);

  function main() {
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({ canvas });

    // fov is short for field of view. In this case 75 degrees in the vertical dimension. Note that most angles in three.js are in radians but for some reason the perspective camera take degrees.
    const fov = 50;
    // aspect is the display aspect of the canvas. By default a canvas is 300x150px which makes the aspect 300/150 or 2.
    const aspect = 2;
    // near and far represent the space in front of the camera that will be rendered. Anything before that range or after that range will be clipped (not drawn).
    const near = 0.1;
    const far = 5;

    // In the diagram above we can see our camera is at z = 2. It's looking down the -Z axis. Our frustum starts 0.1 units from the front of the camera and goes to 5 units in front of the camera. Because in this diagram we are looking down, the field of view is affected by the aspect. Our canvas is twice as wide as it is tall so across the canvas the field of view will be much wider than our specified 75 degrees which is the vertical field of view.

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // BoxGeometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // Material
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue

    // Cube
    const cube = new THREE.Mesh(geometry, material);

    // Scene
    const scene = new THREE.Scene();
    scene.add(cube);

    // Light

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Renderer
    renderer.render(scene, camera);

    // Let's animate it spinning

    function render(time) {
      time *= 0.001; // convert time to seconds

      cube.rotation.x = time;
      cube.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    // requestAnimationFrame is a request to the browser that you want to animate something. You pass it a function to be called. In our case that function is render. The browser will call your function and if you update anything related to the display of the page the browser will re-render the page. In our case we are calling three's renderer.render function which will draw our scene.
    requestAnimationFrame(render);
  }

  useEffect(() => {
    main();
    console.log("Call stack +1");
  }, []);

  return (
    <div className="App">
      <canvas id="c"></canvas>
    </div>
  );
}

export default App;
