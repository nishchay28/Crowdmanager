import copy
import random
from queue_model import process_time_step, get_all_wait_times

def simulate_future(queues, seconds=600):
    temp_queues = copy.deepcopy(queues)
    timeline = []

    for t in range(seconds):
        # simulate random arrivals every ~10 sec
        if t % 10 == 0:
            counter = random.choice(list(temp_queues.keys()))
            temp_queues[counter].append(random.randint(20, 40))

        process_time_step(temp_queues)

        if t % 30 == 0:  # record every 30 sec
            timeline.append({
                "time": t,
                "wait_times": get_all_wait_times(temp_queues)
            })

    return timeline