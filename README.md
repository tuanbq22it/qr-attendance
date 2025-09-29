# Dự án Điểm danh bằng Mã QR (QR Attendance)

Đây là một ứng dụng web được xây dựng bằng React, TypeScript và Vite, cho phép người dùng điểm danh bằng cách quét mã QR. Ứng dụng được thiết kế để hoạt động trên cả máy tính và trình duyệt di động.

## Tính năng chính

- **Quét mã QR:** Sử dụng camera của thiết bị để quét và nhận dạng mã QR.
- **Định dạng mã hợp lệ:** Ứng dụng chỉ chấp nhận mã QR có định dạng `ATTEND:<MSSV>`.
- **Lưu lịch sử:** Tự động ghi lại Mã số sinh viên (MSSV) và thời gian quét thành công.
- **Hiển thị lịch sử:** Hiển thị danh sách các lần điểm danh theo thời gian thực.
- **Kiểm tra trùng lặp:** Ngăn chặn việc một MSSV điểm danh nhiều lần.
- **Xuất ra CSV:** Cho phép người dùng xuất toàn bộ lịch sử điểm danh ra tệp `.csv`.
- **Reset danh sách:** Cung cấp nút để xóa toàn bộ lịch sử điểm danh.
- **Giao diện đáp ứng (Responsive):** Giao diện được tối ưu hóa cho cả máy tính và điện thoại.

## Công nghệ sử dụng

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Thư viện quét mã:** `@zxing/library`
- **Styling:** CSS thuần

## Hướng dẫn cài đặt và sử dụng

### Yêu cầu

- [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
- Trình duyệt web có hỗ trợ camera (Chrome, Firefox, Safari)

### Cài đặt

1.  **Clone repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Cài đặt các gói phụ thuộc:**
    ```sh
    npm install
    ```

### Chạy ứng dụng (Môi trường phát triển)

1.  **Khởi động máy chủ phát triển:**
    ```sh
    npm run dev
    ```
    Lệnh này sẽ khởi động một máy chủ phát triển với chế độ HTTPS, cho phép truy cập camera.

2.  **Truy cập ứng dụng:**
    -   **Trên máy tính:** Mở trình duyệt và truy cập `https://localhost:5173`.
    -   **Trên điện thoại:**
        -   Đảm bảo điện thoại và máy tính đang kết nối cùng một mạng Wi-Fi.
        -   Mở trình duyệt trên điện thoại và truy cập vào địa chỉ `Network` được hiển thị trong terminal (ví dụ: `https://192.168.1.10:5173`).
        -   *Lưu ý: Bạn có thể cần bỏ qua cảnh báo bảo mật của trình duyệt.*

### Sử dụng

1.  Nhấn nút **"Bắt đầu Quét"**.
2.  Cấp quyền cho trình duyệt sử dụng camera.
3.  Hướng camera về phía mã QR có định dạng `ATTEND:<MSSV>`.
4.  Ứng dụng sẽ tự động ghi nhận và hiển thị kết quả trong bảng lịch sử.

### Build ứng dụng cho Production

Để tạo phiên bản tối ưu hóa cho sản xuất, chạy lệnh:
npm run build

Các tệp tĩnh sẽ được tạo trong thư mục `dist`, sẵn sàng để triển khai lên một máy chủ web.

# Bỏ qua thư mục cài đặt của Visual Studio
    .vs/