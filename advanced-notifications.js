/**
 * 🔔 نظام الإشعارات المتقدم
 * Version 1.0
 */

(function() {
    'use strict';
    
    console.log('🔔 نظام الإشعارات المتقدم يحمّل...');
    
    // إنشاء حاوية الإشعارات
    function createNotificationContainer() {
        if (document.getElementById('notifications-container')) return;
        
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        
        document.body.appendChild(container);
    }
    
    // دالة الإشعار المحسّنة
    window.showNotification = function(message, type = 'info', duration = 4000) {
        createNotificationContainer();
        
        const notification = document.createElement('div');
        const colors = {
            success: { bg: '#d4edda', border: '#28a745', color: '#155724' },
            error: { bg: '#f8d7da', border: '#dc3545', color: '#721c24' },
            warning: { bg: '#fff3cd', border: '#ffc107', color: '#856404' },
            info: { bg: '#d1ecf1', border: '#17a2b8', color: '#0c5460' }
        };
        
        const c = colors[type] || colors.info;
        
        notification.style.cssText = `
            background: ${c.bg};
            border-right: 4px solid ${c.border};
            color: ${c.color};
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 4px;
            animation: slideIn 0.3s ease-in;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;
        
        notification.textContent = message;
        notification.addEventListener('click', () => notification.remove());
        
        document.getElementById('notifications-container').appendChild(notification);
        
        // إزالة تلقائية
        if (duration > 0) {
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
    };
    
    // إضافة التأثيرات
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ نظام الإشعارات جاهز');
})();
