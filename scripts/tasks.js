const tasks = [
    { id: 1, title: '绿色出行', description: '今日选择步行、骑行或公共交通出行', points: 10, icon: '🚶' },
    { id: 2, title: '节约用电', description: '离开房间时随手关灯，使用节能电器', points: 8, icon: '💡' },
    { id: 3, title: '节约用水', description: '洗菜水浇花，缩短洗澡时间', points: 8, icon: '💧' },
    { id: 4, title: '垃圾分类', description: '正确分类投放垃圾', points: 10, icon: '♻️' },
    { id: 5, title: '自带水杯', description: '出门携带水杯，不使用一次性杯子', points: 5, icon: '🥤' },
    { id: 6, title: '环保知识', description: '阅读一篇环保知识文章', points: 15, icon: '📚' }
];

const achievements = [
    { id: 1, title: '环保新手', description: '完成第一次任务', icon: '🌱' },
    { id: 2, title: '坚持不懈', description: '连续打卡7天', icon: '🔥' },
    { id: 3, title: '绿色达人', description: '累计获得100积分', icon: '🌟' },
    { id: 4, title: '节水先锋', description: '完成节水任务30次', icon: '💧' },
    { id: 5, title: '低碳使者', description: '完成绿色出行20次', icon: '🚲' },
    { id: 6, title: '环保卫士', description: '完成所有任务类型', icon: '🛡️' }
];

document.addEventListener('DOMContentLoaded', () => {
    initStyles();
    loadTasks();
    loadStats();
    loadAchievements();
    renderCalendar();
});

function initStyles() {
    const styleId = 'tasks-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .stats-grid-vertical {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
        }
        
        .stats-card {
            padding: 40px 48px;
        }
        
        .stats-row {
            display: flex;
            justify-content: space-around;
            gap: 2rem;
        }
        
        .stat-box {
            text-align: center;
            flex: 1;
            padding: 1.5rem;
            background: var(--bg);
            border-radius: 16px;
        }
        
        .stat-box .stat-number {
            font-size: 3rem;
            font-weight: 300;
            letter-spacing: -0.02em;
            line-height: 1;
            margin-bottom: 0.75rem;
        }
        
        .stat-box .stat-label {
            font-size: 14px;
            color: var(--text-light);
            letter-spacing: 0.05em;
        }
        
        .achievements-card {
            padding: 40px 48px;
        }
        
        #achievements-display {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
        }
        
        .achievement-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: 12px;
            background-color: var(--bg);
            transition: all 0.3s ease;
        }
        
        .achievement-item.unlocked {
            background-color: rgba(74, 93, 82, 0.08);
        }
        
        .achievement-item .icon {
            font-size: 1.5rem;
            opacity: 0.3;
        }
        
        .achievement-item.unlocked .icon {
            opacity: 1;
        }
        
        .achievement-item .info {
            flex: 1;
        }
        
        .achievement-item .title {
            font-weight: 500;
            font-size: 14px;
            color: var(--text-dark);
            opacity: 0.5;
        }
        
        .achievement-item.unlocked .title {
            opacity: 1;
        }
        
        .achievement-item .desc {
            font-size: 12px;
            color: var(--text-light);
            margin-top: 2px;
        }
        
        .achievement-item .status {
            font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
            .stats-row {
                flex-direction: column;
                gap: 1rem;
            }
            
            #achievements-display {
                grid-template-columns: 1fr;
            }
            
            .stats-card,
            .achievements-card {
                padding: 28px;
            }
        }
    `;
    document.head.appendChild(style);
}

function loadTasks() {
    const container = document.getElementById('tasks-container');
    const todayTasks = getFromLocalStorage('today_tasks', []);
    const completedTasks = getFromLocalStorage('completed_tasks', {});
    
    container.innerHTML = tasks.map(task => {
        const isCompleted = todayTasks.includes(task.id);
        const totalCompleted = completedTasks[task.id] || 0;
        
        return `
            <div class="card task-card" data-id="${task.id}">
                <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1rem;">
                    <span style="font-size: 2.5rem;">${task.icon}</span>
                    <div style="flex: 1;">
                        <h3 style="font-size: 20px; margin-bottom: 4px;">${task.title}</h3>
                        <p style="font-size: 14px; color: var(--text-light);">${task.description}</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 15px; color: var(--text-light);">
                        <i class="fas fa-star" style="color: #c4a030;"></i> 
                        <span style="font-weight: 600; color: var(--text-dark);">${task.points}</span> 积分
                    </span>
                    <span style="font-size: 13px; color: var(--text-light);">
                        已完成 ${totalCompleted} 次
                    </span>
                </div>
                <button 
                    class="btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}" 
                    style="width: 100%; margin-top: 1.25rem;"
                    ${isCompleted ? 'disabled' : ''}
                >
                    ${isCompleted ? '✓ 已完成' : '完成任务'}
                </button>
            </div>
        `;
    }).join('');
    
    document.querySelectorAll('.task-card button').forEach(btn => {
        btn.addEventListener('click', completeTask);
    });
}

function completeTask(e) {
    const card = e.target.closest('.task-card');
    const taskId = parseInt(card.dataset.id);
    const task = tasks.find(t => t.id === taskId);
    
    const todayTasks = getFromLocalStorage('today_tasks', []);
    if (todayTasks.includes(taskId)) return;
    
    todayTasks.push(taskId);
    saveToLocalStorage('today_tasks', todayTasks);
    
    const completedTasks = getFromLocalStorage('completed_tasks', {});
    completedTasks[taskId] = (completedTasks[taskId] || 0) + 1;
    saveToLocalStorage('completed_tasks', completedTasks);
    
    const points = getFromLocalStorage('points', 0);
    saveToLocalStorage('points', points + task.points);
    
    updateStreak();
    loadTasks();
    loadStats();
    loadAchievements();
    renderCalendar();
    
    showNotification('任务完成', `+${task.points} 积分！继续加油！`);
}

function updateStreak() {
    const lastDate = getFromLocalStorage('last_checkin_date', '');
    const today = getTodayString();
    
    if (!lastDate) {
        saveToLocalStorage('streak', 1);
        saveToLocalStorage('last_checkin_date', today);
        return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastDate === yesterdayStr) {
        const streak = getFromLocalStorage('streak', 1);
        saveToLocalStorage('streak', streak + 1);
    } else if (lastDate !== today) {
        saveToLocalStorage('streak', 1);
    }
    
    saveToLocalStorage('last_checkin_date', today);
}

function loadStats() {
    const totalPoints = getFromLocalStorage('points', 0);
    const todayTasks = getFromLocalStorage('today_tasks', []);
    const streak = getFromLocalStorage('streak', 0);
    
    const todayPoints = todayTasks.reduce((sum, id) => {
        const task = tasks.find(t => t.id === id);
        return sum + (task ? task.points : 0);
    }, 0);
    
    document.getElementById('total-points').textContent = totalPoints;
    document.getElementById('today-points').textContent = todayPoints;
    document.getElementById('streak').textContent = streak;
}

function loadAchievements() {
    const container = document.getElementById('achievements-display');
    const totalPoints = getFromLocalStorage('points', 0);
    const streak = getFromLocalStorage('streak', 0);
    const completedTasks = getFromLocalStorage('completed_tasks', {});
    const todayTasks = getFromLocalStorage('today_tasks', []);
    
    const updatedAchievements = achievements.map(achievement => {
        let unlocked = false;
        
        switch(achievement.id) {
            case 1:
                unlocked = Object.keys(completedTasks).length > 0 || todayTasks.length > 0;
                break;
            case 2:
                unlocked = streak >= 7;
                break;
            case 3:
                unlocked = totalPoints >= 100;
                break;
            case 4:
                unlocked = (completedTasks[3] || 0) >= 30;
                break;
            case 5:
                unlocked = (completedTasks[1] || 0) >= 20;
                break;
            case 6:
                unlocked = tasks.every(t => (completedTasks[t.id] || 0) > 0);
                break;
        }
        
        return { ...achievement, unlocked };
    });
    
    container.innerHTML = updatedAchievements.map(achievement => `
        <div class="achievement-item ${achievement.unlocked ? 'unlocked' : ''}">
            <span class="icon">${achievement.icon}</span>
            <div class="info">
                <div class="title">${achievement.title}</div>
                <div class="desc">${achievement.description}</div>
            </div>
            <span class="status">${achievement.unlocked ? '✓' : '🔒'}</span>
        </div>
    `).join('');
}

function renderCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    const checkins = getFromLocalStorage('checkin_dates', []);
    
    let html = `
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px;">
            <div style="text-align: center; font-weight: 500; padding: 0.75rem; background-color: var(--cream); border-radius: 8px; font-size: 13px;">日</div>
            <div style="text-align: center; font-weight: 500; padding: 0.75rem; background-color: var(--cream); border-radius: 8px; font-size: 13px;">一</div>
            <div style="text-align: center; font-weight: 500; padding: 0.75rem; background-color: var(--cream); border-radius: 8px; font-size: 13px;">二</div>
            <div style="text-align: center; font-weight: 500; padding: 0.75rem; background-color: var(--cream); border-radius: 8px; font-size: 13px;">三</div>
            <div style="text-align: center; font-weight: 500; padding: 0.75rem; background-color: var(--cream); border-radius: 8px; font-size: 13px;">四</div>
            <div style="text-align: center; font-weight: 500; padding: 0.75rem; background-color: var(--cream); border-radius: 8px; font-size: 13px;">五</div>
            <div style="text-align: center; font-weight: 500; padding: 0.75rem; background-color: var(--cream); border-radius: 8px; font-size: 13px;">六</div>
    `;
    
    for (let i = 0; i < startDay; i++) {
        html += '<div style="min-height: 48px;"></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isChecked = checkins.includes(dateStr);
        const isToday = dateStr === getTodayString();
        
        html += `
            <div style="min-height: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 8px; background-color: ${isChecked ? 'rgba(74, 93, 82, 0.1)' : 'var(--bg)'}; ${isToday ? 'border: 2px solid var(--primary);' : ''}">
                ${isChecked ? '<span style="font-size: 12px;">🌱</span>' : ''}
                <span style="font-size: 14px; font-weight: ${isToday ? '600' : '400'}; color: ${isToday ? 'var(--primary)' : 'var(--text-dark)'};">${day}</span>
            </div>
        `;
    }
    
    html += '</div>';
    document.getElementById('calendar-container').innerHTML = html;
    
    const todayTasks = getFromLocalStorage('today_tasks', []);
    if (todayTasks.length > 0 && !checkins.includes(getTodayString())) {
        checkins.push(getTodayString());
        saveToLocalStorage('checkin_dates', checkins);
    }
}