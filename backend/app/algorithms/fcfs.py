def run(requests: list[int], start_head: int, disk_size: int):
    """
    First-Come, First-Served (FCFS) disk scheduling algorithm.
    :param requests: List of disk requests
    :param start_head: Initial position of the disk head
    :param disk_size: Maximum cylinder number
    :return: Dictionary with sequence and total head movement
    """
    sequence = [start_head] + requests.copy()
    total = 0
    for i in range(1, len(sequence)):
        total += abs(sequence[i] - sequence[i - 1])
    return {"sequence": sequence, "total_head_movement": total}
