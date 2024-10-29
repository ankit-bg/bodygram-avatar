"use client";
import { R3FAvatar } from "../R3FAvatar";
import { AvatarIndicators } from "../R3FAvatar/AvatarIndicators";
import { AvatarMeasurementIndicator } from "../R3FAvatar/AvatarMeasurementIndicator";
import { AvatarMeasurementRings } from "../R3FAvatar/AvatarMeasurementsRings";
import { AvatarPostureAnalysis } from "../R3FAvatar/AvatarPostureAnalysis";
import { avatarString as c11Avatar } from "./c11avatar";
import { avatarString as c9Avatar } from "./c9avatar";

export default function Home() {
  return (
    <div>
      <h1>C 11 Avatar</h1>
      <div style={{ height: 500, width: 500 }}>
        <R3FAvatar
          avatar={c11Avatar}
          isOrbitControlsEnabled={true}
          cameraDirection="front"
        >
          <AvatarMeasurementRings
            rings={{
              hipGirth: {},
              calfGirthR: {},
              bustGirth: {},
              thighGirthR: {},
              upperArmGirthR: {},
              waistGirth: {},
            }}
          />
          <AvatarIndicators
            indicators={[
              {
                name: "upperArmGirthR",
                side: "left",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Upper Arm"
                    value={200}
                    unit="cm"
                    side="left"
                  />
                ),
              },
              {
                name: "bustGirth",
                side: "right",
                showLine: false,
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Bust"
                    value={200}
                    unit="cm"
                    side="right"
                  />
                ),
              },
              {
                name: "waistGirth",
                side: "right",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Waist"
                    value={200}
                    unit="cm"
                    side="right"
                  />
                ),
              },
              {
                name: "hipGirth",
                side: "left",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Hip"
                    value={200}
                    unit="cm"
                    side="left"
                  />
                ),
              },
              {
                name: "thighGirthR",
                side: "left",
                showLine: true,
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Thigh"
                    value={100}
                    unit="cm"
                    side="left"
                  />
                ),
              },
              {
                name: "calfGirthR",
                side: "right",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Calf"
                    value={50}
                    unit="cm"
                    side="right"
                  />
                ),
              },
            ]}
          />
        </R3FAvatar>
      </div>

      <div style={{ height: 500, width: 500 }}>
        <AvatarPostureAnalysis
          avatar={c11Avatar}
          front={{
            card: [
              {
                name: "Head",
                angle: -7,
                index: 0,
              },
              {
                name: "Shoulder",
                angle: 1,
                index: 1,
              },
              {
                name: "Pelvis",
                angle: 0,
                index: 2,
              },
            ],
            ear: {
              angle: -7,
            },
            shoulder: {
              angle: 1,
            },
            topHip: {
              angle: 0,
            },
          }}
          heading="Posture Analysis"
          side={{
            bodyLine: [6.357708, 0.5758176, -8.26809, 11.177915],
            card: [
              {
                name: "Neck",
                angle: 20,
                index: 0,
              },
              {
                name: "Back",
                angle: -2,
                index: 1,
              },
            ],
          }}
        />
      </div>

      <br />

      <h1 style={{ marginTop: 700 }}>C9 Avatar</h1>
      <div style={{ height: 500, width: 500 }}>
        <R3FAvatar
          avatar={c9Avatar}
          isOrbitControlsEnabled={true}
          cameraDirection="front"
        >
          <AvatarMeasurementRings
            rings={{
              hipGirth: {},
              calfGirthR: {},
              bustGirth: {},
              thighGirthR: {},
              upperArmGirthR: {},
              waistGirth: {},
            }}
          />
          <AvatarIndicators
            indicators={[
              {
                name: "upperArmGirthR",
                side: "left",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Upper Arm"
                    value={200}
                    unit="cm"
                    side="left"
                  />
                ),
              },
              {
                name: "bustGirth",
                side: "right",
                showLine: false,
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Bust"
                    value={200}
                    unit="cm"
                    side="right"
                  />
                ),
              },
              {
                name: "waistGirth",
                side: "right",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Waist"
                    value={200}
                    unit="cm"
                    side="right"
                  />
                ),
              },
              {
                name: "hipGirth",
                side: "left",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Hip"
                    value={200}
                    unit="cm"
                    side="left"
                  />
                ),
              },
              {
                name: "thighGirthR",
                side: "left",
                showLine: true,
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Thigh"
                    value={100}
                    unit="cm"
                    side="left"
                  />
                ),
              },
              {
                name: "calfGirthR",
                side: "right",
                IndicatorComponent: (
                  <AvatarMeasurementIndicator
                    title="Calf"
                    value={50}
                    unit="cm"
                    side="right"
                  />
                ),
              },
            ]}
          />
        </R3FAvatar>
      </div>

      <div style={{ height: 500, width: 500 }}>
        <AvatarPostureAnalysis
          avatar={c9Avatar}
          front={{
            card: [
              {
                name: "Head",
                angle: -7,
                index: 0,
              },
              {
                name: "Shoulder",
                angle: 1,
                index: 1,
              },
              {
                name: "Pelvis",
                angle: 0,
                index: 2,
              },
            ],
            ear: {
              angle: -7,
            },
            shoulder: {
              angle: 1,
            },
            topHip: {
              angle: 0,
            },
          }}
          heading="Posture Analysis"
          side={{
            bodyLine: [6.357708, 0.5758176, -8.26809, 11.177915],
            card: [
              {
                name: "Neck",
                angle: 20,
                index: 0,
              },
              {
                name: "Back",
                angle: -2,
                index: 1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
