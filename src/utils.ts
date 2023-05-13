import { type Group } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
export function loadFBXModelFile(url: string, onProgress?: () => void) {
  const fbxLoader = new FBXLoader();
  return new Promise((resolve, reject) => {
    fbxLoader.load(url, resolve, onProgress, reject);
  }) as Promise<Group>;
}
