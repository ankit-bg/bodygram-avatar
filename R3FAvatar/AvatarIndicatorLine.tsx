import { BufferGeometry, Vector3 } from "three";

export type AvatarIndicatorLineProps = {
  startCoord: Vector3;
  endCoord: Vector3;
};

export function AvatarIndicatorLine(props: AvatarIndicatorLineProps) {
  const { startCoord, endCoord } = props;
  const lineGeometry = new BufferGeometry().setFromPoints([
    startCoord,
    endCoord,
  ]);
  return (
    <lineSegments
      onUpdate={(line) => line.computeLineDistances()}
      geometry={lineGeometry}
    >
      <lineDashedMaterial
        dashSize={0.02}
        gapSize={0.02}
        depthTest={false}
        color="black"
      />
    </lineSegments>
  );
}
