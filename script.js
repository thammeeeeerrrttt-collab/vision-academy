document.addEventListener('DOMContentLoaded', () => {
    
    // 1. نظام التبديل السلس بين الأقسام (Single Page Application)
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.view-section');

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
                if(this.classList.contains('nav-link') && this.parentElement.tagName === 'LI') {
                    this.classList.add('active-link');
                }
                
                // رفع الشاشة لأعلى الصفحة بسلاسة
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. تأثير شريط التنقل (Navbar) عند التمرير لأسفل
    const nav = document.querySelector('nav');
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
const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // منع إعادة تحميل الصفحة

            // 1. استخراج البيانات من الحقول
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            
            // جلب اسم الكورس بدلاً من الـ value
            const courseSelect = this.querySelector('select');
            const courseName = courseSelect.options[courseSelect.selectedIndex].text;
            
            const notes = this.querySelector('textarea').value;

            // 2. رقم الواتساب الخاص بك (ضع رقمك هنا مع مفتاح الدولة 967 بدون أصفار أو +)
            const whatsappNumber = "967774620348"; 

            // 3. تنسيق الرسالة بشكل أنيق ومرتب
            const message = `*طلب تسجيل جديد - أكاديمية Vision* 🎓\n\n` +
                            `*الاسم:* ${name}\n` +
                            `*الإيميل:* ${email}\n` +
                            `*رقم التواصل:* ${phone}\n` +
                            `*الكورس المطلوب:* ${courseName}\n` +
                            `*ملاحظات:* ${notes ? notes : 'لا يوجد'}`;

            // 4. تشفير الرسالة لتكون متوافقة مع الروابط (URL Encoding)
            const encodedMessage = encodeURIComponent(message);

            // 5. إنشاء رابط الواتساب
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // تأثير بصري للزر أثناء التحويل
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'جاري التحويل للواتساب... ⏳';
            btn.style.opacity = '0.8';

            // تأخير زمني بسيط ثم فتح الواتساب
            setTimeout(() => {
                // فتح رابط الواتساب في نافذة جديدة
                window.open(whatsappUrl, '_blank');
                
                // إعادة الزر لشكله الطبيعي وتفريغ الحقول
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                this.reset();
            }, 1000);
        });
    }
});
