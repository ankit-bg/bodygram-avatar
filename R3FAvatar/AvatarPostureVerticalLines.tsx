import { Box3, BufferGeometry, Vector2, Vector3 } from "three";
import { getVertexCoord } from "./utils/point";
import {
  getIntersectingPointOfTwoLines,
  getVerticalLineStartAndEndCoords,
} from "./utils/line";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { AvatarPostureLine } from "./AvatarPostureLine";
import { LineThroughTwoPoints } from "./utils/LineThroughTwoPoints";
import { MathUtils } from "three";
import { useR3FAvatar } from "./store";

type AvatarPostureVerticalLinesProps = {
  /**
   * Right posture angles.
   */
  bodyLineAngles: number[];
};

function getPointsCoordinates(
  target: Vector3,
  dest: Vector3,
  angle: number,
  distance: number,
  cameraCoord: Vector3
) {
  const intersection = getIntersectingPointOfTwoLines(
    {
      coord: new Vector2(target.z, target.y),
      angle: MathUtils.degToRad(90 - angle),
    },
    {
      coord: new Vector2(dest.z, dest.y),
      angle: 0,
    }
  );

  const targetToCamera = new LineThroughTwoPoints(target, cameraCoord);
  const intersectionToCamera = new LineThroughTwoPoints(
    new Vector3(dest.x, intersection.y, intersection.x),
    cameraCoord
  );

  return [
    targetToCamera.getCoordOfPointOnLineWhenXIs(distance),
    intersectionToCamera.getCoordOfPointOnLineWhenXIs(distance),
  ];
}

/**
 * This component is used to draw vertical lines on the avatar.
 *
 * Note: At the moment this component is heavily dependent on the camera position. To use
 * this component, make sure the camera is focused on the right of the avatar. If
 * the camera is focused on the left/back/front of the avatar, the lines will not be drawn properly.
 * This is the limitation of the current implementation. We will improve this in the future.
 */
export function AvatarVerticalPostureLines(
  props: AvatarPostureVerticalLinesProps
) {
  const { avatar, cameraDirection, firstIndexToDrawPostureLines } =
    useR3FAvatar((state) => ({
      avatar: state.avatar,
      avatarType: state.avatarType,
      cameraDirection: state.cameraDirection,
      firstIndexToDrawPostureLines: state.firstIndexToDrawPostureLines,
    }));

  const {
    POINT_ON_LEFT_CHEST,
    POINT_ON_LEFT_ANKLE,
    POINT_ON_LEFT_KNEE,
    POINT_ON_LEFT_HIP,
    POINT_ON_LEFT_SHOULDER,
  } = firstIndexToDrawPostureLines;

  const { bodyLineAngles } = props;
  const { camera } = useThree();

  const { dashGapLength, dashLength, dashLineGeometry, actualLineGeometry } =
    useMemo(() => {
      if (cameraDirection !== "right") {
        // If camera direction is not right, return null.
        return {
          dashLineGeometry: null,
          dashLength: null,
          dashGapLength: null,
          actualLineGeometry: null,
        };
      }

      const box = new Box3().setFromObject(avatar);
      const height = box.getSize(new Vector3()).y;
      const lineDistanceFromAvatar = box.max.x;

      const vertexCoord = getVertexCoord(avatar, POINT_ON_LEFT_CHEST);

      const [dashEnd, dashStart] = getVerticalLineStartAndEndCoords({
        angleFormedBYLineOnYAxis: 0,
        distanceFromObject: lineDistanceFromAvatar,
        objectHeight: height,
        point: vertexCoord,
        cameraCoords: camera.position,
      });
      const dashLineGeometry = new BufferGeometry().setFromPoints([
        dashEnd,
        dashStart,
      ]);

      const lineHeight = dashEnd.distanceTo(dashStart);

      const dashLength = lineHeight / 40;
      const dashGapLength = dashLength;

      const ankle = getVertexCoord(avatar, POINT_ON_LEFT_ANKLE);
      const knee = getVertexCoord(avatar, POINT_ON_LEFT_KNEE);
      const hip = getVertexCoord(avatar, POINT_ON_LEFT_HIP);
      const shoulder = getVertexCoord(avatar, POINT_ON_LEFT_SHOULDER);

      const startToAnkle = getPointsCoordinates(
        ankle,
        dashStart,
        0,
        lineDistanceFromAvatar,
        camera.position
      );

      const ankleToKnee = getPointsCoordinates(
        ankle,
        knee,
        bodyLineAngles[0],
        lineDistanceFromAvatar,
        camera.position
      );
      const kneeToHip = getPointsCoordinates(
        ankleToKnee[1],
        hip,
        bodyLineAngles[1],
        lineDistanceFromAvatar,
        camera.position
      );
      const hipToShoulder = getPointsCoordinates(
        kneeToHip[1],
        shoulder,
        bodyLineAngles[2],
        lineDistanceFromAvatar,
        camera.position
      );
      const shoulderToHead = getPointsCoordinates(
        hipToShoulder[1],
        dashEnd,
        bodyLineAngles[3],
        lineDistanceFromAvatar,
        camera.position
      );

      const actualLineGeometry = new BufferGeometry().setFromPoints([
        ...startToAnkle,
        ...ankleToKnee,
        ...kneeToHip,
        ...hipToShoulder,
        ...shoulderToHead,
      ]);

      return {
        dashLineGeometry,
        dashLength,
        dashGapLength,
        actualLineGeometry,
        dashStart,
      };
    }, [
      POINT_ON_LEFT_ANKLE,
      POINT_ON_LEFT_CHEST,
      POINT_ON_LEFT_HIP,
      POINT_ON_LEFT_KNEE,
      POINT_ON_LEFT_SHOULDER,
      avatar,
      bodyLineAngles,
      camera.position,
      cameraDirection,
    ]);

  if (
    cameraDirection !== "right" ||
    !dashLineGeometry ||
    !dashLength ||
    !dashGapLength ||
    !actualLineGeometry
  ) {
    return null;
  }

  return (
    <AvatarPostureLine
      actualLineGeometry={actualLineGeometry}
      dashLineGeometry={dashLineGeometry}
      dashGapLength={dashGapLength}
      dashLength={dashLength}
    />
  );
}
