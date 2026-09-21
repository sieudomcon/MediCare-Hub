import React from 'react';

// Nhập trực tiếp 2 hình ảnh từ thư mục src/assets/
import clinicBannerImage from '../assets/1.png';
import navLogoIcon from '../assets/2.png';

interface HomeProps {
  onNavigateToBooking?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
}

export default function Home({
  onNavigateToBooking,
  onNavigateToLogin,
  onNavigateToRegister,
}: HomeProps) {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header / Navbar */}
        <header style={styles.headerNavbar}>
          <div style={styles.logoContainer}>
            {/* Sử dụng ảnh 2.png làm biểu tượng cạnh tên phòng khám */}
            <img src={navLogoIcon} alt="Logo icon" style={styles.logoImageIcon} />
            <span style={styles.logoText}>Phòng khám MediCare-Hub</span>
          </div>
          <nav style={styles.navLinks}>
            <span style={{ ...styles.navLink, ...styles.navLinkActive }}>Trang chủ</span>
            <span style={styles.navLink}>Bác sĩ</span>
            <span style={styles.navLink}>Chuyên khoa</span>
            <span style={styles.navLink}>Liên hệ</span>
          </nav>
          <div style={styles.headerRight}>
            <span style={styles.hotlineText}>Hotline: 1900 xxxx</span>
            <button onClick={onNavigateToLogin} style={styles.outlineButton}>
              Đăng nhập
            </button>
            <button onClick={onNavigateToRegister} style={styles.primaryButtonSmall}>
              Đăng ký
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Đặt lịch khám nhanh chóng<br />Chăm sóc sức khỏe tận tâm</h1>
            <p style={styles.heroSubtitle}>
              Hệ thống quản lý phòng khám MediCare Hub giúp bạn kết nối trực tiếp với đội ngũ y bác sĩ đầu ngành, chủ động thời gian và quản lý hồ sơ sức khỏe toàn diện.
            </p>
            <div style={styles.heroButtons}>
              <button onClick={onNavigateToBooking} style={styles.button}>
                Đặt lịch khám ngay
              </button>
              <button style={styles.outlineButtonLarge}>Xem chuyên khoa</button>
            </div>
          </div>
          <div style={styles.heroBannerImageWrapper}>
            {/* Sử dụng ảnh 1.png làm ảnh đại diện/banner phòng khám */}
            <img src={clinicBannerImage} alt="Phòng khám MediCare-Hub" style={styles.heroImage} />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Vì sao chọn chúng tôi</h2>
          <div style={styles.grid3Cols}>
            <div style={styles.cardItem}>
              <div style={styles.circleIcon}>👨‍⚕️</div>
              <h3 style={styles.cardTitle}>Đội ngũ bác sĩ giàu kinh nghiệm</h3>
              <p style={styles.cardDesc}>100% bác sĩ có chuyên môn cao, tận tâm và nhiều năm công tác tại các bệnh viện lớn.</p>
            </div>
            <div style={styles.cardItem}>
              <div style={styles.circleIcon}>📅</div>
              <h3 style={styles.cardTitle}>Đặt lịch trực tuyến 24/7</h3>
              <p style={styles.cardDesc}>Chủ động chọn lịch hẹn nhanh chóng, không cần mất thời gian chờ đợi tại phòng khám.</p>
            </div>
            <div style={styles.cardItem}>
              <div style={styles.circleIcon}>⚡</div>
              <h3 style={styles.cardTitle}>Trang thiết bị hiện đại</h3>
              <p style={styles.cardDesc}>Hệ thống máy móc y tế tối tân, hỗ trợ chẩn đoán chính xác và điều trị hiệu quả.</p>
            </div>
          </div>
        </section>

        {/* Featured Doctors Section */}
        <section style={{ ...styles.section, backgroundColor: '#f9fafb' }}>
          <h2 style={styles.sectionTitle}>Bác sĩ tiêu biểu</h2>
          <div style={styles.grid4Cols}>
            <div style={styles.doctorCard}>
              <div style={styles.doctorAvatar}>👨‍⚕️</div>
              <h4 style={styles.doctorName}>BS. Nguyễn Văn A</h4>
              <p style={styles.doctorSpecialty}>Chuyên khoa Nội</p>
            </div>
            <div style={styles.doctorCard}>
              <div style={styles.doctorAvatar}>👩‍⚕️</div>
              <h4 style={styles.doctorName}>BS. Trần Thị B</h4>
              <p style={styles.doctorSpecialty}>Chuyên khoa Nhi</p>
            </div>
            <div style={styles.doctorCard}>
              <div style={styles.doctorAvatar}>👨‍⚕️</div>
              <h4 style={styles.doctorName}>BS. Lê Văn C</h4>
              <p style={styles.doctorSpecialty}>Chuyên khoa Da liễu</p>
            </div>
            <div style={styles.doctorCard}>
              <div style={styles.doctorAvatar}>👨‍⚕️</div>
              <h4 style={styles.doctorName}>BS. Phạm Thị D</h4>
              <p style={styles.doctorSpecialty}>Chuyên khoa Tim mạch</p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div style={styles.ctaBanner}>
          <h3 style={styles.ctaTitle}>Bạn cần đặt lịch khám?</h3>
          <button onClick={onNavigateToBooking} style={{ ...styles.button, maxWidth: '220px', margin: '0 auto' }}>
            Đặt lịch khám ngay
          </button>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>© 2026 Phòng khám MediCare-Hub. Mọi quyền được bảo lưu.</p>
          <div style={styles.footerLinks}>
            <span style={styles.footerLink}>Địa chỉ</span>
            <span style={styles.footerLink}>Hotline</span>
            <span style={styles.footerLink}>Email</span>
            <span style={styles.footerLink}>Mạng xã hội</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Hệ thống Style định dạng
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    flexDirection: 'column' as const,
    backgroundColor: '#f3f4f6',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    boxSizing: 'border-box' as const,
  },
  wrapper: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  headerNavbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoImageIcon: {
    width: '28px',
    height: '28px',
    objectFit: 'contain' as const,
  },
  logoText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
  },
  navLink: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#4b5563',
    cursor: 'pointer',
  },
  navLinkActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  hotlineText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#dc2626',
  },
  outlineButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2563eb',
    backgroundColor: 'transparent',
    border: '1px solid #2563eb',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  primaryButtonSmall: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#2563eb',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  heroSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 40px',
    backgroundColor: '#f9fafb',
    gap: '40px',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    margin: '0 0 16px 0',
    lineHeight: '1.3',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: '#6b7280',
    margin: '0 0 24px 0',
    lineHeight: '1.5',
  },
  heroButtons: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    width: '100%',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#2563eb',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    textAlign: 'center' as const,
  },
  outlineButtonLarge: {
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#374151',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  heroBannerImageWrapper: {
    flex: 1,
    height: '280px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  section: {
    padding: '50px 40px',
    textAlign: 'center' as const,
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '32px',
  },
  grid3Cols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  grid4Cols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  cardItem: {
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    textAlign: 'left' as const,
  },
  circleIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#eff6ff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '22px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.4',
  },
  doctorCard: {
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    textAlign: 'center' as const,
  },
  doctorAvatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    border: '1px solid #d1d5db',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '28px',
    margin: '0 auto 12px auto',
  },
  doctorName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 4px 0',
  },
  doctorSpecialty: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  ctaBanner: {
    margin: '40px',
    padding: '40px',
    backgroundColor: '#eff6ff',
    border: '2px dashed #bfdbfe',
    borderRadius: '12px',
    textAlign: 'center' as const,
  },
  ctaTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '16px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 40px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  footerLinks: {
    display: 'flex',
    gap: '20px',
  },
  footerLink: {
    fontSize: '14px',
    color: '#4b5563',
    cursor: 'pointer',
  },
};