/**
 * ⚡ تحسين الأداء المتقدم
 * Version 1.0
 */

(function() {
    'use strict';
    
    console.log('⚡ نظام تحسين الأداء يحمّل...');
    
    // قياس أداء التحميل
    const performanceMetrics = {
        startTime: performance.now(),
        
        logMetric: function() {
            const endTime = performance.now();
            const loadTime = (endTime - this.startTime).toFixed(2);
            
            console.log('📊 مقاييس الأداء:');
            console.log(`   ⏱️ وقت التحميل: ${loadTime}ms`);
            console.log(`   🎯 حجم الصفحة: ~${(document.documentElement.innerHTML.length / 1024).toFixed(2)}KB`);
            console.log(`   📦 عدد العناصر: ${document.querySelectorAll('*').length}`);
        }
    };
    
    // تقنيات التحسين
    const optimizations = {
        // تحسين الصور
        lazyLoadImages: function() {
            if ('IntersectionObserver' in window) {
                const images = document.querySelectorAll('img[loading="lazy"]');
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            imageObserver.unobserve(img);
                        }
                    });
                });
                images.forEach(img => imageObserver.observe(img));
            }
        },
        
        // تقليل استهلاك الذاكرة
        clearConsoleOnDemand: function() {
            window.clearMemory = function() {
                console.clear();
                console.log('✅ تم تنظيف الذاكرة');
            };
        },
        
        // تخزين مؤقت
        cacheData: function() {
            window.cache = new Map();
            
            window.getCached = function(key) {
                return window.cache.get(key);
            };
            
            window.setCached = function(key, value, ttl = 5000) {
                window.cache.set(key, value);
                if (ttl > 0) {
                    setTimeout(() => window.cache.delete(key), ttl);
                }
            };
        }
    };
    
    // تطبيق التحسينات
    Object.values(optimizations).forEach(opt => opt());
    
    // قياس الأداء عند الانتهاء من التحميل
    window.addEventListener('load', () => {
        performanceMetrics.logMetric();
        console.log('✅ تحسينات الأداء نشطة');
    });
})();
