'use client'

import { useState } from 'react'
import type { ElementData, ElementCategory } from '@/data/elements'
import { ELEMENTS, CATEGORY_COLORS, CATEGORY_LABELS } from '@/data/elements'
import ElementCell from './element-cell'
import ElementDetailPanel from './element-detail-panel'

type FilterKey = ElementCategory | 'all'

const CATEGORY_FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'alkali-metal', label: 'Alkali Metal' },
  { key: 'alkaline-earth-metal', label: 'Alkaline Earth' },
  { key: 'transition-metal', label: 'Transition Metal' },
  { key: 'lanthanide', label: 'Lanthanide' },
  { key: 'actinide', label: 'Actinide' },
  { key: 'post-transition-metal', label: 'Post-Transition' },
  { key: 'metalloid', label: 'Metalloid' },
  { key: 'nonmetal', label: 'Nonmetal' },
  { key: 'halogen', label: 'Halogen' },
  { key: 'noble-gas', label: 'Noble Gas' },
]

export default function PeriodicTableGrid() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<ElementCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredElements = ELEMENTS.filter((el) => {
    if (categoryFilter !== 'all' && el.category !== categoryFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      if (
        !el.symbol.toLowerCase().includes(q) &&
        !el.name.toLowerCase().includes(q) &&
        !String(el.atomicNumber).includes(q)
      ) return false
    }
    return true
  })

  const filteredSet = new Set(filteredElements.map((el) => el.atomicNumber))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="text"
          placeholder="Search by name, symbol, or number…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 w-64"
        />
        <div className="flex flex-wrap gap-1">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setCategoryFilter(f.key)}
              className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                categoryFilter === f.key
                  ? f.key === 'all'
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'text-white border-transparent'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
              style={
                categoryFilter === f.key && f.key !== 'all'
                  ? { backgroundColor: CATEGORY_COLORS[f.key] }
                  : undefined
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grid gap-[1px] w-full"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(9, auto)',
        }}
      >
        {ELEMENTS.map((el) => (
          <div
            key={el.atomicNumber}
            className={filteredSet.has(el.atomicNumber) ? '' : 'opacity-20'}
            style={{ gridRow: el.gridRow, gridColumn: el.gridCol }}
          >
            <ElementCell
              element={el}
              isSelected={selectedElement?.atomicNumber === el.atomicNumber}
              onClick={setSelectedElement}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 px-1 py-2 text-xs text-slate-500">
        {(CATEGORY_FILTERS.filter(f => f.key !== 'all') as { key: ElementCategory; label: string }[]).map((f) => (
          <div key={f.key} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: CATEGORY_COLORS[f.key] }} />
            <span>{CATEGORY_LABELS[f.key]}</span>
          </div>
        ))}
      </div>

      <ElementDetailPanel element={selectedElement} onClose={() => setSelectedElement(null)} />

      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
