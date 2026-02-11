import React from 'react';

const CompareInputPanel = ({
    requests,
    setRequests,
    startHead,
    setStartHead,
    diskSize,
    setDiskSize,
    selectedAlgorithms,
    setSelectedAlgorithms,
    onRun,
    loading,
}) => {
    const availableAlgorithms = [
        { id: 'fcfs', label: 'FCFS' },
        { id: 'sstf', label: 'SSTF' },
        { id: 'scan', label: 'SCAN' },
        { id: 'cscan', label: 'C-SCAN' },
        { id: 'look', label: 'LOOK' },
        { id: 'clook', label: 'C-LOOK' },
    ];

    const toggleAlgorithm = (algId) => {
        setSelectedAlgorithms((prev) =>
            prev.includes(algId)
                ? prev.filter((id) => id !== algId)
                : [...prev, algId]
        );
    };

    return (
        <div id="compare-input-panel">
            <div className="panel-block">
                <label>Requests (comma separated)</label>
                <textarea
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                />
            </div>

            <div className="input-row panel-body">
                <div className="field">
                    <label>Start Head</label>
                    <input
                        type="text"
                        value={startHead}
                        onChange={(e) => setStartHead(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Disk Size</label>
                    <input
                        type="text"
                        value={diskSize}
                        onChange={(e) => setDiskSize(e.target.value)}
                    />
                </div>
            </div>

            <div className="panel-body">
                <label>Select Algorithms to Compare</label>
                <div className="algorithm-pills">
                    {availableAlgorithms.map((alg) => (
                        <button
                            key={alg.id}
                            className={`pill ${
                                selectedAlgorithms.includes(alg.id) ? 'active' : ''
                            }`}
                            onClick={() => toggleAlgorithm(alg.id)}
                        >
                            {alg.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="run-slot panel-body">
                <button
                    className="btn"
                    onClick={onRun}
                    disabled={loading || selectedAlgorithms.length === 0}
                >
                    Compare
                </button>
            </div>
        </div>
    );
};

export default CompareInputPanel;
