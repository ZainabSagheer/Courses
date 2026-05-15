"use client";

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/components/theme-provider'

interface EntropyProps {
  className?: string
}

export function Entropy({ className = "" }: EntropyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const particleColor = theme === 'dark' ? '#00D9FF' : '#4F46E5'
    const width = window.innerWidth
    const height = window.innerHeight

    class Particle {
      x: number
      y: number
      size: number
      order: boolean
      velocity: { x: number; y: number }
      originalX: number
      originalY: number
      influence: number
      neighbors: Particle[]

      constructor(x: number, y: number, order: boolean) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = 1.5
        this.order = order
        this.velocity = {
          x: (Math.random() - 0.5) * 1.5,
          y: (Math.random() - 0.5) * 1.5
        }
        this.influence = 0
        this.neighbors = []
      }

      update() {
        if (this.order) {
          const dx = this.originalX - this.x
          const dy = this.originalY - this.y

          const chaosInfluence = { x: 0, y: 0 }
          this.neighbors.forEach(neighbor => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y)
              const strength = Math.max(0, 1 - distance / 150)
              chaosInfluence.x += (neighbor.velocity.x * strength)
              chaosInfluence.y += (neighbor.velocity.y * strength)
              this.influence = Math.max(this.influence, strength)
            }
          })

          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence
          this.influence *= 0.98
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.3
          this.velocity.y += (Math.random() - 0.5) * 0.3
          this.velocity.x *= 0.98
          this.velocity.y *= 0.98
          this.x += this.velocity.x
          this.y += this.velocity.y

          if (this.x < width / 2 || this.x > width) this.velocity.x *= -1
          if (this.y < 0 || this.y > height) this.velocity.y *= -1
          this.x = Math.max(width / 2, Math.min(width, this.x))
          this.y = Math.max(0, Math.min(height, this.y))
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.order ? 0.4 - this.influence * 0.2 : 0.4
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    const spacing = 40
    const cols = Math.ceil(width / spacing)
    const rows = Math.ceil(height / spacing)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing + spacing / 2
        const y = j * spacing + spacing / 2
        const order = x < width / 2
        particles.push(new Particle(x, y, order))
      }
    }

    function updateNeighbors() {
      particles.forEach(particle => {
        particle.neighbors = particles.filter(other => {
          if (other === particle) return false
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          return distance < 120
        })
      })
    }

    let time = 0
    let animationId: number
    
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (time % 60 === 0) updateNeighbors()

      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)

        particle.neighbors.forEach(neighbor => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y)
          if (distance < 60) {
            const alpha = 0.1 * (1 - distance / 60)
            ctx.strokeStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        })
      })

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [mounted, theme])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}
