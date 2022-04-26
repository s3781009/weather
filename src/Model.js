import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef } from 'react';

const Model = () => {


  const gltf = useLoader(GLTFLoader, '/weather/earth/scene.gltf');
  return (
    <>
      <primitive  position={[0, 0, 0]} object={gltf.scene} scale={0.0008} />
    </>
  );
};
export default Model;
