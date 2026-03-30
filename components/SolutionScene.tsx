'use client'
import FloatingLines from './FloatingLines'

export default function SolutionScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
      <FloatingLines
        enabledWaves={['bottom']}
        lineDistance={[80]}
        bendRadius={3.0}
        bendStrength={0.3}
        lineCount={[4]}
        linesGradient={['#3C5366', '#7a8c98']}
        bottomWavePosition={{ x: 2.0, y: -0.9, rotate: 0.1 }}
      />
    </div>
  )
}
