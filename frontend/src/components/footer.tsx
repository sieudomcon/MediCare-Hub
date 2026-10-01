import React from 'react';
import { useClinicInfo, displayInfo } from '../services/clinicservice'; // [SỬA] lấy thông tin phòng khám từ API

interface FooterProps {
  styles: Record<string, React.CSSProperties>;
}

export default function Footer({ styles }: FooterProps) {
  // [SỬA] địa chỉ / hotline / email / description lấy từ DB, thiếu thì hiện "đang cập nhật"
  const { clinic, loading } = useClinicInfo();

  return (
    <footer id="contact" style={styles.footer}>
      <div style={styles.footerInner}>
        <div>
          <div style={styles.footerBrand}>
            MediCare-Hub
          </div>

          <p style={styles.footerText}>
            {displayInfo(clinic?.description, loading)}
          </p>
        </div>

        <div style={styles.footerCol}>
          <span>📍 Địa chỉ: {displayInfo(clinic?.address, loading)}</span>
          <span>📞 Hotline: {displayInfo(clinic?.hotline, loading)}</span>
          <span>✉️ Email: {displayInfo(clinic?.email, loading)}</span>
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