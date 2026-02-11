def run(requests: list[int], start_head: int, disk_size: int):
    """
    Shortest Seek Time First (SSTF) disk scheduling algorithm.
    :param requests: List of disk requests
    :param start_head: Initial position of the disk head
    :param disk_size: Maximum cylinder number
    :return: Dictionary with sequence and total head movement
    """
    remaining = requests.copy()
    sequence = [start_head]
    current = start_head
    total = 0
    while remaining:
        # find the request with minimum distance to current
        closest = min(remaining, key=lambda x: abs(x - current))
        total += abs(closest - current)
        sequence.append(closest)
        current = closest
        remaining.remove(closest)
    return {"sequence": sequence, "total_head_movement": total}
