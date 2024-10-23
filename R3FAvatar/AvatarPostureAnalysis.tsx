import { ErrorBoundary } from "react-error-boundary";
import { AvatarHorizontalPostureLines } from "./AvatarPostureHorizontalLines";
import { FIRST_INDEX_IN_AVATAR_POSITION_ARRAY } from "./utils/constants";
import { useMemo } from "react";
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

const { MID_POINT_OF_EYES, MID_POINT_OF_SHOULDERS, MID_POINT_OF_PELVIS } =
  FIRST_INDEX_IN_AVATAR_POSITION_ARRAY;

export function AvatarPostureAnalysis(props: AvatarPostureAnalysisProps) {
  const { avatar, front, side } = props;

  const lineData = useMemo(() => {
    if (!front) return [];
    const { ear, shoulder, topHip } = front;

    const data: { angle: number; firstIndexInAvatarPositionArray: number }[] =
      [];

    if (ear && typeof ear.angle === "number") {
      data.push({
        angle: ear.angle,
        firstIndexInAvatarPositionArray: MID_POINT_OF_EYES,
      });
    }

    if (shoulder && typeof shoulder.angle === "number") {
      data.push({
        angle: shoulder.angle,
        firstIndexInAvatarPositionArray: MID_POINT_OF_SHOULDERS,
      });
    }

    if (topHip && typeof topHip.angle === "number") {
      data.push({
        angle: topHip.angle,
        firstIndexInAvatarPositionArray: MID_POINT_OF_PELVIS,
      });
    }

    return data;
  }, [front]);

  return (
    <ErrorBoundary FallbackComponent={() => <></>}>
      <div style={{ height: 600, width: 600 }}>
        <R3FAvatar
          avatar={avatar}
          isOrbitControlsEnabled={false}
          cameraDirection="front"
        >
          <AvatarHorizontalPostureLines lineData={lineData} />
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
