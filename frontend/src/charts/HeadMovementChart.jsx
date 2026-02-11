import React, { useEffect, useMemo, useRef } from 'react';

const HeadMovementChart = ({ sequence = [], diskSize = 200, animationDurationMs = 1200, animationKey = '' }) => {
    if (!sequence || sequence.length === 0)
        return <div className="muted">No data</div>;

    const sequenceKey = useMemo(
        () => `${animationKey}::${sequence.join(',')}`,
        [animationKey, sequence]
    );
    const durationRef = useRef(animationDurationMs);

    useEffect(() => {
        durationRef.current = animationDurationMs;
    }, [sequenceKey]);

    const width = 720;
    const height = 260;
    const padding = 52;

    const maxVal = Math.max(...sequence, diskSize);
    const minVal = Math.min(...sequence, 0);

    const xStep = (width - padding * 2) / Math.max(1, sequence.length - 1);

    const getY = (v) =>
        padding +
        (1 - (v - minVal) / (maxVal - minVal || 1)) *
            (height - padding * 2);

    const points = sequence
        .map((v, i) => {
            const x = padding + i * xStep;
            const y = getY(v);
            return `${x},${y}`;
        })
        .join(' ');

    const durationMs = durationRef.current;

    return (
        <svg
            width="100%"
            height="320"
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block' }}
        >
            {/* Grid + Y Axis Labels */}
            {[...Array(6)].map((_, i) => {
                const y =
                    padding + (i / 5) * (height - padding * 2);
                const value = Math.round(
                    maxVal - (i / 5) * (maxVal - minVal)
                );

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

            {/* Line */}
            <polyline
                points={points}
                fill="none"
                stroke="var(--accent)"
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

            {/* Points + Values */}
            {sequence.map((v, i) => {
                const x = padding + i * xStep;
                const y = getY(v);
                const delayMs = (i / Math.max(1, sequence.length - 1)) * durationMs;

                return (
                    <g
                        key={i}
                        style={{
                            opacity: 0,
                            animation: 'fade-in 250ms ease forwards',
                            animationDelay: `${delayMs}ms`,
                        }}
                    >
                        <circle cx={x} cy={y} r={4} fill="var(--accent-strong)" />
                        <text
                            x={x}
                            y={y - 8}
                            textAnchor="middle"
                            fontSize="10"
                            fill="var(--text)"
                        >
                            {v}
                        </text>
                    </g>
                );
            })}

            {/* X Axis Labels */}
            {sequence.map((_, i) => {
                const x = padding + i * xStep;
                return (
                    <text
                        key={`x-${i}`}
                        x={x}
                        y={height - padding + 15}
                        textAnchor="middle"
                        fontSize="10"
                        fill="var(--muted)"
                    >
                        {i}
                    </text>
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
    );
};

export default HeadMovementChart;
