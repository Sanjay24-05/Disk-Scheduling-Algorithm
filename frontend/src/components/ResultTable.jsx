import React from 'react';

const ResultTable = ({ result }) => {
    if (!result) return null;
    const { sequence = [], total_head_movement } = result;
    return (
        <div id="result-table">
            <div className="muted">Total Head Movement: <strong>{total_head_movement}</strong></div>
            <table className="table" style={{marginTop:8}}>
                <thead>
                    <tr><th>#</th><th>Cylinder</th></tr>
                </thead>
                <tbody>
                    {sequence.map((c, i) => (
                        <tr key={i}><td>{i}</td><td>{c}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultTable;
