/**
 * 📱 نظام إرسال الواتس المباشر - بدون فتح التطبيق
 * الرسالة تروح تلقائياً للعميل
 */

(function() {
    'use strict';
    console.log('📱 نظام الإرسال المباشر للواتس يحمّل...');

    // ===== إعدادات الخادم =====
    // ضع هنا بيانات اتصال Twilio أو API الواتس الخاص بك
    const WHATSAPP_API = {
        endpoint: 'https://your-api.com/send-message', // غيّر هذا
        apiKey: 'YOUR_API_KEY', // غيّر هذا
        businessPhone: '966xxxxxxxxx' // رقم الواتس الرسمي
    };

    // ===== الحصول على بيانات الطلب =====
    function getOrderData() {
        const orderId = document.querySelector('[data-order-id]')?.textContent || 'ORD-000';
        const customerPhone = document.querySelector('[data-customer-phone]')?.textContent || '';
        const customerName = document.querySelector('[data-customer-name]')?.textContent || 'العميل';
        
        return {
            orderId: orderId.trim(),
            phone: customerPhone.replace(/[^\d]/g, ''),
            name: customerName.trim()
        };
    }

    // ===== تنسيق رقم الهاتف =====
    function formatPhoneNumber(phoneNumber) {
        let formatted = phoneNumber.replace(/[^\d]/g, '');
        
        if (formatted.startsWith('0')) {
            formatted = '966' + formatted.substring(1);
        }
        
        if (!formatted.startsWith('966')) {
            formatted = '966' + formatted;
        }
        
        return formatted;
    }

    // ===== إرسال الرسالة مباشرة =====
    window.sendWhatsAppDirect = async function(phoneNumber = null, orderData = null) {
        console.log('📱 إرسال الرسالة مباشرة للواتس...');

        orderData = orderData || getOrderData();
        phoneNumber = phoneNumber || orderData.phone;

        if (!phoneNumber) {
            console.warn('⚠️ لا يوجد رقم هاتف');
            window.notify?.('خطأ: لا يوجد رقم هاتف', 'error');
            return false;
        }

        // تنسيق الرقم
        const formattedPhone = formatPhoneNumber(phoneNumber);

        // بناء الرسالة
        const message = `✨ طلبكم جاهز ✨
━━━━━━━━━━━━━━━━━━━━━━
${orderData.name}، تشرفنا بخدمتكم

رقم طلبك: ${orderData.orderId}
━━━━━━━━━━━━━━━━━━━━━━
شكراً لاختياركم روائع الأفكار الإعلانية

🔗 تتبع طلبكم: https://rawaee-alafkar.com/tracking.html?id=${orderData.orderId}`;

        try {
            // محاولة الإرسال عبر API
            const response = await fetch(WHATSAPP_API.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${WHATSAPP_API.apiKey}`
                },
                body: JSON.stringify({
                    phone: formattedPhone,
                    message: message,
                    businessPhone: WHATSAPP_API.businessPhone
                })
            });

            if (response.ok) {
                console.log('✅ تم إرسال الرسالة مباشرة');
                console.log('📞 إلى:', formattedPhone);
                window.notify?.('✅ تم إرسال الرسالة للعميل', 'success');
                return true;
            } else {
                console.warn('⚠️ فشل الإرسال');
                window.notify?.('فشل الإرسال - تحقق من الاتصال', 'error');
                return false;
            }
        } catch (error) {
            console.error('❌ خطأ في الإرسال:', error);
            window.notify?.('خطأ في الاتصال بخدمة الواتس', 'error');
            return false;
        }
    };

    // ===== إرسال عند إكمال الطلب =====
    window.onOrderCompleteAuto = async function(customerPhone = null) {
        console.log('🎉 تم إكمال الطلب - إرسال الواتس...');

        // الانتظار قليلاً
        await new Promise(resolve => setTimeout(resolve, 1500));

        // الحصول على البيانات
        const orderData = getOrderData();
        
        // إرسال الرسالة
        return await window.sendWhatsAppDirect(customerPhone || orderData.phone, orderData);
    };

    // ===== ربط مع نظام إكمال الطلب =====
    const originalCompleteProductionLine = window.completeProductionLine;
    
    if (originalCompleteProductionLine) {
        window.completeProductionLine = function(lineId) {
            // استدعاء الدالة الأصلية
            originalCompleteProductionLine(lineId);

            // التحقق من الإكمال
            if (window.checkOrderCompletion && window.checkOrderCompletion()) {
                console.log('✅ جميع الخطوط مكتملة - إرسال الواتس...');
                
                const orderData = getOrderData();
                
                // تأخير بسيط ثم الإرسال
                setTimeout(() => {
                    window.sendWhatsAppDirect(orderData.phone, orderData);
                }, 2000);
            }
        };
    }

    // ===== تهيئة النظام =====
    function initializeSystem() {
        console.log('🚀 تهيئة نظام الإرسال المباشر...');
        console.log('✅ النظام جاهز!');
        console.log('📌 الدوال:');
        console.log('   - window.sendWhatsAppDirect(phoneNumber)');
        console.log('   - window.onOrderCompleteAuto(phoneNumber)');
    }

    // تهيئة عند التحميل
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSystem);
    } else {
        initializeSystem();
    }

    // تصدير
    window.WhatsAppDirectSystem = {
        send: window.sendWhatsAppDirect,
        sendAuto: window.onOrderCompleteAuto,
        formatPhone: formatPhoneNumber
    };
})();
