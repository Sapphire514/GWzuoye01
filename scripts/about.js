document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateContactForm()) return;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString()
        };
        
        const messages = getFromLocalStorage('contact_messages', []);
        messages.push(formData);
        saveToLocalStorage('contact_messages', messages);
        
        document.getElementById('form-message').innerHTML = `
            <div class="success-message">✓ 感谢您的留言！我们会尽快回复您。</div>
        `;
        
        document.getElementById('contact-form').reset();
        
        showNotification('留言成功', '感谢您的关注，我们会尽快回复！');
    });
}

function validateContactForm() {
    let isValid = true;
    clearErrors();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    if (!name.trim()) {
        document.getElementById('name-error').textContent = '请输入姓名';
        isValid = false;
    }
    
    if (!email.trim()) {
        document.getElementById('email-error').textContent = '请输入邮箱';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('email-error').textContent = '请输入有效的邮箱地址';
        isValid = false;
    }
    
    if (phone && !validatePhone(phone)) {
        document.getElementById('phone-error').textContent = '请输入有效的手机号码';
        isValid = false;
    }
    
    if (!message.trim()) {
        document.getElementById('message-error').textContent = '请输入留言内容';
        isValid = false;
    }
    
    return isValid;
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.getElementById('form-message').innerHTML = '';
}