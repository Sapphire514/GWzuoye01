const carbonFactors = {
    transport: {
        'car': 0.23,
        'electric-car': 0.05,
        'bus': 0.08,
        'subway': 0.03,
        'bike': 0
    },
    electricity: 0.96,
    water: 0.15,
    diet: {
        'vegetarian': 1.5,
        'flexitarian': 2.5,
        'omnivore': 4
    }
};

const suggestions = {
    low: ['您的碳足迹非常低，继续保持！', '考虑加入我们的环保活动', '分享您的环保经验'],
    medium: ['减少私家车出行，选择公共交通', '节约用电，使用节能电器', '尝试减少肉类消费'],
    high: ['立即采取行动减少碳排放', '考虑购买新能源汽车', '制定个人减碳计划', '加入社区环保组织']
};

function getCarbonLevel(total) {
    if (total < 5) return { level: 'low', label: '优秀', color: '#4A5D52' };
    if (total < 10) return { level: 'medium', label: '中等', color: '#c4a030' };
    return { level: 'high', label: '偏高', color: '#c45c5c' };
}

function calculateCarbon(formData) {
    const transport = parseFloat(formData.distance) * (carbonFactors.transport[formData.transport] || 0) * 22;
    const electricity = parseFloat(formData.electricity) * carbonFactors.electricity;
    const water = parseFloat(formData.water) * carbonFactors.water;
    const diet = carbonFactors.diet[formData.diet] * 30;
    
    return {
        transport: transport.toFixed(2),
        electricity: electricity.toFixed(2),
        water: water.toFixed(2),
        diet: diet.toFixed(2),
        total: (transport + electricity + water + diet).toFixed(2)
    };
}

function validateForm(form) {
    let isValid = true;
    clearErrors();
    
    const transport = form.transport.value;
    const distance = form.distance.value;
    const electricity = form.electricity.value;
    const water = form.water.value;
    const diet = form.diet.value;
    
    if (!transport) {
        showError('transport-error', '请选择交通工具');
        isValid = false;
    }
    
    if (!distance || isNaN(distance) || parseFloat(distance) < 0) {
        showError('distance-error', '请输入有效的通勤距离');
        isValid = false;
    }
    
    if (!electricity || isNaN(electricity) || parseFloat(electricity) < 0) {
        showError('electricity-error', '请输入有效的用电量');
        isValid = false;
    }
    
    if (!water || isNaN(water) || parseFloat(water) < 0) {
        showError('water-error', '请输入有效的用水量');
        isValid = false;
    }
    
    if (!diet) {
        showError('diet-error', '请选择饮食习惯');
        isValid = false;
    }
    
    return isValid;
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function displayResult(result) {
    const level = getCarbonLevel(parseFloat(result.total));
    
    document.getElementById('empty-state').style.display = 'none';
    document.getElementById('result-card').style.display = 'block';
    
    const progress = Math.min(parseFloat(result.total) / 15 * 100, 100);
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-fill').style.backgroundColor = level.color;
    
    document.getElementById('result-content').innerHTML = `
        <div class="result-total">
            <span class="number" style="color: ${level.color};">${result.total}</span>
            <span class="unit">吨/月</span>
            <span class="badge" style="background-color: ${level.color}15; color: ${level.color}; margin-left: auto;">${level.label}</span>
        </div>
        <div class="result-breakdown">
            <div>🚗 <span>交通</span><span class="value">${result.transport} kg</span></div>
            <div>💡 <span>用电</span><span class="value">${result.electricity} kg</span></div>
            <div>💧 <span>用水</span><span class="value">${result.water} kg</span></div>
            <div>🍽️ <span>饮食</span><span class="value">${result.diet} kg</span></div>
        </div>
    `;
    
    const suggestionList = document.getElementById('suggestion-list');
    suggestionList.innerHTML = suggestions[level.level].map(s => `<li>• ${s}</li>`).join('');
}

function loadHistory() {
    const history = getFromLocalStorage('carbon_history', []);
    const list = document.getElementById('history-list');
    
    if (history.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1 / -1;">暂无记录</p>';
        return;
    }
    
    list.innerHTML = history.map(record => {
        const level = getCarbonLevel(parseFloat(record.total));
        const transportNames = {
            'car': '私家车', 'electric-car': '电动车', 
            'bus': '公交车', 'subway': '地铁', 'bike': '自行车/步行'
        };
        return `
            <div class="card" style="cursor: default; padding: 28px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 14px; color: var(--text-light);">📅 ${new Date(record.date).toLocaleDateString('zh-CN')}</span>
                    <span style="font-weight: 500; color: ${level.color}; font-size: 18px;">${record.total} 吨</span>
                </div>
                <div style="font-size: 13px; color: var(--text-light);">
                    <div>🚗 ${transportNames[record.data.transport] || record.data.transport} · ${record.data.distance}km</div>
                    <div style="margin-top: 4px;">💡 ${record.data.electricity}度 · 💧 ${record.data.water}吨</div>
                </div>
            </div>
        `;
    }).join('');
}

function saveRecord() {
    const resultContent = document.getElementById('result-content');
    if (!resultContent.innerHTML) return;
    
    const record = {
        id: generateId(),
        date: new Date().toISOString(),
        data: {
            transport: document.querySelector('#carbon-form [name="transport"]').value,
            distance: document.querySelector('#carbon-form [name="distance"]').value,
            electricity: document.querySelector('#carbon-form [name="electricity"]').value,
            water: document.querySelector('#carbon-form [name="water"]').value,
            diet: document.querySelector('#carbon-form [name="diet"]').value
        },
        total: document.querySelector('.result-total .number').textContent
    };
    
    const history = getFromLocalStorage('carbon_history', []);
    history.unshift(record);
    saveToLocalStorage('carbon_history', history.slice(0, 10));
    
    showNotification('保存成功', '碳足迹记录已保存');
    loadHistory();
}

document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    
    document.getElementById('carbon-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm(e.target)) return;
        
        const formData = {
            transport: e.target.transport.value,
            distance: e.target.distance.value,
            electricity: e.target.electricity.value,
            water: e.target.water.value,
            diet: e.target.diet.value
        };
        
        const result = calculateCarbon(formData);
        displayResult(result);
    });
    
    document.getElementById('save-btn').addEventListener('click', saveRecord);
});