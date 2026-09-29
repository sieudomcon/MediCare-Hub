import React from 'react';

interface FooterProps {
  styles: Record<string, React.CSSProperties>;
}

export default function Footer({ styles }: FooterProps) {
  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.footerInner}>
        <div>
          <div style={styles.footerBrand}>
            MediCare-Hub
          </div>

          <p style={styles.footerText}>
            Hệ thống quản lý phòng khám và đặt lịch khám trực tuyến.
          </p>
        </div>

        <div style={styles.footerCol}>
          <span>📍 Địa chỉ: đang cập nhật</span>
          <span>📞 Hotline: 1900 xxxx</span>
          <span>✉️ Email: đang cập nhật</span>
          <span>
            🕒 Giờ làm việc: 07:30 - 17:00 (T2 - T7)
          </span>
        </div>
      </div>

      <div style={styles.copy}>
        © 2026 Phòng khám MediCare-Hub. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}