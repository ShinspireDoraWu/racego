/**
 * Modal 彈窗功能模組
 * 處理所有彈窗的開啟、關閉與互動
 */

const Modal = {
    /**
     * 初始化所有 Modal 功能
     */
    init() {
        this.setupCloseButtons();
        this.setupBackdropClick();
    },

    /**
     * 開啟指定的 Modal
     * @param {string} modalId - Modal 的 ID
     */
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景滾動
        }
    },

    /**
     * 關閉指定的 Modal
     * @param {string} modalId - Modal 的 ID
     */
    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 恢復背景滾動
        }
    },

    /**
     * 關閉所有開啟的 Modal
     */
    closeAll() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            modal.classList.remove('show');
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    },

    /**
     * 設定關閉按鈕的事件監聽
     */
    setupCloseButtons() {
        const closeButtons = document.querySelectorAll('.modal-close, [data-modal-close]');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    Modal.close(modal.id);
                }
            });
        });
    },

    /**
     * 設定點擊背景關閉 Modal
     */
    setupBackdropClick() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    Modal.close(this.id);
                }
            });
        });
    },

    /**
     * 設定開啟按鈕
     * 為所有帶有 data-modal-target 屬性的元素添加點擊事件
     */
    setupOpenButtons() {
        const openButtons = document.querySelectorAll('[data-modal-target]');
        
        openButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetModal = this.getAttribute('data-modal-target');
                Modal.open(targetModal);
            });
        });
    }
};

// ESC 鍵關閉 Modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        Modal.closeAll();
    }
});

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    Modal.init();
    Modal.setupOpenButtons();
});

// 提供全域函數以便向後兼容
function openModal(modalId) {
    Modal.open(modalId);
}

function closeModal(modalId) {
    Modal.close(modalId);
}
