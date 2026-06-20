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
        relative flex flex-col items-center justify-center rounded-md cursor-pointer
        transition-all duration-150 select-none
        hover:z-10 hover:scale-110 hover:shadow-lg
        focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
        ${isSelected ? 'z-10 scale-110 shadow-lg ring-2 ring-slate-700' : 'shadow-sm'}
      `}
      style={{
        backgroundColor: isSelected ? bgColor : `${bgColor}80`,
        gridRow: element.gridRow,
        gridColumn: element.gridCol,
      }}
      onClick={() => onClick(element)}
      title={`${element.atomicNumber}. ${element.name} (${element.symbol})`}
    >
      <span className="text-[9px] font-medium text-slate-700 leading-none opacity-70 absolute top-1 left-1">
        {element.atomicNumber}
      </span>
      <span className="text-sm font-bold text-slate-900 leading-none mt-1">
        {element.symbol}
      </span>
    </button>
  )
}
