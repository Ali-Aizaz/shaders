import ModelShader from '../ModelShader'

const ModelType = (
  vertices: number[],
  indices: number[],
  pen: WebGLRenderingContext,
  normals?: number[]
) => {
  const shader = ModelShader(pen)
  const vertexBuffer = pen.createBuffer()
  const normalBuffer = pen.createBuffer()
  let generateNormalBuffer: () => void = () => {}

  if (normals) {
    generateNormalBuffer = () => {
      pen.bindBuffer(pen.ARRAY_BUFFER, normalBuffer)
      pen.bufferData(
        pen.ARRAY_BUFFER,
        new Float32Array(normals),
        pen.STATIC_DRAW
      )
      pen.bindBuffer(pen.ARRAY_BUFFER, null)
    }
  }

  const generateVertexBuffer = () => {
    pen.bindBuffer(pen.ARRAY_BUFFER, vertexBuffer)
    pen.bufferData(
      pen.ARRAY_BUFFER,
      new Float32Array(vertices),
      pen.STATIC_DRAW
    )
    pen.bindBuffer(pen.ARRAY_BUFFER, null)
  }

  const indexBuffer = pen.createBuffer()
  const generateIndexBuffer = () => {
    pen.bindBuffer(pen.ELEMENT_ARRAY_BUFFER, indexBuffer)
    pen.bufferData(
      pen.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      pen.STATIC_DRAW
    )
    pen.bindBuffer(pen.ELEMENT_ARRAY_BUFFER, null)
  }

  generateVertexBuffer()
  generateIndexBuffer()
  generateNormalBuffer()

  const use = () => {
    pen.bindBuffer(pen.ARRAY_BUFFER, vertexBuffer)
    shader.enablePosition()
    pen.bindBuffer(pen.ARRAY_BUFFER, normalBuffer)
    shader.enableNormals()
    pen.bindBuffer(pen.ELEMENT_ARRAY_BUFFER, indexBuffer)
  }

  return {
    use,
    indices
  }
}

export default ModelType
