import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  const containerStyle = {
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    textAlign: "center",
    padding: "40px 16px",
  };

  const heading404Style = {
    fontSize: "72px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
  };

  const headingTextStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "16px",
  };

  const paragraphStyle = {
    color: "#6b7280",
    maxWidth: "500px",
    marginBottom: "32px",
    lineHeight: "1.5",
  };

  const buttonStyle = {
    backgroundColor: "#2B5A8A",
    color: "#ffffff",
     padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    border: "none",
    textDecoration: "none",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1d4ed8",
  };

  return (
    <div style={containerStyle}>
      <img
        src="/404.jpg"
        alt="404 Not Found"
        width={500}
        height={500}
        style={{ marginBottom: "24px" }}
      />
      {/* <h1 style={heading404Style}>404</h1>
      <h2 style={headingTextStyle}>Page Not Found</h2>
      <p style={paragraphStyle}>
        The page you’re looking for doesn’t exist or was moved.
      </p> */}
      <Link
        href="/"
        style={buttonStyle}
      >
        Go Home
      </Link>
    </div>
  );
}
