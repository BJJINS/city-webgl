import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./index.css";
import initCityModel from "./city";
window.onload = init;

function initCity() {
  const canvas: HTMLCanvasElement = document.querySelector("#webgl")!;
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
  camera.position.set(1000, 500, 100);
  scene.add(camera);
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(new THREE.Color(0x000000));

  scene.add(new THREE.AmbientLight(0xadadad));
  // const directionalLight = new THREE.DirectionalLight(0xffffff);
  // directionalLight.position.set(0, 0, 0);
  // scene.add(directionalLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; //鼠标不拖动，模型还会惯性的动以一下
  controls.enableZoom = true;
  controls.minDistance = 100;
  controls.maxDistance = 2000;
  controls.maxPolarAngle = Math.PI / 2;

  initCityModel(scene);
  function start() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(start);
  }
  start();
  window.addEventListener("resize", () => {
    camera.aspect = window.innerHeight / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}

function init() {
  initCity();
}
