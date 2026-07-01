(function () {
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('ready');

        const toggleBtn = document.querySelector('.nav-toggle');
        const menuContent = document.querySelector('.nav-menu-content');

        if (toggleBtn && menuContent) {
            toggleBtn.addEventListener('click', () => {
                toggleBtn.classList.toggle('is-active');
                menuContent.classList.toggle('is-active');

                const isOpen = toggleBtn.classList.contains('is-active');
                toggleBtn.setAttribute('aria-expanded', isOpen);
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    toggleBtn.classList.remove('is-active');
                    menuContent.classList.remove('is-active');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                });
            });
        }

        const accordionButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
        accordionButtons.forEach(button => {
            const target = document.querySelector(button.dataset.bsTarget);
            const parentSelector = button.dataset.bsParent;

            button.addEventListener('click', () => {
                if (!target) return;

                const isOpen = target.classList.contains('show');

                if (parentSelector) {
                    const parent = document.querySelector(parentSelector);
                    if (parent) {
                        parent.querySelectorAll('.accordion-collapse.show').forEach(openItem => {
                            if (openItem !== target) {
                                openItem.classList.remove('show');
                                const toggle = openItem.previousElementSibling?.querySelector('[data-bs-toggle="collapse"]');
                                if (toggle) {
                                    toggle.classList.add('collapsed');
                                    toggle.setAttribute('aria-expanded', 'false');
                                }
                            }
                        });
                    }
                }

                if (isOpen) {
                    target.classList.remove('show');
                    button.classList.add('collapsed');
                    button.setAttribute('aria-expanded', 'false');
                } else {
                    target.classList.add('show');
                    button.classList.remove('collapsed');
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
    });

    const navWrap = document.querySelector('.glass-nav-wrap');

    window.addEventListener('scroll', () => {
        // window.innerHeight gets the height of the user's screen.
        // We subtract 80px so it switches just slightly before the section ends.
        const switchPoint = window.innerHeight - 50;

        if (window.scrollY > switchPoint) {
            navWrap.classList.add('scrolled');
        } else {
            navWrap.classList.remove('scrolled');
        }
    });

})();
