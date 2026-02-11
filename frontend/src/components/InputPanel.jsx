import React from 'react';

const InputPanel = ({ requests, setRequests, startHead, setStartHead, diskSize, setDiskSize, direction, setDirection, onRun, loading }) => {
    return (
        <div id="input-panel" style={{flex:1}}>
            <div style={{marginBottom:8}}>
                <label>Requests (comma separated)</label>
                <textarea value={requests} onChange={e => setRequests(e.target.value)} />
            </div>

            <div className="row" style={{marginTop:8}}>
                <div>
                    <label>Start Head</label>
                    <input type="text" value={startHead} onChange={e => setStartHead(e.target.value)} />
                </div>
                <div>
                    <label>Disk Size</label>
                    <input type="text" value={diskSize} onChange={e => setDiskSize(e.target.value)} />
                </div>
                <div>
                    <label>Direction</label>
                    <select value={direction} onChange={e => setDirection(e.target.value)}>
                        <option value="up">Up</option>
                        <option value="down">Down</option>
                    </select>
                </div>
                <div style={{marginLeft:12}}>
                    <button className="btn" onClick={onRun} disabled={loading}>Run</button>
                </div>
            </div>
        </div>
    );
};

export default InputPanel;
