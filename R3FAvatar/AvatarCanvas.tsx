import { Canvas } from "@react-three/fiber";

import { AvatarOrbitControls } from "./AvatarOrbitControls";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useR3FAvatar } from "./store";

type AvatarCanvasProps = {
  children?: ReactNode | ReactNode[];
  onError?: (error: Error) => void;
};

export function AvatarCanvas(props: AvatarCanvasProps) {
  const { children, onError } = props;

  const { avatar } = useR3FAvatar((state) => ({ avatar: state.avatar }));

  return (
    <Canvas style={{ zIndex: 1 }} gl={{ preserveDrawingBuffer: true }}>
      <ErrorBoundary FallbackComponent={() => <></>} onError={onError}>
        <ambientLight color={0xffffff} intensity={1.5} />
        <hemisphereLight
          color={0xffffff}
          groundColor={0x000000}
          intensity={0.9}
        />
        <pointLight
          color={0xffffff}
          intensity={0.5}
          position={[0.5, 1.5, 1.5]}
        />
        <pointLight
          color={0xffffff}
          intensity={0.2}
          position={[-0.5, 1.5, 1.5]}
        />
        <pointLight
          color={0xffffff}
          intensity={0.2}
          position={[-0.5, -0.4, -1.5]}
        />
        <pointLight
          color={0xffffff}
          intensity={0.5}
          position={[0.5, 0.2, -1.5]}
        />
        <pointLight
          color={0xffffff}
          intensity={0.2}
          position={[-0.5, 0.3, 1.5]}
        />
        <primitive object={avatar} />
        <AvatarOrbitControls />
        {children}
      </ErrorBoundary>
    </Canvas>
  );
}
