'use client'

import { useState, useMemo } from 'react'
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

const HEADER_ROWS = 2
const LABEL_COL = 1

const GROUP_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const PERIOD_LABELS: Record<number, string> = {
  1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7',
  8: 'La', 9: 'Ac',
}

const BLOCK_LABELS = [
  { label: 's-block', start: 1, end: 2 },
  { label: 'd-block', start: 3, end: 12 },
  { label: 'p-block', start: 13, end: 18 },
]

const GRID_ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const GRID_COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

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

  const elementMap = useMemo(
    () => new Map(ELEMENTS.map((el) => [`${el.gridRow},${el.gridCol}`, el])),
    [],
  )

  function renderGridCells() {
    const cells: React.ReactNode[] = []

    for (const row of GRID_ROWS) {
      for (const col of GRID_COLS) {
        const key = `${row},${col}`
        const element = elementMap.get(key)

        if (element) {
          cells.push(
            <div
              key={key}
              className={filteredSet.has(element.atomicNumber) ? '' : 'opacity-20'}
              style={{ gridRow: row + HEADER_ROWS, gridColumn: col + LABEL_COL }}
            >
              <ElementCell
                element={element}
                isSelected={selectedElement?.atomicNumber === element.atomicNumber}
                onClick={setSelectedElement}
              />
            </div>,
          )
        } else {
          cells.push(
            <div
              key={key}
              style={{ gridRow: row + HEADER_ROWS, gridColumn: col + LABEL_COL }}
              className="bg-white"
            />,
          )
        }
      }
    }

    return cells
  }

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
        className="grid gap-[1px]"
        style={{
          gridTemplateColumns: `28px repeat(18, minmax(0, 1fr))`,
          gridTemplateRows: `18px 22px repeat(9, auto)`,
        }}
      >
        {/* Block labels */}
        {BLOCK_LABELS.map((b) => (
          <div
            key={b.label}
            className="flex items-center justify-center text-[9px] font-semibold text-slate-400 uppercase tracking-wider"
            style={{
              gridRow: 1,
              gridColumn: `${b.start + LABEL_COL} / ${b.end + LABEL_COL + 1}`,
            }}
          >
            {b.label}
          </div>
        ))}

        {/* Group numbers */}
        {GROUP_NUMBERS.map((n) => (
          <div
            key={n}
            className="flex items-center justify-center text-[10px] font-medium text-slate-500"
            style={{ gridRow: 2, gridColumn: n + LABEL_COL }}
          >
            {n}
          </div>
        ))}

        {/* Period labels */}
        {Object.entries(PERIOD_LABELS).map(([rowStr, label]) => {
          const row = Number(rowStr)
          return (
            <div
              key={row}
              className="flex items-center justify-center text-[10px] font-medium text-slate-500"
              style={{ gridRow: row + HEADER_ROWS, gridColumn: LABEL_COL }}
            >
              {label}
            </div>
          )
        })}

        {/* Empty corner cell */}
        <div style={{ gridRow: 1, gridColumn: LABEL_COL }} />

        {/* Grid cells */}
        {renderGridCells()}
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
