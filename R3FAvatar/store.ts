import { create, useStore } from "zustand";
import { createContext, useContext } from "react";
import { Group } from "three";
import { CameraDirection, OrbitControlsInstance } from "./utils/camera";
import { AvatarType, getAvatarType } from "./utils/avatar";
import {
  BODY_PART_BOUNDING_BOX_INDICES,
  BoundingBoxMeasurementIndices,
} from "./utils/constants";

export type R3FAvatarState = {
  // Use to store internal state of avatar.
  // This should not be used to get the state of the avatar or camera.
  __internal: {
    __cameraDirection: CameraDirection;
    __isStoreReady: boolean;
    __isOrbitControlsEnabled: boolean;
  };
  avatar: Group;
  avatarType: AvatarType;
  isOrbitControlsEnabled: boolean | undefined;
  cameraDirection: CameraDirection | undefined;
  ringCoords: BoundingBoxMeasurementIndices[];
};

export type R3FAvatarActions = {
  onControllerReady: (controller: OrbitControlsInstance) => void;
  updateAvatar: (avatar: Group) => void;
  updateControllerState: (
    state: Partial<{
      cameraDirection: CameraDirection;
      isOrbitControlsEnabled: boolean;
    }>
  ) => void;
  __updateInternalStore: (state: Partial<R3FAvatarState["__internal"]>) => void;
};

export type R3FAvatarConfig = {
  avatar: Group;
  cameraDirection?: CameraDirection;
  isOrbitControlsEnabled?: boolean;
  setController?: (controller: OrbitControlsInstance) => void;
};

export function createR3FAvatarStore(config: R3FAvatarConfig) {
  const {
    avatar,
    cameraDirection = "front",
    isOrbitControlsEnabled = true,
    setController,
  } = config;
  const avatarType = getAvatarType(avatar);
  const ringCoords = BODY_PART_BOUNDING_BOX_INDICES.filter(
    (part) => part.avatarType === avatarType
  );

  return create<R3FAvatarState & R3FAvatarActions>((set) => ({
    __internal: {
      __cameraDirection: cameraDirection,
      __isStoreReady: false,
      __isOrbitControlsEnabled: isOrbitControlsEnabled,
    },
    avatar,
    avatarType,
    cameraDirection: undefined,
    isOrbitControlsEnabled: undefined,
    ringCoords,
    onControllerReady: (controller: OrbitControlsInstance) => {
      if (setController) {
        setController(controller);
      }
    },
    updateAvatar: (avatar: Group) => {
      const _avatarType = getAvatarType(avatar);
      const _ringCoords = BODY_PART_BOUNDING_BOX_INDICES.filter(
        (part) => part.avatarType === _avatarType
      );
      set({ avatar, avatarType: _avatarType, ringCoords: _ringCoords });
    },
    __updateInternalStore: (state: Partial<R3FAvatarState["__internal"]>) => {
      set((prev) => ({ __internal: { ...prev.__internal, ...state } }));
    },
    updateControllerState: (
      state: Partial<{
        cameraDirection: CameraDirection;
        isOrbitControlsEnabled: boolean;
      }>
    ) => {
      set({
        cameraDirection: state.cameraDirection,
        isOrbitControlsEnabled: state.isOrbitControlsEnabled,
      });
    },
  }));
}

export type R3FAvatarStore = ReturnType<typeof createR3FAvatarStore>;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const R3FAvatarContext = createContext<R3FAvatarStore>(null!);

export function useR3FAvatar<T>(
  selector: (state: R3FAvatarState & R3FAvatarActions) => T
) {
  const store = useContext(R3FAvatarContext);

  if (!store) {
    throw new Error("useR3FAvatar must be used within R3FAvatarStoreProvider");
  }

  return useStore(store, selector);
}
