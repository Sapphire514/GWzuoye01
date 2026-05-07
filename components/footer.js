document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <a href="../index.html" class="footer-logo">
                            <span class="logo-icon">
                                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2C16 2 8 10 8 18C8 22.4183 11.5817 26 16 26C20.4183 26 24 22.4183 24 18C24 10 16 2 16 2Z" stroke="white" stroke-width="1.5" fill="none"/>
                                    <path d="M16 26V30" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M12 30H20" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                            </span>
                            <span>绿色家园</span>
                        </a>
                        <p>倡导低碳生活，守护绿水青山<br>共建美丽中国，共享绿色未来</p>
                    </div>
                    <div class="footer-section">
                        <h4>快速链接</h4>
                        <ul>
                            <li><a href="calculator.html">碳足迹计算</a></li>
                            <li><a href="activities.html">环保活动</a></li>
                            <li><a href="tasks.html">每日任务</a></li>
                            <li><a href="knowledge.html">环保知识</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>联系我们</h4>
                        <ul>
                            <li><a href="#">1739105807@qq.com</a></li>
                            <li><a href="#">10000000000</a></li>
                            <li><a href="#">西安市雁塔区</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>关注我们</h4>
                        <ul>
                            <li><a href="#">微信公众号</a></li>
                            <li><a href="#">官方微博</a></li>
                            <li><a href="#">抖音号</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span>© 2026 绿色家园 All Rights Reserved</span>
                    <span>共建美丽中国</span>
                </div>
            </div>
        `;
    }
});
