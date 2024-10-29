import { ErrorBoundary } from "react-error-boundary";
import { AvatarHorizontalPostureLines } from "./AvatarPostureHorizontalLines";
import { AvatarVerticalPostureLines } from "./AvatarPostureVerticalLines";
import { R3FAvatar } from ".";

type AvatarPostureCardData = {
  /**
   * Name of the pose. This will be shown on the card.
   */
  name: string;
  /**
   * Angle in degrees.
   */
  angle: number;
  /**
   * Use for sorting the cards.
   */
  index: number;
};
export type AvatarPostureAnalysisProps = {
  /**
   * Heading of the container.
   */
  heading: string;
  /**
   * The avatar string.
   */
  avatar: string;

  /**
   * Front pose data.
   */
  front: {
    ear?: {
      angle: number;
    };
    shoulder?: {
      angle: number;
    };
    topHip?: {
      angle: number;
    };
    card: AvatarPostureCardData[];
  };

  /**
   * Side pose data.
   */
  side: {
    /**
     * Body line angles. This will be used to draw the vertical lines on the avatar.
     * The angles are in degrees. The angles are in the order of [ankle, knee, hip, shoulder].
     */
    bodyLine: [number, number, number, number];
    /**
     * Use to show the data on the card.
     */
    card: AvatarPostureCardData[];
  };
};

export function AvatarPostureAnalysis(props: AvatarPostureAnalysisProps) {
  const { avatar, front, side } = props;

  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      <div style={{ height: 600, width: 600 }}>
        <R3FAvatar
          avatar={avatar}
          isOrbitControlsEnabled={false}
          cameraDirection="front"
        >
          <AvatarHorizontalPostureLines front={front} />
        </R3FAvatar>
      </div>
      <div style={{ height: 600, width: 600 }}>
        <R3FAvatar
          avatar={avatar}
          isOrbitControlsEnabled={false}
          cameraDirection="right"
        >
          <AvatarVerticalPostureLines bodyLineAngles={side.bodyLine} />
        </R3FAvatar>
      </div>
    </ErrorBoundary>
  );
}
