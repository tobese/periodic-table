'use client'

import type { ElementData } from '@/data/elements'
import { CATEGORY_COLORS } from '@/data/elements'

interface ElementCellProps {
  element: ElementData
  isSelected: boolean
  onClick: (element: ElementData) => void
}

export default function ElementCell({ element, isSelected, onClick }: ElementCellProps) {
  const bgColor = CATEGORY_COLORS[element.category]

  return (
    <button
      className={`
        relative flex flex-col items-center justify-center cursor-pointer select-none
        transition-all duration-150
        hover:z-10
        focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-slate-500
        ${isSelected ? 'z-10' : ''}
      `}
      style={{
        backgroundColor: bgColor,
        aspectRatio: '1',
        outline: isSelected ? '3px solid #1e293b' : 'none',
        outlineOffset: '-1px',
      }}
      onClick={() => onClick(element)}
      title={`${element.atomicNumber}. ${element.name} (${element.symbol})`}
    >
      <span className="text-[9px] font-medium text-slate-800 leading-none absolute top-[2px] left-[3px] opacity-80">
        {element.atomicNumber}
      </span>
      <span className="text-xs font-bold text-slate-900 leading-none -mb-0.5">
        {element.symbol}
      </span>
      <span className="text-[7px] text-slate-700 leading-none opacity-70 truncate max-w-full px-0.5">
        {element.name}
      </span>
    </button>
  )
}
