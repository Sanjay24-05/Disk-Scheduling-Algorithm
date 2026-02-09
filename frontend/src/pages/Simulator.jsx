import React from 'react';
import InputPanel from '../components/InputPanel';
import AlgorithmSelector from '../components/AlgorithmSelector';
import ResultTable from '../components/ResultTable';
import HeadMovementChart from '../charts/HeadMovementChart';

const Simulator = () => {
    return (
        <div className="simulator-page">
            <h1>Disk Scheduling Simulator</h1>
            <InputPanel />
            <AlgorithmSelector />
            <HeadMovementChart />
            <ResultTable />
        </div>
    );
};

export default Simulator;
