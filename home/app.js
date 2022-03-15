document.querySelector('.loading').classList.remove('none')
let camNum = 245;
if (screen.width <= 576) {
  camNum = 320
} else if (screen.width <= 768) {
  camNum = 300;
} else if (screen.width <= 992) {
  camNum = 305;
} else {
  camNum = 245;
}

//Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {

  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, camNum);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(0, 0, 0);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040, 6);
  scene.add(ambient);



  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./../home/model/ISS_stationary (1).glb", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    animate();
  });
}



function animate() {
  requestAnimationFrame(animate);
  house.rotation.y += 0.005;
  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);

}

window.addEventListener("resize", onWindowResize);
window.addEventListener("resize", () => {
  if (screen.width <= 576) {
    camNum = 320
  } else if (screen.width <= 768) {
    camNum = 300;
  } else if (screen.width <= 992) {
    camNum = 305;
  } else {
    camNum = 245;
  }
})

window.onload = function () {
  // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
  if (typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
    localStorage.setItem('visited', true);
    console.log('first time?')
    setTimeout(() => {
      document.querySelector('.loading').style.opacity = 0;
      document.querySelector('.lds-hourglass').style.opacity = 0;
      document.querySelector('.scene').classList.remove('none')
    }, 20000)
    setTimeout(() => {
      document.querySelector('.loading').remove()
    }, 20100)
  } else {
    setTimeout(() => {
      document.querySelector('.loading').style.opacity = 0;
      document.querySelector('.lds-hourglass').style.opacity = 0;
      document.querySelector('.scene').classList.remove('none')
    }, 9500)
    setTimeout(() => {
      document.querySelector('.loading').remove()
    }, 9600)
  }
}

