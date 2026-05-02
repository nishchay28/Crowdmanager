def get_best_time(predictions):
    best = None
    min_wait = float('inf')

    for point in predictions:
        total_wait = sum(point["wait_times"].values())
        if total_wait < min_wait:
            min_wait = total_wait
            best = point["time"]

    return best, min_wait