import { AvatarType } from './avatar'

/**
 * A point has three coordinates (x, y, z) in 3D space.
 *
 * In Avatar's geometry we have an array of position.
 * This array contains x, y, z coordinates of all the vertices of the avatar.
 *
 * So, it is in the format [x1, y1, z1, x2, y2, z2, ...]. x1, y1, z1 are the
 * coordinates of the first vertex, x2, y2, z2 are the coordinates of the
 * second vertex and so on.
 *
 * Here we have the constants to save the first index of the target
 * body parts/points/vertices in the Avatar.
 */

export const FIRST_INDEX_IN_AVATAR_POSITION_ARRAY = {
  // This is used to draw a line from left ear to right ear, Tragion (ISO 8559-1 2017, 3.1.3).
  MID_POINT_OF_EYES: 280500,
  // This is used to draw a line from left shoulder to right shoulder (ISO 8559-1 2017, 3.1.1).
  MID_POINT_OF_SHOULDERS: 69720,
  // This is used to draw a line from left hip to right hip (ISO 8559-1 2017, 3.1.16).
  MID_POINT_OF_PELVIS: 367320,
  // This is used to draw body line on left side of the avatar.
  POINT_ON_LEFT_CHEST: 407100,
  // This is used to draw angle from left ankle to left knee.
  POINT_ON_LEFT_ANKLE: 374640,
  // This is used to draw angle from left knee to left hip.
  POINT_ON_LEFT_KNEE: 385830,
  // This is used to draw angle from left hip to left shoulder.
  POINT_ON_LEFT_HIP: 77790,
  // This is used to draw angle from left shoulder.
  POINT_ON_LEFT_SHOULDER: 78120,
}

export type RingMeasurementNames =
  | 'calfGirthR'
  | 'hipGirth'
  | 'thighGirthR'
  | 'upperArmGirthR'
  | 'waistGirth'
  | 'bustGirth'

export type BoundingBoxMeasurementIndices = {
  name: RingMeasurementNames
  indices: number[]
  /**
   * Avatar generated using photo estimation and stats estimation have different
   * number of vertices. So, the indices are different for both.
   */
  avatarType: AvatarType
}

export const BODY_PART_BOUNDING_BOX_INDICES: BoundingBoxMeasurementIndices[] = [
  // Photo estimation
  {
    name: 'thighGirthR',
    indices: [
      213972, 214113, 214122, 214638, 214662, 217638, 214692, 214674, 206913, 206910, 207798, 212478, 212487, 215445,
      215448, 215613, 215520, 208701, 208689, 208698, 208608, 207720, 207723, 219102, 214224, 214200, 214209, 218520,
      213954, 209598, 209589, 209586, 210738, 213981,
    ],
    avatarType: 'photo',
  },
  {
    name: 'hipGirth',
    indices: [
      173550, 173571, 178299, 175731, 174879, 78711, 78708, 79566, 82134, 77391, 77361, 77343, 77283, 77802, 80961,
      81021, 77256, 78774, 169473, 169491, 177198, 177114, 173451, 173448, 173466,
    ],
    avatarType: 'photo',
  },
  {
    name: 'waistGirth',
    indices: [
      173241, 173259, 173277, 173295, 173313, 170706, 170703, 170721, 173349, 173370, 178371, 175608, 175581, 175602,
      174807, 78639, 79419, 79416, 79428, 82206, 77211, 74556, 74538, 77130, 77076, 77091, 80853, 81189, 77073, 73806,
      73782, 73773, 77022, 79740, 84249, 84255, 84228, 84222, 180156, 180255, 180252, 175920, 175905, 177348, 177006,
      173244,
    ],
    avatarType: 'photo',
  },
  {
    name: 'calfGirthR',
    indices: [
      216651, 213069, 212940, 212943, 212709, 212691, 207180, 208068, 209241, 209250, 209274, 211383, 218736, 216090,
      216093, 216102, 218181, 216054, 210132,
    ],
    avatarType: 'photo',
  },
  {
    name: 'upperArmGirthR',
    indices: [146370, 144009, 146301, 146277, 144207, 146205, 147060, 144990, 159186, 143289],
    avatarType: 'photo',
  },
  {
    name: 'bustGirth',
    indices: [
      162231, 161469, 161844, 178932, 176475, 176496, 178515, 82350, 80331, 82815, 82788, 19065, 19074, 19083, 80163,
      80136, 72582, 72588, 81474, 76164, 73497, 76128, 72906, 72843, 169008, 169005, 169014, 172290, 169665, 172329,
      168759,
    ],
    avatarType: 'photo',
  },

  // Stats estimation
  {
    name: 'calfGirthR',
    indices: [433587, 426171, 434844, 414633, 414630, 425886, 416976, 437760, 432471, 432396],
    avatarType: 'stats',
  },
  {
    name: 'thighGirthR',
    indices: [
      428226, 428511, 429630, 414111, 414108, 415878, 425256, 431250, 428055, 417633, 417624, 421926, 417516, 415731,
      428703, 428235,
    ],
    avatarType: 'stats',
  },
  {
    name: 'hipGirth',
    indices: [
      348156, 348087, 351741, 157470, 159207, 149454, 149469, 155538, 155610, 155625, 147921, 146682, 146700, 164160,
      159300, 351846, 351861, 356706, 348249, 354477, 348159,
    ],
    avatarType: 'stats',
  },
  {
    name: 'waistGirth',
    indices: [
      346698, 346734, 346770, 346806, 356958, 351393, 158835, 154419, 149943, 149076, 154296, 154260, 154224, 147579,
      147477, 163962, 168522, 168516, 360597, 360792, 352026, 356526,
    ],
    avatarType: 'stats',
  },
  {
    name: 'upperArmGirthR',
    indices: [306285, 307278, 308304, 294612, 288699, 293460, 290160, 286794],
    avatarType: 'stats',
  },
  {
    name: 'bustGirth',
    indices: [
      324663, 323925, 357246, 160656, 160629, 37425, 38181, 162942, 152259, 338307, 338292, 344793, 339531, 344868,
    ],
    avatarType: 'stats',
  },
]
