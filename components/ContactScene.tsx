'use client'
import FloatingLines from './FloatingLines'

export default function ContactScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50">
      <FloatingLines
        enabledWaves={['middle']}
        lineDistance={[50]}
        bendRadius={2.5}
        bendStrength={0.4}
        lineCount={[3]}
        linesGradient={['#3C5366', '#7a8c98']}
        middleWavePosition={{ x: 0.0, y: 0.0, rotate: 0.3 }}
      />
    </div>
  )
}
