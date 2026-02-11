import React from 'react';

const HeadMovementChart = ({ sequence = [], diskSize = 200 }) => {
    if (!sequence || sequence.length === 0) return <div className="muted">No data</div>;
    const width = 720;
    const height = 200;
    const padding = 20;
    const maxVal = Math.max(...sequence, diskSize);
    const minVal = Math.min(...sequence, 0);
    const xStep = (width - padding * 2) / Math.max(1, sequence.length - 1);

    const points = sequence.map((v, i) => {
        const x = padding + i * xStep;
        const y = padding + (1 - (v - minVal) / (maxVal - minVal || 1)) * (height - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} style={{maxWidth:'100%'}}>
            <polyline points={points} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            {sequence.map((v, i) => {
                const x = padding + i * xStep;
                const y = padding + (1 - (v - minVal) / (maxVal - minVal || 1)) * (height - padding * 2);
                return <circle key={i} cx={x} cy={y} r={3} fill="#1e40af" />
            })}
        </svg>
    );
};

export default HeadMovementChart;
