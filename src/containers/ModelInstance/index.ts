import { createTransformationMatrix } from '../../utils/maths'

const ModelInstance = (
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number,
  scale: number
) => {
  const model_x = x
  const model_y = y
  const model_z = z
  let model_rx = rx
  let model_ry = ry
  let model_rz = rz
  const model_scale = scale

  const rotateMatrix = (rotateX: number, rotateY: number, rotateZ: number) => {
    model_rx += rotateX
    model_ry += rotateY
    model_rz += rotateZ
    return createTransformationMatrix(
      model_x,
      model_y,
      model_z,
      model_rx,
      model_ry,
      model_rz,
      model_scale
    )
  }

  return {
    rotateMatrix
  }
}

export default ModelInstance
