export default function FloatingChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        background: "#F7941D",          // OBK Orange
        color: "white",
        borderRadius: "50px",
        padding: "14px 20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
        cursor: "pointer",
        border: "none",
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "15px",
        zIndex: 99999
      }}
    >
      {/* Chat bubble icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="26px"
        height="26px"
        style={{ marginRight: "10px" }}
      >
        <path d="M12 3C6.486 3 2 6.589 2 11c0 2.038 1.006 3.893 2.682 5.293-.189.889-.703 2.408-2.535 3.558-.3.195-.416.587-.271.927.146.34.512.52.874.44 2.59-.577 4.518-1.686 5.592-2.407C10.312 18.927 11.143 19 12 19c5.514 0 10-3.589 10-8s-4.486-8-10-8z"/>
      </svg>

      How can I help you?
    </button>
  );
}
