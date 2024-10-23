import { useThree } from '@react-three/fiber'
import { ReactElement, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'

import { fitObjectToView, isOrbitControls } from './utils/camera'
import { PerspectiveCamera } from 'three'
import { useR3FAvatar } from './store'

export function AvatarOrbitControls(): ReactElement {
  const { avatar, isOrbitControlsEnabled, cameraDirection, onControllerReady, updateControllerState } = useR3FAvatar(
    state => ({
      avatar: state.avatar,
      isOrbitControlsEnabled: state.__internal.__isOrbitControlsEnabled,
      cameraDirection: state.__internal.__cameraDirection,
      onControllerReady: state.onControllerReady,
      updateControllerState: state.updateControllerState,
    }),
  )

  const { controls, camera } = useThree()

  function blockScroll(e: WheelEvent) {
    e.preventDefault()
  }

  useEffect(() => {
    if (avatar) {
      fitObjectToView({
        object: avatar,
        camera: camera as PerspectiveCamera,
        controls,
        lookFrom: cameraDirection,
      })
    }
  }, [avatar, camera, controls, cameraDirection])

  useEffect(() => {
    if (controls && isOrbitControls(controls) && controls.domElement) {
      const canvas = controls.domElement.querySelector('canvas')
      /**
       * Orbit control sets `touchAction` to `none` which disable scrolling on mobile.
       * So to fix scrolling on mobile, we need to set it back to `auto` if orbit controls are disabled
       * and set it to `none` if orbit controls are enabled.
       *
       * Orbit control sets `touchAction` to `none` to canvas and the parent element of the canvas.
       * Ref: https://github.com/pmndrs/three-stdlib/blob/017639d81eb65b3a69b334ec1792efcf6f4a2215/src/controls/OrbitControls.ts#L405-L408
       */
      if (isOrbitControlsEnabled && canvas) {
        controls.domElement.style.touchAction = 'none'
        canvas.style.touchAction = 'none'
        canvas.addEventListener('wheel', blockScroll)
      }
    }

    return () => {
      if (controls && isOrbitControls(controls) && controls.domElement) {
        const canvas = controls.domElement.querySelector('canvas')
        if (canvas) {
          controls.domElement.style.touchAction = 'auto'
          canvas.style.touchAction = 'auto'
          canvas.removeEventListener('wheel', blockScroll)
        }
      }
    }
  }, [isOrbitControlsEnabled, controls])

  useEffect(() => {
    if (isOrbitControls(controls)) {
      onControllerReady(controls)
    }
  }, [controls, onControllerReady])

  useEffect(() => {
    if (isOrbitControls(controls)) {
      camera.updateProjectionMatrix()
      camera.updateMatrixWorld(true)
      updateControllerState({ isOrbitControlsEnabled: controls.enabled, cameraDirection: camera.userData.direction })
    }
  }, [controls, camera, updateControllerState])

  return <OrbitControls enabled={isOrbitControlsEnabled} enableZoom={true} makeDefault />
}
