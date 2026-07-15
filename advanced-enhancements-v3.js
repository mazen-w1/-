/**
 * 🚀 تحسينات متقدمة v3 - شاملة ومتكاملة
 * يتضمن جميع المتطلبات الجديدة
 */

(function() {
    'use strict';
    console.log('🚀 التحسينات المتقدمة v3 تحمّل...');

    // ===== 1. تحسين مربعات البيانات =====
    function optimizeDataBoxes() {
        console.log('📦 تحسين مربعات البيانات...');
        
        // جعل جميع المربعات متناسقة
        const style = document.createElement('style');
        style.textContent = `
            .order-card, [class*="card"], [class*="box"] {
                max-width: 280px !important;
                min-width: 250px !important;
                min-height: 180px !important;
                max-height: 200px !important;
                padding: 12px !important;
                margin: 8px !important;
                overflow: hidden !important;
                font-size: 12px !important;
            }
            
            .order-card p, [class*="card"] p {
                margin: 4px 0 !important;
                padding: 2px 0 !important;
                line-height: 1.3 !important;
            }
        `;
        document.head.appendChild(style);
        console.log('✅ تم تحسين المربعات');
    }

    // ===== 2. نظام البنود مع المبالغ =====
    window.addItemWithAmount = function(itemName, amount, orderContainer) {
        console.log('➕ إضافة بند:', itemName, 'بمبلغ:', amount);
        
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.style.cssText = `
            display: flex;
            justify-content: space-between;
            padding: 6px;
            margin: 4px 0;
            border-bottom: 1px solid #ddd;
            align-items: center;
        `;
        
        itemElement.innerHTML = `
            <span class="item-name">${itemName}</span>
            <span class="item-amount" style="color: #D4AF37; font-weight: bold;">
                ${amount.toLocaleString('ar-SA', {style: 'currency', currency: 'SAR'})}
            </span>
        `;
        
        if (orderContainer) {
            orderContainer.appendChild(itemElement);
        }
        
        // تحديث الإجمالي
        updateOrderTotal(orderContainer);
        
        return itemElement;
    };

    // ===== 3. نظام حساب الإجمالي =====
    window.updateOrderTotal = function(orderContainer) {
        console.log('💰 تحديث الإجمالي...');
        
        let total = 0;
        const items = orderContainer?.querySelectorAll('.item-amount') || [];
        
        items.forEach(item => {
            const amount = parseFloat(item.textContent.replace(/[^\d.]/g, '')) || 0;
            total += amount;
        });
        
        // عرض الإجمالي (لا يتغير بعد تحديده)
        const totalElement = orderContainer?.querySelector('[data-total]');
        if (totalElement) {
            totalElement.style.color = '#D4AF37';
            totalElement.style.fontWeight = 'bold';
            totalElement.style.fontSize = '14px';
            totalElement.textContent = total.toLocaleString('ar-SA', {
                style: 'currency',
                currency: 'SAR'
            });
        }
        
        return total;
    };

    // ===== 4. نظام خطوط الإنتاج المتوازية (3 خطوط) =====
    window.setupProductionLinesVertical = function(container) {
        console.log('🏭 إعداد خطوط الإنتاج المتوازية...');
        
        const lines = [
            { id: 'design', name: '🎨 التصميم', color: '#FF6B6B' },
            { id: 'print', name: '🖨️ الطباعة', color: '#4ECDC4' },
            { id: 'execute', name: '⚙️ التنفيذ', color: '#FFD93D' }
        ];
        
        const linesContainer = document.createElement('div');
        linesContainer.className = 'production-lines-vertical';
        linesContainer.style.cssText = `
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            width: 100%;
            max-width: 300px;
        `;
        
        lines.forEach((line, index) => {
            const lineElement = document.createElement('div');
            lineElement.className = 'production-line';
            lineElement.setAttribute('data-line-id', line.id);
            lineElement.style.cssText = `
                border: 2px solid ${line.color};
                border-radius: 8px;
                padding: 12px;
                background: #f9f9f9;
                position: relative;
                min-height: 60px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            // عنوان الخط
            const title = document.createElement('div');
            title.style.cssText = `
                font-weight: bold;
                color: ${line.color};
                font-size: 12px;
            `;
            title.textContent = line.name;
            lineElement.appendChild(title);
            
            // حقول التاريخ
            const dateContainer = document.createElement('div');
            dateContainer.style.cssText = `
                display: flex;
                gap: 8px;
                width: 100%;
                font-size: 10px;
            `;
            
            const startDate = document.createElement('input');
            startDate.type = 'date';
            startDate.placeholder = 'البداية';
            startDate.setAttribute('data-start-date', line.id);
            startDate.style.cssText = 'flex: 1; padding: 4px; font-size: 10px;';
            
            const endDate = document.createElement('input');
            endDate.type = 'date';
            endDate.placeholder = 'النهاية';
            endDate.setAttribute('data-end-date', line.id);
            endDate.style.cssText = 'flex: 1; padding: 4px; font-size: 10px;';
            
            dateContainer.appendChild(startDate);
            dateContainer.appendChild(endDate);
            lineElement.appendChild(dateContainer);
            
            // حالة الخط
            const status = document.createElement('div');
            status.className = 'line-status';
            status.setAttribute('data-status', 'pending');
            status.style.cssText = `
                font-size: 10px;
                color: #999;
                font-weight: bold;
            `;
            status.textContent = '⏳ قيد الانتظار';
            lineElement.appendChild(status);
            
            // معالج الضغط
            lineElement.onclick = () => {
                window.completeProductionLine(line.id);
                lineElement.style.backgroundColor = line.color;
                lineElement.style.color = 'white';
                status.textContent = '✅ مكتملة';
                status.style.color = 'white';
            };
            
            linesContainer.appendChild(lineElement);
        });
        
        if (container) {
            container.appendChild(linesContainer);
        }
        
        return linesContainer;
    };

    // ===== 5. إحصائيات الدخل =====
    window.addFinancialStatistics = function(container) {
        console.log('💹 إضافة إحصائيات الدخل...');
        
        const statsElement = document.createElement('div');
        statsElement.className = 'financial-stats';
        statsElement.style.cssText = `
            background: linear-gradient(135deg, #4A0E17, #631420);
            color: white;
            padding: 16px;
            border-radius: 8px;
            margin: 12px 0;
            border: 2px solid #D4AF37;
        `;
        
        // الإحصائية الأولى: إجمالي الدخل
        const totalIncomeDiv = document.createElement('div');
        totalIncomeDiv.style.cssText = `
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(212,175,55,0.3);
        `;
        totalIncomeDiv.innerHTML = `
            <span style="font-weight: bold;">إجمالي الدخل</span>
            <span style="color: #D4AF37;" data-total-income>0 ر.س</span>
        `;
        statsElement.appendChild(totalIncomeDiv);
        
        // الإحصائية الثانية: أكثر قسم دخل
        const topDepartmentDiv = document.createElement('div');
        topDepartmentDiv.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        topDepartmentDiv.innerHTML = `
            <span style="font-weight: bold;">أكثر قسم دخلاً</span>
            <div style="text-align: right;">
                <div style="color: #D4AF37; font-weight: bold;" data-top-department>التصميم</div>
                <div style="font-size: 10px; color: #aaa;" data-top-amount>0 ر.س</div>
            </div>
        `;
        statsElement.appendChild(topDepartmentDiv);
        
        if (container) {
            container.appendChild(statsElement);
        }
        
        return statsElement;
    };

    // ===== 6. موظف الشهر المتميز =====
    window.addEmployeeOfMonthWidget = function(container) {
        console.log('⭐ إضافة موظف الشهر...');
        
        const widget = document.createElement('div');
        widget.className = 'employee-of-month';
        widget.style.cssText = `
            background: linear-gradient(135deg, #FFD93D, #D4AF37);
            color: #4A0E17;
            padding: 16px;
            border-radius: 8px;
            margin: 12px 0;
            border: 2px solid #4A0E17;
            text-align: center;
        `;
        
        widget.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 8px;">⭐</div>
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px;">موظف الشهر</div>
            <div style="font-size: 12px; color: #4A0E17; font-weight: bold;" data-employee-name>جاري التحديث...</div>
            <div style="font-size: 10px; margin-top: 6px;" data-employee-reason>بناءً على الإنجازات</div>
        `;
        
        if (container) {
            container.appendChild(widget);
        }
        
        return widget;
    };

    // ===== 7. تحديث موظف الشهر =====
    window.setEmployeeOfMonth = function(name, department, reason) {
        console.log('⭐ تعيين موظف الشهر:', name);
        
        const nameEl = document.querySelector('[data-employee-name]');
        const reasonEl = document.querySelector('[data-employee-reason]');
        
        if (nameEl) nameEl.textContent = `${name} (${department})`;
        if (reasonEl) reasonEl.textContent = reason;
        
        window.notify?.(`✨ تم تعيين ${name} موظف الشهر`, 'success');
    };

    // ===== 8. التهيئة الشاملة =====
    function initializeSystem() {
        console.log('🚀 تهيئة التحسينات المتقدمة v3...');
        
        optimizeDataBoxes();
        
        console.log('✅ جميع التحسينات جاهزة!');
        console.log('📌 الدوال المتاحة:');
        console.log('   - window.addItemWithAmount(name, amount, container)');
        console.log('   - window.updateOrderTotal(container)');
        console.log('   - window.setupProductionLinesVertical(container)');
        console.log('   - window.addFinancialStatistics(container)');
        console.log('   - window.addEmployeeOfMonthWidget(container)');
        console.log('   - window.setEmployeeOfMonth(name, dept, reason)');
    }

    // تهيئة عند التحميل
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSystem);
    } else {
        initializeSystem();
    }

    // تصدير
    window.AdvancedEnhancementsV3 = {
        addItem: window.addItemWithAmount,
        updateTotal: window.updateOrderTotal,
        setupLines: window.setupProductionLinesVertical,
        addStats: window.addFinancialStatistics,
        addEmployee: window.addEmployeeOfMonthWidget,
        setEmployee: window.setEmployeeOfMonth
    };
})();
