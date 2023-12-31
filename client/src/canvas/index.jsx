import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import CameraRig from './CameraRig';
import Shirt from './Shirt';

import Backdrop from './Backdrop';

const CanvasModel = () => {
  return (
    <Canvas 
      shadows
      camera={{ position: [0, 0, 0], fov:25 }}
      gl = {{ preserveDrawingBuffer:true }}

    >
      {/* all direct children of Canvas should be 3D objects to interact with Three.js 
      //standard HTML element will cause an error */}
      <ambientLight intensity={0.6} />
      <Environment preset="city" />
      
      <CameraRig>
        <Backdrop />
        
        <Center>
          <Shirt />
        </Center>
        
        
      </CameraRig>
    
      

    


    </Canvas>
  )
}

export default CanvasModel

