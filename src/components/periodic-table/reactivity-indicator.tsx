'use client'

import { getValenceElectrons, getValenceCapacity, getElectronsToFill, getReactivityLabel, SHELL_LABELS } from '@/data/elements'

interface ReactivityIndicatorProps {
  shells: number[]
  electronegativity: number | null
}

const reactivityColors: Record<string, string> = {
  'Highly Reactive': '#ef4444',
  'Reactive': '#f97316',
  'Moderately Reactive': '#eab308',
  'Slightly Reactive': '#22c55e',
  'Inert': '#a855f7',
}

export default function ReactivityIndicator({ shells, electronegativity }: ReactivityIndicatorProps) {
  const valence = getValenceElectrons(shells)
  const capacity = getValenceCapacity(shells.length - 1)
  const toFill = getElectronsToFill(shells)
  const label = getReactivityLabel(shells, electronegativity)
  const labelColor = reactivityColors[label] ?? '#64748b'

  const enDisplay = electronegativity ?? 0
  const enPercent = (enDisplay / 4) * 100

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Electronegativity</span>
          <span className="text-sm font-bold text-slate-800">{electronegativity !== null ? electronegativity.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all"
            style={{
              width: `${enPercent}%`,
              background: 'linear-gradient(to right, #22c55e, #eab308, #ef4444)',
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-slate-700 rounded-full shadow-sm transition-all"
            style={{ left: `calc(${enPercent}% - 6px)` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
          <span>0</span>
          <span>4.0</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valence Shell</span>
          <span className="text-sm font-bold text-slate-800">{valence}e⁻ / {capacity}</span>
        </div>

        <div className="flex gap-0.5">
          {Array.from({ length: capacity }, (_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-sm ${i < valence ? 'bg-slate-700' : 'bg-slate-200'}`}
              title={i < valence ? `Filled electron ${i + 1}` : `Empty slot ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-1">
          {toFill === 0
            ? `Full outer shell (${SHELL_LABELS[shells.length - 1] ?? '?'}-shell)`
            : `Needs ${toFill} more e⁻ to fill outer ${SHELL_LABELS[shells.length - 1] ?? '?'}-shell`}
        </p>
      </div>

      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reactivity</span>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: labelColor }}
          >
            {label}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          {label === 'Inert'
            ? 'Stable full valence shell — does not readily form compounds'
            : label === 'Highly Reactive'
              ? 'Very likely to gain, lose, or share electrons to achieve a full outer shell'
              : label === 'Reactive'
                ? 'Readily forms compounds with other elements'
                : label === 'Moderately Reactive'
                  ? 'Forms compounds under certain conditions'
                  : 'Less inclined to react — relatively stable'}
        </p>
      </div>
    </div>
  )
}
