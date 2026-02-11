const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export const runSimulation = async (data) => {
    const res = await fetch(`${API_BASE}/api/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`API error ${res.status}`)
    return res.json()
}

export const runComparison = async (data) => {
    const res = await fetch(`${API_BASE}/api/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`API error ${res.status}`)
    return res.json()
}
