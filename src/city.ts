import * as THREE from "three";
import { loadFBXModelFile } from "./utils";

function initCityModel(scene: THREE.Scene) {
  function loadCity() {
    loadFBXModelFile("/beijing.fbx").then((cityGroup) => {
      cityGroup.traverse((child: any) => {
        if (child.isMesh) {
          const material = new THREE.MeshLambertMaterial({ color: "#ff0000" });
          const mesh = new THREE.Mesh(child.geometry, material);
          mesh.position.copy(child.position);
          mesh.rotation.copy(child.rotation);
          mesh.scale.copy(child.scale);
          scene.add(mesh);
        }
      });
    });
  }
  loadCity();
  return () => {};
}

export default initCityModel;
