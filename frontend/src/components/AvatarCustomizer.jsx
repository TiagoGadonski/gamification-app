import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import styled from 'styled-components';

const Model = ({ color, ...props }) => {
  const { nodes } = useGLTF('/avatar.glb');
  return (
    <mesh {...props} geometry={nodes.avatar.geometry}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const CustomizerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.8);
  padding: 2rem;
  display: flex;
  gap: 2rem;
`;

const AvatarCustomizer = () => {
  const [color, setColor] = useState('#4ECDC4');
  const [accessory, setAccessory] = useState('none');

  return (
    <>
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model color={color} />
        <OrbitControls enableZoom={false} />
      </Canvas>

      <CustomizerContainer>
        <div>
          <h3>Cor do Avatar</h3>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        
        <div>
          <h3>Acessórios</h3>
          <select onChange={(e) => setAccessory(e.target.value)}>
            <option value="none">Nenhum</option>
            <option value="glasses">Óculos</option>
            <option value="hat">Chapéu</option>
          </select>
        </div>
      </CustomizerContainer>
    </>
  );
};

export default AvatarCustomizer;