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
import { Language } from "@/app/challenges/type"

interface LanguageSelectorProps {
  value: Language
  onChange: (value: Language) => void
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="w-[180px]">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="js">JavaScript</SelectItem>
            <SelectItem value="py">Python</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}