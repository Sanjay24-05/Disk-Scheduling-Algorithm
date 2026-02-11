def run(requests: list[int], start_head: int, disk_size: int, direction: str = "right"):
    """
    Circular LOOK (C-LOOK) disk scheduling algorithm.
    :param requests: List of disk requests
    :param start_head: Initial position of the disk head
    :param disk_size: Maximum cylinder number
    :return: Dictionary with sequence and total head movement
    """
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

        # jump to smallest left request (wrap)
        if left:
            # count jump from last to first left
            total += abs(sequence[-1] - left[0])
            sequence.append(left[0])
            for r in left[1:]:
                total += abs(r - sequence[-1])
                sequence.append(r)
    else:
        # service left descending
        for r in reversed(left):
            total += abs(r - sequence[-1])
            sequence.append(r)

        # jump to largest right request (wrap)
        if right:
            total += abs(sequence[-1] - right[-1])
            sequence.append(right[-1])
            for r in reversed(right[:-1]):
                total += abs(r - sequence[-1])
                sequence.append(r)

    return {"sequence": sequence, "total_head_movement": total}
