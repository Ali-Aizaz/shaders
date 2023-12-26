import { mat4, vec3 } from 'gl-matrix'

const toRadians = (deg: number) => deg * (Math.PI / 180)

export const createTransformationMatrix = (
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number,
  scale: number
) => {
  const matrix: mat4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  mat4.identity(matrix)
  mat4.translate(matrix, matrix, vec3.fromValues(x, y, z))
  mat4.rotateX(matrix, matrix, toRadians(rx))
  mat4.rotateY(matrix, matrix, toRadians(ry))
  mat4.rotateZ(matrix, matrix, toRadians(rz))
  mat4.scale(matrix, matrix, vec3.fromValues(scale, scale, scale))
  return matrix
}
