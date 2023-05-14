import * as THREE from "three";
import { loadFBXModelFile } from "./utils";
import { Background } from "./background";

function initCityModel(scene: THREE.Scene) {
  function loadCity() {
    loadFBXModelFile("/beijing.fbx").then((cityGroup) => {
      cityGroup.traverse((child: any) => {
        if (child.isMesh) {
          const material = new THREE.ShaderMaterial({
            uniforms: {
              city_color: {
                value: new THREE.Color("#1B3045"),
              },
            },
            //projectionMatrix 模型矩阵
            //modelViewMatrix 视图矩阵
            vertexShader: `
              void main(){
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
              }
            `,
            fragmentShader: `
              uniform  vec3 city_color;
              void main() {
                gl_FragColor=vec4(city_color,1.0);
              }
            `,
          });

          const mesh = new THREE.Mesh(child.geometry, material);
          mesh.position.copy(child.position);
          mesh.rotation.copy(child.rotation);
          mesh.scale.copy(child.scale);
          scene.add(mesh);
        }
      });
    });
  }

  new Background(scene);
  loadCity();
  return () => {};
}

export default initCityModel;
