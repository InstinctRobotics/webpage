'use client'
import FloatingLines from './FloatingLines'

export default function ContactScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-50 pointer-events-none">
      <FloatingLines
        enabledWaves={['middle']}
        lineDistance={[80]}
        bendRadius={2.5}
        bendStrength={0.5}
        lineCount={[3]}
        linesGradient={['#3C5366', '#7A8C98']}
        bottomWavePosition={{ x: 2.0, y: -0.5, rotate: -0.1 }}
      />
    </div>
  )
}
