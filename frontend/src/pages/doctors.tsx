import React, { useState, useMemo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import SafeImage from '../components/safeimage';
import type { AuthUser } from './home';

// Import ảnh từ assets tương tự như trang Home
const assetImages = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const getAsset = (name: string): string | undefined => {
  for (const ext of ['png', 'jpg', 'jpeg', 'webp']) {
    const found = assetImages[`../assets/${name}.${ext}`];
    if (found) return found;
  }
  return undefined;
};

const ROLE_LABELS: Record<string, string> = {
  PATIENT: 'người dùng',
  DOCTOR: 'Bác sĩ',
  ADMIN: 'Quản trị viên',
  STAFF: 'Nhân viên',
};

const getRoleLabel = (role?: string) =>
  role ? ROLE_LABELS[role.toUpperCase()] ?? role : '';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  exp: string;
  avatarAsset: string;
  emoji: string;
  availableDays: string[]; // ['Thứ 2', 'Thứ 3',...]
  hospital: string;
}

const DOCTORS_DATA: Doctor[] = [
  {
    id: 1,
    name: 'BS. Nguyễn Văn A',
    specialty: 'Nội tổng quát',
    exp: '15 năm kinh nghiệm',
    avatarAsset: 'bc1',
    emoji: '👨‍⚕️',
    availableDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
    hospital: 'Bệnh viện Bạch Mai',
  },
  {
    id: 2,
    name: 'BS. Trần Thị B',
    specialty: 'Nhi khoa',
    exp: '12 năm kinh nghiệm',
    avatarAsset: 'bc2',
    emoji: '👩‍⚕️',
    availableDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    hospital: 'Bệnh viện Nhi Trung ương',
  },
  {
    id: 3,
    name: 'BS. Lê Văn C',
    specialty: 'Da liễu',
    exp: '10 năm kinh nghiệm',
    avatarAsset: 'bc3',
    emoji: '👨‍⚕️',
    availableDays: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
    hospital: 'Bệnh viện Da liễu Trung ương',
  },
  {
    id: 4,
    name: 'BS. Phạm Thị D',
    specialty: 'Tim mạch',
    exp: '18 năm kinh nghiệm',
    avatarAsset: 'bc4',
    emoji: '👩‍⚕️',
    availableDays: ['Thứ 2', 'Thứ 4', 'Thứ 6'],
    hospital: 'Viện Tim mạch Việt Nam',
  },
  {
    id: 5,
    name: 'BS. Hoàng Văn E',
    specialty: 'Tai Mũi Họng',
    exp: '9 năm kinh nghiệm',
    avatarAsset: 'bc5',
    emoji: '👨‍⚕️',
    availableDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
    hospital: 'Bệnh viện Tai Mũi Họng TW',
  },
  {
    id: 6,
    name: 'BS. Vũ Thị F',
    specialty: 'Sản phụ khoa',
    exp: '14 năm kinh nghiệm',
    avatarAsset: 'bc6',
    emoji: '👩‍⚕️',
    availableDays: ['Thứ 3', 'Thứ 5', 'Thứ 7'],
    hospital: 'Bệnh viện Phụ sản Trung ương',
  },
];

const SPECIALTIES = [
  'Tất cả chuyên khoa',
  'Nội tổng quát',
  'Nhi khoa',
  'Da liễu',
  'Tim mạch',
  'Tai Mũi Họng',
  'Sản phụ khoa',
];

interface DoctorsPageProps {
  user?: AuthUser | null;
  onNavigateHome: () => void;
  onNavigateToDoctors: () => void;
  onNavigateToSchedule: () => void;
  onNavigateToContact: () => void;
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
  onNavigateToLogout: () => void;
  onNavigateToBooking: (doctorId?: number) => void;
}

export default function DoctorsPage({
  user,
  onNavigateHome,
  onNavigateToDoctors,
  onNavigateToSchedule,
  onNavigateToContact,
  onNavigateToLogin,
  onNavigateToRegister,
  onNavigateToLogout,
  onNavigateToBooking,
}: DoctorsPageProps) {
  const logoImage = getAsset('2');
  const displayName = user ? user.username || user.email : '';
  const roleLabel = user ? getRoleLabel(user.role) : '';

  // State bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Tất cả chuyên khoa');
  const [selectedDate, setSelectedDate] = useState('');

  // Chuyển đổi YYYY-MM-DD sang ngày trong tuần
  const getDayNameFromDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDay(); // 0 = Chủ nhật, 1 = Thứ 2, ...
    const daysMap = [
      'Chủ nhật',
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
    ];
    return daysMap[day];
  };

  // Logic lọc danh sách bác sĩ
  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter((doc) => {
      // 1. Lọc theo tên hoặc nơi làm việc
      const matchesSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Lọc theo chuyên khoa
      const matchesSpecialty =
        selectedSpecialty === 'Tất cả chuyên khoa' ||
        doc.specialty === selectedSpecialty;

      // 3. Lọc theo ngày khám chọn từ input type="date"
      let matchesDate = true;
      if (selectedDate) {
        const dayName = getDayNameFromDate(selectedDate);
        matchesDate = doc.availableDays.includes(dayName);
      }

      return matchesSearch && matchesSpecialty && matchesDate;
    });
  }, [searchTerm, selectedSpecialty, selectedDate]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('Tất cả chuyên khoa');
    setSelectedDate('');
  };

  return (
    <div style={styles.container}>
      <Header
        
        user={user}
        logoImage={logoImage}
        displayName={displayName}
        roleLabel={roleLabel}
        scrollTo={onNavigateHome}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToRegister={onNavigateToRegister}
        onNavigateToLogout={onNavigateToLogout}
        onNavigateToDoctors={onNavigateToDoctors}
        onNavigateToSchedule={onNavigateToSchedule}
        onNavigateToContact={onNavigateToContact}
        styles={styles}
      />

      {/* Hero Header Section */}
      <section style={styles.heroBanner}>
        <h1 style={styles.heroTitle}>Đội Ngũ Bác Sĩ Chuyên Khoa</h1>
        <p style={styles.heroSub}>
          Tìm kiếm thông tin bác sĩ và lựa chọn khung giờ khám phù hợp nhất với bạn
        </p>
      </section>

      {/* Filter Section */}
      <section style={styles.filterSection}>
        <div style={styles.filterCard}>
          <div style={styles.filterGrid}>
            {/* Ô tìm kiếm từ khóa */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>🔍 Tìm kiếm bác sĩ</label>
              <input
                type="text"
                placeholder="Nhập tên bác sĩ, bệnh viện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Chọn Chuyên khoa */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>🩺 Chuyên khoa</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                style={styles.select}
              >
                {SPECIALTIES.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Chọn Ngày khám */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>📅 Ngày khám</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {(searchTerm || selectedSpecialty !== 'Tất cả chuyên khoa' || selectedDate) && (
            <div style={styles.resetWrap}>
              <button onClick={handleResetFilters} style={styles.resetBtn}>
                🔄 Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Doctor List Grid */}
      <section style={styles.listSection}>
        <div style={styles.resultSummary}>
          Hiển thị <b>{filteredDoctors.length}</b> bác sĩ phù hợp
        </div>

        {filteredDoctors.length > 0 ? (
          <div style={styles.doctorGrid}>
            {filteredDoctors.map((doc) => {
              const img = getAsset(doc.avatarAsset);

              return (
                <div key={doc.id} style={styles.doctorCard}>
                  <SafeImage
                    src={img}
                    alt={doc.name}
                    style={styles.doctorImg}
                    fallback={<div style={styles.doctorAvatar}>{doc.emoji}</div>}
                  />

                  <div style={styles.doctorContent}>
                    <span style={styles.badge}>{doc.specialty}</span>
                    <h3 style={styles.docName}>{doc.name}</h3>
                    <p style={styles.hospital}>🏥 {doc.hospital}</p>
                    <p style={styles.exp}>⭐ {doc.exp}</p>

                    <div style={styles.scheduleInfo}>
                      <span style={styles.scheduleTitle}>Lịch làm việc:</span>
                      <div style={styles.daysList}>
                        {doc.availableDays.map((day) => (
                          <span key={day} style={styles.dayTag}>
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateToBooking(doc.id)}
                      style={styles.btnBook}
                    >
                      Đặt lịch hẹn
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <h3>Không tìm thấy bác sĩ phù hợp</h3>
            <p>Vui lòng thử lại với từ khóa hoặc điều kiện lọc khác.</p>
          </div>
        )}
      </section>

      <Footer styles={styles} />
    </div>
  );
}

const inner: React.CSSProperties = { maxWidth: 1200, margin: '0 auto' };

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#f5faff',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#334155',
    boxSizing: 'border-box',
  },

  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 48px',
    backgroundColor: 'rgba(240,247,255,0.92)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #dbeafe',
  },
  logoBox: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' },
  logoImg: { width: 32, height: 32, objectFit: 'contain' },
  logoText: { fontSize: 20, fontWeight: 800, color: '#1d4ed8', letterSpacing: 0.3 },
  nav: { display: 'flex', gap: 28 },
  navLink: { fontSize: 15, fontWeight: 500, color: '#475569', cursor: 'pointer' },
  headerRight: { display: 'flex', alignItems: 'center', gap: 14 },
  hotline: { fontSize: 14, fontWeight: 600, color: '#dc2626' },
  userBox: { display: 'flex', alignItems: 'center', gap: 10 },
  userAvatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    color: '#fff',
    fontWeight: 700,
    fontSize: 16,
    background: 'linear-gradient(135deg,#3b82f6,#60a5fa)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: { display: 'flex', flexDirection: 'column', lineHeight: 1.2 },
  userName: { fontSize: 14, fontWeight: 600, color: '#0f172a' },
  roleBadge: {
    alignSelf: 'flex-start',
    marginTop: 2,
    padding: '1px 8px',
    fontSize: 11,
    fontWeight: 600,
    color: '#1d4ed8',
    backgroundColor: '#dbeafe',
    borderRadius: 999,
  },

  btnPrimarySm: {
    padding: '8px 18px',
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    backgroundColor: '#3b82f6',
  },
  btnOutline: {
    padding: '8px 18px',
    fontSize: 14,
    fontWeight: 600,
    color: '#2563eb',
    backgroundColor: 'transparent',
    border: '1.5px solid #2563eb',
    borderRadius: 8,
    cursor: 'pointer',
  },

  heroBanner: {
    backgroundColor: '#1e40af',
    color: '#fff',
    padding: '48px 24px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)',
  },
  heroTitle: { fontSize: 32, fontWeight: 800, margin: '0 0 12px' },
  heroSub: { fontSize: 16, opacity: 0.9, margin: 0 },

  filterSection: { ...inner, padding: '0 24px', marginTop: -28 },
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 10px 25px rgba(15,23,42,.08)',
    border: '1px solid #dbeafe',
  },
  filterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 16,
  },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 13, fontWeight: 700, color: '#1e293b' },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    fontSize: 14,
    outline: 'none',
  },
  select: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    fontSize: 14,
    outline: 'none',
    backgroundColor: '#fff',
  },
  resetWrap: { marginTop: 16, textAlign: 'right' },
  resetBtn: {
    background: 'none',
    border: 'none',
    color: '#dc2626',
    fontWeight: 600,
    fontSize: 13,
    cursor: 'pointer',
  },

  listSection: { ...inner, padding: '40px 24px 72px' },
  resultSummary: { fontSize: 15, color: '#64748b', marginBottom: 20 },
  doctorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: 24,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    border: '1px solid #dbeafe',
    display: 'flex',
    gap: 20,
    boxShadow: '0 4px 12px rgba(15,23,42,.03)',
    alignItems: 'flex-start',
  },
  doctorImg: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #dbeafe',
    flexShrink: 0,
  },
  doctorAvatar: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    backgroundColor: '#e0efff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    flexShrink: 0,
  },
  doctorContent: { flex: 1, display: 'flex', flexDirection: 'column' },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontSize: 12,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 6,
    marginBottom: 6,
  },
  docName: { fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' },
  hospital: { fontSize: 13, color: '#475569', margin: '0 0 4px' },
  exp: { fontSize: 13, color: '#16a34a', fontWeight: 600, margin: '0 0 12px' },

  scheduleInfo: {
    borderTop: '1px solid #f1f5f9',
    paddingTop: 10,
    marginBottom: 16,
  },
  scheduleTitle: { fontSize: 12, color: '#94a3b8', fontWeight: 600 },
  daysList: { display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 },
  dayTag: {
    fontSize: 11,
    backgroundColor: '#f1f5f9',
    color: '#334155',
    padding: '2px 6px',
    borderRadius: 4,
  },

  btnBook: {
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    backgroundColor: '#2563eb',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    textAlign: 'center',
  },

  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#fff',
    borderRadius: 16,
    border: '1px dashed #cbd5e1',
    color: '#64748b',
  },

  footer: { backgroundColor: '#e3effd', color: '#334155', padding: '48px 48px 20px' },
  footerInner: {
    ...inner,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 32,
    flexWrap: 'wrap',
    paddingBottom: 28,
    borderBottom: '1px solid #c7dcf7',
  },
  footerBrand: { fontSize: 22, fontWeight: 800, color: '#1d4ed8', marginBottom: 8 },
  footerText: { fontSize: 14, margin: 0, maxWidth: 320, lineHeight: 1.6 },
  footerCol: { display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 },
  copy: { ...inner, textAlign: 'center', fontSize: 13, color: '#64748b', paddingTop: 18 },
};