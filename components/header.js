document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    if (header) {
        const isInViews = window.location.pathname.includes('/views/');
        const basePath = isInViews ? '../' : '';
        const viewPath = isInViews ? '' : 'views/';

        header.innerHTML = `
            <div class="container">
                <a href="${basePath}index.html" class="logo">
                    <span class="logo-icon">
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2C16 2 8 10 8 18C8 22.4183 11.5817 26 16 26C20.4183 26 24 22.4183 24 18C24 10 16 2 16 2Z" stroke="#4A5D52" stroke-width="1.5" fill="none"/>
                            <path d="M16 26V30" stroke="#4A5D52" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M12 30H20" stroke="#4A5D52" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>绿色家园</span>
                </a>
                <nav>
                    <ul>
                        <li><a href="${basePath}index.html" ${isCurrentPage('index.html') ? 'class="active"' : ''}>首页</a></li>
                        <li><a href="${viewPath}calculator.html" ${isCurrentPage('calculator.html') ? 'class="active"' : ''}>碳足迹</a></li>
                        <li><a href="${viewPath}activities.html" ${isCurrentPage('activities.html') ? 'class="active"' : ''}>活动</a></li>
                        <li><a href="${viewPath}tasks.html" ${isCurrentPage('tasks.html') ? 'class="active"' : ''}>任务</a></li>
                        <li><a href="${viewPath}knowledge.html" ${isCurrentPage('knowledge.html') ? 'class="active"' : ''}>知识</a></li>
                        <li><a href="${viewPath}about.html" ${isCurrentPage('about.html') ? 'class="active"' : ''}>关于</a></li>
                    </ul>
                </nav>
            </div>
        `;

        initHeaderScroll();
    }
});

function isCurrentPage(pageName) {
    const currentPath = window.location.pathname;
    return currentPath.includes(pageName);
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
