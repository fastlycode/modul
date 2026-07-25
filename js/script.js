document.addEventListener('DOMContentLoaded', function() {

    const mainSlider = new Swiper('.main-slider .swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        slidesPerView: 1,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="${className}"></span>`;
            },
        },
    });

    const projectsSlider = new Swiper('.projects-slider', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        slidesPerView: 1,
        loop: true,
        navigation: {
            nextEl: '.projects-button-next',
            prevEl: '.projects-button-prev',
        },
    });

    const addProjectsSlides = () => {
        const wrapper = document.querySelector('.projects-slider .swiper-wrapper');
        if (!wrapper) return;
        wrapper.innerHTML = '';
        const slides = [
            { image: './images/realized1.png', title: 'Загородный дом в Подмосковье', desc: 'Современный модульный дом 120 м² с террасой и панорамными окнами' },
            { image: './images/realized2.png', title: 'Дачный дом в Калужской области', desc: 'Компактный модульный дом 85 м² с сауной и зоной барбекю' },
            { image: './images/realized3.png', title: 'Банный комплекс в Тверской области', desc: 'Модульная баня с комнатой отдыха и бассейном' },
            { image: './images/realized4.png', title: 'Гостевой дом в Ленинградской области', desc: 'Трехэтажный модульный дом с 4 спальнями и гаражом' },
            { image: './images/realized5.png', title: 'Коттедж в Новгородской области', desc: 'Экологичный дом 150 м² с зимним садом' }
        ];
        slides.forEach(s => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide projects-slide';
            slide.style.backgroundImage = `url('${s.image}')`;
            slide.style.backgroundColor = '#1B1B1B';
            slide.innerHTML = `
                <div class="projects-slide-glass">
                    <h4>${s.title}</h4>
                    <p>${s.desc}</p>
                </div>
            `;
            wrapper.appendChild(slide);
        });
        projectsSlider.update();
        projectsSlider.slideTo(0, 0);
    };
    addProjectsSlides();

    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.modal-close');
    const modalImg = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalArea = document.getElementById('modal-area');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-description');

    const projectDescriptions = {
        'Каркасный дом Sunny Haven': 'Просторный дом с открытой планировкой, большими окнами и террасой. Идеален для семьи, любящей свет и уют. Высокий потолок, современная отделка, панорамное остекление. Дом оборудован системой «умный дом».',
        'Каркасный дом EcoNest': 'Экологичный дом из натуральных материалов с продуманной системой энергосбережения. 3 спальни, гостиная с камином, просторная кухня-столовая. Участок 10 соток, ландшафтный дизайн в стиле «эко».',
        'Каркасный дом Modular Oasis': 'Модульный дом с террасой и мансардой. 4 спальни, две ванные комнаты, гараж на 2 машины. Панорамные окна, высокие потолки, система климат-контроля. Отличный вариант для круглогодичного проживания.',
        'Каркасный дом FlexiLiving': 'Гибкая планировка позволяет адаптировать пространство под любые задачи. 2 спальни + кабинет, большая гостиная, выход на террасу. Дом построен по каркасной технологии с утеплителем 200 мм.',
        'Каркасный дом DreamSpace': 'Дом-мечта с отдельным блоком для гостей. Просторная кухня-гостиная, 3 спальни, сауна, гараж. Внутренняя отделка из массива дерева, терраса с видом на лес. Участок 15 соток.',
        'Каркасный дом Sunny Haven (102 м²)': 'Уютный вариант дома Sunny Haven меньшей площади – 102 м². 2 спальни, гостиная с кухней, терраса. Экономичный и тёплый, подойдёт для постоянного проживания или дачи.',
        'Баня "Классика"': 'Традиционная русская баня из бруса с парилкой и комнатой отдыха. Есть предбанник и небольшая веранда. Отличный выбор для загородного участка. Вместимость до 4 человек.',
        'Баня "Спа-люкс"': 'Баня премиум-класса с бассейном, джакузи и зоной релаксации. Панорамное остекление, современный дизайн. В комплекте – паровая комната, душ и комната для массажа.',
        'Баня "Дачная"': 'Компактная и недорогая баня для дачи. Парилка, моечная, небольшое помещение для отдыха. Быстрая сборка, лёгкая конструкция, доступная цена.',
        'Баня "Парная"': 'Аутентичная парная с высокой влажностью – настоящий финский опыт. Древесина осины и липы, печь-каменка. Есть терраса для чаепития на свежем воздухе.',
        'Баня "Семейная"': 'Большая баня с комнатой для всей семьи, кухонным уголком и бассейном. Два этажа, спальни на втором этаже, панорамный вид на сад. Идеальна для отдыха с детьми.',
        'Баня "Мини"': 'Мобильная мини-баня для небольшого участка. Быстро отапливается, занимает мало места. Парилка и душевая – всё что нужно для полноценного отдыха.'
    };

    function openModal(title, area, price, img) {
        modalImg.src = img || './images/default-project.jpg';
        modalTitle.textContent = title;
        modalArea.textContent = 'Площадь: ' + area;
        modalPrice.textContent = 'Цена: ' + price;
        const desc = projectDescriptions[title] || 'Подробности уточняйте у менеджера. Современное модульное решение с высоким качеством материалов и индивидуальным подходом.';
        modalDesc.textContent = desc;
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    document.querySelectorAll('.product-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.products-item');
            if (!card) return;
            const title = card.querySelector('.product-title')?.textContent || 'Проект';
            const areaRaw = card.querySelector('.product-area')?.textContent.trim() || '';
            const area = areaRaw.replace(/^Площадь:\s*/, '').trim();
            const priceRaw = card.querySelector('.product-price')?.textContent.trim() || '';
            const price = priceRaw.replace(/^Цена:\s*/, '').trim();
            const img = card.querySelector('.product-image')?.src || '';
            openModal(title, area, price, img);
        });
    });

    const tabs = document.querySelectorAll('.products-tab');
    const grids = document.querySelectorAll('.products-grid');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.tab;
            grids.forEach(g => g.style.display = 'none');
            document.getElementById(target + '-tab').style.display = 'grid';
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const btnUp = document.querySelector('.btn-up');
    window.addEventListener('scroll', () => {
        const footer = document.querySelector('footer');
        if (!footer) return;
        const footerHeight = footer.offsetHeight;
        const scrollPos = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const shouldShow = scrollPos > 400 && (scrollPos + windowHeight < docHeight - footerHeight);
        btnUp.classList.toggle('btn-up_hide', !shouldShow);
    });
    btnUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const burger = document.querySelector('.header-burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    function toggleMenu(open) {
        if (open === undefined) {
            open = !mobileMenu.classList.contains('active');
        }
        if (open) {
            mobileMenu.classList.add('active');
            burger?.classList.add('open-menu');
        } else {
            mobileMenu.classList.remove('active');
            burger?.classList.remove('open-menu');
        }
    }

    if (burger) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !burger?.contains(e.target)) {
            toggleMenu(false);
        }
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    const menuClose = document.querySelector('.mobile-menu-close');
    if (menuClose) {
        menuClose.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu(false);
        });
    }

    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById(this.dataset.link);
            if (target) {
                const top = (target.querySelector('h2') || target).getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
    document.getElementById('main-action-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById('choose');
        if (target) {
            const top = (target.querySelector('h2') || target).getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
    document.querySelectorAll('.features-content button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('choose');
            if (target) {
                const top = (target.querySelector('h2') || target).getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    (function() {
        const container = document.querySelector('.quiz-container');
        if (!container) return;

        const steps = document.querySelectorAll('.quiz-step');
        const prevBtn = document.getElementById('quiz-prev');
        const nextBtn = document.getElementById('quiz-next');
        const progress = document.getElementById('quiz-progress-bar');
        const dots = document.querySelectorAll('.quiz-step-dot');
        const phoneInput = document.getElementById('quiz-phone');

        let current = 0;
        const total = steps.length;

        const answers = {
            type: null,
            area: null,
            plan: null,
            region: null,
            phone: null
        };

        function showStep(index) {
            steps.forEach((s, i) => {
                s.classList.toggle('active', i === index);
            });
            progress.style.width = ((index + 1) / total * 100) + '%';
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            prevBtn.style.display = index === 0 ? 'none' : 'inline-block';
            prevBtn.disabled = index === 0;
            nextBtn.textContent = index === total - 1 ? 'Завершить' : 'Далее';
            checkNext();
        }

        function checkNext() {
            let can = false;
            switch (current) {
                case 0: can = answers.type !== null; break;
                case 1: can = answers.area !== null; break;
                case 2: can = answers.plan !== null; break;
                case 3: can = answers.region !== null; break;
                case 4: can = !!(answers.phone && answers.phone.length >= 11); break;
            }
            nextBtn.disabled = !can;
        }

        document.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', function() {
                const step = parseInt(this.closest('.quiz-step').dataset.step) - 1;
                this.closest('.quiz-step').querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                const value = this.dataset.value;
                if (step === 0) answers.type = value;
                else if (step === 1) answers.area = value;
                else if (step === 2) answers.plan = value;
                checkNext();
            });
        });

        document.querySelectorAll('input[name="region"]').forEach(radio => {
            radio.addEventListener('change', function() {
                answers.region = this.value;
                checkNext();
            });
        });

        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let val = this.value.replace(/\D/g, '');
                if (val.length > 11) val = val.slice(0, 11);
                let formatted = '+7';
                if (val.length > 1) formatted += ' (' + val.slice(1, 4);
                if (val.length >= 5) formatted += ') ' + val.slice(4, 7);
                if (val.length >= 8) formatted += '-' + val.slice(7, 9);
                if (val.length >= 10) formatted += '-' + val.slice(9, 11);
                this.value = formatted;
                answers.phone = val;
                checkNext();
            });
        }

        nextBtn.addEventListener('click', function() {
            if (current === total - 1) {
                showSuccessMessage();
                console.log('Ответы:', answers);
            } else {
                if (!this.disabled) {
                    current++;
                    showStep(current);
                }
            }
        });

        prevBtn.addEventListener('click', function() {
            if (current > 0) {
                current--;
                showStep(current);
            }
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                if (index <= current) {
                    current = index;
                    showStep(current);
                }
            });
        });

        showStep(0);

        function showSuccessMessage() {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            const message = document.createElement('div');
            message.style.cssText = `
                padding: 40px 20px;
                text-align: center;
                color: #fff;
                font-size: 24px;
                font-family: 'Roboto', sans-serif;
                font-weight: 300;
                line-height: 1.5;
            `;
            message.innerHTML = `
                <p style="margin-bottom: 20px;">Заявка принята!</p>
                <p style="font-size: 18px; color: #ccc;">Мы свяжемся с вами в течение 15 минут.</p>
            `;
            container.appendChild(message);
        }

    })();

});