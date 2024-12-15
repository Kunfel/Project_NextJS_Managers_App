"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FontSizeSelectorProps {
  value: number
  onChange: (value: number) => void
}

export function FontSizeSelector({ value, onChange }: FontSizeSelectorProps) {
  const fontSizes = [12, 14, 16, 18, 20, 24]

  return (
    <div className="w-[180px]">
      <Select value={value.toString()} onValueChange={(val) => onChange(Number(val))}>
        <SelectTrigger>
          <SelectValue placeholder="Font size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {fontSizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}px
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}