import { useEffect, useRef } from 'react'
import Init from './containers/Init'

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const handleRender = () => {
      if (!canvasRef.current) return
      const pen = canvasRef.current.getContext('webgl')
      if (!pen) return
      Init(pen)
    }

    handleRender()
  }, [canvasRef])

  return (
    <main className="flex h-screen justify-center items-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-black"
      />
    </main>
  )
}

export default App
