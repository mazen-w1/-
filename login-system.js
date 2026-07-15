/**
 * 🔐 نظام تسجيل الدخول المحسّن
 * Version 2.0
 */

(function() {
    'use strict';
    
    console.log('🔐 نظام الدخول المحسّن يحمّل...');
    
    // بيانات المستخدمين الافتراضية
    const users = {
        // المدير
        'admin': {
            password: 'admin@2026',
            role: 'admin',
            name: 'المدير العام',
            department: 'الإدارة'
        },
        // الأقسام
        'design': {
            password: 'design@2026',
            role: 'department',
            name: 'قسم التصميم',
            department: 'التصميم'
        },
        'print': {
            password: 'print@2026',
            role: 'department',
            name: 'قسم الطباعة',
            department: 'الطباعة'
        },
        'workshop': {
            password: 'workshop@2026',
            role: 'department',
            name: 'قسم الورشة',
            department: 'الورشة'
        },
        // الموظفون
        'employee': {
            password: 'emp@2026',
            role: 'employee',
            name: 'موظف',
            department: 'الموارد البشرية'
        }
    };
    
    // حفظ بيانات المستخدمين في window
    window.authSystem = {
        users: users,
        
        login: function(username, password) {
            const user = users[username];
            if (user && user.password === password) {
                // حفظ بيانات المستخدم في sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify({
                    username: username,
                    role: user.role,
                    name: user.name,
                    department: user.department,
                    loginTime: new Date().toLocaleString('ar-SA')
                }));
                
                console.log('✅ تم تسجيل الدخول:', user.name);
                return { success: true, user: user };
            }
            
            console.warn('❌ بيانات دخول غير صحيحة');
            return { success: false, message: 'بيانات الدخول غير صحيحة' };
        },
        
        logout: function() {
            sessionStorage.removeItem('currentUser');
            console.log('✅ تم تسجيل الخروج');
        },
        
        getCurrentUser: function() {
            const user = sessionStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        },
        
        isLoggedIn: function() {
            return this.getCurrentUser() !== null;
        }
    };
    
    console.log('✅ نظام الدخول جاهز');
    
    // إنشاء نموذج تسجيل الدخول المحسّن
    function setupLoginForm() {
        const loginModal = document.querySelector('[data-login-modal]');
        if (!loginModal) return;
        
        const usernameInput = loginModal.querySelector('input[placeholder*="المستخدم"]') || 
                             loginModal.querySelector('input[type="text"]');
        const passwordInput = loginModal.querySelector('input[placeholder*="المرور"]') || 
                             loginModal.querySelector('input[type="password"]');
        const loginBtn = loginModal.querySelector('button');
        
        if (!loginBtn) return;
        
        // إضافة نصيحة: بيانات الاختبار
        const hint = document.createElement('div');
        hint.style.cssText = `
            background: #fff3cd;
            border: 1px solid #ffc107;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            font-size: 12px;
            color: #856404;
        `;
        hint.innerHTML = `
            💡 <strong>بيانات اختبار:</strong><br>
            Username: <code>admin</code> | Password: <code>admin@2026</code><br>
            أو استخدم: admin, design, print, workshop, employee
        `;
        
        if (usernameInput) {
            usernameInput.parentElement.insertBefore(hint, usernameInput);
        }
        
        loginBtn.addEventListener('click', function() {
            if (!usernameInput || !passwordInput) return;
            
            const result = window.authSystem.login(
                usernameInput.value,
                passwordInput.value
            );
            
            if (result.success) {
                // إظهار رسالة نجاح
                alert('✅ مرحباً ' + result.user.name);
                
                // إعادة التوجيه أو إغلاق النموذج
                setTimeout(() => {
                    location.reload();
                }, 500);
            } else {
                alert('❌ ' + result.message);
            }
        });
    }
    
    // تشغيل عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', setupLoginForm);
})();
