import React from 'react';

const InputPanel = ({
    requests,
    setRequests,
    startHead,
    setStartHead,
    diskSize,
    setDiskSize,
    direction,
    setDirection,
    showDirection,
    onRun,
    loading,
}) => {
    return (
        <div id="input-panel" style={{flex:1}}>
            <div className="panel-block">
                <label>Requests (comma separated)</label>
                <textarea value={requests} onChange={e => setRequests(e.target.value)} />
            </div>

            <div className="input-row panel-body">
                <div className="field">
                    <label>Start Head</label>
                    <input type="text" value={startHead} onChange={e => setStartHead(e.target.value)} />
                </div>
                <div className="field">
                    <label>Disk Size</label>
                    <input type="text" value={diskSize} onChange={e => setDiskSize(e.target.value)} />
                </div>
                {showDirection ? (
                    <div className="direction-slot field">
                        <label>Direction</label>
                        <select value={direction} onChange={e => setDirection(e.target.value)}>
                            <option value="right">Right</option>
                            <option value="left">Left</option>
                        </select>
                    </div>
                ) : (
                    <div className="direction-slot field hidden" aria-hidden="true" />
                )}
                <div className="run-slot">
                    <button className="btn" onClick={onRun} disabled={loading}>Run</button>
                </div>
            </div>
        </div>
    );
};

export default InputPanel;
