# Hệ Hỗ Trợ Ra Quyết Định - Phân Tích AHP

## Giới thiệu

---

Ứng dụng web hỗ trợ ra quyết định sử dụng phương pháp AHP (Analytic Hierarchy Process) để lựa chọn phương tiện di chuyển trong nội thành TPHCM. Dự án được phát triển bởi Nhóm 10 - Lớp 10_ĐH_THMT1.

---

### 🎥 Video Demo

Bạn có thể xem video giới thiệu và hướng dẫn sử dụng ứng dụng tại đây:

👉 [Xem Video Demo trên YouTube](https://youtu.be/6dWmc72aTGc?si=zNBukC4Mej0mBCK2)

---

## Tính năng chính

---

- 🎯 Phân tích AHP với 5 tiêu chí: Chi phí, Thời gian, Tiện lợi, An toàn, Môi trường
- 📊 Hỗ trợ 3-5 phương án so sánh
- 📈 Tự động tính toán trọng số và kiểm tra tính nhất quán
- 📱 Giao diện thân thiện, responsive
- 📤 Nhập liệu thủ công hoặc upload file Excel/CSV
- 💾 Lưu trữ lịch sử phân tích
- 📑 Xuất báo cáo đa dạng (Excel, PDF)
- 📊 Biểu đồ trực quan (Pie chart, Bar chart)

---

## Công nghệ sử dụng

- **Backend**: Python Flask
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Thư viện chính**:
  - NumPy: Xử lý ma trận và tính toán AHP
  - Matplotlib: Vẽ biểu đồ
  - Pandas: Xử lý dữ liệu
  - ReportLab: Xuất PDF
  - OpenPyXL: Xuất Excel

---

## Cài đặt

### Yêu cầu hệ thống

- Python 3.8+
- MySQL Server
- pip (Python package manager)

### Bước 1: Clone repository

```bash
git clone [your-repository-url]
cd [repository-name]
```

### Bước 2: Cài đặt các thư viện Python

```bash
pip install -r requirements.txt
```

### Bước 3: Cấu hình MySQL

1. Tạo database mới tên `ahp_db1`
2. Cập nhật thông tin kết nối trong `app.py`:
```python
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'ahp_db1'
```

### Bước 4: Chạy ứng dụng

```bash
python app.py
```
Truy cập ứng dụng tại: http://localhost:5000

## Hướng dẫn sử dụng

### 1. Nhập số lượng và tên phương án

- Chọn số lượng phương án (3-5)
- Đặt tên cho từng phương án

### 2. So sánh các tiêu chí

- Nhập ma trận so sánh cặp các tiêu chí
- Hoặc upload file Excel/CSV chứa ma trận
- Hệ thống kiểm tra tính nhất quán (CR ≤ 0.1)

### 3. So sánh các phương án

- Với mỗi tiêu chí, nhập ma trận so sánh cặp các phương án
- Hoặc upload file Excel/CSV
- Hệ thống tự động tính toán trọng số

### 4. Xem kết quả

- Biểu đồ trọng số tiêu chí
- Biểu đồ điểm các phương án
- Bảng kết quả chi tiết
- Xuất báo cáo Excel/PDF

## Cấu trúc thư mục

```
├── app.py              # File chính chứa logic Flask
├── requirements.txt    # Danh sách thư viện Python
├── static/            # Thư mục chứa CSS, JS
├── templates/         # Thư mục chứa file HTML
│   ├── index.html
│   ├── criteria_comparison.html
│   ├── alternatives_comparison.html
│   ├── results.html
│   └── history.html
└── README.md
```

---

## Đóng góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo issue hoặc pull request.

---

## Giấy phép

Dự án này được phát triển cho mục đích học tập và nghiên cứu, xem Giấy phép tại [LICENSE](./LICENSE)

---

## Liên hệ

Email: tiktokthu10@gmail.com

---

© 2024 Nhóm 10 - Lớp 10_ĐH_THMT1

