from app.core import simulator


def test_fcfs_basic():
    requests = [10, 20, 30]
    start = 5
    disk = 100
    res = simulator.run_single('fcfs', requests, start, disk)
    assert res['sequence'] == [5, 10, 20, 30]
    assert res['total_head_movement'] == 25


def test_sstf_basic():
    requests = [10, 22, 14]
    start = 12
    disk = 100
    res = simulator.run_single('sstf', requests, start, disk)
    # closest to 12 is 10 (2), then 14 (4), then 22 (8)
    assert res['sequence'][0] == start
    assert res['sequence'][1:] == [10, 14, 22]
    assert res['total_head_movement'] == abs(12-10) + abs(10-14) + abs(14-22)


