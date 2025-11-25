export const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose} style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: '8px',
                    minWidth: '350px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                    aria-label="Fechar"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};