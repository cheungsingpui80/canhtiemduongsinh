document.addEventListener('DOMContentLoaded', () => {
    
    const translations = {
        vi: {
            // ... (Các bản dịch cũ giữ nguyên) ...
            payroll_management: 'Quản Lý Lương',
            payroll_management_title: 'Quản Lý Lương Nhân Viên',
            current_salary: 'Mức Lương Hiện tại',
            actions: 'Hành Động',
            setup_salary: 'Thiết lập Lương',
            enter_timesheet: 'Chấm công',
            view_payslip: 'Xem Bảng lương',
            salary_setup_title: 'Thiết Lập Lương cho',
            set_new_salary: 'Thiết Lập/Thay Đổi Lương',
            salary_amount: 'Mức Lương (VND)',
            salary_amount_note: 'Nhập lương tháng cho HĐLĐ, lương ngày cho bán thời gian.',
            effective_date: 'Ngày Hiệu Lực',
            reason: 'Lý do thay đổi',
            reason_placeholder: 'VD: Tăng lương định kỳ, Thử việc...',
            save_salary_btn: 'Lưu Mức Lương',
            salary_history: 'Lịch Sử Thay Đổi Lương',
            close_btn: 'Đóng',
            timesheet_entry_title: 'Chấm Công',
            payroll_period: 'Kỳ lương',
            work_days: 'Ngày công thực tế',
            paid_leave_days: 'Ngày nghỉ phép (hưởng lương)',
            dependents_count: 'Số người phụ thuộc',
            total_work_hours: 'Tổng số giờ làm việc',
            calculate_payroll_btn: 'Tính Lương Kỳ Này',
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
            // Thêm các bản dịch mới khác nếu cần
        },
        zh: {
            // ... (Các bản dịch cũ giữ nguyên) ...
            payroll_management: '薪資管理',
            payroll_management_title: '員工薪資管理',
            current_salary: '目前薪資',
            actions: '操作',
            setup_salary: '設定薪資',
            enter_timesheet: '打卡記錄',
            view_payslip: '查看薪資單',
            salary_setup_title: '為...設定薪資',
            set_new_salary: '設定/變更薪資',
            salary_amount: '薪資金額 (VND)',
            salary_amount_note: '合約員工請輸入月薪，兼職員工請輸入日薪。',
            effective_date: '生效日期',
            reason: '變更原因',
            reason_placeholder: '例如：定期加薪、試用期...',
            save_salary_btn: '儲存薪資',
            salary_history: '薪資變更歷史',
            close_btn: '關閉',
            timesheet_entry_title: '出勤記錄',
            payroll_period: '薪資週期',
            work_days: '實際工作天數',
            paid_leave_days: '帶薪休假天數',
            dependents_count: '受撫養人數',
            total_work_hours: '總工時',
            calculate_payroll_btn: '計算本期薪資',
            no_salary_setup: '尚未設定薪資',
            not_yet_entered: '尚未記錄工時',
            payslip_title: '薪資明細',
            gross_salary: '總薪資 (Gross)',
            bhxh_deduction: '社會保險 (8%)',
            bhyt_deduction: '醫療保險 (1.5%)',
            bhtn_deduction: '失業保險 (1%)',
            total_insurance: '保險總額',
            personal_allowance: '個人免稅額',
            dependent_allowance: '撫養親屬免稅額',
            taxable_income: '應稅所得',
            pit_tax: '個人所得稅',
            net_salary: '實領薪資 (NET)',
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
    
    const loadFromStorage = (key, defaultValue = []) => {
        try {
            const data = localStorage.getItem(key);
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
    let dishes = loadFromStorage('dishes');
    let rawMaterials = loadFromStorage('rawMaterials');
    let suppliers = loadFromStorage('suppliers');
    let purchases = loadFromStorage('purchases');
    let spoilageRecords = loadFromStorage('spoilageRecords');
    let adjustmentLogs = loadFromStorage('adjustmentLogs');
    let employees = loadFromStorage('employees');
    let otherCosts = loadFromStorage('otherCosts');
    let materialCategories = loadFromStorage('materialCategories');
    let payrolls = loadFromStorage('payrolls', {}); // { 'periodKey': { employeeId: data } }
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
    
    // --- DOM Elements ---
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
        payrollPeriodSelect: document.getElementById('payroll-period-select'),
    };

    // --- Payroll Constants (VIETNAM LAW) ---
    const PIT_PERSONAL_ALLOWANCE = 11000000;
    const PIT_DEPENDENT_ALLOWANCE = 4400000;
    const INSURANCE_BASE_SALARY_CAP = 36000000; // Mức lương tối đa đóng BHXH, BHYT, BHTN (giả định, cần cập nhật)
    const BHXH_RATE = 0.08;
    const BHYT_RATE = 0.015;
    const BHTN_RATE = 0.01;
    const TOTAL_INSURANCE_RATE = BHXH_RATE + BHYT_RATE + BHTN_RATE;

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
            previousLimit = bracket.limit;
        }
        return tax;
    }
    
    // ... (Toàn bộ các hàm cũ từ `getMaterialUsage` đến `renderApp` giữ nguyên) ...
    // --- Helper for Material Usage Calculation ---
    function getMaterialUsage(orders) {
        const usage = {}; // { materialId: quantity }
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
            } else if (translations['vi'][key]) { // Fallback to Vietnamese
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
        renderApp(); // Re-render the application to update dynamic content
    };
    document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.langCode)));
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    tabLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            tabLinks.forEach(l => l.classList.remove('active:bg-gray-700', 'bg-gray-700'));
            tabContents.forEach(c => c.classList.remove('active'));
            link.classList.add('active:bg-gray-700', 'bg-gray-700');
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
                return; // Exit here for custom
        }

        startDateInput.value = startDate.toISOString().split('T')[0];
        endDateInput.value = endDate.toISOString().split('T')[0];
    }
    // --- Employee Management ---
    function renderEmployeesList() {
        const listEl = elements.employeesList;
        listEl.innerHTML = employees.length ? employees.map(emp => {
            const statusClass = emp.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
            const statusText = emp.status === 'active' ? (translations[currentLang].status_active || 'Đang làm việc') : (translations[currentLang].status_terminated || 'Đã thôi việc');
            return `
                <div class="p-3 bg-gray-50 rounded-lg border flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <img src="${emp.photoUrl || 'https://placehold.co/40x40/E2E8F0/4A5568?text=NV'}" alt="photo" class="w-10 h-10 rounded-full object-cover">
                        <div>
                            <p class="font-semibold text-gray-800">${emp.name}</p>
                            <p class="text-sm text-gray-500">${emp.idCode}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                         <span class="text-xs font-medium px-2 py-1 rounded-full ${statusClass}">${statusText}</span>
                         <button class="view-employee-btn text-sm text-blue-600 hover:underline" data-id="${emp.id}">${translations[currentLang].view_details}</button>
                         ${emp.status === 'active' ? `<button class="terminate-employee-btn text-sm text-red-600 hover:underline" data-id="${emp.id}">${translations[currentLang].terminate_employee_btn}</button>` : ''}
                    </div>
                </div>
            `;
        }).join('') : `<p class="text-center text-gray-500">${translations[currentLang].empty_data}</p>`;
    }

    elements.addEmployeeForm.addEventListener('submit', e => {
        e.preventDefault();
        const selectedRoles = Array.from(document.querySelectorAll('#employee-roles-checkboxes input:checked')).map(cb => cb.value);
        const newEmployee = {
            id: Date.now(),
            name: document.getElementById('employee-name').value,
            idCode: document.getElementById('employee-id-code').value,
            dob: document.getElementById('employee-dob').value,
            nid: document.getElementById('employee-nid').value,
            photoUrl: document.getElementById('employee-photo-url').value,
            permanentAddress: document.getElementById('employee-permanent-address').value,
            currentAddress: document.getElementById('employee-current-address').value,
            startDate: document.getElementById('employee-start-date').value,
            employmentType: document.getElementById('employee-type').value,
            roles: selectedRoles,
            status: 'active',
            salaryHistory: [] // Khởi tạo lịch sử lương
        };
        employees.push(newEmployee);
        localStorage.setItem('employees', JSON.stringify(employees));
        renderEmployeesList();
        elements.addEmployeeForm.reset();
    });

    elements.employeesList.addEventListener('click', (e) => {
        if (e.target.matches('.view-employee-btn')) {
            const employee = findById(employees, e.target.dataset.id);
            if (employee) openEmployeeDetailsModal(employee);
        }
         if (e.target.matches('.terminate-employee-btn')) {
            const employeeId = parseInt(e.target.dataset.id);
            const reason = prompt(translations[currentLang].termination_reason);
            if(reason) {
                showConfirmation(translations[currentLang].terminate_employee_title, `Bạn có chắc muốn cho nhân viên này thôi việc?`, () => {
                    employees = employees.map(emp => emp.id === employeeId ? { ...emp, status: 'terminated', terminationDate: todayISO(), terminationReason: reason } : emp);
                    localStorage.setItem('employees', JSON.stringify(employees));
                    renderEmployeesList();
                });
            }
        }
    });

    function openEmployeeDetailsModal(emp) {
        const contentEl = document.getElementById('employee-modal-content');
        const rolesText = emp.roles.map(r => employeeRoles[r]?.[`name${currentLang === 'zh' ? '_zh' : ''}`] || r).join(', ');
        const empTypeText = employmentTypes[emp.employmentType]?.[`name${currentLang === 'zh' ? '_zh' : ''}`] || emp.employmentType;
        contentEl.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="md:col-span-1 text-center">
                     <img src="${emp.photoUrl || 'https://placehold.co/128x128/E2E8F0/4A5568?text=NV'}" alt="photo" class="w-32 h-32 rounded-full object-cover mx-auto mb-4">
                </div>
                <div class="md:col-span-2 space-y-3">
                     <p><strong>${translations[currentLang].employee_name}:</strong> ${emp.name}</p>
                     <p><strong>${translations[currentLang].employee_id_code}:</strong> ${emp.idCode}</p>
                     <p><strong>${translations[currentLang].employee_dob}:</strong> ${emp.dob}</p>
                     <p><strong>${translations[currentLang].employee_nid}:</strong> ${emp.nid}</p>
                     <p><strong>${translations[currentLang].employee_start_date}:</strong> ${emp.startDate}</p>
                     <p><strong>${translations[currentLang].employee_type}:</strong> ${empTypeText}</p>
                     <p><strong>${translations[currentLang].roles}:</strong> ${rolesText}</p>
                     <p><strong>${translations[currentLang].employee_permanent_address}:</strong> ${emp.permanentAddress}</p>
                     <p><strong>${translations[currentLang].employee_current_address}:</strong> ${emp.currentAddress}</p>
                     ${emp.status === 'terminated' ? `
                         <div class="mt-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                             <p><strong>${translations[currentLang].termination_date}:</strong> ${emp.terminationDate}</p>
                             <p><strong>${translations[currentLang].termination_reason}:</strong> ${emp.terminationReason}</p>
                         </div>` : ''}
                </div>
            </div>
        `;
        elements.employeeDetailsModal.classList.add('active');
    }

    document.getElementById('close-employee-modal-btn').addEventListener('click', () => {
        elements.employeeDetailsModal.classList.remove('active');
    });

    // ... (Các hàm Supplier, Sales, Menu, Material... giữ nguyên) ...
     // --- Supplier Management ---
    function renderSuppliersList() {
        const listEl = elements.suppliersList;
        listEl.innerHTML = suppliers.length ? suppliers.map(s => `
            <div class="p-3 bg-gray-50 rounded-lg border flex justify-between items-start">
                <div>
                    <p class="font-semibold text-gray-800">${s.name}</p>
                    <p class="text-sm text-gray-500">${s.contact || ''} - ${s.phone || ''}</p>
                    <p class="text-xs text-gray-400 mt-1">${s.address || ''} ${s.taxcode ? `(MST: ${s.taxcode})` : ''}</p>
                </div>
                <div class="flex items-center gap-4 flex-shrink-0">
                    <button class="edit-supplier-btn text-sm text-blue-600 hover:underline" data-id="${s.id}">${translations[currentLang].edit}</button>
                    <button class="delete-supplier-btn text-sm text-red-600 hover:underline" data-id="${s.id}">${translations[currentLang].delete}</button>
                </div>
            </div>
        `).join('') : `<p class="text-center text-gray-500">${translations[currentLang].empty_data}</p>`;
    }

    elements.addSupplierForm.addEventListener('submit', e => {
        e.preventDefault();
        const newSupplier = {
            id: Date.now(),
            name: document.getElementById('supplier-name').value,
            contact: document.getElementById('supplier-contact').value,
            phone: document.getElementById('supplier-phone').value,
            address: document.getElementById('supplier-address').value,
            taxcode: document.getElementById('supplier-taxcode').value,
        };
        suppliers.push(newSupplier);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        renderApp(); 
        elements.addSupplierForm.reset();
    });

    elements.suppliersList.addEventListener('click', (e) => {
        if (e.target.matches('.edit-supplier-btn')) {
            const supplier = findById(suppliers, e.target.dataset.id);
            if (supplier) openEditSupplierModal(supplier);
        }
         if (e.target.matches('.delete-supplier-btn')) {
            showConfirmation('Xóa nhà cung cấp?', 'Bạn có chắc muốn xóa nhà cung cấp này?', () => {
                suppliers = suppliers.filter(s => s.id !== parseInt(e.target.dataset.id));
                localStorage.setItem('suppliers', JSON.stringify(suppliers));
                renderSuppliersList();
            });
        }
    });
    
    function openEditSupplierModal(supplier) {
        const modal = elements.editSupplierModal;
        modal.querySelector('#edit-supplier-id').value = supplier.id;
        modal.querySelector('#edit-supplier-name').value = supplier.name;
        modal.querySelector('#edit-supplier-contact').value = supplier.contact;
        modal.querySelector('#edit-supplier-phone').value = supplier.phone;
        modal.querySelector('#edit-supplier-address').value = supplier.address;
        modal.querySelector('#edit-supplier-taxcode').value = supplier.taxcode;
        modal.classList.add('active');
    }

    document.getElementById('cancel-edit-supplier-btn').addEventListener('click', () => {
         elements.editSupplierModal.classList.remove('active');
    });

    document.getElementById('edit-supplier-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const supplierId = parseInt(document.getElementById('edit-supplier-id').value);
        const updatedSupplier = {
            id: supplierId,
            name: document.getElementById('edit-supplier-name').value,
            contact: document.getElementById('edit-supplier-contact').value,
            phone: document.getElementById('edit-supplier-phone').value,
            address: document.getElementById('edit-supplier-address').value,
            taxcode: document.getElementById('edit-supplier-taxcode').value,
        };
        suppliers = suppliers.map(s => s.id === supplierId ? updatedSupplier : s);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        renderSuppliersList();
        elements.editSupplierModal.classList.remove('active');
    });


    // --- Sales & Order Lookup Logic ---
    elements.orderLookupPresetFilter.addEventListener('change', (e) => handleDatePresetChange(e.target.value, elements.orderLookupStartDate, elements.orderLookupEndDate));
    elements.inventoryReportPresetFilter.addEventListener('change', (e) => handleDatePresetChange(e.target.value, elements.inventoryReportStartDate, elements.inventoryReportEndDate));
    elements.profitReportPresetFilter.addEventListener('change', (e) => handleDatePresetChange(e.target.value, elements.profitReportStartDate, elements.profitReportEndDate));

    elements.orderLookupBtn.addEventListener('click', () => {
        const startDate = new Date(elements.orderLookupStartDate.value);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(elements.orderLookupEndDate.value);
        endDate.setHours(23, 59, 59, 999);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            alert("Vui lòng chọn ngày hợp lệ.");
            return;
        }

        const activeOrders = loadFromStorage('activeOrders');
        const completedOrders = loadFromStorage('completedOrders');
        const cancelledOrders = loadFromStorage('cancelledOrders');

        const allOrdersInPeriod = [];

        activeOrders.forEach(order => {
            const orderDate = new Date(order.timestamps.created);
            if (orderDate >= startDate && orderDate <= endDate) {
                allOrdersInPeriod.push({ ...order, finalStatus: order.status });
            }
        });

        completedOrders.forEach(order => {
            const orderDate = new Date(order.timestamps.completed);
            if (orderDate >= startDate && orderDate <= endDate) {
                allOrdersInPeriod.push({ ...order, finalStatus: 'completed' });
            }
        });

        cancelledOrders.forEach(record => {
            const orderDate = new Date(record.timestamp);
            if (orderDate >= startDate && orderDate <= endDate) {
                allOrdersInPeriod.push({ 
                    ...record.order, 
                    finalStatus: 'cancelled', 
                    cancellationReason: record.reason,
                    cancellationTimestamp: record.timestamp
                });
            }
        });
        
        salesDataInPeriod = allOrdersInPeriod; // Store for filtering
        renderOrderStats(salesDataInPeriod);
        elements.orderDetailsTitle.classList.add('hidden');
        elements.orderDetailsList.innerHTML = '';
    });

    function renderOrderStats(orders) {
        const counts = Object.keys(orderStatuses).reduce((acc, key) => ({...acc, [key]: 0}), {});
        orders.forEach(order => {
            if (counts.hasOwnProperty(order.finalStatus)) {
                counts[order.finalStatus]++;
            }
        });

        elements.orderStats.innerHTML = Object.keys(orderStatuses).map(statusKey => {
            const status = orderStatuses[statusKey];
            const count = counts[statusKey];
            const name = status[`name${currentLang === 'zh' ? '_zh' : ''}`] || status.name;
            return `
                <div class="stat-card p-4 bg-white rounded-lg shadow-md text-center cursor-pointer border-2 border-transparent" style="--status-color: ${status.color};" data-status="${statusKey}">
                    <p class="text-3xl font-bold" style="color: ${status.color};">${count}</p>
                    <p class="text-sm font-medium text-gray-600">${name}</p>
                </div>
            `;
        }).join('');
    }

    elements.orderStats.addEventListener('click', (e) => {
        const card = e.target.closest('.stat-card');
        if (!card) return;

        const statusKey = card.dataset.status;
        const filteredData = salesDataInPeriod.filter(sale => sale.finalStatus === statusKey);
        
        const statusName = orderStatuses[statusKey]?.[`name${currentLang === 'zh' ? '_zh' : ''}`] || statusKey;
        elements.orderDetailsTitle.textContent = `${translations[currentLang].order_list}: ${statusName}`;
        elements.orderDetailsTitle.classList.remove('hidden');

        renderOrderDetailsList(filteredData);
    });

    function renderOrderDetailsList(data) {
         elements.orderDetailsList.innerHTML = data.length ? data.map(order => {
            const statusInfo = orderStatuses[order.finalStatus];
            const dishNames = order.items.map(i => findById(dishes, i.dishId)?.name || 'N/A').join(', ');

            const timeInfoHtml = (() => {
                if (order.finalStatus === 'completed') {
                    const duration = order.timestamps.completed - order.timestamps.created;
                    return `<div class="text-right">
                                <p class="font-semibold text-green-600">${formatDuration(duration)}</p>
                                <p class="text-xs text-gray-500" data-lang="total_time">${translations[currentLang].total_time}</p>
                            </div>`;
                } else if (order.finalStatus === 'cancelled') {
                    const duration = order.cancellationTimestamp - order.timestamps.created;
                    return `<div class="text-right">
                                <p class="font-semibold text-red-600">${formatDuration(duration)}</p>
                                <p class="text-xs text-gray-500" data-lang="total_time">${translations[currentLang].total_time}</p>
                            </div>`;
                } else { // new, preparing, delivering
                    return `<div class="text-right">
                                <p class="font-semibold text-blue-600 live-timer" data-timestamp="${order.timestamps.created}">00:00:00</p>
                                <p class="text-xs text-gray-500" data-lang="duration">${translations[currentLang].duration}</p>
                            </div>`;
                }
            })();

             return `
                <div class="p-4 bg-gray-50 rounded-lg border-l-4" style="border-color: ${statusInfo.color};">
                    <div class="flex flex-wrap justify-between items-center gap-2">
                        <div>
                            <p class="font-bold text-gray-800">${order.customer.orderId}</p>
                            <p class="text-sm text-gray-600">${dishNames}</p>
                            <p class="text-xs text-gray-500">${new Date(order.timestamps.created).toLocaleString('vi-VN')}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="font-semibold text-gray-800">${order.customer.name}</p>
                                <p class="text-xs text-gray-500">${order.customer.phone}</p>
                            </div>
                            ${timeInfoHtml}
                        </div>
                    </div>
                    ${order.finalStatus === 'cancelled' ? `<p class="text-xs text-red-600 mt-1">Lý do hủy: ${order.cancellationReason}</p>` : ''}
                </div>
            `;
         }).join('') : `<p class="text-gray-500 text-sm p-4 text-center">${translations[currentLang].empty_data}</p>`;
    }
    
    // --- Menu Management ---
    const renderDish = (d) => {
         const currentPrice = getPriceForDate(d, new Date());
         return `
        <div class="flex justify-between items-start p-3 bg-gray-50 rounded-md border">
            <div>
                <p class="font-semibold">${d.name} - ${formatCurrency(currentPrice)}</p>
                <p class="text-sm text-gray-500">${translations[currentLang].estimated_cost}: ${formatCurrency(d.cost)}</p>
            </div>
            <div class="flex gap-2">
                <button class="edit-dish-btn text-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-1 px-2 rounded" data-id="${d.id}">${translations[currentLang].edit}</button>
                <button class="delete-dish-btn text-xs bg-red-400 hover:bg-red-500 text-red-900 font-semibold py-1 px-2 rounded" data-id="${d.id}">${translations[currentLang].delete}</button>
            </div>
        </div>
    `};

    elements.dishesList.addEventListener('click', e => {
        if (e.target.matches('.edit-dish-btn')) {
            const dish = findById(dishes, e.target.dataset.id);
            if (dish) openEditDishModal(dish);
        }
        if (e.target.matches('.delete-dish-btn')) {
            showConfirmation('Xác nhận xóa', 'Bạn có chắc muốn xóa món ăn này?', () => {
                dishes = dishes.filter(d => d.id !== parseInt(e.target.dataset.id));
                localStorage.setItem('dishes', JSON.stringify(dishes));
                renderApp();
            });
        }
    });

    function openEditDishModal(dish) {
        const modal = elements.editDishModal;
        modal.querySelector('#edit-dish-id').value = dish.id;
        modal.querySelector('#edit-dish-name').value = dish.name;
        modal.querySelector('#edit-dish-description').value = dish.description;
        modal.querySelector('#edit-dish-image-url').value = dish.imageUrl || '';
        
        const currentPrice = getPriceForDate(dish, new Date());
        modal.querySelector('#edit-dish-price').value = currentPrice;
        modal.querySelector('#edit-dish-price-effective-date').value = '';

        editingBomItems = JSON.parse(JSON.stringify(dish.bom || []));
        populateMaterialSelects(modal.querySelector('#edit-bom-material-select'));
        renderEditingBomItems();
        modal.classList.add('active');
    }

    elements.cancelEditDishBtn.addEventListener('click', () => elements.editDishModal.classList.remove('active'));

    elements.editDishModal.querySelector('#edit-add-bom-item-btn').addEventListener('click', () => {
         const materialId = parseInt(elements.editDishModal.querySelector('#edit-bom-material-select').value);
        const quantity = parseFloat(elements.editDishModal.querySelector('#edit-bom-quantity').value);
        if (materialId && quantity > 0 && !editingBomItems.some(item => item.materialId === materialId)) {
            editingBomItems.push({ materialId, quantity });
            renderEditingBomItems();
            elements.editDishModal.querySelector('#edit-bom-quantity').value = '';
        }
    });

    function renderEditingBomItems() {
        const listEl = elements.editDishModal.querySelector('#edit-bom-items-list');
        listEl.innerHTML = editingBomItems.map((item, index) => {
            const material = findById(rawMaterials, item.materialId);
            return `<div class="flex justify-between items-center text-sm p-1 bg-blue-50 rounded">
                <span>${material?.name || 'N/A'} - ${item.quantity} ${material?.unit || ''}</span>
                <button type="button" class="remove-bom-item-btn text-red-500" data-index="${index}">X</button>
            </div>`;
        }).join('');
        
        elements.editDishModal.querySelector('#edit-estimated-cost').textContent = formatCurrency(calculateBomCost(editingBomItems));

        listEl.querySelectorAll('.remove-bom-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                editingBomItems.splice(parseInt(e.target.dataset.index), 1);
                renderEditingBomItems();
            });
        });
    }
    
    elements.editDishForm.addEventListener('submit', e => {
        e.preventDefault();
        const dishId = parseInt(document.getElementById('edit-dish-id').value);
        const reason = document.getElementById('edit-dish-reason').value;
        const originalDish = findById(dishes, dishId);
        
        const newPrice = parseFloat(document.getElementById('edit-dish-price').value);
        const effectiveDate = document.getElementById('edit-dish-price-effective-date').value;
        const priceHistory = originalDish.priceHistory || [{ price: originalDish.price, effectiveDate: '1970-01-01'}];
        
        if (newPrice !== getPriceForDate(originalDish, new Date(effectiveDate || todayISO()))) {
            if(!effectiveDate) { alert('Vui lòng chọn ngày áp dụng giá mới.'); return; }
             priceHistory.push({ price: newPrice, effectiveDate });
        }

        const updatedDish = {
            ...originalDish,
            name: document.getElementById('edit-dish-name').value,
            description: document.getElementById('edit-dish-description').value,
            imageUrl: document.getElementById('edit-dish-image-url').value,
            price: getPriceForDate({...originalDish, priceHistory}, new Date()),
            priceHistory: priceHistory,
            bom: editingBomItems,
            cost: calculateBomCost(editingBomItems)
        };
        
        logAdjustment('log_type_dish', dishId, reason, {}); // Simplified log for now
        dishes = dishes.map(d => d.id === dishId ? updatedDish : d);
        localStorage.setItem('dishes', JSON.stringify(dishes));
        
        elements.editDishModal.classList.remove('active');
        e.target.reset();
        renderApp();
    });

    // --- Material & Category Management ---
    function renderMaterialCategories() {
        const listEl = elements.materialCategoriesList;
        listEl.innerHTML = materialCategories.map(cat => `
            <div class="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                <span>${cat.name}</span>
                <div class="flex gap-2">
                     <button class="edit-category-btn text-xs text-yellow-700 hover:text-yellow-900" data-id="${cat.id}">Sửa</button>
                    <button class="delete-category-btn text-xs text-red-500 hover:text-red-700" data-id="${cat.id}">Xóa</button>
                </div>
            </div>
        `).join('');
        populateSelect(document.getElementById('material-category-select'), materialCategories, 'select_category');
    }

    document.getElementById('add-category-form').addEventListener('submit', e => {
        e.preventDefault();
        const nameInput = document.getElementById('category-name');
        const name = nameInput.value.trim();
        if (name) {
            materialCategories.push({ id: Date.now(), name });
            localStorage.setItem('materialCategories', JSON.stringify(materialCategories));
            renderMaterialCategories();
            nameInput.value = '';
        }
    });

    elements.materialCategoriesList.addEventListener('click', e => {
        if (e.target.matches('.edit-category-btn')) {
            const category = findById(materialCategories, e.target.dataset.id);
            if (category) openEditCategoryModal(category);
        }
        if (e.target.matches('.delete-category-btn')) {
            handleDeleteCategory(parseInt(e.target.dataset.id));
        }
    });

    function openEditCategoryModal(category) {
        const modal = elements.editCategoryModal;
        modal.querySelector('#edit-category-id').value = category.id;
        modal.querySelector('#edit-category-name').value = category.name;
        modal.classList.add('active');
    }

    document.getElementById('cancel-edit-category').addEventListener('click', () => elements.editCategoryModal.classList.remove('active'));
    
    document.getElementById('edit-category-form').addEventListener('submit', e => {
        e.preventDefault();
        const catId = parseInt(document.getElementById('edit-category-id').value);
        const newName = document.getElementById('edit-category-name').value.trim();
        if(newName) {
            materialCategories = materialCategories.map(c => c.id === catId ? {...c, name: newName} : c);
            localStorage.setItem('materialCategories', JSON.stringify(materialCategories));
            elements.editCategoryModal.classList.remove('active');
            renderApp();
        }
    });

    function handleDeleteCategory(categoryId) {
        showConfirmation('Xóa phân loại?', 'Bạn có chắc muốn xóa phân loại này? Các nguyên vật liệu trong nhóm sẽ trở thành "Chưa phân loại".', () => {
            materialCategories = materialCategories.filter(c => c.id !== categoryId);
            rawMaterials.forEach(m => {
                if (m.categoryId === categoryId) {
                    m.categoryId = null;
                }
            });
            localStorage.setItem('materialCategories', JSON.stringify(materialCategories));
            localStorage.setItem('rawMaterials', JSON.stringify(rawMaterials));
            renderApp();
        });
    }
    
    document.getElementById('add-material-form').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('material-name').value.trim();
        const unit = document.getElementById('material-unit').value.trim();
        const categoryId = parseInt(document.getElementById('material-category-select').value) || null;
        if (name && unit) {
            rawMaterials.push({ id: Date.now(), name, unit, price: 0, categoryId });
            localStorage.setItem('rawMaterials', JSON.stringify(rawMaterials));
            renderMaterialsList();
            e.target.reset();
        }
    });

    elements.searchMaterialInput.addEventListener('input', () => renderMaterialsList());

    function renderMaterialsList() {
        const searchTerm = elements.searchMaterialInput.value.toLowerCase();
        const listEl = elements.materialsList;

        const filteredMaterials = rawMaterials.filter(m => m.name.toLowerCase().includes(searchTerm));
        const grouped = filteredMaterials.reduce((acc, m) => {
            const catId = m.categoryId || 'uncategorized';
            if (!acc[catId]) acc[catId] = [];
            acc[catId].push(m);
            return acc;
        }, {});

        const categoryOrder = materialCategories.map(c => c.id);
        if (grouped.uncategorized) categoryOrder.push('uncategorized');

        listEl.innerHTML = categoryOrder.map(catId => {
            if (!grouped[catId]) return '';
            const category = catId === 'uncategorized' ? { name: translations[currentLang].uncategorized } : findById(materialCategories, catId);
            if (!category) return '';

            const materialsHtml = grouped[catId].map(m => `
                <div class="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                    <div>
                        <p class="font-medium text-sm">${m.name} (${m.unit})</p>
                        <p class="font-mono text-xs text-gray-600">${formatCurrency(m.price)}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="edit-material-btn text-xs text-yellow-700 hover:text-yellow-900" data-id="${m.id}">${translations[currentLang].edit}</button>
                        <button class="delete-material-btn text-xs text-red-500 hover:text-red-700" data-id="${m.id}">${translations[currentLang].delete}</button>
                    </div>
                </div>`).join('');

            return `<div>
                        <h4 class="font-semibold text-gray-700 text-md mt-2 mb-1 pb-1 border-b">${category.name}</h4>
                        <div class="space-y-2">${materialsHtml}</div>
                    </div>`;
        }).join('') || `<p class="text-gray-500 text-center">${translations[currentLang].empty_data}</p>`;
    }
    
    elements.materialsList.addEventListener('click', e => {
        if (e.target.matches('.edit-material-btn')) {
            const material = findById(rawMaterials, e.target.dataset.id);
            if (material) openEditMaterialModal(material);
        }
        if (e.target.matches('.delete-material-btn')) {
            handleDeleteMaterial(parseInt(e.target.dataset.id));
        }
    });

    function handleDeleteMaterial(materialId) {
        const isUsed = dishes.some(d => d.bom && d.bom.some(item => item.materialId === materialId));
        if (isUsed) {
            alert('Không thể xóa nguyên vật liệu này vì nó đang được sử dụng trong định lượng của một món ăn.');
            return;
        }
        showConfirmation('Xóa nguyên liệu?', 'Bạn có chắc muốn xóa nguyên vật liệu này?', () => {
             rawMaterials = rawMaterials.filter(m => m.id !== materialId);
            localStorage.setItem('rawMaterials', JSON.stringify(rawMaterials));
            renderApp();
        });
    }

    function openEditMaterialModal(material) {
        const modal = elements.editMaterialModal;
        populateSelect(modal.querySelector('#edit-material-category-select'), materialCategories, 'select_category', 'id', 'name', material.categoryId);
        modal.querySelector('#edit-material-id').value = material.id;
        modal.querySelector('#edit-material-name').value = material.name;
        modal.querySelector('#edit-material-unit').value = material.unit;
        modal.classList.add('active');
    }
    
    elements.cancelEditMaterialBtn.addEventListener('click', () => elements.editMaterialModal.classList.remove('active'));

    elements.editMaterialForm.addEventListener('submit', e => {
        e.preventDefault();
        const materialId = parseInt(document.getElementById('edit-material-id').value);
        const reason = document.getElementById('edit-material-reason').value;

        const updatedMaterial = {
            ...findById(rawMaterials, materialId),
            name: document.getElementById('edit-material-name').value,
            unit: document.getElementById('edit-material-unit').value,
            categoryId: parseInt(document.getElementById('edit-material-category-select').value) || null,
        };

        logAdjustment('log_type_material', materialId, reason, {});
        rawMaterials = rawMaterials.map(m => m.id === materialId ? updatedMaterial : m);
        localStorage.setItem('rawMaterials', JSON.stringify(rawMaterials));

        elements.editMaterialModal.classList.remove('active');
        e.target.reset();
        renderApp();
    });

    function getPriceForDate(dish, date) {
        if (!dish.priceHistory || dish.priceHistory.length === 0) return dish.price;
        const sortedHistory = [...dish.priceHistory].sort((a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate));
        const dateString = date.toISOString().split('T')[0];
        for (const entry of sortedHistory) {
            if (entry.effectiveDate <= dateString) return entry.price;
        }
        return dish.price; // fallback to base price
    }
    
    function calculateBomCost(bomItems) {
        return bomItems.reduce((total, item) => {
            const material = findById(rawMaterials, item.materialId);
            return total + (material ? material.price * item.quantity : 0);
        }, 0);
    }
    
    function updateAllMaterialPrices() {
        const latestPurchases = {};
        const sortedPurchases = [...purchases].sort((a, b) => new Date(b.date) - new Date(a.date));

        for (const p of sortedPurchases) {
            if (!latestPurchases[p.materialId]) {
                latestPurchases[p.materialId] = p.unitPrice;
            }
        }

        rawMaterials.forEach(material => {
            material.price = latestPurchases[material.id] || material.price || 0;
        });

        localStorage.setItem('rawMaterials', JSON.stringify(rawMaterials));
    }

    function recalculateAllDishCosts() {
         dishes.forEach(dish => {
            dish.cost = calculateBomCost(dish.bom);
        });
        localStorage.setItem('dishes', JSON.stringify(dishes));
    }
    
    function populateMaterialSelects(selectElement) {
        const placeholder = translations[currentLang].select_material;
        selectElement.innerHTML = `<option value="">-- ${placeholder} --</option>`;

        const grouped = rawMaterials.reduce((acc, m) => {
            const catId = m.categoryId || 'uncategorized';
            if (!acc[catId]) acc[catId] = [];
            acc[catId].push(m);
            return acc;
        }, {});

         materialCategories.forEach(cat => {
            if (grouped[cat.id]) {
                const optgroup = document.createElement('optgroup');
                optgroup.label = cat.name;
                grouped[cat.id].forEach(m => {
                    const option = document.createElement('option');
                    option.value = m.id;
                    option.textContent = m.name;
                    optgroup.appendChild(option);
                });
                selectElement.appendChild(optgroup);
            }
        });

        if (grouped.uncategorized) {
            const optgroup = document.createElement('optgroup');
            optgroup.label = translations[currentLang].uncategorized;
            grouped.uncategorized.forEach(m => {
                 const option = document.createElement('option');
                 option.value = m.id;
                 option.textContent = m.name;
                 optgroup.appendChild(option);
            });
            selectElement.appendChild(optgroup);
        }
    }
    
    // --- Confirmation Modal Logic ---
    function showConfirmation(title, message, onConfirm) {
        const modal = elements.confirmationModal;
        modal.querySelector('#confirmation-title').textContent = title;
        modal.querySelector('#confirmation-message').textContent = message;
        
        const confirmBtn = modal.querySelector('#confirm-ok-btn');
        const cancelBtn = modal.querySelector('#confirm-cancel-btn');

        const confirmHandler = () => {
            onConfirm();
            closeModal();
        };
        
        const closeModal = () => {
            modal.classList.remove('active');
            confirmBtn.removeEventListener('click', confirmHandler);
             cancelBtn.removeEventListener('click', closeModal);
        };

        confirmBtn.addEventListener('click', confirmHandler, { once: true });
        cancelBtn.addEventListener('click', closeModal, { once: true });
        
        modal.classList.add('active');
    }

    // --- Purchase Logic ---
    function renderPurchasesList() {
        const listEl = document.getElementById('purchases-list');
        const sortedPurchases = [...purchases].sort((a,b) => new Date(b.date) - new Date(a.date));
        listEl.innerHTML = sortedPurchases.length ? sortedPurchases.slice(0, 20).map(p => { // Show recent 20
            const material = findById(rawMaterials, p.materialId);
            return `
            <div class="text-xs p-2 bg-gray-50 rounded">
                <p>${p.date}: <span class="font-semibold">${material?.name || 'N/A'}</span></p>
                <p>SL: ${p.quantity} ${material?.unit || ''} - Tổng: ${formatCurrency(p.totalPrice)}</p>
            </div>
            `;
        }).join('') : `<p class="text-gray-500 text-center">${translations[currentLang].empty_data}</p>`;
    }
    
    document.getElementById('add-purchase-form').addEventListener('submit', e => {
        e.preventDefault();
        const materialId = parseInt(document.getElementById('purchase-material-select').value);
        const quantity = parseFloat(document.getElementById('purchase-quantity').value);
        const totalPrice = parseFloat(document.getElementById('purchase-total-price').value);

        const newPurchase = {
            id: Date.now(),
            date: document.getElementById('purchase-date').value,
            materialId: materialId,
            quantity: quantity,
            totalPrice: totalPrice,
            unitPrice: (quantity > 0) ? totalPrice / quantity : 0,
            supplierId: parseInt(document.getElementById('purchase-supplier-select').value)
        };

        if(!newPurchase.date || isNaN(newPurchase.materialId) || isNaN(newPurchase.quantity) || isNaN(newPurchase.totalPrice) || isNaN(newPurchase.supplierId)) {
            alert('Vui lòng điền đầy đủ thông tin nhập kho.');
            return;
        }

        purchases.push(newPurchase);
        localStorage.setItem('purchases', JSON.stringify(purchases));
        
        renderApp();
        
        e.target.reset();
        document.getElementById('new-unit-price').textContent = formatCurrency(0);
        document.getElementById('purchase-unit').value = '';
    });

    document.getElementById('purchase-material-select').addEventListener('change', (e) => {
        const material = findById(rawMaterials, e.target.value);
        document.getElementById('purchase-unit').value = material ? material.unit : '';
    });
    
    const purchaseQuantityInput = document.getElementById('purchase-quantity');
    const purchaseTotalPriceInput = document.getElementById('purchase-total-price');
    const newUnitPriceEl = document.getElementById('new-unit-price');

    function updateNewUnitPrice() {
        const quantity = parseFloat(purchaseQuantityInput.value);
        const totalPrice = parseFloat(purchaseTotalPriceInput.value);
        if (quantity > 0 && totalPrice > 0) {
            const unitPrice = totalPrice / quantity;
            newUnitPriceEl.textContent = formatCurrency(unitPrice);
        } else {
            newUnitPriceEl.textContent = formatCurrency(0);
        }
    }
    purchaseQuantityInput.addEventListener('input', updateNewUnitPrice);
    purchaseTotalPriceInput.addEventListener('input', updateNewUnitPrice);
    

    // --- Spoilage Logic ---
    function renderSpoilageList() {
        const listEl = document.getElementById('spoilage-list');
        const sortedRecords = [...spoilageRecords].sort((a,b) => new Date(b.date) - new Date(a.date));
        listEl.innerHTML = sortedRecords.length ? sortedRecords.map(r => {
            const material = findById(rawMaterials, r.materialId);
            return `
            <div class="p-2 bg-red-50 rounded text-sm flex justify-between">
                <span>${r.date}: ${material?.name || 'N/A'} - ${r.quantity} ${material?.unit || ''} (${r.reason})</span>
                <button class="delete-spoilage-btn text-red-500 hover:text-red-700 font-bold" data-id="${r.id}">X</button>
            </div>`;
        }).join('') : `<p class="text-gray-500 text-center">${translations[currentLang].empty_data}</p>`;
    }

    document.getElementById('spoilage-list').addEventListener('click', e => {
        if(e.target.matches('.delete-spoilage-btn')) {
            const recordId = parseInt(e.target.dataset.id);
            showConfirmation('Xóa hư hao?', 'Bạn có chắc muốn xóa ghi nhận hư hao này?', () => {
                 spoilageRecords = spoilageRecords.filter(r => r.id !== recordId);
                 localStorage.setItem('spoilageRecords', JSON.stringify(spoilageRecords));
                 renderSpoilageList();
            });
        }
    });

    document.getElementById('spoilage-material-select').addEventListener('change', (e) => {
        const material = findById(rawMaterials, e.target.value);
        document.getElementById('spoilage-unit').value = material ? material.unit : '';
    });
    
    document.getElementById('add-spoilage-form').addEventListener('submit', e => {
        e.preventDefault();
        const newSpoilage = {
            id: Date.now(),
            date: document.getElementById('spoilage-date').value,
            materialId: parseInt(document.getElementById('spoilage-material-select').value),
            quantity: parseFloat(document.getElementById('spoilage-quantity').value),
            reason: document.getElementById('spoilage-reason').value
        };
        if (!newSpoilage.date || isNaN(newSpoilage.materialId) || isNaN(newSpoilage.quantity) || !newSpoilage.reason) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        spoilageRecords.push(newSpoilage);
        localStorage.setItem('spoilageRecords', JSON.stringify(spoilageRecords));
        renderSpoilageList();
        e.target.reset();
        document.getElementById('spoilage-unit').value = '';
    });

    // --- Other Costs Logic ---
    function renderOtherCostsLists() {
        const monthlyList = document.getElementById('monthly-costs-list');
        const yearlyList = document.getElementById('yearly-costs-list');
        const onetimeList = document.getElementById('onetime-costs-list');
        let totalMonthly = 0, totalYearly = 0, totalOnetime = 0;

        const renderList = (items) => items.map(c => `
            <div class="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <span>${c.name}</span>
                <div class="flex items-center gap-3">
                    <span class="font-semibold">${formatCurrency(c.amount)}</span>
                    <button class="delete-cost-btn text-red-500 hover:text-red-700 font-bold" data-id="${c.id}">X</button>
                </div>
            </div>`).join('');
        
        const monthlyCosts = otherCosts.filter(c => c.frequency === 'monthly');
        monthlyList.innerHTML = monthlyCosts.length ? renderList(monthlyCosts) : `<p class="text-gray-500 text-center text-sm">${translations[currentLang].empty_data}</p>`;
        totalMonthly = monthlyCosts.reduce((sum, c) => sum + c.amount, 0);

        const yearlyCosts = otherCosts.filter(c => c.frequency === 'yearly');
        yearlyList.innerHTML = yearlyCosts.length ? renderList(yearlyCosts) : `<p class="text-gray-500 text-center text-sm">${translations[currentLang].empty_data}</p>`;
        totalYearly = yearlyCosts.reduce((sum, c) => sum + c.amount, 0);
        
        const onetimeCosts = otherCosts.filter(c => c.frequency === 'onetime');
        onetimeList.innerHTML = onetimeCosts.length ? renderList(onetimeCosts) : `<p class="text-gray-500 text-center text-sm">${translations[currentLang].empty_data}</p>`;
        totalOnetime = onetimeCosts.reduce((sum, c) => sum + c.amount, 0);

        document.getElementById('total-monthly-costs').textContent = formatCurrency(totalMonthly);
        document.getElementById('total-yearly-costs').textContent = formatCurrency(totalYearly);
        document.getElementById('total-onetime-costs').textContent = formatCurrency(totalOnetime);
    }

    function handleDeleteCost(e) {
        if(e.target.matches('.delete-cost-btn')) {
            const costId = parseInt(e.target.dataset.id);
             showConfirmation('Xóa chi phí?', 'Bạn có chắc muốn xóa chi phí này?', () => {
                 otherCosts = otherCosts.filter(c => c.id !== costId);
                 localStorage.setItem('otherCosts', JSON.stringify(otherCosts));
                 renderOtherCostsLists();
            });
        }
    }
    document.getElementById('monthly-costs-list').addEventListener('click', handleDeleteCost);
    document.getElementById('yearly-costs-list').addEventListener('click', handleDeleteCost);
    document.getElementById('onetime-costs-list').addEventListener('click', handleDeleteCost);

    document.getElementById('add-other-cost-form').addEventListener('submit', e => {
        e.preventDefault();
        const newCost = {
            id: Date.now(),
            name: document.getElementById('other-cost-name').value,
            amount: parseFloat(document.getElementById('other-cost-amount').value),
            frequency: document.getElementById('other-cost-frequency').value
        };
         if (!newCost.name || isNaN(newCost.amount)) {
            alert('Vui lòng điền đầy đủ thông tin chi phí.');
            return;
        }
        otherCosts.push(newCost);
        localStorage.setItem('otherCosts', JSON.stringify(otherCosts));
        renderOtherCostsLists();
        e.target.reset();
    });


    // --- Dashboard Logic ---
    function renderDashboard() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const completedToday = loadFromStorage('completedOrders').filter(o => new Date(o.timestamps.completed) >= today);
        const activeToday = loadFromStorage('activeOrders').filter(o => new Date(o.timestamps.created) >= today);
        
        const revenueToday = completedToday.reduce((sum, order) => sum + order.totalPrice, 0);
        document.getElementById('dashboard-revenue').textContent = formatCurrency(revenueToday);
        document.getElementById('dashboard-orders').textContent = activeToday.length + completedToday.length;
        
        // Best seller logic
        const dishCounts = completedToday.flatMap(o => o.items).reduce((acc, item) => {
            acc[item.dishId] = (acc[item.dishId] || 0) + item.quantity;
            return acc;
        }, {});
        const bestSellerId = Object.keys(dishCounts).sort((a,b) => dishCounts[b] - dishCounts[a])[0];
        const bestSellerDish = findById(dishes, bestSellerId);
        document.getElementById('dashboard-best-seller').textContent = bestSellerDish ? bestSellerDish.name : 'N/A';

        // Chart
        const statusCounts = [...activeToday, ...completedToday].reduce((acc, order) => {
            const status = order.finalStatus || order.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        renderPieChart('orderStatusChart', {
            labels: Object.keys(statusCounts).map(key => orderStatuses[key]?.[`name${currentLang === 'zh' ? '_zh' : ''}`] || key),
            data: Object.values(statusCounts),
            colors: Object.keys(statusCounts).map(key => orderStatuses[key]?.color || '#ccc')
        });
    }
    
    // --- Charting Function ---
    function renderPieChart(canvasId, { labels, data, colors }) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
        }
        chartInstances[canvasId] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }


    // --- Live Timer Update ---
    setInterval(() => {
        document.querySelectorAll('.live-timer').forEach(timerEl => {
            const timestamp = parseInt(timerEl.dataset.timestamp, 10);
            if (!isNaN(timestamp)) {
                const duration = Date.now() - timestamp;
                timerEl.textContent = formatDuration(duration);
            }
        });
    }, 1000);

    // --- Report Logic ---
    document.getElementById('view-inventory-report-btn').addEventListener('click', () => {
        const startDateStr = document.getElementById('report-start-date').value;
        const endDateStr = document.getElementById('report-end-date').value;

        if (!startDateStr || !endDateStr) {
            alert('Vui lòng chọn ngày bắt đầu và kết thúc.');
            return;
        }

        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);
        
        const completedOrders = loadFromStorage('completedOrders');

        // Filter data for calculations
        const purchasesBefore = purchases.filter(p => new Date(p.date) < startDate);
        const spoilageBefore = spoilageRecords.filter(s => new Date(s.date) < startDate);
        const ordersBefore = completedOrders.filter(o => new Date(o.timestamps.completed) < startDate);
        const usageBefore = getMaterialUsage(ordersBefore);

        const purchasesInPeriod = purchases.filter(p => new Date(p.date) >= startDate && new Date(p.date) <= endDate);
        const spoilageInPeriod = spoilageRecords.filter(s => new Date(s.date) >= startDate && new Date(s.date) <= endDate);
        const ordersInPeriod = completedOrders.filter(o => new Date(o.timestamps.completed) >= startDate && new Date(o.timestamps.completed) <= endDate);
        const usageInPeriod = getMaterialUsage(ordersInPeriod);
        
        const reportData = rawMaterials.map(material => {
            const materialId = material.id;
            
            const openingPurchases = purchasesBefore.filter(p => p.materialId === materialId).reduce((sum, p) => sum + p.quantity, 0);
            const openingSpoilage = spoilageBefore.filter(s => s.materialId === materialId).reduce((sum, s) => sum + s.quantity, 0);
            const openingUsage = usageBefore[materialId] || 0;
            const openingStock = openingPurchases - openingUsage - openingSpoilage;

            const periodPurchases = purchasesInPeriod.filter(p => p.materialId === materialId).reduce((sum, p) => sum + p.quantity, 0);
            const periodSpoilage = spoilageInPeriod.filter(s => s.materialId === materialId).reduce((sum, p) => sum + s.quantity, 0);
            const periodUsage = usageInPeriod[materialId] || 0;

            const closingStock = openingStock + periodPurchases - periodUsage - periodSpoilage;

            return {
                name: material.name,
                unit: material.unit,
                openingStock: openingStock,
                purchasedInPeriod: periodPurchases,
                usedInPeriod: periodUsage,
                spoiledInPeriod: periodSpoilage,
                closingStock: closingStock
            };
        });

        // Render the table
        const reportBody = document.getElementById('inventory-report-body');
        reportBody.innerHTML = reportData.map(row => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${row.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.unit}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.openingStock.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.purchasedInPeriod.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.usedInPeriod.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.spoiledInPeriod.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">${row.closingStock.toFixed(2)}</td>
            </tr>
        `).join('');
    });

    const COMMISSION_RATE = 0.20; // 20% commission fee assumption
    document.getElementById('calculate-profit-btn').addEventListener('click', () => {
        const startDateStr = document.getElementById('profit-report-start-date').value;
        const endDateStr = document.getElementById('profit-report-end-date').value;

        if (!startDateStr || !endDateStr) {
            alert('Vui lòng chọn ngày bắt đầu và kết thúc.');
            return;
        }
        
        const startDate = new Date(startDateStr);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);
        
        const completedOrdersInPeriod = loadFromStorage('completedOrders').filter(o => {
            const completedDate = new Date(o.timestamps.completed);
            return completedDate >= startDate && completedDate <= endDate;
        });

        const totalRevenue = completedOrdersInPeriod.reduce((sum, order) => sum + order.totalPrice, 0);

        const totalCOGS = completedOrdersInPeriod.reduce((sum, order) => {
            const orderCost = order.items.reduce((itemSum, item) => {
                const dish = findById(dishes, item.dishId);
                const dishCost = dish ? (dish.cost || calculateBomCost(dish.bom)) : 0;
                return itemSum + (dishCost * item.quantity);
            }, 0);
            return sum + orderCost;
        }, 0);

        const totalCommission = totalRevenue * COMMISSION_RATE;

        const spoilageInPeriod = spoilageRecords.filter(s => {
            const spoilageDate = new Date(s.date);
            return spoilageDate >= startDate && spoilageDate <= endDate;
        });
        const totalSpoilageCost = spoilageInPeriod.reduce((sum, record) => {
            const material = findById(rawMaterials, record.materialId);
            const cost = material ? material.price * record.quantity : 0;
            return sum + cost;
        }, 0);
        
        const daysInPeriod = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
        const totalMonthlyRaw = otherCosts.filter(c => c.frequency === 'monthly').reduce((sum, c) => sum + c.amount, 0);
        const totalYearlyRaw = otherCosts.filter(c => c.frequency === 'yearly').reduce((sum, c) => sum + c.amount, 0);
        const monthlyExpenseInPeriod = (totalMonthlyRaw / 30.44) * daysInPeriod;
        const yearlyExpenseInPeriod = (totalYearlyRaw / 365.25) * daysInPeriod;
        const totalOperatingExpense = monthlyExpenseInPeriod + yearlyExpenseInPeriod;

        const netProfit = totalRevenue - totalCOGS - totalCommission - totalSpoilageCost - totalOperatingExpense;
        
        document.getElementById('result-revenue').textContent = formatCurrency(totalRevenue);
        document.getElementById('result-cogs').textContent = formatCurrency(totalCOGS);
        document.getElementById('result-commission-fees').textContent = formatCurrency(totalCommission);
        document.getElementById('result-monthly-expense').textContent = formatCurrency(totalOperatingExpense);
        document.getElementById('result-spoilage-cost').textContent = formatCurrency(totalSpoilageCost);
        document.getElementById('result-net-profit').textContent = formatCurrency(netProfit);

        const revenueByDish = completedOrdersInPeriod
            .flatMap(o => o.items)
            .reduce((acc, item) => {
                const dish = findById(dishes, item.dishId);
                const dishName = dish ? dish.name : 'Unknown';
                const itemRevenue = (findById(dishes, item.dishId)?.price || 0) * item.quantity;
                acc[dishName] = (acc[dishName] || 0) + itemRevenue;
                return acc;
            }, {});
            
        renderPieChart('revenueStructureChart', {
            labels: Object.keys(revenueByDish),
            data: Object.values(revenueByDish),
            colors: ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EF4444', '#F59E0B', '#6366F1', '#EC4899', '#22D3EE']
        });

        document.getElementById('profit-results').classList.remove('hidden');
    });

    // --- PAYROLL MANAGEMENT ---
    
    // Get week number for a date
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return [d.getUTCFullYear(), weekNo];
    }

    function generatePayrollPeriods() {
        const periods = {};
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const [currentYear, currentWeek] = getWeekNumber(now);

        // Last 3 months for contract employees
        for (let i = 0; i < 3; i++) {
            const d = new Date(year, month - i, 1);
            const periodKey = `M-${d.getFullYear()}-${d.getMonth() + 1}`;
            periods[periodKey] = `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
        }

        // Last 4 weeks for part-time employees
        for (let i = 0; i < 4; i++) {
            const d = new Date(now);
            d.setDate(d.getDate() - (i * 7));
             const [wYear, wNumber] = getWeekNumber(d);
            const periodKey = `W-${wYear}-${wNumber}`;
            periods[periodKey] = `Tuần ${wNumber}/${wYear}`;
        }
        return periods;
    }
    
    function populatePayrollPeriodSelect() {
        const periods = generatePayrollPeriods();
        elements.payrollPeriodSelect.innerHTML = Object.entries(periods)
            .map(([key, text]) => `<option value="${key}">${text}</option>`).join('');
    }

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
        const listEl = elements.payrollEmployeeList;
        const activeEmployees = employees.filter(e => e.status === 'active');
        const periodKey = elements.payrollPeriodSelect.value;
        const periodData = payrolls[periodKey] || {};

        if (!activeEmployees.length) {
            listEl.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-gray-500">${translations[currentLang].empty_data}</td></tr>`;
            return;
        }

        listEl.innerHTML = activeEmployees.map(emp => {
            const currentSalary = getSalaryForDate(emp, new Date());
            const salaryText = currentSalary ? `${formatCurrency(currentSalary.amount)}/${emp.employmentType === 'contract' ? 'tháng' : 'ngày'}` : `<span class="text-red-500">${translations[currentLang].no_salary_setup}</span>`;

            const timesheetStatus = periodData[emp.id] ? `<span class="text-green-600">Đã chấm công</span>` : `<span class="text-gray-500">${translations[currentLang].not_yet_entered}</span>`;
            
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

    elements.payrollEmployeeList.addEventListener('click', e => {
        const employeeId = e.target.dataset.id;
        if (!employeeId) return;

        const employee = findById(employees, employeeId);
        if (!employee) return;

        if (e.target.matches('.setup-salary-btn')) {
            openSalarySetupModal(employee);
        } else if (e.target.matches('.enter-timesheet-btn')) {
            openTimesheetModal(employee);
        }
    });

    function openSalarySetupModal(employee) {
        const modal = elements.salarySetupModal;
        modal.querySelector('#salary-employee-name').textContent = employee.name;
        modal.querySelector('#salary-employee-id').value = employee.id;
        
        // Render salary history
        const historyList = modal.querySelector('#salary-history-list');
        const history = employee.salaryHistory || [];
        historyList.innerHTML = history.length ? [...history].sort((a,b) => new Date(b.effectiveDate) - new Date(a.effectiveDate)).map(h => `
            <div class="p-2 bg-gray-100 rounded-md text-sm">
                <p><strong>${formatCurrency(h.amount)}</strong> - Hiệu lực từ: <strong>${h.effectiveDate}</strong></p>
                <p class="text-gray-600">Lý do: ${h.reason}</p>
            </div>
        `).join('') : `<p class="text-gray-500 text-center">${translations[currentLang].empty_data}</p>`;
        
        modal.classList.add('active');
    }

    document.getElementById('salary-setup-form').addEventListener('submit', e => {
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
        openSalarySetupModal(findById(employees, employeeId)); // Re-open to show updated history
        e.target.reset();
        renderPayrollEmployeeList();
    });

    document.getElementById('close-salary-modal-btn').addEventListener('click', () => elements.salarySetupModal.classList.remove('active'));

    function openTimesheetModal(employee) {
        const modal = elements.timesheetModal;
        const periodKey = elements.payrollPeriodSelect.value;
        const periodText = elements.payrollPeriodSelect.options[elements.payrollPeriodSelect.selectedIndex].text;
        
        modal.querySelector('#timesheet-employee-name').textContent = employee.name;
        modal.querySelector('#timesheet-period').textContent = periodText;
        modal.querySelector('#timesheet-employee-id').value = employee.id;
        modal.querySelector('#timesheet-period-key').value = periodKey;

        // Load existing data if any
        const existingData = (payrolls[periodKey] && payrolls[periodKey][employee.id]) ? payrolls[periodKey][employee.id] : {};
        
        if (employee.employmentType === 'contract') {
            modal.querySelector('#timesheet-contract-fields').style.display = 'block';
            modal.querySelector('#timesheet-part-time-fields').style.display = 'none';
            modal.querySelector('#timesheet-work-days').value = existingData.workDays || '';
            modal.querySelector('#timesheet-paid-leave').value = existingData.paidLeave || 0;
            modal.querySelector('#timesheet-dependents').value = existingData.dependents || 0;
        } else { // part-time
            modal.querySelector('#timesheet-contract-fields').style.display = 'none';
            modal.querySelector('#timesheet-part-time-fields').style.display = 'block';
            modal.querySelector('#timesheet-work-hours').value = existingData.workHours || '';
        }
        modal.classList.add('active');
    }
    
    document.getElementById('timesheet-form').addEventListener('submit', e => {
        e.preventDefault();
        const employeeId = parseInt(document.getElementById('timesheet-employee-id').value);
        const periodKey = document.getElementById('timesheet-period-key').value;
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
        
        if (!payrolls[periodKey]) {
            payrolls[periodKey] = {};
        }
        payrolls[periodKey][employeeId] = timesheetData;
        localStorage.setItem('payrolls', JSON.stringify(payrolls));

        elements.timesheetModal.classList.remove('active');
        renderPayrollEmployeeList(); // Re-render to show "Đã chấm công"
    });

    document.getElementById('cancel-timesheet-btn').addEventListener('click', () => elements.timesheetModal.classList.remove('active'));

    document.getElementById('calculate-payroll-btn').addEventListener('click', () => {
        const periodKey = elements.payrollPeriodSelect.value;
        const periodData = payrolls[periodKey];

        if (!periodData) {
            alert('Chưa có dữ liệu chấm công cho kỳ này.');
            return;
        }

        const activeEmployees = employees.filter(e => e.status === 'active');
        const payslips = [];

        for (const emp of activeEmployees) {
            const timesheet = periodData[emp.id];
            if (!timesheet) continue; // Skip if no timesheet

            const salaryRecord = getSalaryForDate(emp, new Date());
            if (!salaryRecord) continue; // Skip if no salary record

            let payslip = { employeeName: emp.name };

            if (emp.employmentType === 'contract') {
                const workDays = timesheet.workDays || 0;
                const paidLeave = timesheet.paidLeave || 0;
                const totalWorkDays = workDays + paidLeave;

                const grossSalary = (salaryRecord.amount / 26) * totalWorkDays; // Assuming 26 work days/month
                const salaryForInsurance = Math.min(grossSalary, INSURANCE_BASE_SALARY_CAP);
                
                const bhxh = salaryForInsurance * BHXH_RATE;
                const bhyt = salaryForInsurance * BHYT_RATE;
                const bhtn = salaryForInsurance * BHTN_RATE;
                const totalInsurance = bhxh + bhyt + bhtn;

                const dependentAllowance = (timesheet.dependents || 0) * PIT_DEPENDENT_ALLOWANCE;
                const taxableIncome = Math.max(0, grossSalary - totalInsurance - PIT_PERSONAL_ALLOWANCE - dependentAllowance);
                const pit = calculatePIT(taxableIncome);

                const netSalary = grossSalary - totalInsurance - pit;

                payslip = {
                    ...payslip,
                    grossSalary, bhxh, bhyt, bhtn, totalInsurance, 
                    personalAllowance: PIT_PERSONAL_ALLOWANCE,
                    dependentAllowance, taxableIncome, pit, netSalary
                };

            } else { // part-time
                const workHours = timesheet.workHours || 0;
                const hourlyRate = salaryRecord.amount / 8; // Assuming 8 hours/day
                const netSalary = workHours * hourlyRate;
                payslip.netSalary = netSalary;
            }
            payslips.push(payslip);
        }
        
        // Display payslips (for now, using alert, can be improved to a modal)
        let resultText = `Bảng lương cho kỳ ${elements.payrollPeriodSelect.options[elements.payrollPeriodSelect.selectedIndex].text}:\n\n`;
        payslips.forEach(p => {
             resultText += `--- ${p.employeeName} ---\n`;
             if(p.grossSalary !== undefined) {
                 resultText += `Lương Gross: ${formatCurrency(p.grossSalary)}\n`;
                 resultText += `Trừ BHXH, BHYT, BHTN: ${formatCurrency(p.totalInsurance)}\n`;
                 resultText += `Thuế TNCN: ${formatCurrency(p.pit)}\n`;
                 resultText += `Thực nhận: ${formatCurrency(p.netSalary)}\n\n`;
             } else {
                 resultText += `Lương thực nhận: ${formatCurrency(p.netSalary)}\n\n`;
             }
        });

        alert(resultText);
    });
    
    // --- App Initialization & Rendering ---
    
    function renderApp() {
        updateAllMaterialPrices();
        recalculateAllDishCosts();
        
        // Employee role checkboxes
        const rolesContainer = document.getElementById('employee-roles-checkboxes');
        if(rolesContainer) {
            rolesContainer.innerHTML = Object.keys(employeeRoles).map(key => `
                <label class="flex items-center">
                    <input type="checkbox" name="employee-roles" value="${key}" class="h-4 w-4 text-indigo-600 border-gray-300 rounded">
                    <span class="ml-2 text-gray-700">${employeeRoles[key][`name${currentLang === 'zh' ? '_zh' : ''}`] || employeeRoles[key].name}</span>
                </label>
            `).join('');
        }
        
        // Populate all material dropdowns
        populateMaterialSelects(document.getElementById('bom-material-select'));
        populateMaterialSelects(document.getElementById('purchase-material-select'));
        populateMaterialSelects(document.getElementById('spoilage-material-select'));
        populateSelect(document.getElementById('purchase-supplier-select'), suppliers, 'select_supplier');


        // Render lists
        elements.dishesList.innerHTML = dishes.map(renderDish).join('');
        renderMaterialCategories();
        renderMaterialsList();
        renderDashboard();
        renderEmployeesList();
        renderSuppliersList();
        renderPurchasesList();
        renderSpoilageList();
        renderOtherCostsLists();
        populatePayrollPeriodSelect();
        renderPayrollEmployeeList();
    }

    // --- INITIAL LOAD ---
    handleDatePresetChange('this_month', elements.orderLookupStartDate, elements.orderLookupEndDate);
    handleDatePresetChange('this_month', elements.inventoryReportStartDate, elements.inventoryReportEndDate);
    handleDatePresetChange('this_month', elements.profitReportStartDate, elements.profitReportEndDate);
    setLanguage(currentLang); // Set language before initial renderApp
});
