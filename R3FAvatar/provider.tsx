import { useEffect, useRef } from "react";
import {
  R3FAvatarContext,
  R3FAvatarConfig,
  createR3FAvatarStore,
} from "./store";

export type R3FAvatarStoreProviderProps = {
  children: React.ReactNode;
  /**
   * Configuration for the rf3 avatar.
   */
  config: R3FAvatarConfig;
};

export function R3FAvatarStoreProvider(props: R3FAvatarStoreProviderProps) {
  const { children, config } = props;
  const storeRef = useRef<ReturnType<typeof createR3FAvatarStore>>();

  if (!storeRef.current) {
    storeRef.current = createR3FAvatarStore(config);
  }

  // useEffect(() => {
  //   if (
  //     storeRef.current &&
  //     storeRef.current.getState().__internal.__isStoreReady
  //   ) {
  //     storeRef.current.getState().__updateInternalStore({
  //       __isOrbitControlsEnabled: config.isOrbitControlsEnabled,
  //       __cameraDirection: config.cameraDirection,
  //       __isStoreReady: true,
  //     });
  //   }
  // }, [config.isOrbitControlsEnabled, config.cameraDirection]);

  useEffect(() => {
    console.log("avatar is updated.");
    // if (storeRef.current && storeRef.current.getState().__internal.__isStoreReady) {
    //   storeRef.current.getState().updateAvatar(config.avatar)
    // }
  }, [config.avatar]);

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current
        .getState()
        .__updateInternalStore({ __isStoreReady: true });
    }
  }, []);

  return (
    <R3FAvatarContext.Provider value={storeRef.current}>
      {children}
    </R3FAvatarContext.Provider>
  );
}
