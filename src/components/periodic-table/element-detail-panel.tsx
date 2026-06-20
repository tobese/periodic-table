'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ElementData } from '@/data/elements'
import { CATEGORY_COLORS, CATEGORY_LABELS, SHELL_LABELS } from '@/data/elements'
import ElectronShellDiagram from './electron-shell-diagram'
import ThreeAtomDisplay from './three-atom-display'
import ReactivityIndicator from './reactivity-indicator'

interface ElementDetailPanelProps {
  element: ElementData | null
  onClose: () => void
}

type ViewMode = '2d' | '3d'

export default function ElementDetailPanel({ element, onClose }: ElementDetailPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('3d')

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!element) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [element, handleKeyDown])

  if (!element) return null

  const categoryColor = CATEGORY_COLORS[element.category]
  const periodLabel = element.period <= 7 ? `Period ${element.period}` : element.period === 8 ? 'Lanthanide series' : 'Actinide series'
  const groupLabel = element.group !== null ? `Group ${element.group}` : '—'
  const shellConfig = element.shells.map((count, i) => `${SHELL_LABELS[i] ?? '?'} = ${count}`).join(', ')

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="relative w-full max-w-xl bg-white shadow-2xl overflow-y-auto animate-slide-in pointer-events-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: categoryColor }}>
              {element.symbol}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{element.name}</h2>
              <span className="text-xs text-slate-500">{element.symbol} · {element.atomicNumber}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Symbol</span>
              <p className="text-4xl font-bold text-slate-900 mt-0.5">{element.symbol}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Atomic Number</span>
                <p className="text-lg font-bold text-slate-900">{element.atomicNumber}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Atomic Mass</span>
                <p className="text-lg font-bold text-slate-900">{element.atomicMass.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Group</span>
                <p className="text-lg font-bold text-slate-900">{groupLabel}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Period</span>
                <p className="text-lg font-bold text-slate-900">{periodLabel}</p>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: categoryColor }} />
                <span className="text-sm font-medium text-slate-800">{CATEGORY_LABELS[element.category]}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Block</span>
              <p className="text-sm font-medium text-slate-800 mt-0.5">{element.block.toUpperCase()}-block</p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Electron Configuration</span>
              <p className="text-sm font-mono text-slate-700 mt-0.5">{shellConfig}</p>
            </div>

            {element.electronegativity !== null && (
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Electronegativity</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{element.electronegativity.toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Atom View</span>
                <div className="flex rounded-md border border-slate-300 overflow-hidden text-xs">
                  <button
                    onClick={() => setViewMode('2d')}
                    className={`px-2 py-0.5 font-medium transition-colors ${viewMode === '2d' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                  >
                    2D
                  </button>
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-2 py-0.5 font-medium transition-colors ${viewMode === '3d' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                  >
                    3D
                  </button>
                </div>
              </div>
              {viewMode === '3d' ? (
                <ThreeAtomDisplay shells={element.shells} color={CATEGORY_COLORS[element.category]} />
              ) : (
                <ElectronShellDiagram shells={element.shells} />
              )}
            </div>

            <ReactivityIndicator shells={element.shells} electronegativity={element.electronegativity} />
          </div>
        </div>
      </div>
    </div>
  )
}
