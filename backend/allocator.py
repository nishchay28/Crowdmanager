from queue_model import get_wait_time

def assign_counter(queues):
    return min(queues, key=lambda c: get_wait_time(queues[c]))