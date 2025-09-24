# Sử dụng Python làm base image
FROM python:3.10-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file requirements.txt vào container
COPY requirements.txt .

# Cài đặt các dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 8000
EXPOSE 8000

# Chạy lệnh khởi động server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]