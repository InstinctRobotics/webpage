'use client'
import { useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function MagneticButton({ 
  children, 
  className, 
  href,
  onClick,
  type = "button",
  disabled = false,
  magnetic = true
}: { 
  children: React.ReactNode, 
  className: string, 
  href?: string,
  onClick?: () => void,
  type?: "button" | "submit" | "reset",
  disabled?: boolean,
  magnetic?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: magnetic ? position.x : 0, y: magnetic ? position.y : 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${className} relative overflow-hidden group/btn flex items-center justify-center cursor-pointer transition-all active:scale-[0.98] z-10 w-full h-full`}
    >
      <div className="absolute inset-0 bg-text translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-500 ease-out z-0" />
      <span className="relative z-10 flex items-center justify-center gap-3 group-hover/btn:text-brand transition-colors duration-[400ms]">
        {children}
      </span>
    </motion.div>
  )

  const wrapperClasses = `inline-flex items-center justify-center ${className.includes('w-full') ? 'w-full' : ''} focus:outline-none`

  if (href) {
    return (
      <a href={href} className={wrapperClasses}>
        {innerContent}
      </a>
    )
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${wrapperClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {innerContent}
    </button>
  )
}
