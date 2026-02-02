/**
 * 通用工具函式模組
 * 提供常用的工具函式
 */

const Utils = {
    /**
     * 格式化日期
     * @param {Date|string} date - 日期物件或字串
     * @param {string} format - 格式（default: YYYY-MM-DD）
     * @returns {string} 格式化後的日期字串
     */
    formatDate(date, format = 'YYYY-MM-DD') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes);
    },

    /**
     * 格式化金額
     * @param {number} amount - 金額
     * @returns {string} 格式化後的金額字串
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('zh-TW', {
            style: 'currency',
            currency: 'TWD',
            minimumFractionDigits: 0
        }).format(amount);
    },

    /**
     * 顯示載入中狀態
     * @param {HTMLElement} element - 要顯示載入狀態的元素
     * @param {string} message - 載入訊息
     */
    showLoading(element, message = '載入中...') {
        if (element) {
            element.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>${message}</p>
                </div>
            `;
        }
    },

    /**
     * 顯示提示訊息
     * @param {string} message - 提示訊息
     * @param {string} type - 訊息類型（success, error, warning, info）
     * @param {number} duration - 顯示時長（毫秒）
     */
    showToast(message, type = 'info', duration = 3000) {
        // 創建 toast 容器（如果不存在）
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(toastContainer);
        }

        // 創建 toast 元素
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            animation: slideIn 0.3s ease;
        `;

        // 設定圖示和顏色
        const icons = {
            success: { icon: 'fa-check-circle', color: '#28a745' },
            error: { icon: 'fa-times-circle', color: '#dc3545' },
            warning: { icon: 'fa-exclamation-triangle', color: '#ffc107' },
            info: { icon: 'fa-info-circle', color: '#17a2b8' }
        };

        const config = icons[type] || icons.info;

        toast.innerHTML = `
            <i class="fas ${config.icon}" style="color: ${config.color}; font-size: 20px;"></i>
            <span style="flex: 1; color: #333;">${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; color: #999; font-size: 18px;">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // 自動移除
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * 確認對話框
     * @param {string} message - 確認訊息
     * @returns {Promise<boolean>} 使用者確認結果
     */
    confirm(message) {
        return new Promise((resolve) => {
            if (window.confirm(message)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    },

    /**
     * 節流函式
     * @param {Function} func - 要執行的函式
     * @param {number} wait - 等待時間（毫秒）
     * @returns {Function} 節流後的函式
     */
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 防抖函式
     * @param {Function} func - 要執行的函式
     * @param {number} wait - 等待時間（毫秒）
     * @returns {Function} 防抖後的函式
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * 複製文字到剪貼簿
     * @param {string} text - 要複製的文字
     * @returns {Promise<boolean>} 是否成功複製
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('已複製到剪貼簿', 'success');
            return true;
        } catch (err) {
            this.showToast('複製失敗', 'error');
            return false;
        }
    },

    /**
     * 平滑滾動到指定元素
     * @param {string|HTMLElement} target - 目標元素或選擇器
     */
    scrollTo(target) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
        
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
};

// 添加必要的 CSS 動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
