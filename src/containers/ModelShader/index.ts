import VertexSource from './vertex'
import FragentSource from './fragment'
import Locations from './locations'
import { mat4 } from 'gl-matrix'
import Light, { TColor, TPosition } from '../Light'

const empty = {
  use: () => {},
  enablePosition: () => {},
  enableTransformationMatrix: (matrix: mat4) => {
    return matrix
  },
  enableNormals: () => {},
  enableLight: ({ pos, color }: { pos: TPosition; color: TColor }) => ({
    pos,
    color
  })
}

const ModelShader = (pen: WebGLRenderingContext) => {
  const vertexShader = pen.createShader(pen.VERTEX_SHADER)

  if (!vertexShader) {
    console.log('Unable to create vertex shader')
    return empty
  }
  pen.shaderSource(vertexShader, VertexSource)
  pen.compileShader(vertexShader)

  const fragShader = pen.createShader(pen.FRAGMENT_SHADER)
  if (!fragShader) {
    console.log('Unable to create vertex shader')
    return empty
  }
  pen.shaderSource(fragShader, FragentSource)
  pen.compileShader(fragShader)

  const program = pen.createProgram()
  if (!program) {
    console.log('unable to create program')
    return empty
  }

  pen.attachShader(program, vertexShader)
  pen.attachShader(program, fragShader)

  pen.linkProgram(program)

  const positionAttribute = pen.getAttribLocation(program, Locations.POSITION)
  const normalAttribute = pen.getAttribLocation(program, Locations.NORMAL)
  const transformationMatrix = pen.getUniformLocation(
    program,
    Locations.TRANSFORM
  )
  const lightPosition = pen.getUniformLocation(program, 'lightPosition')
  const lightColor = pen.getUniformLocation(program, 'lightColor')
  const lightAmbient = pen.getUniformLocation(program, 'lightAmbient')

  const use = () => {
    pen.useProgram(program) // use program
  }

  const enablePosition = () => {
    pen.enableVertexAttribArray(positionAttribute)
    pen.vertexAttribPointer(positionAttribute, 3, pen.FLOAT, false, 0, 0)
  }

  const enableNormals = () => {
    pen.enableVertexAttribArray(normalAttribute)
    pen.vertexAttribPointer(normalAttribute, 3, pen.FLOAT, false, 0, 0)
  }

  const enableTransformationMatrix = (matrix: mat4) => {
    pen.uniformMatrix4fv(transformationMatrix, false, matrix)
  }

  const enableLight = ({ pos, color }: { pos: TPosition; color: TColor }) => {
    const light = Light(pos, color)

    pen.uniform3fv(lightPosition, light.getLightPosition())
    pen.uniform3fv(lightColor, light.getLightColor())
    pen.uniform1f(lightAmbient, light.getLightOpacity())
  }

  return {
    use,
    enablePosition,
    enableTransformationMatrix,
    enableNormals,
    enableLight
  }
}

export default ModelShader
