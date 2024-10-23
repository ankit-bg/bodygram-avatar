import { CatmullRomCurve3, Vector3 } from "three";
import { smoothenEllipticalCurveCoordsOnXZPlane } from "./utils/curve";

type AvatarMeasurementRingProps = {
  coords: Vector3[];
  showCoords?: boolean;
  color?: string;
  debugDotColor?: string;
};

export function AvatarMeasurementRing(props: AvatarMeasurementRingProps) {
  const { coords, showCoords, color, debugDotColor } = props;

  const ringColor = color || "#007bff";
  const dotColor = debugDotColor || "#ff0000";

  const curve = new CatmullRomCurve3(
    smoothenEllipticalCurveCoordsOnXZPlane(coords),
    true,
    "chordal",
    1.0
  );

  if (showCoords) {
    return (
      <>
        {coords.map((coord, idx) => {
          return (
            <mesh
              key={idx}
              userData={{ idx }}
              position={coord}
              onClick={(e) => console.log(e.object.userData)}
            >
              <sphereGeometry args={[0.008, 32, 32]} />
              <meshStandardMaterial color={dotColor} />
            </mesh>
          );
        })}
      </>
    );
  }

  return (
    <mesh>
      <tubeGeometry args={[curve, 100, 0.01]} />
      <meshStandardMaterial color={ringColor} />
    </mesh>
  );
}
