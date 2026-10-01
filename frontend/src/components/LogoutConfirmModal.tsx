// components/LogoutConfirmModal.tsx
// Modal xác nhận đăng xuất (UC003), theo đúng mock UI trong đặc tả:
// tiêu đề "Xác nhận đăng xuất", banner thông báo, nút Hủy / Đăng xuất.

import { useState } from 'react';
import { logout } from '../services/authService';

interface LogoutConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  // Gọi khi đã xác nhận đăng xuất xong (bất kể API thành công hay lỗi -
  // token local đã bị xóa ở bước này rồi), để nơi gọi tự điều hướng đi.
  onConfirmed: () => void;
}

const LogoutConfirmModal = ({ open, onCancel, onConfirmed }: LogoutConfirmModalProps) => {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!open) return null;

  const handleConfirm = async () => {
    setLoading(true);
    const result = await logout();
    setLoading(false);
    setNotice({ type: result.success ? 'success' : 'error', text: result.message });

    // Dù API lỗi (vd mất mạng) thì token local vẫn đã bị xóa (authService lo
    // ở finally), nên vẫn coi là đăng xuất xong và chuyển trang - chỉ là
    // hiện thông báo khác nhau cho người dùng biết.
    setTimeout(onConfirmed, 600);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Xác nhận đăng xuất</h2>
          <a href="/" style={styles.homeLink}>
            Quay lại trang chủ
          </a>
        </div>

        {notice && (
          <div
            style={{
              ...styles.banner,
              borderColor: notice.type === 'success' ? '#2e7d32' : '#c62828',
              color: notice.type === 'success' ? '#2e7d32' : '#c62828',
            }}
          >
            {notice.text}
          </div>
        )}

        <p style={styles.question}>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</p>
        <p style={styles.subtext}>Phiên đăng nhập hiện tại sẽ kết thúc.</p>

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onCancel} disabled={loading}>
            Hủy
          </button>
          <button style={styles.confirmBtn} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng xuất'}
          </button>
        </div>

        <p style={styles.note}>Bạn sẽ được chuyển về trang đăng nhập sau khi xác nhận</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '24px 32px',
    width: 420,
    maxWidth: '90vw',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { margin: 0, fontSize: 20 },
  homeLink: { fontSize: 13, color: '#1a73e8', textDecoration: 'underline' },
  banner: {
    border: '1px solid',
    borderRadius: 4,
    padding: '8px 12px',
    fontSize: 13,
    marginBottom: 16,
  },
  question: { fontWeight: 600, textAlign: 'center', marginBottom: 4 },
  subtext: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 20 },
  actions: { display: 'flex', gap: 12, justifyContent: 'center' },
  cancelBtn: {
    padding: '10px 24px',
    borderRadius: 6,
    border: '1px solid #ccc',
    background: '#fff',
    cursor: 'pointer',
  },
  confirmBtn: {
    padding: '10px 24px',
    borderRadius: 6,
    border: '1px solid #222',
    background: '#222',
    color: '#fff',
    cursor: 'pointer',
  },
  note: { fontSize: 12, color: '#999', textAlign: 'center', marginTop: 16 },
};

export default LogoutConfirmModal;
