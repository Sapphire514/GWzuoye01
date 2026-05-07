document.addEventListener('DOMContentLoaded', () => {
    initStats();
});

function initStats() {
    const stats = {
        users: 12856,
        trees: 38960,
        co2: 1680,
        events: 328
    };

    Object.entries(stats).forEach(([key, target]) => {
        const element = document.getElementById(`stat-${key}`);
        if (element) {
            animateNumber(element, 0, target, 2500);
        }
    });
}

document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const links = {
            0: 'views/calculator.html',
            1: 'views/activities.html',
            2: 'views/tasks.html',
            3: 'views/knowledge.html'
        };
        const index = Array.from(document.querySelectorAll('.feature-card')).indexOf(card);
        if (links[index]) {
            navigateTo(links[index]);
        }
    });
});