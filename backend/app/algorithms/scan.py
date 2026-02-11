def run(requests: list[int], start_head: int, disk_size: int, direction: str = "right"):
    """
    SCAN (Elevator) disk scheduling algorithm.
    :param requests: List of disk requests
    :param start_head: Initial position of the disk head
    :param disk_size: Maximum cylinder number
    :param direction: Direction of head movement ("right" or "left")
    :return: Dictionary with sequence and total head movement
    """
    # Separate requests into those above and below the start
    left = sorted([r for r in requests if r < start_head])
    right = sorted([r for r in requests if r >= start_head])

    sequence = [start_head]
    total = 0

    normalized = "right" if direction in {"right", "up"} else "left"

    if normalized == "right":
        # service right side ascending
        for r in right:
            total += abs(r - sequence[-1])
            sequence.append(r)
        # go to the end of the disk
        if sequence[-1] != disk_size - 1:
            total += abs((disk_size - 1) - sequence[-1])
            sequence.append(disk_size - 1)
        # service left side descending
        for r in reversed(left):
            total += abs(r - sequence[-1])
            sequence.append(r)
    else:
        # service left side descending
        for r in reversed(left):
            total += abs(r - sequence[-1])
            sequence.append(r)
        # go to start of disk
        if sequence[-1] != 0:
            total += abs(sequence[-1] - 0)
            sequence.append(0)
        for r in right:
            total += abs(r - sequence[-1])
            sequence.append(r)

    return {"sequence": sequence, "total_head_movement": total}
