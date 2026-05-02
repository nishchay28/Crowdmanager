import random

def generate_service_times(n):
    return [random.randint(20, 40) for _ in range(n)]

queues = {
    "counter_1": generate_service_times(5),
    "counter_2": generate_service_times(3),
    "counter_3": generate_service_times(7)
}