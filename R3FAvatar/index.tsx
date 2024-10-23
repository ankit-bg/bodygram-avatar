import { OBJLoader } from "three-stdlib";
import { R3FAvatarStoreProvider } from "./provider";
import { ReactNode, useMemo } from "react";
import { AvatarCanvas } from "./AvatarCanvas";
import { CameraDirection, OrbitControlsInstance } from "./utils/camera";

export type R3FAvatarProps = {
  /**
   * Avatar string
   */
  avatar: string;
  /**
   * The camera direction.
   *
   * @default 'front'
   */
  cameraDirection?: CameraDirection;
  /**
   * Children.
   */
  children?: ReactNode | ReactNode[];
  /**
   * If true, then orbit controls will be enabled.
   *
   * @default true
   */
  isOrbitControlsEnabled?: boolean;
  /**
   * A callback to get the orbit control actions.
   */
  setController?: (controller: OrbitControlsInstance) => void;
  /**
   * Callback when an error occurs.
   */
  onError?: (error: Error) => void;
};

const objLoader = new OBJLoader();

export function R3FAvatar(props: R3FAvatarProps) {
  const {
    avatar,
    children,
    cameraDirection,
    isOrbitControlsEnabled,
    onError,
    setController,
  } = props;

  const parsedAvatar = useMemo(() => objLoader.parse(avatar), [avatar]);

  return (
    <R3FAvatarStoreProvider
      config={{
        avatar: parsedAvatar,
        cameraDirection,
        isOrbitControlsEnabled,
        setController,
      }}
    >
      <AvatarCanvas onError={onError}>{children}</AvatarCanvas>
    </R3FAvatarStoreProvider>
  );
}
