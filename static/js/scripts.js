// static/js/scripts.js

/**
 * Cập nhật giá trị đường chéo của ma trận so sánh thành 1
 * và tự động tính toán giá trị nghịch đảo của ô đối diện.
 * Hàm này sẽ được gọi khi người dùng thay đổi giá trị trong ô input.
 * @param {HTMLInputElement} input - Ô input mà người dùng vừa thay đổi giá trị.
 */
function updateDiagonalAndInverse(input) {
    const row = input.dataset.row;
    const col = input.dataset.col;

    // Đảm bảo đường chéo là 1 và không thể chỉnh sửa
    if (row === col) {
        input.value = 1;
        input.readOnly = true;
    } else {
        input.readOnly = false;
    }

    // Cập nhật giá trị nghịch đảo của ô đối diện
    const oppositeRow = col;
    const oppositeCol = row;
    const oppositeInput = document.querySelector(`input[data-row="${oppositeRow}"][data-col="${oppositeCol}"]`);

    if (oppositeInput) {
        const inputValue = parseFloat(input.value);
        if (!isNaN(inputValue) && inputValue !== 0) {
            oppositeInput.value = (1 / inputValue).toFixed(3); // Giữ 3 chữ số thập phân
        } else {
            oppositeInput.value = ''; // Xóa giá trị nếu input không hợp lệ
        }
    }
}

/**
 * Xử lý sự kiện khi người dùng chọn file CSV/Excel.
 * Nếu có file được chọn, ẩn form nhập liệu thủ công. Ngược lại, hiển thị form.
 * Áp dụng cho cả form tiêu chí và phương án.
 */
function handleFileUpload() {
    const fileInput = document.getElementById('file_upload');
    const manualInputFormCriteria = document.getElementById('manual_input_form_criteria');
    const manualInputFormAlternatives = document.getElementById('manual_input_form_alternatives');

    if (fileInput && fileInput.files.length > 0) {
        if (manualInputFormCriteria) {
            manualInputFormCriteria.style.display = 'none';
        }
        if (manualInputFormAlternatives) {
            manualInputFormAlternatives.style.display = 'none';
        }
    } else {
        if (manualInputFormCriteria) {
            manualInputFormCriteria.style.display = 'block';
        }
        if (manualInputFormAlternatives) {
            manualInputFormAlternatives.style.display = 'table'; // Hoặc 'block' tùy thuộc vào cách bạn muốn display
        }
    }
}

/**
 * Lấy danh sách tên phương án hiện tại từ các trường input động.
 * @returns {Array<string>} Mảng các tên phương án.
 */
function getCurrentAlternativeNames() {
    const altNames = [];
    document.querySelectorAll('#alternative_names input.alt-name-input').forEach(input => {
        altNames.push(input.value.trim() || input.placeholder || `Phương án ${altNames.length + 1}`);
    });
    return altNames;
}

/**
 * Cập nhật các trường input tên phương án dựa trên số lượng mới.
 * @param {number} num - Số lượng phương án mới.
 */
function updateAlternativeNameFields(num) {
    const altNamesDiv = document.getElementById('alternative_names');
    const currentNames = getCurrentAlternativeNames(); // Lưu lại các tên hiện có

    altNamesDiv.innerHTML = ''; // Xóa các trường cũ

    for (let i = 0; i < num; i++) {
        const label = document.createElement('label');
        label.htmlFor = `alt_name_${i}`;
        label.textContent = `Tên Phương án ${i + 1}:`;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `alt_name_${i}`;
        input.classList.add('alt-name-input'); // Thêm class để dễ dàng chọn
        input.value = currentNames[i] || `Phương án ${i + 1}`; // Gán lại tên cũ hoặc mặc định
        input.placeholder = `Phương án ${i + 1}`; // Thêm placeholder

        // Thêm sự kiện để cập nhật bảng so sánh khi tên phương án thay đổi
        input.addEventListener('input', updateComparisonMatrixTable);

        altNamesDiv.appendChild(label);
        altNamesDiv.appendChild(input);
        altNamesDiv.appendChild(document.createElement('br'));
    }
    // Sau khi cập nhật các trường tên, cập nhật luôn bảng so sánh
    updateComparisonMatrixTable();
}

/**
 * Tạo và cập nhật bảng so sánh phương án động (headers và rows).
 */
function updateComparisonMatrixTable() {
    const numAlternativesInput = document.getElementById('num_alternatives');
    if (!numAlternativesInput) return; // Không phải trang alternatives_comparison

    const num = parseInt(numAlternativesInput.value);
    const alternatives = getCurrentAlternativeNames(); // Lấy tên phương án mới nhất từ các input field

    const table = document.getElementById('alt_comparison_table');
    if (!table) return;

    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // --- Cập nhật Thead (Tiêu đề cột) ---
    // Xóa tất cả các tiêu đề cũ (có class alt-header)
    thead.querySelectorAll('.alt-header').forEach(header => header.remove());

    // Thêm các tiêu đề cột mới
    const headerRow = thead.querySelector('tr');
    alternatives.forEach(alt => {
        const th = document.createElement('th');
        th.classList.add('alt-header');
        th.textContent = alt;
        headerRow.appendChild(th);
    });

    // --- Cập nhật Tbody (Các hàng so sánh) ---
    // Giữ lại các giá trị input cũ nếu có thể để người dùng không phải nhập lại
    const oldMatrixValues = {};
    tbody.querySelectorAll('input[data-row][data-col]').forEach(input => {
        const r = input.dataset.row;
        const c = input.dataset.col;
        if (!oldMatrixValues[r]) oldMatrixValues[r] = {};
        oldMatrixValues[r][c] = input.value;
    });

    // Xóa tất cả các hàng cũ
    tbody.innerHTML = '';

    for (let i = 0; i < num; i++) {
        const tr = document.createElement('tr');
        tr.classList.add('alt-row');
        tr.dataset.rowIndex = i;

        // Nhãn hàng
        const tdLabel = document.createElement('td');
        tdLabel.classList.add('alt-label');
        tdLabel.textContent = alternatives[i];
        tr.appendChild(tdLabel);

        // Các ô input của ma trận
        for (let j = 0; j < num; j++) {
            const tdInput = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.step = '0.001';
            input.min = '0.01';
            input.max = '9';
            input.name = `alt_${i}_${j}`;
            input.dataset.row = i;
            input.dataset.col = j;

            if (i === j) {
                input.value = 1;
                input.readOnly = true;
            } else {
                // Cố gắng giữ lại giá trị cũ nếu ô đó tồn tại trong ma trận cũ
                input.value = oldMatrixValues[i] && oldMatrixValues[i][j] !== undefined ? oldMatrixValues[i][j] : '';
                input.readOnly = false;
            }

            // Gán sự kiện cho input để cập nhật ô đối diện
            input.addEventListener('change', () => updateDiagonalAndInverse(input));

            tdInput.appendChild(input);
            tr.appendChild(tdInput);
        }
        tbody.appendChild(tr);
    }
    // Cập nhật các hidden inputs trong form chính để gửi dữ liệu về server
    updateHiddenAlternativeInputs(num, alternatives);
}

/**
 * Cập nhật các hidden input trong form chính để gửi dữ liệu về server.
 * @param {number} num - Số lượng phương án hiện tại.
 * @param {Array<string>} alternatives - Mảng các tên phương án hiện tại.
 */
function updateHiddenAlternativeInputs(num, alternatives) {
    const mainForm = document.getElementById('main_comparison_form');
    if (!mainForm) return;

    // Cập nhật hidden num_alternatives
    const hiddenNumAlt = document.getElementById('hidden_num_alternatives');
    if (hiddenNumAlt) {
        hiddenNumAlt.value = num;
    }

    // Xóa các hidden input tên phương án cũ (bắt đầu bằng 'alt_name_')
    mainForm.querySelectorAll('input[name^="alt_name_"]').forEach(input => input.remove());

    // Thêm các hidden input tên phương án mới
    alternatives.forEach((name, index) => {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = `hidden_alt_name_${index}`; // Đặt ID để dễ kiểm tra
        hiddenInput.name = `alt_name_${index}`; // Quan trọng: Tên này Flask sẽ đọc
        hiddenInput.value = name;
        mainForm.appendChild(hiddenInput);
    });
}


/**
 * Khởi tạo các hàm khi DOM đã tải xong.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Gán hàm updateDiagonalAndInverse cho tất cả các input ma trận
    // (cho các input được Jinja2 tạo ra ban đầu)
    document.querySelectorAll('#alt_comparison_table input[data-row][data-col]').forEach(input => {
        updateDiagonalAndInverse(input);
        input.addEventListener('change', () => updateDiagonalAndInverse(input));
    });

    // Gán hàm handleFileUpload cho input file
    const fileInput = document.getElementById('file_upload');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
        handleFileUpload(); // Gọi lần đầu khi tải trang
    }

    // Dynamic alternative name fields and comparison table (chỉ trên trang alternatives_comparison)
    const numAlternativesInput = document.getElementById('num_alternatives');
    if (numAlternativesInput) {
        // Lắng nghe sự kiện thay đổi số lượng phương án
        numAlternativesInput.addEventListener('change', (event) => {
            const newNum = parseInt(event.target.value);
            if (!isNaN(newNum) && newNum >= 3 && newNum <= 5) { // Validation ở phía client
                updateAlternativeNameFields(newNum);
            } else {
                console.error("Số lượng phương án phải từ 3 đến 5.");
                // Có thể thêm logic hiển thị lỗi cho người dùng ở đây
            }
        });

        // Lắng nghe sự kiện thay đổi trên từng input tên phương án đã được tạo ban đầu bởi Jinja
        document.querySelectorAll('#alternative_names input.alt-name-input').forEach(input => {
            input.addEventListener('input', updateComparisonMatrixTable);
        });

        // Quan trọng: Gọi các hàm cập nhật ban đầu khi trang tải xong
        // Để đảm bảo bảng và các hidden input được đồng bộ với trạng thái ban đầu từ Jinja/session
        updateComparisonMatrixTable();
    }
});