def run(requests: list[int], start_head: int, disk_size: int, direction: str = "up"):
    """
    LOOK disk scheduling algorithm.
    :param requests: List of disk requests
    :param start_head: Initial position of the disk head
    :param disk_size: Maximum cylinder number
    :param direction: Direction of head movement ("up" or "down")
    :return: Dictionary with sequence and total head movement
    """
    left = sorted([r for r in requests if r < start_head])
    right = sorted([r for r in requests if r >= start_head])

    sequence = [start_head]
    total = 0

    if direction == "up":
        for r in right:
            total += abs(r - sequence[-1])
            sequence.append(r)
        for r in reversed(left):
            total += abs(r - sequence[-1])
            sequence.append(r)
    else:
        for r in reversed(left):
            total += abs(r - sequence[-1])
            sequence.append(r)
        for r in right:
            total += abs(r - sequence[-1])
            sequence.append(r)

    return {"sequence": sequence, "total_head_movement": total}
