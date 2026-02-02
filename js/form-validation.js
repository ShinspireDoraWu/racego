/**
 * 表單驗證模組
 * 處理表單驗證與互動邏輯
 */

const FormValidation = {
    /**
     * 初始化表單驗證
     */
    init() {
        this.setupFormSubmit();
        this.setupRealTimeValidation();
    },

    /**
     * 驗證必填欄位
     * @param {HTMLElement} input - 輸入欄位元素
     * @returns {boolean} 是否通過驗證
     */
    validateRequired(input) {
        const value = input.value.trim();
        if (value === '') {
            this.showError(input, '此欄位為必填');
            return false;
        }
        this.clearError(input);
        return true;
    },

    /**
     * 驗證 Email 格式
     * @param {HTMLElement} input - Email 輸入欄位
     * @returns {boolean} 是否通過驗證
     */
    validateEmail(input) {
        const value = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(value)) {
            this.showError(input, '請輸入有效的 Email 地址');
            return false;
        }
        this.clearError(input);
        return true;
    },

    /**
     * 驗證電話號碼
     * @param {HTMLElement} input - 電話輸入欄位
     * @returns {boolean} 是否通過驗證
     */
    validatePhone(input) {
        const value = input.value.trim();
        const phoneRegex = /^09\d{8}$/;
        
        if (!phoneRegex.test(value)) {
            this.showError(input, '請輸入有效的手機號碼（格式：09xxxxxxxx）');
            return false;
        }
        this.clearError(input);
        return true;
    },

    /**
     * 驗證身分證字號
     * @param {HTMLElement} input - 身分證字號輸入欄位
     * @returns {boolean} 是否通過驗證
     */
    validateIdNumber(input) {
        const value = input.value.trim().toUpperCase();
        const idRegex = /^[A-Z][12]\d{8}$/;
        
        if (!idRegex.test(value)) {
            this.showError(input, '請輸入有效的身分證字號');
            return false;
        }
        this.clearError(input);
        return true;
    },

    /**
     * 顯示錯誤訊息
     * @param {HTMLElement} input - 輸入欄位元素
     * @param {string} message - 錯誤訊息
     */
    showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            
            // 移除舊的錯誤訊息
            const oldError = formGroup.querySelector('.error-message');
            if (oldError) {
                oldError.remove();
            }
            
            // 添加新的錯誤訊息
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
        }
    },

    /**
     * 清除錯誤訊息
     * @param {HTMLElement} input - 輸入欄位元素
     */
    clearError(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    },

    /**
     * 驗證整個表單
     * @param {HTMLFormElement} form - 表單元素
     * @returns {boolean} 表單是否通過驗證
     */
    validateForm(form) {
        let isValid = true;
        
        // 驗證所有必填欄位
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!this.validateRequired(input)) {
                isValid = false;
            }
        });
        
        // 驗證 Email 欄位
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (input.value.trim() !== '' && !this.validateEmail(input)) {
                isValid = false;
            }
        });
        
        // 驗證電話欄位
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            if (input.value.trim() !== '' && !this.validatePhone(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    },

    /**
     * 設定表單提交事件
     */
    setupFormSubmit() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (this.validateForm(form)) {
                    // 表單驗證通過，可以提交
                    console.log('表單驗證通過');
                    // form.submit(); // 實際提交表單
                } else {
                    // 捲動到第一個錯誤欄位
                    const firstError = form.querySelector('.form-group.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    },

    /**
     * 設定即時驗證
     */
    setupRealTimeValidation() {
        // Email 欄位即時驗證
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() !== '') {
                    this.validateEmail(input);
                }
            });
        });
        
        // 電話欄位即時驗證
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() !== '') {
                    this.validatePhone(input);
                }
            });
        });
        
        // 必填欄位失焦時驗證
        const requiredInputs = document.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateRequired(input);
            });
        });
    }
};

// 頁面載入完成後初始化
document.addEventListener('DOMContentLoaded', () => {
    FormValidation.init();
});
