import React from 'react';

const AlgorithmSelector = ({ algorithm, setAlgorithm }) => {
    return (
        <div id="algorithm-selector" style={{width:200}}>
            <label>Algorithm</label>
            <select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
                <option value="fcfs">FCFS</option>
                <option value="sstf">SSTF</option>
                <option value="scan">SCAN</option>
                <option value="cscan">C-SCAN</option>
                <option value="look">LOOK</option>
                <option value="clook">C-LOOK</option>
            </select>
        </div>
    );
};

export default AlgorithmSelector;
