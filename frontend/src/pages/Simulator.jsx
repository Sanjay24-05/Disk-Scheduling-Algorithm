import React, { useState } from 'react';
import InputPanel from '../components/InputPanel';
import AlgorithmSelector from '../components/AlgorithmSelector';
import ResultTable from '../components/ResultTable';
import HeadMovementChart from '../charts/HeadMovementChart';
import { runSimulation, runComparison } from '../services/api';

const DEFAULT_REQUESTS = [95, 180, 34, 119, 11, 123, 62, 64];

const algorithms = ['fcfs', 'sstf', 'scan', 'cscan', 'look', 'clook'];

const Simulator = () => {
    const [algorithm, setAlgorithm] = useState('fcfs');
    const [requests, setRequests] = useState(DEFAULT_REQUESTS.join(', '));
    const [startHead, setStartHead] = useState(50);
    const [diskSize, setDiskSize] = useState(200);
    const [direction, setDirection] = useState('up');
    const [result, setResult] = useState(null);
    const [compareResults, setCompareResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const runExample = async (alg) => {
        setError(null);
        setLoading(true);
        setResult(null);
        try {
            const res = await runSimulation({ algorithm: alg, requests: DEFAULT_REQUESTS, start_head: 50, disk_size: 200, direction: 'up' });
            setResult(res);
        } catch (e) {
            setError(e.message || String(e));
        } finally {
            setLoading(false);
        }
    };

    const runCustom = async () => {
        setError(null);
        setLoading(true);
        setResult(null);
        try {
            const reqs = requests.split(',').map(s => parseInt(s.trim())).filter(n => !Number.isNaN(n));
            const res = await runSimulation({ algorithm, requests: reqs, start_head: Number(startHead), disk_size: Number(diskSize), direction });
            setResult(res);
        } catch (e) {
            setError(e.message || String(e));
        } finally {
            setLoading(false);
        }
    };

    const runCompareExample = async () => {
        setError(null);
        setLoading(true);
        setCompareResults(null);
        try {
            const res = await runComparison({ algorithms, requests: DEFAULT_REQUESTS, start_head: 50, disk_size: 200 });
            setCompareResults(res.results || res);
        } catch (e) {
            setError(e.message || String(e));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="simulator-page">
            <h1>Disk Scheduling Simulator</h1>

            <div className="panel">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                        <strong>Example Runs</strong>
                        <div className="muted">Click any algorithm to run a demo input</div>
                    </div>
                    <div>
                        <button className="btn secondary" onClick={runCompareExample}>Compare All (Example)</button>
                    </div>
                </div>
                <div style={{marginTop:12}} className="preset-list">
                    {algorithms.map(a => (
                        <button key={a} className="preset" onClick={() => runExample(a)}>{a.toUpperCase()}</button>
                    ))}
                </div>
            </div>

            <div className="panel">
                <strong>Custom Input</strong>
                <div className="controls" style={{marginTop:8}}>
                    <InputPanel
                        requests={requests}
                        setRequests={setRequests}
                        startHead={startHead}
                        setStartHead={setStartHead}
                        diskSize={diskSize}
                        setDiskSize={setDiskSize}
                        direction={direction}
                        setDirection={setDirection}
                        onRun={runCustom}
                        loading={loading}
                    />
                    <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
                </div>
            </div>

            {error && <div className="panel" style={{color:'crimson'}}>{error}</div>}

            <div className="results">
                <div className="panel">
                    <strong>Result</strong>
                    <div style={{marginTop:8}}>
                        {loading && <div className="muted">Running...</div>}
                        {!loading && result && <ResultTable result={result} />}
                        {!loading && !result && <div className="muted">No result yet.</div>}
                    </div>
                </div>

                <div className="panel">
                    <strong>Head Movement</strong>
                    <div style={{marginTop:8}} className="chart">
                        <HeadMovementChart sequence={result?.sequence || []} diskSize={diskSize} />
                    </div>
                </div>
            </div>

            {compareResults && (
                <div className="panel">
                    <strong>Comparison Results</strong>
                    <table className="table" style={{marginTop:8}}>
                        <thead>
                            <tr><th>Algorithm</th><th>Total Head Movement</th></tr>
                        </thead>
                        <tbody>
                            {Object.entries(compareResults).map(([alg, res]) => (
                                <tr key={alg}>
                                    <td>{alg}</td>
                                    <td>{res.total_head_movement ?? (res.error ? 'error' : '')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Simulator;
