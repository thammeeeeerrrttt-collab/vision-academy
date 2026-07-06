document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. إعدادات القائمة الجانبية (للهواتف) والتبديل بين الأقسام (SPA) ---
    const mobileMenu = document.getElementById('mobile-menu') || document.querySelector('.menu-toggle');
    const navList = document.getElementById('nav-list') || document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.view-section');

    // إظهار/إخفاء القائمة عند الضغط على الزر ☰
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // التبديل بين الأقسام وإغلاق القائمة التلقائي
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // منع المتصفح من القفز العشوائي
            
            // جلب اسم القسم المطلوب من الرابط (مثلاً: #courses)
            const targetId = this.getAttribute('href').substring(1);
            
            // إخفاء جميع الأقسام
            sections.forEach(sec => {
                sec.classList.remove('active-section');
            });
            
            // إزالة التمييز (الخط السماوي) من جميع روابط القائمة العلوية
            document.querySelectorAll('nav ul li a').forEach(nav => {
                nav.classList.remove('active-link');
            });

            // إظهار القسم المطلوب فقط
            const targetSection = document.getElementById(targetId);
            if(targetSection) {
                targetSection.classList.add('active-section');
                
                // تمييز الرابط الذي تم الضغط عليه (إذا كان داخل القائمة العلوية)
                if(this.classList.contains('nav-link') && this.parentElement && this.parentElement.tagName === 'LI') {
                    this.classList.add('active-link');
                }
                
                // رفع الشاشة لأعلى الصفحة بسلاسة
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            // إخفاء القائمة تلقائياً بعد اختيار أي رابط (لشاشات الجوال)
            if (window.innerWidth <= 768 && navList) {
                navList.classList.remove('active');
            }
        });
    });

    // --- 2. تأثير شريط التنقل (Navbar) عند التمرير لأسفل ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // إضافة خلفية داكنة وظل عند النزول
                nav.style.background = 'rgba(11, 19, 43, 0.98)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 180, 216, 0.3)';
                nav.style.padding = '10px 5%'; // تصغير حجم الشريط قليلاً
            } else {
                // العودة للشكل الشفاف في أعلى الصفحة
                nav.style.background = 'rgba(11, 19, 43, 0.85)';
                nav.style.boxShadow = 'none';
                nav.style.padding = '15px 5%';
            }
        });
    }

    // --- 3. إرسال بيانات الاستمارة عبر الواتساب ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة

            // استخراج البيانات من الحقول
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            
            // جلب اسم الكورس
            const courseSelect = this.querySelector('select');
            const courseName = courseSelect.options[courseSelect.selectedIndex].text;
            
            const notes = this.querySelector('textarea').value;

            // رقم الواتساب
            const whatsappNumber = "967774620348"; 

            // تنسيق الرسالة
            const message = `*طلب تسجيل جديد - أكاديمية Vision* 🎓\n\n` +
                            `*الاسم:* ${name}\n` +
                            `*الإيميل:* ${email}\n` +
                            `*رقم التواصل:* ${phone}\n` +
                            `*الكورس المطلوب:* ${courseName}\n` +
                            `*ملاحظات:* ${notes ? notes : 'لا يوجد'}`;

            // تشفير الرسالة وإنشاء الرابط
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // تأثير بصري للزر
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'جاري التحويل للواتساب... ⏳';
            btn.style.opacity = '0.8';

            // تأخير زمني بسيط ثم فتح الواتساب
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                
                // إعادة الزر لشكله الطبيعي وتفريغ الحقول
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                this.reset();
            }, 1000);
        });
    }
});
