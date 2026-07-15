/**
 * 🎉 نظام الرسائل التلقائية عند إكمال الطلب
 * يعرض رسالة تحية بعد إكمال آخر قسم من أقسام الإنتاج
 */

(function() {
    'use strict';
    console.log('🎊 نظام الرسائل التلقائية يحمّل...');

    // الرسالة النهائية
    const COMPLETION_MESSAGE = `
        ✨ طلبكم جاهز ✨
        ــــــــــــــــــــــــــــــــ
        تشرفنا بخدمتكم
        ــــــــــــــــــــــــــــــــ
        شكراً لاختياركم روائع الأفكار الإعلانية
    `;

    // ===== إنشاء نافذة الرسالة =====
    function createCompletionWindow() {
        // إنشاء الخلفية المظلمة
        const overlay = document.createElement('div');
        overlay.className = 'completion-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-in-out;
        `;

        // إنشاء صندوق الرسالة
        const messageBox = document.createElement('div');
        messageBox.className = 'completion-message-box';
        messageBox.style.cssText = `
            background: linear-gradient(135deg, #4A0E17 0%, #631420 100%);
            color: #FFFFFF;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            animation: slideUp 0.4s ease-in-out;
            border: 2px solid #D4AF37;
        `;

        // إضافة الأيقونة العلوية
        const icon = document.createElement('div');
        icon.style.cssText = `
            font-size: 60px;
            margin-bottom: 20px;
            animation: bounce 1s ease-in-out infinite;
        `;
        icon.textContent = '✨🎉✨';
        messageBox.appendChild(icon);

        // إضافة الرسالة
        const text = document.createElement('p');
        text.style.cssText = `
            font-size: 20px;
            font-weight: bold;
            line-height: 1.8;
            font-family: Arial, sans-serif;
            letter-spacing: 1px;
        `;
        text.textContent = COMPLETION_MESSAGE;
        messageBox.appendChild(text);

        // إضافة مؤشر التاريخ والوقت
        const timestamp = document.createElement('div');
        timestamp.style.cssText = `
            font-size: 12px;
            color: #D4AF37;
            margin-top: 20px;
            border-top: 1px solid #D4AF37;
            padding-top: 15px;
        `;
        const now = new Date().toLocaleDateString('ar-SA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        timestamp.textContent = `✓ تم في: ${now}`;
        messageBox.appendChild(timestamp);

        // إضافة زر الإغلاق
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✓ تم';
        closeBtn.style.cssText = `
            margin-top: 25px;
            padding: 12px 40px;
            background: #D4AF37;
            color: #4A0E17;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

        closeBtn.onmouseover = () => {
            closeBtn.style.background = '#E5C158';
            closeBtn.style.transform = 'scale(1.05)';
        };

        closeBtn.onmouseout = () => {
            closeBtn.style.background = '#D4AF37';
            closeBtn.style.transform = 'scale(1)';
        };

        closeBtn.onclick = () => {
            overlay.style.animation = 'fadeOut 0.3s ease-in-out';
            setTimeout(() => {
                overlay.remove();
                console.log('✅ تم إغلاق رسالة الإكمال');
            }, 300);
        };

        messageBox.appendChild(closeBtn);
        overlay.appendChild(messageBox);

        return overlay;
    }

    // ===== إضافة الرسوم المتحركة =====
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }

            @keyframes slideUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes bounce {
                0%, 100% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-15px);
                }
            }

            .completion-overlay {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                direction: rtl;
            }

            .completion-message-box {
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    // ===== عرض الرسالة =====
    window.showCompletionMessage = function() {
        console.log('🎉 عرض رسالة إكمال الطلب...');
        
        // إزالة أي نافذة موجودة
        const existingOverlay = document.querySelector('.completion-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // إنشاء وعرض النافذة الجديدة
        const window_elem = createCompletionWindow();
        document.body.appendChild(window_elem);

        // تشغيل صوت إشعار (اختياري)
        playNotificationSound();

        // تسجيل الحدث
        console.log('✅ تم عرض رسالة الإكمال بنجاح');
        console.log('📨 الرسالة: ' + COMPLETION_MESSAGE);
    };

    // ===== تشغيل صوت الإشعار =====
    function playNotificationSound() {
        try {
            // محاولة تشغيل صوت بسيط باستخدام Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // تشغيل نغمات احتفالية
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);

            console.log('🔊 تم تشغيل صوت الإشعار');
        } catch (e) {
            console.log('⚠️ لم يتمكن من تشغيل الصوت:', e.message);
        }
    }

    // ===== مراقبة إكمال الطلب =====
    function setupCompletionMonitoring() {
        console.log('👁️ مراقبة إكمال الطلب...');

        // دالة للتحقق من إكمال جميع الخطوات
        window.checkOrderCompletion = function() {
            const productionLines = document.querySelectorAll('[data-production-line]');
            let allCompleted = true;

            productionLines.forEach(line => {
                const status = line.getAttribute('data-status');
                if (status !== 'completed' && status !== 'done') {
                    allCompleted = false;
                }
            });

            return allCompleted;
        };

        // دالة لتسجيل إكمال خطة إنتاج
        window.completeProductionLine = function(lineId) {
            console.log(`✅ تم إكمال خط الإنتاج: ${lineId}`);

            // تحديث حالة الخط
            const line = document.querySelector(`[data-production-line="${lineId}"]`);
            if (line) {
                line.setAttribute('data-status', 'completed');
                line.style.backgroundColor = '#4CAF50';
            }

            // التحقق من إكمال جميع الخطوط
            if (window.checkOrderCompletion && window.checkOrderCompletion()) {
                setTimeout(() => {
                    window.showCompletionMessage();
                }, 500);
            }
        };
    }

    // ===== تهيئة النظام =====
    function initializeSystem() {
        console.log('🚀 تهيئة نظام الرسائل التلقائية...');

        addAnimationStyles();
        setupCompletionMonitoring();

        console.log('✅ نظام الرسائل التلقائية جاهز!');
        console.log('📌 استخدم: window.showCompletionMessage() لعرض الرسالة');
        console.log('📌 استخدم: window.completeProductionLine(lineId) لتسجيل إكمال الخط');
    }

    // تهيئة عند تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSystem);
    } else {
        initializeSystem();
    }

    // تصدير الدوال
    window.CompletionSystem = {
        show: window.showCompletionMessage,
        check: window.checkOrderCompletion,
        complete: window.completeProductionLine
    };
})();
