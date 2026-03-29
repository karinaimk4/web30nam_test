/**
 * SHARED.JS — Triển lãm 30 Năm
 * JavaScript dùng chung cho toàn bộ dự án
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. NAVBAR: SCROLL SHRINK + MOBILE TOGGLE
       ========================================== */
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        // Đóng menu khi click link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // Active link highlight theo URL hiện tại
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentFile || (href === 'index.html' && currentFile === '')) {
            a.classList.add('active');
        }
    });


    /* ==========================================
       2. SCROLL REVEAL — fade + slide up
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    }


    /* ==========================================
       3. PROGRESS BAR ANIMATION (khi vào viewport)
       ========================================== */
    const progressBars = document.querySelectorAll('.progress-bar-fill[data-width]');
    if (progressBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const w = fill.dataset.width || '45%';
                    fill.style.setProperty('--target-width', w);
                    fill.classList.add('animated');
                    barObserver.unobserve(fill);
                }
            });
        }, { threshold: 0.5 });
        progressBars.forEach(bar => barObserver.observe(bar));
    }


    /* ==========================================
       4. COUNTER ANIMATION (số đếm)
       ========================================== */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count.replace(/[^0-9]/g, ''));
                    const suffix = el.dataset.count.replace(/[0-9]/g, '');
                    const duration = 1400;
                    const step = target / (duration / 16);
                    let current = 0;
                    const tick = () => {
                        current += step;
                        if (current < target) {
                            el.textContent = Math.floor(current).toLocaleString('vi-VN') + suffix;
                            requestAnimationFrame(tick);
                        } else {
                            el.textContent = target.toLocaleString('vi-VN') + suffix;
                        }
                    };
                    tick();
                    countObserver.unobserve(el);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(c => countObserver.observe(c));
    }


    /* ==========================================
       5. INTERACTIVE TIMELINE (vertical, body.html)
       ========================================== */
    const timelineNavNodes = document.querySelectorAll('.timeline-nav-node');
    const timelinePanels = document.querySelectorAll('.timeline-panel');

    if (timelineNavNodes.length > 0) {
        timelineNavNodes.forEach(node => {
            node.addEventListener('click', function () {
                const target = this.dataset.target;
                timelineNavNodes.forEach(n => n.classList.remove('active'));
                timelinePanels.forEach(p => {
                    p.classList.remove('active');
                    p.style.animation = 'none';
                });
                this.classList.add('active');
                const panel = document.getElementById(target);
                if (panel) {
                    // Reset animation
                    void panel.offsetWidth;
                    panel.style.animation = '';
                    panel.classList.add('active');
                }
            });
        });
    }


    /* ==========================================
       6. HORIZONTAL TIMELINE (lichsu.html)
       ========================================== */
    const hTimeline = document.querySelectorAll('.timeline-node-wrap');
    if (hTimeline.length > 0) {
        hTimeline.forEach(wrap => {
            wrap.addEventListener('click', function () {
                hTimeline.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                // Kích hoạt panel tương ứng nếu có
                const targetId = this.dataset.target;
                if (targetId) {
                    document.querySelectorAll('.term-panel').forEach(p => p.classList.remove('active'));
                    const panel = document.getElementById(targetId);
                    if (panel) panel.classList.add('active');
                }
            });
        });
    }


    /* ==========================================
       7. VIDEO THUMBNAIL HOVER PULSE
       ========================================== */
    document.querySelectorAll('.video-thumbnail, .video-large').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const btn = thumb.querySelector('.play-btn');
            if (btn) {
                btn.style.transform = 'translate(-50%, -50%) scale(0.9)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            }
            // Placeholder: mở modal video nếu có
            const videoSrc = thumb.dataset.video;
            if (videoSrc) openVideoModal(videoSrc);
        });
    });


    /* ==========================================
       8. STAT ROW HOVER HIGHLIGHT
       ========================================== */
    document.querySelectorAll('.stat-row').forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.background = '#f8fafc';
            row.style.borderRadius = '8px';
            row.style.paddingLeft = '8px';
        });
        row.addEventListener('mouseleave', () => {
            row.style.background = '';
            row.style.paddingLeft = '';
        });
    });


    /* ==========================================
       9. BACK TO TOP BUTTON
       ========================================== */
    const backBtn = document.getElementById('back-to-top');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            backBtn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ==========================================
       10. IMAGE LAZY LOAD + FADE IN
       ========================================== */
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.transition = 'opacity 0.5s ease';
                        img.style.opacity = '1';
                    };
                    imgObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        lazyImages.forEach(img => imgObserver.observe(img));
    }


    /* ==========================================
       11. PAGE FADE IN on load
       ========================================== */
    document.body.classList.add('page-fade-in');


    /* ==========================================
       12. ACTIVE NAV AUTO-SET
       ========================================== */
    function setActiveNav() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            if (href === filename || (!filename && href === 'index.html') ||
                (filename === 'body.html' && href === 'index.html')) {
                a.classList.add('active');
            }
        });
    }
    setActiveNav();

});


/* ==========================================
   VIDEO MODAL (global helper)
   ========================================== */
function openVideoModal(src) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:9999;
        display:flex; align-items:center; justify-content:center;
        animation: fadeIn 0.3s ease;
    `;
    modal.innerHTML = `
        <div style="position:relative; max-width:860px; width:90%; border-radius:12px; overflow:hidden;">
            <video src="${src}" controls autoplay style="width:100%; display:block; border-radius:12px;"></video>
            <button onclick="this.closest('[data-modal]').remove()" style="
                position:absolute; top:10px; right:10px;
                background:rgba(0,0,0,0.6); color:white; border:none;
                width:34px; height:34px; border-radius:50%; cursor:pointer;
                font-size:1.1rem; display:flex; align-items:center; justify-content:center;
            ">✕</button>
        </div>
    `;
    modal.setAttribute('data-modal', '');
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
}
