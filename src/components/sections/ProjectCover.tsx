import type { Project } from '@/data/types'
import styles from './Projects.module.css'

/** Generative cover art — one motif per project, pure SVG so it costs nothing to load. */
export default function ProjectCover({ kind }: { kind: Project['cover'] }) {
  if (kind === 'graph') {
    const nodes: [number, number][] = [
      [60, 70], [140, 40], [220, 90], [310, 50], [350, 130], [270, 170], [170, 150], [90, 190], [200, 220], [330, 215],
    ]
    const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 4], [5, 6], [6, 1], [6, 7], [7, 0], [6, 8], [8, 5], [8, 9], [9, 4]]
    return (
      <svg viewBox="0 0 400 260" className={styles.coverSvg} aria-hidden="true" focusable="false">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className={styles.edge} />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={i === 2 ? 9 : 5} className={i === 2 ? styles.nodeHot : styles.node} />
            {i === 2 ? <circle cx={x} cy={y} r="9" className={styles.pulse} /> : null}
          </g>
        ))}
      </svg>
    )
  }
  if (kind === 'ledger') {
    const bars = [78, 132, 104, 176, 150, 210, 124, 188]
    return (
      <svg viewBox="0 0 400 260" className={styles.coverSvg} aria-hidden="true" focusable="false">
        {[50, 100, 150, 200].map((y) => (
          <line key={y} x1="24" y1={y} x2="376" y2={y} className={styles.edge} />
        ))}
        {bars.map((hgt, i) => (
          <rect key={i} x={36 + i * 43} y={236 - hgt} width="26" height={hgt} className={i === 5 ? styles.barHot : styles.bar} style={{ animationDelay: `${i * 90}ms` }} />
        ))}
        <path d="M36 190L79 150 122 168 165 100 208 120 251 60 294 130 337 82" className={styles.trend} />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 400 260" className={styles.coverSvg} aria-hidden="true" focusable="false">
      <g transform="translate(200 130)">
        {[110, 84, 58].map((r, i) => (
          <polygon
            key={r}
            points={Array.from({ length: 6 }, (_, k) => {
              const a = (Math.PI / 3) * k - Math.PI / 6
              return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`
            }).join(' ')}
            className={i === 2 ? styles.nodeHotFill : styles.edgeShape}
            style={{ animationDelay: `${i * 160}ms` }}
          />
        ))}
        <path d="M-20 2l14 14 28-30" className={styles.check} />
      </g>
    </svg>
  )
}
