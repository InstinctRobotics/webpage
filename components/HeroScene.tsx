'use client'
import FloatingLines from './FloatingLines'

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <FloatingLines
        enabledWaves={['middle']}
        lineDistance={[100]}
        bendRadius={2.5}
        bendStrength={0.5}
        lineCount={[7]}
        linesGradient={['#3C5366', '#7a8c98']}
        middleWavePosition={{ x: 5.0, y: -0.5, rotate: 0 }}
      />
    </div>
  )
}
