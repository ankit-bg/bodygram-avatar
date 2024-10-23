import { BufferGeometry } from "three";
import { ErrorBoundary } from "react-error-boundary";

type AvatarPostureLineProps = {
  dashLineGeometry: BufferGeometry;
  dashLength: number;
  dashGapLength: number;
  actualLineGeometry: BufferGeometry;
};

export function AvatarPostureLine(props: AvatarPostureLineProps) {
  const { actualLineGeometry, dashGapLength, dashLength, dashLineGeometry } =
    props;

  const dashedLineColor = "#000";
  const actualLineColor = "#007bff";

  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      <group>
        <lineSegments
          onUpdate={(line) => line.computeLineDistances()}
          geometry={dashLineGeometry}
        >
          <lineDashedMaterial
            dashSize={dashLength}
            color={dashedLineColor}
            gapSize={dashGapLength}
          />
        </lineSegments>
        <lineSegments
          onUpdate={(line) => line.computeLineDistances()}
          geometry={actualLineGeometry}
        >
          <lineBasicMaterial color={actualLineColor} />
        </lineSegments>
      </group>
    </ErrorBoundary>
  );
}
