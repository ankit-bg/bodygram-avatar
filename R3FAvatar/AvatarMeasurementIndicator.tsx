import { Html } from "@react-three/drei";

type AvatarMeasurementIndicatorProps = {
  title: string;
  value: number;
  unit: string;
  side: "left" | "right";
};

export function AvatarMeasurementIndicator(
  props: AvatarMeasurementIndicatorProps
) {
  const { title, value, unit, side } = props;

  return (
    <Html>
      <div
        style={{
          width: 80,
          borderRadius: 9,
          border: "1px solid #aaa",
          background: "white",
          transform: `translate(${side === "left" ? "-100%" : "0"}, -50%)`,
          padding: 8,
        }}
      >
        <div
          style={{
            fontWeight: "regular",
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 2 }}>
          <span
            style={{
              fontWeight: "regular",
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            {value}&nbsp;
          </span>
          <span
            style={{
              fontSize: 12,
              color: "black",
            }}
          >
            {unit}
          </span>
        </div>
      </div>
    </Html>
  );
}
