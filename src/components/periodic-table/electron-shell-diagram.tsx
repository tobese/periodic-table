'use client'

import { SHELL_LABELS, SHELL_CAPACITIES } from '@/data/elements'

interface ElectronShellDiagramProps {
  shells: number[]
}

const SHELL_RADIUS_START = 28
const SHELL_RADIUS_STEP = 30
const DOT_RADIUS = 3
const NUCLEUS_RADIUS = 8
const PADDING = 20

function getDotPosition(shellRadius: number, index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: Math.cos(angle) * shellRadius,
    y: Math.sin(angle) * shellRadius,
  }
}

export default function ElectronShellDiagram({ shells }: ElectronShellDiagramProps) {
  const numShells = shells.length
  const outerRadius = SHELL_RADIUS_START + (numShells - 1) * SHELL_RADIUS_STEP + DOT_RADIUS + 4
  const size = (outerRadius + PADDING) * 2
  const cx = size / 2
  const cy = size / 2

  const lastIdx = numShells - 1

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      <circle cx={cx} cy={cy} r={NUCLEUS_RADIUS} fill="#1e293b" />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="8" fontWeight="bold">
        +{shells.reduce((a, b) => a + b, 0)}
      </text>

      {shells.map((count, idx) => {
        const r = SHELL_RADIUS_START + idx * SHELL_RADIUS_STEP
        const capacity = SHELL_CAPACITIES[idx] ?? 0
        const isOuter = idx === lastIdx
        const label = SHELL_LABELS[idx] ?? ''

        return (
          <g key={idx}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#94a3b8" strokeWidth={1.5} />

            <text x={cx + r + 6} y={cy} textAnchor="start" dominantBaseline="central" fill="#64748b" fontSize="9" fontFamily="monospace">
              {label}
            </text>

            {Array.from({ length: count }, (_, i) => {
              const pos = getDotPosition(r, i, count)
              return (
                <circle
                  key={`filled-${i}`}
                  cx={cx + pos.x}
                  cy={cy + pos.y}
                  r={DOT_RADIUS}
                  fill="#0f172a"
                />
              )
            })}

            {isOuter &&
              Array.from({ length: capacity - count }, (_, i) => {
                const pos = getDotPosition(r, i, capacity - count)
                return (
                  <circle
                    key={`empty-${i}`}
                    cx={cx + pos.x}
                    cy={cy + pos.y}
                    r={DOT_RADIUS}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth={1.5}
                    strokeDasharray="2 1"
                  />
                )
              })}
          </g>
        )
      })}
    </svg>
  )
}
