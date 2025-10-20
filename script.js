document.addEventListener('DOMContentLoaded', () => {
    
    const translations = {
        vi: {
            // --- CÁC BẢN DỊCH CHUNG ĐÃ BỔ SUNG ---
            edit: 'Sửa',
            delete: 'Xóa',
            close_btn: 'Đóng',
            save_changes_btn: 'Lưu Thay Đổi',
            cancel_btn: 'Hủy',
            actions: 'Hành Động',
            reason: 'Lý do',
            status: 'Trạng thái',
            total: 'Tổng cộng:',
            empty_data: 'Chưa có dữ liệu.',
            // --- CÁC BẢN DỊCH CŨ ---
            dashboard_title: 'Bảng Điều Khiển',
            dashboard_overview: 'Tổng Quan',
            today_revenue: 'Doanh thu hôm nay',
            today_orders: 'Đơn hàng mới',
            best_selling_dish: 'Món bán chạy nhất',
            low_stock_alert: 'Cảnh báo tồn kho',
            order_status_distribution: 'Phân bổ Trạng thái Đơn hàng',
            recent_activity: 'Hoạt động Gần đây',
            employee_management: 'Quản Lý Nhân Viên',
            order_lookup: 'Tra Cứu Đơn Hàng',
            menu_management: 'Quản Lý Thực Đơn',
            supplier_management: 'Nhà Cung Cấp',
            material_management: 'Nguyên Vật Liệu',
            spoilage_management: 'Quản Lý Hư Hao',
            other_costs: 'Chi Phí Khác',
            profit_report: 'Báo Cáo Lợi Nhuận',
            inventory_report: 'Báo Cáo Tồn Kho',
            adjustment_logs: 'Lịch Sử Điều Chỉnh',
            employee_management_title: 'Quản Lý Nhân Viên',
            add_new_employee: 'Thêm Nhân Viên Mới',
            employee_id_code: 'Mã số nhân viên',
            employee_name: 'Họ và Tên',
            employee_dob: 'Ngày sinh',
            employee_nid: 'Số CCCD/CC',
            employee_photo_url: 'URL Hình ảnh',
            employee_photo_url_placeholder: 'https://example.com/photo.jpg',
            employee_permanent_address: 'Địa chỉ thường trú',
            employee_current_address: 'Địa chỉ hiện tại',
            employee_start_date: 'Ngày nhận việc',
            employee_type: 'Hình thức làm việc',
            employee_type_part_time: 'Bán thời gian',
            employee_type_contract: 'Hợp đồng lao động',
            roles: 'Vai trò',
            add_employee_btn: 'Thêm Nhân Viên',
            employee_list: 'Danh Sách Nhân Viên',
            employee_details_title: 'Thông Tin Chi Tiết Nhân Viên',
            terminate_employee_btn: 'Thôi việc',
            terminate_employee_title: 'Chấm Dứt Hợp Đồng',
            termination_date: 'Ngày thôi việc',
            termination_reason: 'Lý do thôi việc',
            confirm_termination_btn: 'Xác nhận thôi việc',
            employee_status: 'Trạng thái',
            status_active: 'Đang làm việc',
            status_terminated: 'Đã thôi việc',
            view_details: 'Xem chi tiết',
            role_taker: 'Nhận Đơn',
            role_kitchen: 'Bếp',
            role_shipper: 'Giao Hàng',
            order_lookup_title: 'Tra Cứu Đơn Hàng',
            view_by: 'Xem theo',
            this_month: 'Tháng này',
            this_quarter: 'Quí này',
            this_year: 'Năm này',
            custom_option: 'Tùy chọn',
            from_date: 'Từ ngày',
            to_date: 'Đến ngày',
            search_btn: 'Tra cứu',
            order_list: 'Danh sách Đơn Hàng',
            status_new: 'Đơn mới',
            status_preparing: 'Đang chuẩn bị',
            status_delivering: 'Đang giao',
            status_completed: 'Hoàn thành',
            status_cancelled: 'Đã hủy',
            menu_management_title: 'Quản Lý Thực Đơn & Định Lượng (BOM)',
            add_new_dish: 'Thêm Món Mới',
            dish_name: 'Tên món',
            description: 'Mô tả',
            selling_price: 'Giá Bán (VND)',
            image_url: 'URL Hình ảnh',
            bom_title: 'Định Lượng Nguyên Liệu (BOM)',
            quantity_short: 'SL',
            estimated_cost: 'Giá vốn ước tính',
            add_dish_btn: 'Thêm Món',
            current_dishes_list: 'Danh Sách Món Ăn Hiện Có',
            supplier_management_title: 'Quản Lý Nhà Cung Cấp',
            add_new_supplier: 'Thêm NCC Mới',
            supplier_name: 'Tên nhà cung cấp',
            contact_person: 'Người liên hệ',
            phone_number: 'Số điện thoại',
            address: 'Địa chỉ',
            tax_code: 'Mã số thuế (nếu có)',
            add_supplier_btn: 'Thêm NCC',
            suppliers_list_title: 'Danh Sách Nhà Cung Cấp',
            purchase_management_title: 'Nguyên Vật Liệu & Nhập Kho',
            define_material: 'Định Nghĩa Nguyên Vật Liệu',
            material_name: 'Tên nguyên liệu',
            unit_placeholder: 'Đơn vị (kg, gr, cái)',
            add_btn: 'Thêm',
            materials_list_title: 'Danh Sách Nguyên Vật Liệu',
            record_purchase: 'Nhập Kho',
            purchase_date: 'Ngày nhập hàng',
            material: 'Nguyên liệu',
            quantity: 'Số lượng',
            unit: 'Đơn vị',
            total_price: 'Tổng tiền (VND)',
            supplier: 'Nhà cung cấp',
            new_unit_price_label: 'Đơn giá mới sẽ là',
            confirm_purchase_btn: 'Xác Nhận Nhập Kho',
            purchase_history_title: 'Lịch Sử Nhập Kho',
            spoilage_management_title: 'Quản Lý Nguyên Vật Liệu Hư Hao',
            record_spoilage: 'Ghi Nhận Hư Hao',
            spoilage_date: 'Ngày thải bỏ',
            spoilage_reason: 'Nguyên nhân thải bỏ',
            spoilage_reason_placeholder: 'VD: Hết hạn, hỏng...',
            record_btn: 'Ghi Nhận',
            spoilage_history_title: 'Lịch Sử Hư Hao',
            other_costs_title: 'Quản Lý Chi Phí Khác',
            add_new_cost: 'Thêm Chi Phí Mới',
            cost_name: 'Tên chi phí',
            amount: 'Số tiền (VND)',
            cost_type: 'Loại chi phí',
            monthly: 'Hàng tháng',
            yearly: 'Hàng năm',
            onetime: 'Một lần (Đầu tư)',
            add_cost_btn: 'Thêm Chi Phí',
            monthly_costs: 'Chi phí hàng tháng',
            total_monthly: 'Tổng cộng tháng:',
            yearly_costs: 'Chi phí hàng năm',
            total_yearly: 'Tổng cộng năm:',
            onetime_costs: 'Chi phí một lần (Đầu tư)',
            profit_report_title: 'Báo Cáo Lợi Nhuận',
            calculate_profit_btn: 'Tính Lương',
            business_results_period: 'Kết Quả Kinh Doanh Trong Kỳ',
            total_revenue: 'Tổng Doanh Thu:',
            total_cogs: 'Tổng Giá Vốn Hàng Bán:',
            total_commission_fees: 'Tổng Phí Chiết Khấu:',
            total_operating_expenses: 'Tổng Chi Phí Hoạt Động (Tháng):',
            spoilage_cost: 'Chi Phí Hư Hao (Ước Tính):',
            net_profit: 'Lợi Nhuận Ròng (Trước Thuế):',
            revenue_structure: 'Cơ cấu doanh thu',
            inventory_report_title: 'Báo Cáo Xuất Nhập Tồn Nguyên Liệu',
            view_report_btn: 'Xem Báo Cáo',
            material_name_header: 'Tên Nguyên Liệu',
            unit_header: 'ĐVT',
            opening_stock: 'Tồn Đầu Kỳ',
            purchased_in_period: 'Nhập Trong Kỳ',
            used_in_period: 'Xuất Trong Kỳ (Bán)',
            spoiled_in_period: 'Hư Hao Trong Kỳ',
            closing_stock: 'Tồn Cuối Kỳ',
            adjustment_logs_title: 'Lịch Sử Điều Chỉnh Dữ Liệu',
            empty_adjustment_logs: 'Chưa có lịch sử điều chỉnh nào.',
            select_material: 'Chọn nguyên liệu',
            select_supplier: 'Chọn NCC',
            log_type_supplier: 'Nhà Cung Cấp',
            log_type_purchase: 'Nhập kho',
            log_type_dish: 'Món Ăn',
            log_type_material: 'Nguyên Vật Liệu',
            edit_supplier_title: 'Điều Chỉnh Thông Tin Nhà Cung Cấp',
            supplier_name_label: 'Tên nhà cung cấp',
            tax_code_label: 'Mã số thuế',
            adjustment_reason: 'Lý do điều chỉnh',
            edit_purchase_title: 'Điều Chỉnh Dữ Liệu Nhập Kho',
            edit_dish_title: 'Điều Chỉnh Thông Tin Món Ăn',
            price_effective_date: 'Ngày Áp Dụng Giá Mới',
            edit_material_title: 'Điều Chỉnh Thông Tin Nguyên Vật Liệu',
            total_time: 'Tổng thời gian',
            duration: 'Thời gian trôi qua',
            material_categories: 'Phân loại Nguyên vật liệu',
            category_name_placeholder: 'Tên phân loại mới',
            search_material_placeholder: 'Tìm kiếm nguyên vật liệu...',
            edit_category_title: 'Chỉnh Sửa Phân Loại',
            category_name: 'Tên phân loại',
            category: 'Phân loại',
            uncategorized: 'Chưa phân loại',
            select_category: 'Chọn phân loại',
            payroll_management: 'Quản Lý Lương',
            payroll_management_title: 'Quản Lý Lương Nhân Viên',
            current_salary: 'Mức Lương Hiện tại',
            setup_salary: 'Thiết lập Lương',
            enter_timesheet: 'Chấm công',
            view_payslip: 'Xem Bảng lương',
            salary_setup_title: 'Thiết Lập Lương cho',
            set_new_salary: 'Thiết Lập/Thay Đổi Lương',
            salary_amount: 'Mức Lương (VND)',
            salary_amount_note: 'Nhập lương tháng cho HĐLĐ, lương ngày cho bán thời gian.',
            effective_date: 'Ngày Hiệu Lực',
            reason_placeholder: 'VD: Tăng lương định kỳ, Thử việc...',
            save_salary_btn: 'Lưu Mức Lương',
            timesheet_entry_title: 'Chấm Công',
            payroll_period: 'Kỳ Tính Lương',
            work_days: 'Ngày công thực tế',
            paid_leave_days: 'Ngày nghỉ phép (hưởng lương)',
            dependents_count: 'Số người phụ thuộc',
            total_work_hours: 'Tổng số giờ làm việc',
            no_salary_setup: 'Chưa thiết lập lương',
            not_yet_entered: 'Chưa chấm công',
            payslip_title: 'Bảng Lương Chi Tiết',
            gross_salary: 'Lương Gross',
            bhxh_deduction: 'Trừ BHXH (8%)',
            bhyt_deduction: 'Trừ BHYT (1.5%)',
            bhtn_deduction: 'Trừ BHTN (1%)',
            total_insurance: 'Tổng trừ bảo hiểm',
            personal_allowance: 'Giảm trừ bản thân',
            dependent_allowance: 'Giảm trừ người phụ thuộc',
            taxable_income: 'Thu nhập tính thuế',
            pit_tax: 'Thuế TNCN',
            net_salary: 'Lương thực nhận (NET)',
        },
        zh: {
            // ... (Dịch tiếng Trung giữ nguyên) ...
        }
    };

    let currentLang = localStorage.getItem('language') || 'vi';
    
    let salesDataInPeriod = []; 
    let editingBomItems = []; 
    let chartInstances = {};

    // --- Helper Functions ---
    const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    const findById = (arr, id) => arr.find(item => item.id === parseInt(id));
    const todayISO = () => new Date().toISOString().split('T')[0];
    
    const loadFromStorage = (key, defaultValue = {}) => {
        try {
            const data = localStorage.getItem(key);
            if (key === 'payrolls' && Array.isArray(JSON.parse(data))) return defaultValue;
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`Error parsing ${key} from localStorage`, e);
            return defaultValue;
        }
    };

    const formatDuration = (ms) => {
        if (!ms || ms < 0) return '00:00:00';
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    // --- Data Initialization from localStorage ---
    let dishes = loadFromStorage('dishes', []);
    let rawMaterials = loadFromStorage('rawMaterials', []);
    let suppliers = loadFromStorage('suppliers', []);
    let purchases = loadFromStorage('purchases', []);
    let spoilageRecords = loadFromStorage('spoilageRecords', []);
    let adjustmentLogs = loadFromStorage('adjustmentLogs', []);
    let employees = loadFromStorage('employees', []);
    let otherCosts = loadFromStorage('otherCosts', []);
    let materialCategories = loadFromStorage('materialCategories', []);
    let payrolls = loadFromStorage('payrolls', {});
    let currentBomItems = [];

    const orderStatuses = {
        'new': { name: 'Đơn mới', name_zh: '新訂單', color: '#3B82F6' },
        'preparing': { name: 'Đang chuẩn bị', name_zh: '準備中', color: '#F97316' },
        'delivering': { name: 'Đang giao', name_zh: '配送中', color: '#8B5CF6' },
        'completed': { name: 'Hoàn thành', name_zh: '已完成', color: '#10B981' },
        'cancelled': { name: 'Đã hủy', name_zh: '已取消', color: '#EF4444' }
    };

    const employeeRoles = {
        'taker': { name: 'Nhận Đơn', name_zh: '接單員' },
        'kitchen': { name: 'Bếp', name_zh: '廚房' },
        'shipper': { name: 'Giao Hàng', name_zh: '配送員' }
    };
    
    const employmentTypes = {
        'part-time': {name: 'Bán thời gian', name_zh: '兼職'},
        'contract': {name: 'Hợp đồng lao động', name_zh: '勞動合約'}
    };
    
    const elements = {
        // Modals
        editDishModal: document.getElementById('edit-dish-modal'),
        editDishForm: document.getElementById('edit-dish-form'),
        cancelEditDishBtn: document.getElementById('cancel-edit-dish'),
        editMaterialModal: document.getElementById('edit-material-modal'),
        editMaterialForm: document.getElementById('edit-material-form'),
        cancelEditMaterialBtn: document.getElementById('cancel-edit-material'),
        editCategoryModal: document.getElementById('edit-category-modal'),
        confirmationModal: document.getElementById('confirmation-modal'),
        employeeDetailsModal: document.getElementById('employee-details-modal'),
        editSupplierModal: document.getElementById('edit-supplier-modal'),
        salarySetupModal: document.getElementById('salary-setup-modal'),
        timesheetModal: document.getElementById('timesheet-modal'),
        // Menu
        dishesList: document.getElementById('dishes-list'),
        // Materials
        materialsList: document.getElementById('materials-list'),
        materialCategoriesList: document.getElementById('material-categories-list'),
        searchMaterialInput: document.getElementById('search-material-input'),
         // Employees
        addEmployeeForm: document.getElementById('add-employee-form'),
        employeesList: document.getElementById('employees-list'),
         // Suppliers
        addSupplierForm: document.getElementById('add-supplier-form'),
        suppliersList: document.getElementById('suppliers-list'),
        // Sales
        orderLookupPresetFilter: document.getElementById('order-lookup-preset-filter'),
        orderLookupStartDate: document.getElementById('order-lookup-start-date'),
        orderLookupEndDate: document.getElementById('order-lookup-end-date'),
        orderLookupBtn: document.getElementById('order-lookup-btn'),
        orderStats: document.getElementById('order-stats'),
        orderDetailsList: document.getElementById('order-details-list'),
        orderDetailsTitle: document.getElementById('order-details-title'),
        // Inventory Report
        inventoryReportPresetFilter: document.getElementById('report-preset-filter'),
        inventoryReportStartDate: document.getElementById('report-start-date'),
        inventoryReportEndDate: document.getElementById('report-end-date'),
        // Profit Report
        profitReportPresetFilter: document.getElementById('profit-report-preset-filter'),
        profitReportStartDate: document.getElementById('profit-report-start-date'),
        profitReportEndDate: document.getElementById('profit-report-end-date'),
        // Payroll
        payrollEmployeeList: document.getElementById('payroll-employee-list'),
        payrollManagementTab: document.getElementById('payroll-management'),
    };

    // --- Payroll Constants (VIETNAM LAW) ---
    const PIT_PERSONAL_ALLOWANCE = 11000000;
    const PIT_DEPENDENT_ALLOWANCE = 4400000;
    const INSURANCE_BASE_SALARY_CAP = 36000000;
    const BHXH_RATE = 0.08;
    const BHYT_RATE = 0.015;
    const BHTN_RATE = 0.01;

    const PIT_BRACKETS = [
        { limit: 5000000, rate: 0.05 },
        { limit: 10000000, rate: 0.10 },
        { limit: 18000000, rate: 0.15 },
        { limit: 32000000, rate: 0.20 },
        { limit: 52000000, rate: 0.25 },
        { limit: 80000000, rate: 0.30 },
        { limit: Infinity, rate: 0.35 },
    ];
    
    function calculatePIT(taxableIncome) {
        if (taxableIncome <= 0) return 0;
        let tax = 0;
        let previousLimit = 0;
        for (const bracket of PIT_BRACKETS) {
            if (taxableIncome > previousLimit) {
                const taxableAtBracket = Math.min(taxableIncome - previousLimit, bracket.limit - previousLimit);
                tax += taxableAtBracket * bracket.rate;
            }
            if (taxableIncome <= bracket.limit) break;
            previousLimit = bracket.limit;
        }
        return tax;
    }
    
    // --- Helper for Material Usage Calculation ---
    function getMaterialUsage(orders) {
        const usage = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                const dish = findById(dishes, item.dishId);
                if (dish && dish.bom) {
                    dish.bom.forEach(bomItem => {
                        usage[bomItem.materialId] = (usage[bomItem.materialId] || 0) + (bomItem.quantity * item.quantity);
                    });
                }
            });
        });
        return usage;
    }

    const setLanguage = (lang) => {
         currentLang = lang;
        localStorage.setItem('language', lang);
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.dataset.lang;
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            } else if (translations['vi'][key]) {
                el.textContent = translations['vi'][key];
            }
        });
         document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
            const key = el.dataset.langPlaceholder;
            if (translations[lang] && translations[lang][key]) {
                el.placeholder = translations[lang][key];
            } else if (translations['vi'][key]) {
                el.placeholder = translations['vi'][key];
            }
        });
        document.querySelectorAll('.lang-btn').forEach(btn => {
             btn.classList.toggle('active', btn.dataset.langCode === lang);
        });
        renderApp();
    };
    document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.langCode)));
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    tabLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            tabLinks.forEach(l => l.classList.remove('bg-gray-700'));
            tabContents.forEach(c => c.classList.remove('active'));
            link.classList.add('bg-gray-700');
            document.getElementById(link.dataset.tab).classList.add('active');
        });
    });

    function populateSelect(select, items, placeholderKey, valueField = 'id', textField = 'name', selectedValue = null) {
        if (!select) return;
        const placeholder = translations[currentLang]?.[placeholderKey] || placeholderKey;
        select.innerHTML = `<option value="">-- ${placeholder} --</option>`;
        items.forEach(item => {
            const isSelected = selectedValue && item[valueField] == selectedValue;
            select.innerHTML += `<option value="${item[valueField]}" ${isSelected ? 'selected' : ''}>${item[textField]}</option>`;
        });
    }
    
    function logAdjustment(typeKey, recordId, reason, changes) {
        adjustmentLogs.unshift({
            id: Date.now(),
            typeKey: typeKey,
            recordId: recordId,
            reason: reason,
            date: new Date().toISOString(),
            changes: changes
        });
        localStorage.setItem('adjustmentLogs', JSON.stringify(adjustmentLogs));
    }

    function handleDatePresetChange(presetValue, startDateInput, endDateInput) {
        const today = new Date();
        let startDate, endDate = today;

        if (!startDateInput || !endDateInput) return;

        startDateInput.disabled = true;
        endDateInput.disabled = true;

        switch (presetValue) {
            case 'this_month':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'this_quarter':
                const quarter = Math.floor(today.getMonth() / 3);
                startDate = new Date(today.getFullYear(), quarter * 3, 1);
                break;
            case 'this_year':
                startDate = new Date(today.getFullYear(), 0, 1);
                break;
            case 'custom':
                startDateInput.disabled = false;
                endDateInput.disabled = false;
                startDateInput.value = '';
                endDateInput.value = '';
                return;
        }

        startDateInput.value = startDate.toISOString().split('T')[0];
        endDateInput.value = endDate.toISOString().split('T')[0];
    }
    // ... (All other functions from the previous script remain here, unchanged) ...
    
    // --- PAYROLL MANAGEMENT --- (This section is updated)
    
    function getSalaryForDate(employee, date) {
        if (!employee.salaryHistory || employee.salaryHistory.length === 0) return null;
        
        const sortedHistory = [...employee.salaryHistory].sort((a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate));
        const dateString = date.toISOString().split('T')[0];

        for (const record of sortedHistory) {
            if (record.effectiveDate <= dateString) {
                return record;
            }
        }
        return null;
    }

    function renderPayrollEmployeeList() {
        if (!elements.payrollEmployeeList) return;
        const listEl = elements.payrollEmployeeList;
        const activeEmployees = employees.filter(e => e.status === 'active');

        if (!activeEmployees.length) {
            listEl.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-500">${translations[currentLang].empty_data}</td></tr>`;
            return;
        }

        listEl.innerHTML = activeEmployees.map(emp => {
            const currentSalary = getSalaryForDate(emp, new Date());
            const salaryText = currentSalary ? `${formatCurrency(currentSalary.amount)} / ${emp.employmentType === 'contract' ? 'tháng' : 'ngày'}` : `<span class="text-red-500">${translations[currentLang].no_salary_setup}</span>`;
            
            return `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">${emp.name}</div>
                        <div class="text-sm text-gray-500">${emp.idCode}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employmentTypes[emp.employmentType][`name${currentLang === 'zh' ? '_zh' : ''}`]}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${salaryText}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <button class="setup-salary-btn text-indigo-600 hover:text-indigo-900" data-id="${emp.id}">${translations[currentLang].setup_salary}</button>
                        <button class="enter-timesheet-btn text-green-600 hover:text-green-900" data-id="${emp.id}">${translations[currentLang].enter_timesheet}</button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // *** FIX: Attach event listener to a static parent (the tab content div) ***
    if (elements.payrollManagementTab) {
        elements.payrollManagementTab.addEventListener('click', e => {
            const button = e.target.closest('button');
            if (!button) return;

            const employeeId = button.dataset.id;
            if (employeeId) {
                const employee = findById(employees, employeeId);
                if (!employee) return;

                if (button.classList.contains('setup-salary-btn')) {
                    openSalarySetupModal(employee);
                } else if (button.classList.contains('enter-timesheet-btn')) {
                    openTimesheetModal(employee);
                }
            } else if (button.id === 'calculate-payroll-btn') {
                handleCalculatePayroll();
            }
        });
    }

    function openSalarySetupModal(employee) {
        const modal = elements.salarySetupModal;
        modal.querySelector('#salary-employee-name').textContent = employee.name;
        modal.querySelector('#salary-employee-id').value = employee.id;
        
        const historyList = modal.querySelector('#salary-history-list');
        const history = employee.salaryHistory || [];
        historyList.innerHTML = history.length ? [...history].sort((a,b) => new Date(b.effectiveDate) - new Date(a.effectiveDate)).map(h => `
            <div class="p-2 bg-gray-100 rounded-md text-sm">
                <p><strong>${formatCurrency(h.amount)}</strong> - ${translations[currentLang].effective_date}: <strong>${h.effectiveDate}</strong></p>
                <p class="text-gray-600">${translations[currentLang].reason}: ${h.reason}</p>
            </div>
        `).join('') : `<p class="text-gray-500 text-center">${translations[currentLang].empty_data}</p>`;
        
        modal.classList.add('active');
    }

    const salarySetupForm = document.getElementById('salary-setup-form');
    if (salarySetupForm) {
        salarySetupForm.addEventListener('submit', e => {
            e.preventDefault();
            const employeeId = parseInt(document.getElementById('salary-employee-id').value);
            const newSalary = {
                amount: parseFloat(document.getElementById('salary-amount').value),
                effectiveDate: document.getElementById('salary-effective-date').value,
                reason: document.getElementById('salary-reason').value
            };

            if (isNaN(newSalary.amount) || !newSalary.effectiveDate || !newSalary.reason) {
                alert("Vui lòng nhập đầy đủ thông tin lương.");
                return;
            }

            employees = employees.map(emp => {
                if (emp.id === employeeId) {
                    const updatedHistory = emp.salaryHistory ? [...emp.salaryHistory] : [];
                    updatedHistory.push(newSalary);
                    return { ...emp, salaryHistory: updatedHistory };
                }
                return emp;
            });

            localStorage.setItem('employees', JSON.stringify(employees));
            openSalarySetupModal(findById(employees, employeeId));
            e.target.reset();
            renderPayrollEmployeeList();
        });
    }

    document.getElementById('close-salary-modal-btn').addEventListener('click', () => elements.salarySetupModal.classList.remove('active'));

    function openTimesheetModal(employee) {
        const modal = elements.timesheetModal;
        const periodKey = `timesheet-${employee.id}`;
        
        modal.querySelector('#timesheet-employee-name').textContent = employee.name;
        modal.querySelector('#timesheet-period').textContent = "Nhập liệu thủ công";
        modal.querySelector('#timesheet-employee-id').value = employee.id;
        
        const existingData = payrolls[periodKey] || {};
        
        if (employee.employmentType === 'contract') {
            modal.querySelector('#timesheet-contract-fields').style.display = 'block';
            modal.querySelector('#timesheet-part-time-fields').style.display = 'none';
            modal.querySelector('#timesheet-work-days').value = existingData.workDays || '';
            modal.querySelector('#timesheet-paid-leave').value = existingData.paidLeave || 0;
            modal.querySelector('#timesheet-dependents').value = existingData.dependents || 0;
        } else {
            modal.querySelector('#timesheet-contract-fields').style.display = 'none';
            modal.querySelector('#timesheet-part-time-fields').style.display = 'block';
            modal.querySelector('#timesheet-work-hours').value = existingData.workHours || '';
        }
        modal.classList.add('active');
    }
    
    const timesheetForm = document.getElementById('timesheet-form');
    if (timesheetForm) {
        timesheetForm.addEventListener('submit', e => {
            e.preventDefault();
            const employeeId = parseInt(document.getElementById('timesheet-employee-id').value);
            const periodKey = `timesheet-${employeeId}`;
            const employee = findById(employees, employeeId);
            let timesheetData = {};

            if (employee.employmentType === 'contract') {
                timesheetData = {
                    workDays: parseFloat(document.getElementById('timesheet-work-days').value),
                    paidLeave: parseFloat(document.getElementById('timesheet-paid-leave').value || 0),
                    dependents: parseInt(document.getElementById('timesheet-dependents').value || 0)
                };
            } else {
                timesheetData = {
                    workHours: parseFloat(document.getElementById('timesheet-work-hours').value)
                };
            }
            
            payrolls[periodKey] = timesheetData;
            localStorage.setItem('payrolls', JSON.stringify(payrolls));
            
            alert('Đã lưu chấm công thành công!');
            elements.timesheetModal.classList.remove('active');
        });
    }

    document.getElementById('cancel-timesheet-btn').addEventListener('click', () => elements.timesheetModal.classList.remove('active'));

    function handleCalculatePayroll() {
        const startDateStr = document.getElementById('payroll-start-date').value;
        const endDateStr = document.getElementById('payroll-end-date').value;

        if (!startDateStr || !endDateStr) {
            alert('Vui lòng chọn ngày bắt đầu và ngày kết thúc để tính lương.');
            return;
        }

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        if (startDate > endDate) {
            alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc.');
            return;
        }

        const activeEmployees = employees.filter(e => e.status === 'active');
        let resultText = `BẢNG LƯƠNG CHI TIẾT\nKỳ: ${startDateStr} đến ${endDateStr}\n====================\n\n`;
        let foundData = false;

        for (const emp of activeEmployees) {
            const timesheet = payrolls[`timesheet-${emp.id}`];
            if (!timesheet) continue;

            const salaryRecord = getSalaryForDate(emp, startDate);
            if (!salaryRecord) continue;
            
            foundData = true;
            resultText += `--- NHÂN VIÊN: ${emp.name} ---\n`;

            if (emp.employmentType === 'contract') {
                const workDays = timesheet.workDays || 0;
                const paidLeave = timesheet.paidLeave || 0;
                const totalWorkDays = workDays + paidLeave;

                const grossSalary = (salaryRecord.amount / 26) * totalWorkDays;
                const salaryForInsurance = Math.min(grossSalary, INSURANCE_BASE_SALARY_CAP);
                
                const bhxh = salaryForInsurance * BHXH_RATE;
                const bhyt = salaryForInsurance * BHYT_RATE;
                const bhtn = salaryForInsurance * BHTN_RATE;
                const totalInsurance = bhxh + bhyt + bhtn;

                const dependentAllowance = (timesheet.dependents || 0) * PIT_DEPENDENT_ALLOWANCE;
                const taxableIncome = Math.max(0, grossSalary - totalInsurance - PIT_PERSONAL_ALLOWANCE - dependentAllowance);
                const pit = calculatePIT(taxableIncome);

                const netSalary = grossSalary - totalInsurance - pit;

                resultText += `Lương Gross (tạm tính): ${formatCurrency(grossSalary)}\n`;
                resultText += `(-) Trừ BHXH (8%): ${formatCurrency(bhxh)}\n`;
                resultText += `(-) Trừ BHYT (1.5%): ${formatCurrency(bhyt)}\n`;
                resultText += `(-) Trừ BHTN (1%): ${formatCurrency(bhtn)}\n`;
                resultText += `(-) Thuế TNCN: ${formatCurrency(pit)}\n`;
                resultText += `=> THỰC NHẬN (NET): ${formatCurrency(netSalary)}\n\n`;

            } else {
                const workHours = timesheet.workHours || 0;
                const dailyRate = salaryRecord.amount;
                const netSalary = workHours * (dailyRate/8);
                resultText += `Tổng giờ làm: ${workHours} giờ\n`;
                resultText += `Đơn giá: ${formatCurrency(dailyRate)}/ngày\n`;
                resultText += `=> THỰC NHẬN: ${formatCurrency(netSalary)}\n\n`;
            }
        }

        if (!foundData) {
            resultText = "Không có nhân viên nào được chấm công để tính lương.";
        }
        alert(resultText);
    }
    
    // --- App Initialization & Rendering ---
    
    function renderApp() {
        updateAllMaterialPrices();
        recalculateAllDishCosts();
        
        const rolesContainer = document.getElementById('employee-roles-checkboxes');
        if(rolesContainer) {
            rolesContainer.innerHTML = Object.keys(employeeRoles).map(key => `
                <label class="flex items-center">
                    <input type="checkbox" name="employee-roles" value="${key}" class="h-4 w-4 text-indigo-600 border-gray-300 rounded">
                    <span class="ml-2 text-gray-700">${employeeRoles[key][`name${currentLang === 'zh' ? '_zh' : ''}`] || employeeRoles[key].name}</span>
                </label>
            `).join('');
        }
        
        populateMaterialSelects(document.getElementById('bom-material-select'));
        populateMaterialSelects(document.getElementById('purchase-material-select'));
        populateMaterialSelects(document.getElementById('spoilage-material-select'));
        populateSelect(document.getElementById('purchase-supplier-select'), suppliers, 'select_supplier');


        // Render lists
        const dishesListEl = document.getElementById('dishes-list');
        if (dishesListEl) dishesListEl.innerHTML = dishes.map(renderDish).join('') || `<p class="text-gray-500 text-center">${translations[currentLang].empty_data}</p>`;
        
        renderMaterialCategories();
        renderMaterialsList();
        renderDashboard();
        renderEmployeesList();
        renderSuppliersList();
        renderPurchasesList();
        renderSpoilageList();
        renderOtherCostsLists();
        renderPayrollEmployeeList();
    }

    // --- INITIAL LOAD ---
    handleDatePresetChange('this_month', elements.orderLookupStartDate, elements.orderLookupEndDate);
    handleDatePresetChange('this_month', elements.inventoryReportStartDate, elements.inventoryReportEndDate);
    handleDatePresetChange('this_month', elements.profitReportStartDate, elements.profitReportEndDate);
    setLanguage(currentLang);
});
