<template lang="pug">
div(class="countdown")
    span(class="progress-value") {{ timeLeft }}
    progress.progress.is-primary(:value="percentage" max="100")
</template>
    
<script>
import { ref } from 'vue';

export default {
    emits: ['timeIsUp'],
    setup(_, { emit }) {
        const startTime = Date.now();
        const endTime = Date.now() + 0.30 * 60 * 1000;
        const percentage = ref(0);
        const timeLeft = ref('0:30');
        let intervalId;

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const total = endTime - startTime;
            percentage.value = Math.floor((elapsed / total) * 100);
            if (percentage.value == 100) {
                clearInterval(intervalId);
                percentage.value = 100;
            }
        };

        const updateTimeLeft = () => {
            const remaining = endTime - Date.now();
            if (remaining <= 0) {
                clearInterval(intervalId);
                timeLeft.value = '0:00';
                emit('timeIsUp');
            } else {
                const minutes = Math.floor(remaining / (60 * 1000));
                const seconds = Math.floor((remaining - minutes * 60 * 1000) / 1000);
                timeLeft.value = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        };

        intervalId = setInterval(() => {
            updateProgress();
            updateTimeLeft();
        }, 1000);

        return {
            percentage,
            timeLeft,
        };
    },
};
</script>
    
<style lang="scss" scoped>
.progress-bar {
    display: flex;
}

.progress-value{
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.countdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
}
</style>
    