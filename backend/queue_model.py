def get_wait_time(queue):
    return sum(queue)

def get_all_wait_times(queues):
    return {k: get_wait_time(v) for k, v in queues.items()}

def add_person(queue, service_time):
    queue.append(service_time)

def process_time_step(queues):
    # simulate 1 second passing
    for q in queues.values():
        if q:
            q[0] -= 1
            if q[0] <= 0:
                q.pop(0)