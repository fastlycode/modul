// scripts/script.js - полный файл (исправленный: убраны алерты из раздела проектов)
document.addEventListener('DOMContentLoaded', function() {
    // ==================== ГЛАВНЫЙ СЛАЙДЕР ====================
    const mainSlider = new Swiper('.main-slider .swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="${className}"></span>`;
            },
        },
    });

    // ==================== СЛАЙДЕР РЕАЛИЗОВАННЫХ ПРОЕКТОВ ====================
    // Инициализируем слайдер для проектов
    const projectsSlider = new Swiper('.projects-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.projects-button-next',
            prevEl: '.projects-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 30
            }
        }
    });

    // Добавляем слайды для реализованных проектов (если их нет в HTML)
    // Добавляем слайды для реализованных проектов
const addProjectsSlides = () => {
    const projectsWrapper = document.querySelector('.projects-slider .swiper-wrapper');
    if (!projectsWrapper) return;

    // Очищаем wrapper (удаляем все существующие слайды)
    projectsWrapper.innerHTML = '';

    const projectsSlides = [
        {
            image: './images/realized1.jpg',
            title: 'Загородный дом в Подмосковье',
            description: 'Современный модульный дом площадью 120 м² с террасой и панорамными окнами'
        },
        {
            image: './images/realized2.jpg',
            title: 'Дачный дом в Калужской области',
            description: 'Компактный модульный дом 85 м² с сауной и зоной барбекю'
        },
        {
            image: './images/realized3.jpg',
            title: 'Банный комплекс в Тверской области',
            description: 'Модульная баня с комнатой отдыха и бассейном'
        },
        {
            image: './images/realized4.jpg',
            title: 'Гостевой дом в Ленинградской области',
            description: 'Двухэтажный модульный дом с 4 спальнями и гаражом'
        },
        {
            image: './images/realized5.jpg',
            title: 'Коттедж в Новгородской области',
            description: 'Экологичный дом площадью 150 м² с зимним садом'
        }
    ];

    projectsSlides.forEach(slide => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide projects-slide';
        slideDiv.style.backgroundImage = `url('${slide.image}')`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'projects-slide-content';

        const title = document.createElement('h4');
        title.className = 'projects-slide-title';
        title.textContent = slide.title;

        const desc = document.createElement('p');
        desc.className = 'projects-slide-description';
        desc.textContent = slide.description;

        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);
        slideDiv.appendChild(contentDiv);
        projectsWrapper.appendChild(slideDiv);
    });

    // Обновить слайдер после добавления слайдов
    if (projectsSlider) projectsSlider.update();
};

    // Вызываем функцию добавления слайдов
    addProjectsSlides();

    // ==================== ТАБЫ ПРОДУКТОВ (ДОМА/БАНИ) ====================
    const tabButtons = document.querySelectorAll('.products-tab');
    const tabContents = document.querySelectorAll('.products-grid');
    
    // Функция переключения табов
    const switchTab = (tabId) => {
        // Скрываем все табы
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Показываем выбранный таб
        const activeTab = document.getElementById(`${tabId}-tab`);
        if (activeTab) {
            activeTab.style.display = 'grid';
        }
        
        // Обновляем активную кнопку
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            }
        });
    };
    
    // Обработчики кликов по табам
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // ==================== КНОПКА "НАВЕРХ" ====================
    const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
            if (this.el) {
                this.el.classList.remove('btn-up_hide');
            }
        },
        hide() {
            if (this.el) {
                this.el.classList.add('btn-up_hide');
            }
        },
        addEventListener() {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                scrollY > 400 ? this.show() : this.hide();
            });
            
            if (this.el) {
                this.el.onclick = () => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                };
            }
        }
    };
    
    // Инициализируем кнопку "Наверх"
    btnUp.addEventListener();

    // ==================== МОБИЛЬНОЕ МЕНЮ ====================
    const burger = document.querySelector('.header-burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    // Функции открытия/закрытия меню
    const openMenu = () => {
        if (burger && mobileMenu) {
            burger.classList.add('open-menu');
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden'; // Запрещаем скролл страницы
        }
    };
    
    const closeMenu = () => {
        if (burger && mobileMenu) {
            burger.classList.remove('open-menu');
            mobileMenu.classList.remove('active');
            body.style.overflow = ''; // Восстанавливаем скролл
        }
    };
    
    // Открытие/закрытие по клику на бургер
    if (burger) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.classList.contains('open-menu')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Закрытие меню при клике на ссылку
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !burger.contains(e.target)) {
            closeMenu();
        }
    });

    // Закрытие меню при ресайзе окна (если перешли на десктоп)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // ==================== ПЛАВНАЯ ПРОКРУТКА ====================
    // Вспомогательная функция для получения позиции прокрутки
    function getScrollPosition(targetElement) {
        return targetElement.getBoundingClientRect().top + window.pageYOffset;
    }

    // Обработчики для всех ссылок с data-link
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-link');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Ищем заголовок h2 внутри секции, если есть – прокручиваем к нему
                const headerElement = targetSection.querySelector('h2');
                const elementToScroll = headerElement || targetSection;
                
                window.scrollTo({
                    top: getScrollPosition(elementToScroll),
                    behavior: 'smooth'
                });
                
                // Закрываем меню, если оно открыто
                closeMenu();
            }
        });
    });

    // Кнопка "Рассчитать стоимость" в главной секции
    const mainActionButton = document.getElementById('main-action-button');
    if (mainActionButton) {
        mainActionButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('choose');
            
            if (targetSection) {
                const headerElement = targetSection.querySelector('h2');
                const elementToScroll = headerElement || targetSection;
                
                window.scrollTo({
                    top: getScrollPosition(elementToScroll),
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==================== КНОПКИ "СМОТРЕТЬ ПРОЕКТ" ====================
    // Внимание: алерты убраны по просьбе пользователя
    const productButtons = document.querySelectorAll('.product-button');
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Действие временно отключено. Здесь можно будет добавить модальное окно или переход на страницу проекта.
            // console.log('Клик по кнопке "Смотреть проект"');
        });
    });

    // Кнопка "Смотреть все проекты"
    const viewAllButton = document.querySelector('.view-all-button');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            // Действие временно отключено.
            // console.log('Клик по кнопке "Смотреть все проекты"');
        });
    }

  // ==================== КНОПКИ "РАССЧИТАТЬ СТОИМОСТЬ" ====================
const calculateButtons = document.querySelectorAll('.features-content button');
calculateButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.getElementById('choose');
        if (targetSection) {
            const headerElement = targetSection.querySelector('h2');
            const elementToScroll = headerElement || targetSection;
            window.scrollTo({
                top: getScrollPosition(elementToScroll),
                behavior: 'smooth'
            });
        }
    });
});

    // ==================== ОБРАБОТЧИКИ ССЫЛОК КОНТАКТОВ ====================
    const contactLinks = document.querySelectorAll('.contacts-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем тип контакта из заголовка
            const contactTitle = this.closest('.contacts-item').querySelector('.contacts-title').textContent;
            const contactValue = this.closest('.contacts-item').querySelector('.contacts-description').textContent;
            
            
            if (contactTitle.includes('телеграмм')) {
                // Открытие Telegram
                window.open(`https://t.me/${contactValue.replace('@', '')}`, '_blank');
            } else if (contactTitle.includes('почта')) {
                // Открытие почтового клиента
                window.location.href = `mailto:${contactValue}`;
            }
        });
    });



    // ==================== ВАЛИДАЦИЯ И ПОДСКАЗКИ ====================
    // Проверяем, загрузились ли изображения для слайдеров
    window.addEventListener('load', () => {
        // Добавляем fallback для изображений, если они не загрузились
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            img.addEventListener('error', function() {
                // Заменяем сломанное изображение на заглушку
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMTcxNzE3Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNiZGZmMDciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
                this.alt = 'Изображение не загружено';
            });
        });
    });

    // ==================== АДАПТИВНОСТЬ ====================
    // Функция для проверки мобильного устройства
    const isMobile = () => window.innerWidth <= 768;
    
    // Обновляем слайдеры при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (mainSlider) mainSlider.update();
            if (projectsSlider) projectsSlider.update();
        }, 250);
    });

    // ==================== ИНИЦИАЛИЗАЦИЯ ====================
    console.log('MODUL Home - все скрипты загружены и работают!');
    
    // Проверяем начальное состояние
    if (window.innerWidth <= 768) {
        if (burger) burger.style.display = 'block';
        const menuElement = document.querySelector('.menu');
        if (menuElement) menuElement.style.display = 'none';
        const callAction = document.querySelector('.call-action');
        if (callAction) callAction.style.display = 'none';
        const contactIcons = document.querySelector('.contact-icons');
        if (contactIcons) contactIcons.style.display = 'none';
    }
});

// ==================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ====================
// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#44ff44' : '#bdff07'};
        color: #000;
        border-radius: 10px;
        z-index: 9999;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Добавляем стили для анимации уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .btn-up {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #bdff07;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0.8;
    }
    .btn-up:hover {
        opacity: 1;
        transform: scale(1.1);
    }
    .btn-up::before {
        content: "↑";
        font-size: 24px;
        font-weight: bold;
        color: #000;
    }
    .btn-up_hide {
        display: none;
    }
`;
document.head.appendChild(style);

// ==================== КВИЗ С МАСКОЙ ТЕЛЕФОНА И НОВЫМ ДИЗАЙНОМ ====================
(function() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;

    const quizSteps = document.querySelectorAll('.quiz-step');
    const prevBtn = document.getElementById('quiz-prev');
    const nextBtn = document.getElementById('quiz-next');
    const progressBar = document.getElementById('quiz-progress-bar');
    const stepDots = document.querySelectorAll('.quiz-step-dot');
    const phoneInput = document.getElementById('quiz-phone');
    const prevPlaceholder = document.querySelector('.quiz-prev-placeholder');

    if (!quizSteps.length || !prevBtn || !nextBtn || !progressBar || !stepDots.length) {
        console.warn('Квиз: не все элементы найдены, инициализация отменена');
        return;
    }

    let currentStep = 1;
    const totalSteps = quizSteps.length;

    let answers = {
        type: null,
        area: null,
        plan: null,
        region: null,
        phone: null
    };

    // ----- МАСКА ТЕЛЕФОНА -----
    function initPhoneMask() {
        if (!phoneInput) return;

        // Устанавливаем префикс +7 при фокусе, если поле пустое
        phoneInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7 ';
                setCaretPosition(this, 3); // ставим курсор после "+7 "
            }
        });

        phoneInput.addEventListener('input', function(e) {
            let input = e.target;
            let cursorPos = input.selectionStart;
            let oldLength = input.value.length;

            // Удаляем всё, кроме цифр и ведущего +
            let clean = input.value.replace(/[^\d+]/g, '');
            // Если нет + в начале, добавляем
            if (!clean.startsWith('+')) {
                clean = '+7' + clean.replace(/^7?/, ''); // если первая цифра 7, удаляем её, чтобы не дублировать
            }
            // Оставляем только + и цифры (максимум 12 символов: +7 и 10 цифр)
            let digits = clean.replace(/\D/g, '');
            if (digits.length > 11) digits = digits.slice(0, 11); // +7 + 10 цифр = 11 цифр

            // Форматируем: +7 (XXX) XXX-XX-XX
            let formatted = '+7';
            if (digits.length > 1) {
                formatted += ' (' + digits.slice(1, 4);
            }
            if (digits.length >= 5) {
                formatted += ') ' + digits.slice(4, 7);
            }
            if (digits.length >= 8) {
                formatted += '-' + digits.slice(7, 9);
            }
            if (digits.length >= 10) {
                formatted += '-' + digits.slice(9, 11);
            }
            // Если цифр мало, просто добавляем остаток без форматирования
            if (digits.length <= 1) formatted = '+7 ';

            input.value = formatted;

            // Корректируем позицию курсора
            let newLength = input.value.length;
            let diff = newLength - oldLength;
            if (diff > 0) cursorPos += diff;
            setCaretPosition(input, cursorPos);

            // Сохраняем чистые цифры (без +) в answers
            answers.phone = digits;
            checkNextAvailability(5);
        });

        // Вспомогательная функция для установки позиции курсора
        function setCaretPosition(input, pos) {
            if (input.setSelectionRange) {
                input.focus();
                input.setSelectionRange(pos, pos);
            }
        }

        // При потере фокуса, если остался только "+7 ", очищаем поле (необязательно)
        phoneInput.addEventListener('blur', function() {
            if (this.value === '+7 ' || this.value === '+7') {
                this.value = '';
                answers.phone = null;
                checkNextAvailability(5);
            }
        });
    }

    // Вызовем после инициализации квиза
    initPhoneMask();

    // ----- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ ШАГОВ -----
    function showStep(step) {
        quizSteps.forEach(s => s.classList.remove('active'));
        const activeStep = document.querySelector(`.quiz-step[data-step="${step}"]`);
        if (activeStep) activeStep.classList.add('active');

        progressBar.style.width = (step / totalSteps * 100) + '%';

        stepDots.forEach(dot => {
            dot.classList.remove('active');
            if (parseInt(dot.dataset.step) === step) dot.classList.add('active');
        });

        if (step === 1) {
            prevBtn.style.display = 'none';
            if (prevPlaceholder) prevPlaceholder.style.display = 'inline-block';
        } else {
            prevBtn.style.display = 'inline-block';
            if (prevPlaceholder) prevPlaceholder.style.display = 'none';
        }

        prevBtn.disabled = (step === 1);
        nextBtn.textContent = (step === totalSteps) ? 'Завершить' : 'Далее';

        checkNextAvailability(step);
    }

    function checkNextAvailability(step) {
        let canGoNext = false;
        switch (step) {
            case 1: canGoNext = answers.type !== null; break;
            case 2: canGoNext = answers.area !== null; break;
            case 3: canGoNext = answers.plan !== null; break;
            case 4: canGoNext = answers.region !== null; break;
            case 5: canGoNext = !!(answers.phone && answers.phone.length >= 11); break; // минимум 11 цифр (включая 7)
        }
        nextBtn.disabled = !canGoNext;
    }

    // ----- ОБРАБОТЧИКИ ВЫБОРА ВАРИАНТОВ (шаги 1-3) -----
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', function() {
            const parentStep = this.closest('.quiz-step');
            if (!parentStep) return;

            const step = parseInt(parentStep.dataset.step);
            // Убираем выделение у всех опций этого шага
            parentStep.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');

            const value = this.dataset.value;
            switch (step) {
                case 1: answers.type = value; break;
                case 2: answers.area = value; break;
                case 3: answers.plan = value; break;
            }
            checkNextAvailability(step);
        });
    });

    // Радио-кнопки (шаг 4)
    const regionRadios = document.querySelectorAll('input[name="region"]');
    regionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            answers.region = this.value;
            checkNextAvailability(4);
        });
    });

    // Кнопка "Далее" / "Завершить"
    nextBtn.addEventListener('click', function() {
        if (currentStep === totalSteps) {
            console.log('Ответы квиза:', answers);
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
            // Здесь можно отправить данные на сервер
        } else {
            if (!nextBtn.disabled) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });

    // Кнопка "Назад"
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Переход по точкам (только к уже открытым шагам)
    stepDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            if (step <= currentStep) {
                currentStep = step;
                showStep(step);
            }
        });
    });

    // Старт
    showStep(1);
})();