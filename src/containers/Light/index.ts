import { vec3 } from 'gl-matrix'

export type TPosition = { x: number; y: number; z: number }
export type TColor = { r: number; g: number; b: number; a: number }

const Light = (pos: TPosition, color: TColor) => {
  const x = pos.x
  const y = pos.y
  const z = pos.z
  const a = color.a
  const r = color.r
  const g = color.g
  const b = color.b

  const getLightPosition = () => vec3.fromValues(x, y, z)
  const getLightColor = () => vec3.fromValues(r, g, b)
  const getLightOpacity = () => a

  return {
    getLightColor,
    getLightPosition,
    getLightOpacity
  }
}

export default Light
