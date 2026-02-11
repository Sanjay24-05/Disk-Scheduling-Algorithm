def run_single(
    algorithm: str,
    requests: list[int],
    start_head: int,
    disk_size: int,
    direction: str = "right",
):
    """
    Executes a single disk scheduling algorithm.
    :param algorithm: Name of the algorithm to run
    :param requests: List of disk requests
    :param start_head: Initial head position
    :param disk_size: Total disk size
    """
    alg = algorithm.lower()
    if alg == 'fcfs':
        from app.algorithms.fcfs import run as _run
        return _run(requests, start_head, disk_size)
    if alg == 'sstf':
        from app.algorithms.sstf import run as _run
        return _run(requests, start_head, disk_size)
    if alg == 'scan':
        from app.algorithms.scan import run as _run
        return _run(requests, start_head, disk_size, direction=direction)
    if alg == 'cscan':
        from app.algorithms.cscan import run as _run
        return _run(requests, start_head, disk_size, direction=direction)
    if alg == 'look':
        from app.algorithms.look import run as _run
        return _run(requests, start_head, disk_size, direction=direction)
    if alg == 'clook':
        from app.algorithms.clook import run as _run
        return _run(requests, start_head, disk_size, direction=direction)

    raise ValueError(f"Unknown algorithm: {algorithm}")

def run_compare(algorithms: list[str], requests: list[int], start_head: int, disk_size: int):
    """
    Executes and compares multiple disk scheduling algorithms.
    :param algorithms: List of algorithm names
    :param requests: List of disk requests
    :param start_head: Initial head position
    :param disk_size: Total disk size
    """
    results = {}
    for a in algorithms:
        try:
            results[a] = run_single(a, requests, start_head, disk_size, direction='right')
        except Exception as e:
            results[a] = {"error": str(e)}
    return results
