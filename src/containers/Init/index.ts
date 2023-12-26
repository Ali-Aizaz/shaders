import { mat4 } from 'gl-matrix'
import ModelInstance from '../ModelInstance'
import ModelShader from '../ModelShader'
import ModelType from '../ModelType'
import { INDICES, VERTICES, NORMALS } from './cube'

type TModel = {
  use: () => void
  indices: number[]
}

type TInstance = {
  rotateMatrix: (rotateX: number, rotateY: number, rotateZ: number) => mat4
}

type TModelObject = {
  [id: string]: { type: TModel; instances: TInstance[] }
}

type RGBA = {
  red: number
  green: number
  blue: number
  alpha: number
}

const Init = (pen: WebGLRenderingContext) => {
  const clear = (color: RGBA) => {
    pen.clearColor(color.red, color.green, color.blue, color.alpha)
    pen.clear(pen.COLOR_BUFFER_BIT)
  }

  const shader = ModelShader(pen)

  // triangle vertices
  // const vertices = [0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]

  // triangle indicies
  // const indices = [0, 1, 2]
  const models: TModelObject = {}

  const model = ModelType(VERTICES, INDICES, pen, NORMALS)
  const id = 'triangle'
  const instance = ModelInstance(0, 0, 0, 0, 0, 0, 0.5)
  const registerNewModel = (id: string) => {
    if (!models[id])
      Object.assign(models, {
        [id]: {
          type: model,
          instances: []
        }
      })
  }

  const render = () => {
    pen.viewport(0, 0, pen.canvas.width, pen.canvas.height)
    pen.enable(pen.DEPTH_TEST)
    shader.use()
    const pos = { x: 100, y: 100, z: -100 }
    const color = { r: 1.0, g: 1.0, b: 1.0, a: 0.4 }
    shader.enableLight({ pos, color })

    Object.keys(models).forEach((model) => {
      models[model].type.use()
      models[model].instances.forEach((instance) => {
        shader.enableTransformationMatrix(instance.rotateMatrix(1, 1, 1))
        pen.drawElements(
          pen.TRIANGLES,
          models[model].type.indices.length,
          pen.UNSIGNED_SHORT,
          0
        )
      })
    })

    requestAnimationFrame(render)
  }

  registerNewModel(id)
  models[id].instances.push(instance)
  render()

  return {
    clear
  }
}

export default Init
