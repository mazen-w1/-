/**
 * 📊 نظام التكامل المتقدم
 * يربط جدول البيانات مع الموقع ويحسّن واجهة المستخدم
 */

(function() {
    'use strict';
    console.log('🔗 نظام التكامل يحمّل...');

    // ===== تحسين عرض البيانات =====
    function enhanceDataDisplay() {
        const orderCards = document.querySelectorAll('[class*="order"], [class*="card"]');
        orderCards.forEach(card => {
            card.style.maxWidth = '300px';
            card.style.minHeight = '250px';
        });
        console.log('✅ تم توحيد أحجام الصناديق');
    }

    // ===== حسابات المبالغ المالية =====
    function setupFinancialCalculations() {
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('amount-input')) {
                updateFinancialTotals();
            }
        });

        function updateFinancialTotals() {
            const amounts = document.querySelectorAll('.amount-input');
            let total = 0;
            amounts.forEach(input => {
                total += parseFloat(input.value) || 0;
            });
            const totalElement = document.querySelector('[data-total]');
            if (totalElement) {
                totalElement.textContent = formatCurrency(total);
            }
        }
    }

    // ===== خطوط الإنتاج المتوازية =====
    function setupProductionLines() {
        window.productionStates = {
            'design': { name: '🎨 التصميم', status: 'pending' },
            'print': { name: '🖨️ الطباعة', status: 'pending' },
            'execution': { name: '⚙️ التنفيذ', status: 'pending' }
        };
        console.log('✅ خطوط الإنتاج المتوازية جاهزة');
    }

    // ===== إحصائيات الموظفين =====
    function setupEmployeeStats() {
        window.employeeStats = { monthEmployee: null, achievements: {} };
        
        window.updateEmployeeOfMonth = function(name, reason) {
            window.employeeStats.monthEmployee = { name, reason };
            console.log('⭐ موظف الشهر:', name);
        };
    }

    // ===== لوحة الإحصائيات =====
    function setupFinancialDashboard() {
        window.financialStats = {
            totalIncome: 0, paidFully: 0, paidPartially: 0, unpaid: 0
        };

        window.updateFinancialStats = function(data) {
            window.financialStats = data;
            console.log('💹 تحديث الإحصائيات');
        };
    }

    // ===== تنسيق العملات =====
    function formatCurrency(amount) {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency', currency: 'SAR'
        }).format(amount);
    }

    // ===== ربط جدول البيانات =====
    function setupDataBinding() {
        window.linkSpreadsheetData = function(data) {
            console.log('📥 تحميل بيانات الجدول');
            if (data.statistics) window.updateFinancialStats(data.statistics);
        };
    }

    // ===== نظام الإشعارات =====
    function setupNotifications() {
        window.notify = function(msg, type = 'info') {
            const notif = document.createElement('div');
            notif.style.cssText = `
                position: fixed; top: 20px; right: 20px; padding: 12px 20px;
                background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
                color: white; border-radius: 4px; z-index: 10000;
            `;
            notif.textContent = msg;
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 3000);
        };
    }

    // ===== تحسينات RTL =====
    function setupRTLEnhancements() {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        console.log('✅ RTL مفعّل');
    }

    // تهيئة عند التحميل
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('🚀 تهيئة نظام التكامل...');
        enhanceDataDisplay();
        setupFinancialCalculations();
        setupProductionLines();
        setupEmployeeStats();
        setupFinancialDashboard();
        setupDataBinding();
        setupNotifications();
        setupRTLEnhancements();
        console.log('✅ جميع الأنظمة جاهزة!');
    }

    window.IntegrationSystem = {
        notify: window.notify,
        updateFinancialStats: window.updateFinancialStats,
        updateEmployeeOfMonth: window.updateEmployeeOfMonth,
        linkSpreadsheetData: window.linkSpreadsheetData
    };
})();
