def run(requests: list[int], start_head: int, disk_size: int, direction: str = "right"):
    """
    Circular SCAN (C-SCAN) disk scheduling algorithm.
    :param requests: List of disk requests
    :param start_head: Initial position of the disk head
    :param disk_size: Maximum cylinder number
    :return: Dictionary with sequence and total head movement
    """
    # C-SCAN: service requests in one direction, then jump to start and continue
    right = sorted([r for r in requests if r >= start_head])
    left = sorted([r for r in requests if r < start_head])

    sequence = [start_head]
    total = 0

    normalized = "right" if direction in {"right", "up"} else "left"

    if normalized == "right":
        # service right ascending
        for r in right:
            total += abs(r - sequence[-1])
            sequence.append(r)

        # go to end
        if sequence[-1] != disk_size - 1:
            total += abs((disk_size - 1) - sequence[-1])
            sequence.append(disk_size - 1)

        # jump to start (count movement from end to start)
        total += disk_size - 1  # from end to 0
        sequence.append(0)

        # service left ascending
        for r in left:
            total += abs(r - sequence[-1])
            sequence.append(r)
    else:
        # service left descending
        for r in reversed(left):
            total += abs(r - sequence[-1])
            sequence.append(r)

        # go to start
        if sequence[-1] != 0:
            total += abs(sequence[-1] - 0)
            sequence.append(0)

        # jump to end (count movement from start to end)
        total += disk_size - 1  # from 0 to end
        sequence.append(disk_size - 1)

        # service right descending
        for r in reversed(right):
            total += abs(r - sequence[-1])
            sequence.append(r)

    return {"sequence": sequence, "total_head_movement": total}
