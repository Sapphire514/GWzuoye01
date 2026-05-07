document.addEventListener('DOMContentLoaded', () => {
    initStyles();
    initCharts();
    loadArticles();
    loadQuiz();
});

function initStyles() {
    const styleId = 'knowledge-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .category-btn {
            padding: 0.5rem 1.5rem;
            border: 2px solid var(--primary);
            background-color: white;
            color: var(--primary);
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
        }
        
        .category-btn:hover, .category-btn.active {
            background-color: var(--primary);
            color: white;
        }
    `;
    document.head.appendChild(style);
}

function initCharts() {
    const carbonChart = echarts.init(document.getElementById('carbon-chart'));
    const wasteChart = echarts.init(document.getElementById('waste-chart'));

    const carbonOption = {
        title: {
            text: '月度碳排放趋势',
            left: 'center',
            textStyle: { fontSize: 14 }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
            type: 'value',
            name: '吨CO₂'
        },
        series: [{
            name: '碳排放量',
            type: 'bar',
            data: [120, 95, 88, 75, 82, 68],
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#22c55e' },
                    { offset: 1, color: '#0ea5e9' }
                ])
            },
            barWidth: '50%'
        }]
    };

    const wasteOption = {
        title: {
            text: '垃圾分类占比',
            left: 'center',
            textStyle: { fontSize: 14 }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [{
            name: '垃圾分类',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 35, name: '可回收物', itemStyle: { color: '#22c55e' } },
                { value: 25, name: '有害垃圾', itemStyle: { color: '#ef4444' } },
                { value: 20, name: '厨余垃圾', itemStyle: { color: '#eab308' } },
                { value: 20, name: '其他垃圾', itemStyle: { color: '#64748b' } }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    carbonChart.setOption(carbonOption);
    wasteChart.setOption(wasteOption);

    window.addEventListener('resize', () => {
        carbonChart.resize();
        wasteChart.resize();
    });
}

const articles = [
    {
        id: 1,
        title: '如何正确进行垃圾分类',
        description: '垃圾分类是保护环境的重要举措。本文详细介绍了各类垃圾的分类标准和投放方法，帮助您轻松掌握垃圾分类技巧。',
        category: 'tips',
        icon: '♻️',
        views: 1256
    },
    {
        id: 2,
        title: '全球气候变化最新报告',
        description: '联合国气候变化大会发布最新报告，指出全球气温上升趋势明显，呼吁各国加强减排措施。',
        category: 'news',
        icon: '🌍',
        views: 2341
    },
    {
        id: 3,
        title: '新能源汽车的环保优势',
        description: '新能源汽车以电能为动力，零排放无污染，是未来交通发展的趋势。了解其环保优势，为地球减负。',
        category: 'science',
        icon: '🚗',
        views: 876
    },
    {
        id: 4,
        title: '日常生活中的节能小技巧',
        description: '从日常生活小事做起，节约用电、用水、用气，积少成多，为环保事业贡献力量。',
        category: 'tips',
        icon: '💡',
        views: 1567
    },
    {
        id: 5,
        title: '我国环保政策新动向',
        description: '国家出台新的环保政策，加大对污染企业的整治力度，推动绿色发展理念深入人心。',
        category: 'news',
        icon: '📰',
        views: 1890
    },
    {
        id: 6,
        title: '塑料污染的危害与治理',
        description: '塑料污染已成为全球性环境问题。本文介绍塑料污染的危害及治理措施，呼吁减少塑料使用。',
        category: 'science',
        icon: '🛡️',
        views: 1432
    }
];

function loadArticles(category = 'all') {
    const container = document.getElementById('articles-container');
    const filtered = category === 'all' ? articles : articles.filter(a => a.category === category);
    
    container.innerHTML = filtered.map(article => `
        <div class="card article-card" data-id="${article.id}">
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span style="font-size: 2rem;">${article.icon}</span>
                <div style="flex: 1;">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                        <span class="badge badge-info">${getCategoryName(article.category)}</span>
                        <span style="font-size: 0.8rem; color: #64748b;">
                            <i class="fas fa-eye"></i> ${article.views} 阅读
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    switch(category) {
        case 'tips': return '实用技巧';
        case 'news': return '环保新闻';
        case 'science': return '科普知识';
        default: return '全部';
    }
}

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadArticles(btn.dataset.category);
    });
});

const quizQuestions = [
    {
        question: '以下哪种垃圾属于可回收物？',
        options: ['电池', '塑料瓶', '菜叶', '烟头'],
        answer: 1
    },
    {
        question: '世界环境日是每年的哪一天？',
        options: ['3月12日', '4月22日', '6月5日', '12月25日'],
        answer: 2
    },
    {
        question: '下列哪种出行方式碳排放最低？',
        options: ['私家车', '公交车', '地铁', '自行车'],
        answer: 3
    },
    {
        question: '垃圾分类的目的是什么？',
        options: ['方便运输', '资源回收利用', '减少占地面积', '以上都是'],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const container = document.getElementById('quiz-container');
    const result = document.getElementById('quiz-result');
    
    result.innerHTML = '';
    
    if (currentQuestion >= quizQuestions.length) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h3>测试完成！</h3>
                <p style="margin: 1rem 0;">您的得分：${score}/${quizQuestions.length}</p>
                <p style="color: #64748b;">${getScoreMessage(score)}</p>
                <button class="btn btn-primary" id="reset-quiz-btn" style="margin-top: 1rem;">重新测试</button>
            </div>
        `;
        document.getElementById('reset-quiz-btn').addEventListener('click', resetQuiz);
        return;
    }
    
    const question = quizQuestions[currentQuestion];
    container.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                <span class="badge badge-success">第 ${currentQuestion + 1}/${quizQuestions.length} 题</span>
                <span class="badge badge-info">得分: ${score}</span>
            </div>
            <h4>${question.question}</h4>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${question.options.map((option, index) => `
                <button 
                    class="quiz-option btn btn-secondary" 
                    style="text-align: left; justify-content: flex-start;"
                    data-index="${index}"
                >
                    ${String.fromCharCode(65 + index)}. ${option}
                </button>
            `).join('')}
        </div>
    `;
    
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', checkAnswer);
    });
}

function checkAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const question = quizQuestions[currentQuestion];
    
    document.querySelectorAll('.quiz-option').forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.answer) {
            btn.style.backgroundColor = '#22c55e';
            btn.style.color = 'white';
        } else if (index === selectedIndex && index !== question.answer) {
            btn.style.backgroundColor = '#ef4444';
            btn.style.color = 'white';
        }
    });
    
    if (selectedIndex === question.answer) {
        score++;
        document.getElementById('quiz-result').innerHTML = '<div class="success-message">✓ 回答正确！</div>';
    } else {
        document.getElementById('quiz-result').innerHTML = '<div class="error-message">✗ 回答错误，正确答案是 ' + String.fromCharCode(65 + question.answer) + '</div>';
    }
    
    setTimeout(() => {
        currentQuestion++;
        loadQuiz();
    }, 1500);
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuiz();
}

function getScoreMessage(score) {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return '完美！您是环保知识达人！🌱';
    if (percentage >= 75) return '优秀！继续保持学习！🌟';
    if (percentage >= 50) return '不错！还有提升空间！💪';
    return '加油！多学习环保知识吧！📚';
}