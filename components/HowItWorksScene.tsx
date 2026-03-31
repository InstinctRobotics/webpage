'use client'
import FloatingLines from './FloatingLines'

export default function HowItWorksScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
      <FloatingLines
        enabledWaves={['bottom']}
        lineDistance={[100]}
        bendRadius={4.0}
        bendStrength={0.25}
        lineCount={[4]}
        linesGradient={['#3C5366', '#7a8c98']}
        bottomWavePosition={{ x: -3.0, y: -0.85, rotate: -0.1 }}
      />
    </div>
  )
}
