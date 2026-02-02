/**
 * 導覽列功能模組
 * 處理所有與導覽相關的互動功能
 */

const Navigation = {
    /**
     * 初始化導覽列功能
     */
    init() {
        this.setupActiveLinks();
        this.setupMobileMenu();
    },

    /**
     * 設定當前頁面的活動連結
     */
    setupActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav a, .nav-links a, .sidebar-menu li a, .sidebar-nav-item');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath && currentPath.includes(linkPath)) {
                link.classList.add('active');
            }
        });
    },

    /**
     * 設定側邊欄導覽切換
     */
    setupSidebarNav() {
        const navItems = document.querySelectorAll('.sidebar-nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // 移除所有活動狀態
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // 添加當前活動狀態
                this.classList.add('active');
                
                // 顯示對應的內容區域
                const targetId = this.getAttribute('data-target');
                if (targetId) {
                    Navigation.showContentSection(targetId);
                }
            });
        });
    },

    /**
     * 顯示指定的內容區域
     */
    showContentSection(sectionId) {
        // 隱藏所有內容區域
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // 顯示指定區域
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    },

    /**
     * 設定手機版選單
     */
    setupMobileMenu() {
        // 這裡可以加入手機版選單切換邏輯
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav, .nav-links');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('show');
            });
        }
    }
};

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    Navigation.setupSidebarNav();
});
