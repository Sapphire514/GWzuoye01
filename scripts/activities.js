const activitiesData = [
    {
        id: 1,
        title: '🌱 春季植树活动',
        description: '与我们一起种下绿色希望，为地球增添一抹绿意',
        image: '../assets/images/chunji.jpg',
        date: '3月12日',
        participants: 128,
        maxParticipants: 200,
        status: 'upcoming'
    },
    {
        id: 2,
        title: '♻️ 垃圾分类宣传',
        description: '学习正确的垃圾分类方法，为环保事业贡献力量',
        image: '../assets/images/laji.jpg',
        date: '每周六',
        participants: 89,
        maxParticipants: 500,
        status: 'ongoing'
    },
    {
        id: 3,
        title: '🚴 绿色骑行活动',
        description: '骑行穿越城市与森林，感受绿色出行的美好',
        image: '../assets/images/lvse.jpg',
        date: '4月22日',
        participants: 256,
        maxParticipants: 300,
        status: 'upcoming'
    },
    {
        id: 4,
        title: '🎨 旧物改造工作坊',
        description: '变废为宝，创意无限！将废旧物品改造成实用装饰品',
        image: '../assets/images/jiuwu.jpg',
        date: '3月23日',
        participants: 45,
        maxParticipants: 60,
        status: 'upcoming'
    },
    {
        id: 5,
        title: '📚 环保知识竞赛',
        description: '检验环保知识储备，优胜者将获得精美环保礼品',
        image: '../assets/images/huanbao.jpg',
        date: '3月30日',
        participants: 167,
        maxParticipants: 500,
        status: 'upcoming'
    },
    {
        id: 6,
        title: '🏖️ 海滩清洁行动',
        description: '保护海洋环境，从清理海滩垃圾开始，从每一个人开始',
        image: '../assets/images/haitan.jpg',
        date: '5月1日',
        participants: 89,
        maxParticipants: 150,
        status: 'upcoming'
    },
    {
        id: 7,
        title: '🌳 社区绿化志愿',
        description: '为社区植树造林，美化我们的家园环境',
        image: '../assets/images/shequ.jpg',
        date: '4月5日',
        participants: 78,
        maxParticipants: 100,
        status: 'upcoming'
    },
    {
        id: 8,
        title: '💧 水资源保护讲座',
        description: '珍惜每一滴水，了解水资源保护的紧迫性',
        image: '../assets/images/shui.jpg',
        date: '4月10日',
        participants: 156,
        maxParticipants: 200,
        status: 'upcoming'
    }
];

let swiperInstance = null;

function getStatusBadgeClass(status) {
    switch(status) {
        case 'upcoming': return 'badge-warning';
        case 'ongoing': return 'badge-success';
        case 'completed': return 'badge-info';
        default: return 'badge-info';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'upcoming': return '即将开始';
        case 'ongoing': return '进行中';
        case 'completed': return '已结束';
        default: return '未知';
    }
}

function initSwiperStyles() {
    const styleId = 'swiper-custom-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        #activity-swiper {
            padding-bottom: 50px;
        }
        #activity-swiper .swiper-slide {
            height: auto;
        }
        #activity-swiper .swiper-slide .card {
            height: 100%;
            box-sizing: border-box;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        #activity-swiper .swiper-slide .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }
        #activity-swiper .swiper-pagination-bullet {
            background: var(--primary);
            opacity: 0.5;
        }
        #activity-swiper .swiper-pagination-bullet-active {
            background: var(--primary);
            opacity: 1;
        }
        #activity-swiper .swiper-button-next,
        #activity-swiper .swiper-button-prev {
            color: var(--primary);
            background: rgba(255,255,255,0.8);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        #activity-swiper .swiper-button-next:after,
        #activity-swiper .swiper-button-prev:after {
            font-size: 16px;
        }
        .filter-btn {
            padding: 0.5rem 1.5rem;
            border: 2px solid var(--primary);
            background-color: white;
            color: var(--primary);
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.95rem;
        }
        .filter-btn:hover, .filter-btn.active {
            background-color: var(--primary);
            color: white;
        }
    `;
    document.head.appendChild(style);
}

function initSwiper() {
    initSwiperStyles();
    
    const swiperWrapper = document.querySelector('#activity-swiper .swiper-wrapper');
    
    swiperWrapper.innerHTML = activitiesData.map(activity => `
        <div class="swiper-slide" data-activity-id="${activity.id}">
            <div class="card" style="margin: 0; height: 100%;">
                <img src="${activity.image}" alt="${activity.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                <h3>${activity.title}</h3>
                <p>${activity.description}</p>
                <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
                    <span class="badge ${getStatusBadgeClass(activity.status)}"><i class="fas fa-calendar"></i> ${activity.date}</span>
                    <span class="badge badge-success"><i class="fas fa-users"></i> ${activity.participants}人已报名</span>
                </div>
            </div>
        </div>
    `).join('');

    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }
    
    swiperInstance = new Swiper('#activity-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        loopedSlides: activitiesData.length,
        grabCursor: true,
        speed: 600,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        effect: 'slide',
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
}

function loadActivities(filter = 'all') {
    const container = document.getElementById('activities-container');
    const filtered = activitiesData.filter(activity => 
        filter === 'all' || activity.status === filter
    );
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light); grid-column: 1 / -1; padding: 2rem;">暂无此类活动</p>';
        return;
    }
    
    container.innerHTML = filtered.map(activity => `
        <div class="card activity-card" data-id="${activity.id}">
            <img src="${activity.image}" alt="${activity.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="badge ${getStatusBadgeClass(activity.status)}">${getStatusText(activity.status)}</span>
                <span style="font-size: 0.8rem; color: var(--text-light);">${activity.title.split(' ')[0]}</span>
            </div>
            <h3>${activity.title.split(' ').slice(1).join(' ')}</h3>
            <p style="margin-bottom: 1rem;">${activity.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-light);">
                <span><i class="fas fa-calendar"></i> ${activity.date}</span>
                <span><i class="fas fa-users"></i> ${activity.participants}/${activity.maxParticipants}</span>
            </div>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 1rem;">查看详情</button>
        </div>
    `).join('');
}

function showActivityModal(id) {
    const activity = activitiesData.find(a => a.id === id);
    if (!activity) return;
    
    document.getElementById('activity-modal').dataset.activityId = id;
    document.getElementById('modal-title').textContent = activity.title;
    document.getElementById('modal-content').innerHTML = `
        <img src="${activity.image}" alt="${activity.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
        <p>${activity.description}</p>
        <div style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-light);">
            <div><i class="fas fa-calendar"></i> ${activity.date}</div>
            <div><i class="fas fa-users"></i> 已报名: ${activity.participants}/${activity.maxParticipants}</div>
        </div>
    `;
    
    const registerBtn = document.getElementById('register-btn');
    if (activity.status === 'completed') {
        registerBtn.textContent = '活动已结束';
        registerBtn.disabled = true;
    } else {
        registerBtn.textContent = '立即报名';
        registerBtn.disabled = false;
    }
    
    document.getElementById('activity-modal').classList.add('active');
}

function registerActivity(id) {
    const activity = activitiesData.find(a => a.id === id);
    if (!activity || activity.status === 'completed') return;
    
    const registeredActivities = getFromLocalStorage('registered_activities', []);
    if (registeredActivities.includes(id)) {
        showNotification('提示', '您已报名该活动');
        return;
    }
    
    registeredActivities.push(id);
    saveToLocalStorage('registered_activities', registeredActivities);
    
    activity.participants++;
    initSwiper();
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    loadActivities(activeFilter);
    
    showNotification('报名成功', `您已成功报名「${activity.title.split(' ').slice(1).join(' ')}」`);
    document.getElementById('activity-modal').classList.remove('active');
}

function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadActivities(btn.dataset.filter);
        });
    });

    document.addEventListener('click', (e) => {
        const card = e.target.closest('.activity-card');
        if (card) {
            showActivityModal(parseInt(card.dataset.id));
        }
        
        const swiperSlide = e.target.closest('#activity-swiper .swiper-slide');
        if (swiperSlide) {
            const activityId = parseInt(swiperSlide.dataset.activityId);
            showActivityModal(activityId);
        }
    });

    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('activity-modal').classList.remove('active');
    });

    document.getElementById('register-btn').addEventListener('click', () => {
        const activityId = parseInt(document.getElementById('activity-modal').dataset.activityId);
        registerActivity(activityId);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSwiper();
    loadActivities();
    setupEventListeners();
});