import React, { useEffect, useMemo, useRef } from 'react';

const MultiAlgorithmChart = ({
    results = {},
    diskSize = 200,
    animationDurationMs = 1200,
    animationKey = '',
}) => {
    if (!results || Object.keys(results).length === 0)
        return <div className="muted">No comparison data</div>;

    const width = 720;
    const height = 300;
    const padding = 52;

    const algorithmColors = {
        fcfs: '#ef4444',
        sstf: '#f59e0b',
        scan: '#10b981',
        cscan: '#3b82f6',
        look: '#8b5cf6',
        clook: '#ec4899',
    };

    // Find the max sequence length and value range across all algorithms
    const allSequences = Object.values(results).map((r) => r.sequence || []);
    const maxLength = Math.max(...allSequences.map((s) => s.length));
    const allValues = allSequences.flat();
    const maxVal = Math.max(...allValues, diskSize);
    const minVal = Math.min(...allValues, 0);

    const getY = (v) =>
        padding +
        (1 - (v - minVal) / (maxVal - minVal || 1)) * (height - padding * 2);

    const sequenceKey = useMemo(
        () => `${animationKey}::${Object.keys(results).join(',')}`,
        [animationKey, results]
    );
    const durationRef = useRef(animationDurationMs);

    useEffect(() => {
        durationRef.current = animationDurationMs;
    }, [sequenceKey]);

    const durationMs = durationRef.current;

    return (
        <div>
            <svg
                width="100%"
                height="320"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ display: 'block' }}
            >
                {/* Grid + Y Axis Labels */}
                {[...Array(6)].map((_, i) => {
                    const y = padding + (i / 5) * (height - padding * 2);
                    const value = Math.round(maxVal - (i / 5) * (maxVal - minVal));

                    return (
                        <g key={i}>
                            <line
                                x1={padding}
                                y1={y}
                                x2={width - padding}
                                y2={y}
                                stroke="var(--chart-grid)"
                            />
                            <text
                                x={padding - 10}
                                y={y + 4}
                                fontSize="10"
                                textAnchor="end"
                                fill="var(--muted)"
                            >
                                {value}
                            </text>
                        </g>
                    );
                })}

                {/* Axes */}
                <line
                    x1={padding}
                    y1={height - padding}
                    x2={width - padding}
                    y2={height - padding}
                    stroke="var(--chart-axis)"
                />
                <line
                    x1={padding}
                    y1={padding}
                    x2={padding}
                    y2={height - padding}
                    stroke="var(--chart-axis)"
                />

                {/* Algorithm Lines */}
                {Object.entries(results).map(([algId, result]) => {
                    const sequence = result.sequence || [];
                    const xStep = (width - padding * 2) / Math.max(1, sequence.length - 1);
                    const color = algorithmColors[algId] || '#6b7280';

                    const points = sequence
                        .map((v, i) => {
                            const x = padding + i * xStep;
                            const y = getY(v);
                            return `${x},${y}`;
                        })
                        .join(' ');

                    return (
                        <g key={algId}>
                            <polyline
                                points={points}
                                fill="none"
                                stroke={color}
                                strokeWidth="2"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                pathLength="100"
                                style={{
                                    strokeDasharray: 100,
                                    strokeDashoffset: 100,
                                    animation: `draw-line ${durationMs}ms ease forwards`,
                                }}
                            />
                            {sequence.map((v, i) => {
                                const x = padding + i * xStep;
                                const y = getY(v);
                                const delayMs =
                                    (i / Math.max(1, sequence.length - 1)) * durationMs;

                                return (
                                    <circle
                                        key={`${algId}-${i}`}
                                        cx={x}
                                        cy={y}
                                        r={3}
                                        fill={color}
                                        style={{
                                            opacity: 0,
                                            animation: 'fade-in 250ms ease forwards',
                                            animationDelay: `${delayMs}ms`,
                                        }}
                                    />
                                );
                            })}
                        </g>
                    );
                })}

                {/* Axis Titles */}
                <text
                    x={width / 2}
                    y={height - 5}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--text)"
                >
                    Request Order
                </text>

                <text
                    x={18}
                    y={height / 2}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--text)"
                    transform={`rotate(-90 18 ${height / 2})`}
                >
                    Track Number
                </text>
            </svg>

            {/* Legend */}
            <div className="chart-legend">
                {Object.entries(results).map(([algId, result]) => (
                    <div key={algId} className="legend-item">
                        <div
                            className="legend-color"
                            style={{ backgroundColor: algorithmColors[algId] || '#6b7280' }}
                        />
                        <span className="legend-label">
                            {algId.toUpperCase()} ({result.total_head_movement})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiAlgorithmChart;
