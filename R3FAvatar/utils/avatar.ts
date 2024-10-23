import { Group, Mesh } from 'three'

export type AvatarType =
  | 'photo'
  | 'stats'
  | 'photo-future-you'
  | 'stats-future-you'
  | 'unknown'
  | 'drawing-on-avatar-not-supported'
  | false

/**
 * This function return the type of the avatar. This function returns
 * `drawing-on-avatar-not-supported` mean currently we can't able to
 * use the avatar to draw lines or rings. It doesn't mean we can't
 * render the avatar.
 *
 * Currently we only support avatars that have 577368 and 577080 entries
 * in the position array to draw lines or rings.
 *
 * This function returns false if there is any error in processing the
 * given avatar.
 *
 * @returns {AvatarType} The type of the avatar.
 */
export function getAvatarType(avatar: Group): AvatarType {
  if (typeof avatar !== 'object' || !Array.isArray(avatar.children) || !avatar.children[0]) return false

  let totalEntriesInPositionArray = 0

  try {
    totalEntriesInPositionArray = (avatar.children[0] as Mesh).geometry.attributes.position.array.length
  } catch (error) {
    return false
  }

  if (totalEntriesInPositionArray === 577368) return 'stats'
  if (totalEntriesInPositionArray === 577080) return 'photo'

  return 'drawing-on-avatar-not-supported'
}
