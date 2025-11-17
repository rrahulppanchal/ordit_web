'use client'

import { useState, useRef, useEffect } from 'react'

interface OtpInputProps {
  length?: number
  onComplete?: (code: string) => void
}

export function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }

    if (newOtp.every(digit => digit !== '')) {
      onComplete?.(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {Array(length).fill(0).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-foreground rounded-lg focus:outline-none focus:border-accent"
        />
      ))}
    </div>
  )
}
