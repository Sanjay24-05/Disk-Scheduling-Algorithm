import React, { useState } from 'react';
import InputPanel from '../components/InputPanel';
import CompareInputPanel from '../components/CompareInputPanel';
import AlgorithmSelector from '../components/AlgorithmSelector';
import ResultTable from '../components/ResultTable';
import HeadMovementChart from '../charts/HeadMovementChart';
import MultiAlgorithmChart from '../charts/MultiAlgorithmChart';
import { runSimulation, runComparison } from '../services/api';

const DEFAULT_REQUESTS = [95, 180, 34, 119, 11, 123, 62, 64];

const algorithms = ['fcfs', 'sstf', 'scan', 'cscan', 'look', 'clook'];
const directionAlgorithms = new Set(['scan', 'cscan', 'look', 'clook']);

const Simulator = () => {
    const [mode, setMode] = useState('single');
    const [algorithm, setAlgorithm] = useState('fcfs');
    const [requests, setRequests] = useState(DEFAULT_REQUESTS.join(', '));
    const [startHead, setStartHead] = useState(50);
    const [diskSize, setDiskSize] = useState(200);
    const [direction, setDirection] = useState('right');
    const [result, setResult] = useState(null);
    const [animationDurationMs, setAnimationDurationMs] = useState(1200);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Compare mode state
    const [selectedAlgorithms, setSelectedAlgorithms] = useState(['fcfs', 'sstf']);
    const [compareResults, setCompareResults] = useState(null);

    const runExample = async (alg) => {
        setError(null);
        setLoading(true);
        setResult(null);
        try {
            const payload = {
                algorithm: alg,
                requests: DEFAULT_REQUESTS,
                start_head: 50,
                disk_size: 200,
            };
            if (directionAlgorithms.has(alg)) {
                payload.direction = 'right';
            }
            const res = await runSimulation(payload);
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
            const payload = {
                algorithm,
                requests: reqs,
                start_head: Number(startHead),
                disk_size: Number(diskSize),
            };
            if (directionAlgorithms.has(algorithm)) {
                payload.direction = direction;
            }
            const res = await runSimulation(payload);
            setResult(res);
        } catch (e) {
            setError(e.message || String(e));
        } finally {
            setLoading(false);
        }
    };

    const runCompare = async () => {
        setError(null);
        setLoading(true);
        setCompareResults(null);
        try {
            const reqs = requests.split(',').map(s => parseInt(s.trim())).filter(n => !Number.isNaN(n));
            const res = await runComparison({
                algorithms: selectedAlgorithms,
                requests: reqs,
                start_head: Number(startHead),
                disk_size: Number(diskSize),
            });
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
                <div className="panel-header">
                    <div>
                        <strong>Example Runs</strong>
                        <div className="muted">Click any algorithm to run a demo input</div>
                    </div>
                </div>
                <div className="preset-list panel-body-lg">
                    {algorithms.map(a => (
                        <button key={a} className="preset" onClick={() => runExample(a)}>{a.toUpperCase()}</button>
                    ))}
                </div>
            </div>

            <div className="panel">
                <div className="mode-tabs">
                    <button 
                        className={`mode-tab ${mode === 'single' ? 'active' : ''}`}
                        onClick={() => setMode('single')}
                    >
                        Single
                    </button>
                    <button 
                        className={`mode-tab ${mode === 'compare' ? 'active' : ''}`}
                        onClick={() => setMode('compare')}
                    >
                        Compare
                    </button>
                </div>

                <div className="custom-input-layout panel-body">
                    {mode === 'single' ? (
                        <>
                            <InputPanel
                                requests={requests}
                                setRequests={setRequests}
                                startHead={startHead}
                                setStartHead={setStartHead}
                                diskSize={diskSize}
                                setDiskSize={setDiskSize}
                                direction={direction}
                                setDirection={setDirection}
                                showDirection={directionAlgorithms.has(algorithm)}
                                onRun={runCustom}
                                loading={loading}
                            />
                            <div className="algorithm-slot">
                                <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
                            </div>
                        </>
                    ) : (
                        <div style={{gridColumn: '1 / -1'}}>
                            <CompareInputPanel
                                requests={requests}
                                setRequests={setRequests}
                                startHead={startHead}
                                setStartHead={setStartHead}
                                diskSize={diskSize}
                                setDiskSize={setDiskSize}
                                selectedAlgorithms={selectedAlgorithms}
                                setSelectedAlgorithms={setSelectedAlgorithms}
                                onRun={runCompare}
                                loading={loading}
                            />
                        </div>
                    )}
                </div>
            </div>

            {error && <div className="panel error">{error}</div>}

            <div className="results">
                <div className="panel">
                    <strong>Head Movement</strong>
                    <div className="chart-controls panel-body">
                        <label htmlFor="chart-speed">Animation speed (ms)</label>
                        <input
                            id="chart-speed"
                            type="range"
                            min="300"
                            max="3000"
                            step="100"
                            value={animationDurationMs}
                            onChange={(e) => setAnimationDurationMs(Number(e.target.value))}
                        />
                        <div className="muted">{animationDurationMs}ms</div>
                    </div>
                    <div className="chart panel-body">
                        {mode === 'single' ? (
                            <HeadMovementChart
                                sequence={result?.sequence || []}
                                diskSize={diskSize}
                                animationDurationMs={animationDurationMs}
                                animationKey={result?.sequence?.join(',') || ''}
                            />
                        ) : (
                            <MultiAlgorithmChart
                                results={compareResults || {}}
                                diskSize={diskSize}
                                animationDurationMs={animationDurationMs}
                                animationKey={Object.keys(compareResults || {}).join(',')}
                            />
                        )}
                    </div>
                </div>

                <div className="panel">
                    <strong>Result</strong>
                    <div className="panel-body">
                        {loading && <div className="muted">Running...</div>}
                        {!loading && mode === 'single' && result && <ResultTable result={result} />}
                        {!loading && mode === 'compare' && compareResults && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Algorithm</th>
                                        <th>Total Head Movement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(compareResults).map(([alg, res]) => (
                                        <tr key={alg}>
                                            <td>{alg.toUpperCase()}</td>
                                            <td>{res.total_head_movement ?? (res.error ? 'error' : '')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {!loading && !result && !compareResults && <div className="muted">No result yet.</div>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Simulator;
