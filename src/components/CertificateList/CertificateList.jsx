"use client";

import React, { useEffect, useState } from "react";
import styles from "./CertificateList.module.css";
import { authFetch } from "@/utils/authFetch";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useRouter } from "next/navigation";
import Papa from "papaparse"

const CertificateList = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    const [registrations, setRegistrations] = useState([]);
    const [customRegistrations, setCustomRegistrations] = useState([]);

    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const [customName, setCustomName] = useState("");
    const [customEmail, setCustomEmail] = useState("");


    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [csvFile, setCsvFile] = useState(null);


    const router = useRouter();


    // ==============================
    // Fetch Certificates
    // ==============================
    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                setLoading(true);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-all-certificates`
                );

                const data = await res.json();

                if (data.success) {
                    setCertificates(data.response || []);
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    // ==============================
    // Delete Certificate
    // ==============================
    const deleteCertificate = async (certificateId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this certificate?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/delete-certificate?certificateId=${certificateId}`,
                { method: "DELETE" }
            );

            const data = await res.json();

            if (data.success) {
                setCertificates((prev) =>
                    prev.filter((c) => c._id !== certificateId)
                );
            } else {
                alert(data.message || "Delete failed");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    // ==============================
    // Download Sample CSV Template
    // ==============================
    const downloadSampleCSV = () => {
        const headers = ["Name", "Email"];
        const csvContent = headers.join(",") + "\n";

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "certificate_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ==============================
    // Handle CSV Upload
    // ==============================
    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // 🔒 STRICT HEADER VALIDATION
                if (
                    results.meta.fields.length !== 2 ||
                    !results.meta.fields.includes("Name") ||
                    !results.meta.fields.includes("Email")
                ) {
                    alert("Please use the provided CSV template (Name, Email only).");
                    return;
                }

                let formattedData = results.data
                    .filter((row) => row.Name && row.Email) // remove empty rows
                    .map((row, index) => ({
                        _id: "csv-" + index + Date.now(),
                        Name: row.Name.trim(),
                        Email: row.Email.trim().toLowerCase(),
                    }));

                // 🚫 Remove duplicate emails
                const uniqueEmails = new Set();
                formattedData = formattedData.filter((row) => {
                    if (uniqueEmails.has(row.Email)) return false;
                    uniqueEmails.add(row.Email);
                    return true;
                });

                if (formattedData.length === 0) {
                    alert("No valid rows found in CSV.");
                    return;
                }

                setRegistrations(formattedData);
                alert(`${formattedData.length} users loaded successfully.`);
            },
            error: (error) => {
                console.error("CSV Parse Error:", error);
                alert("Invalid CSV file.");
            },
        });
    };




    // ==============================
    // Open Modal + Fetch Registrations
    // ==============================
    const handleSend = (certificate) => {
        setSelectedCertificate(certificate);
        setShowModal(true);

        setSelectedEmails([]);
        setSelectAll(false);
        setRegistrations([]);
        setCustomRegistrations([]);
    };

    // ==============================
    // Checkbox Handling
    // ==============================
    const handleCheckboxChange = (email) => {
        setSelectedEmails((prev) =>
            prev.includes(email)
                ? prev.filter((e) => e !== email)
                : [...prev, email]
        );
    };

    // ==============================
    // Select All (Includes Custom)
    // ==============================
    const handleSelectAll = () => {
        const allEmails = allRows.map((r) => r.Email);

        if (selectAll) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(allEmails);
        }

        setSelectAll(!selectAll);
    };

    // ==============================
    // Add Custom Registration
    // ==============================
    const handleAddEmail = () => {
        if (!customName || !customEmail) {
            alert("Please fill all fields");
            return;
        }

        const newCustomUser = {
            _id: "custom-" + Date.now(),
            Name: customName,
            Email: customEmail,
            isCustom: true,
        };

        setCustomRegistrations((prev) => [...prev, newCustomUser]);
        setSelectedEmails((prev) => [...prev, customEmail]);

        setCustomName("");
        setCustomEmail("");
    };

    const handleConfirmSend = async () => {
        if (selectedEmails.length === 0) {
            alert("Please select at least one user");
            return;
        }

        if (!emailSubject.trim()) {
            alert("Please enter email subject");
            return;
        }

        if (!emailBody.trim()) {
            alert("Please enter email body");
            return;
        }

        try {
            setLoading(true);

            const emailData = allRows
                .filter((row) => selectedEmails.includes(row.Email))
                .map((row) => ({
                    name: `${row.Name}`.trim(),
                    email: row.Email,
                }));

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/send-certificate-email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        certificateId: selectedCertificate._id,
                        emailData,
                        subject: emailSubject,
                        body: emailBody, // 🔥 send HTML content
                    }),
                }
            );

            const data = await res.json();

            if (res.ok && data.success) {
                alert("Certificates sent successfully!");
                setShowEmailModal(false);
                setShowModal(false);
                setSelectedEmails([]);
                setEmailSubject("");
                setEmailBody("");
            } else {
                alert(data.message || "Failed to send certificates");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };



    // 🔥 Merge real + custom registrations
    const allRows = [...registrations, ...customRegistrations];

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h2 className={styles.heading}>Certificate List</h2>

                <button
                    className={styles.uploadBtn}
                    onClick={() => router.push("/upload-certificates")}
                >
                    + Upload Certificate
                </button>
            </div>

            {loading ? (
                <p>Loading certificates...</p>
            ) : certificates.length === 0 ? (
                <p>No certificates found.</p>
            ) : (
                <div className={styles.grid}>
                    {certificates.map((certificate) => (
                        <div key={certificate._id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={certificate.certificateFile?.url}
                                    alt="Certificate"
                                />
                            </div>

                            <div className={styles.content}>
                                <p>
                                    <strong>Organiser:</strong>{" "}
                                    {certificate.webinarOrganiser}
                                </p>

                                <div className={styles.actions}>
                                    <a
                                        href={certificate.certificateFile?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.viewBtn}
                                    >
                                        👁 View
                                    </a>

                                    <button
                                        onClick={() => handleSend(certificate)}
                                        className={styles.sendBtn}
                                    >
                                        📤 Send
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteCertificate(certificate._id)
                                        }
                                        className={styles.deleteBtn}
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Select Registrations</h3>

                        <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                            Download the sample CSV, fill <strong>Name</strong> and{" "}
                            <strong>Email</strong>, then upload it.
                        </p>

                        <div style={{ marginBottom: "10px" }}>
                            <button onClick={downloadSampleCSV}>
                                ⬇ Download Sample CSV
                            </button>
                        </div>

                        <div className={styles.csvUpload}>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleCSVUpload}
                            />
                        </div>

                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {allRows.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className={styles.noData}>
                                                No registrations found
                                            </td>
                                        </tr>
                                    ) : (
                                        allRows.map((reg) => {
                                            const fullName =
                                                `${reg.Name
                                                    }`.trim();

                                            return (
                                                <tr key={reg._id}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedEmails.includes(
                                                                reg.Email
                                                            )}
                                                            onChange={() =>
                                                                handleCheckboxChange(reg.Email)
                                                            }
                                                        />
                                                    </td>
                                                    <td>{fullName || "N/A"}</td>
                                                    <td>{reg.Email}</td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Add Custom Registration */}
                        <div className={styles.addEmailSection}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                value={customEmail}
                                onChange={(e) => setCustomEmail(e.target.value)}
                            />
                            {/* 
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={customPhone}
                                onChange={(e) => setCustomPhone(e.target.value)}
                            /> */}

                            <button type="button" onClick={handleAddEmail}>
                                Add
                            </button>
                        </div>

                        <div className={styles.modalActions}>
                            <button onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            {/* 
                            <button
                                onClick={handleConfirmSend}
                                disabled={loading}
                            >
                                {loading
                                    ? "Sending..."
                                    : `Confirm Send (${selectedEmails.length})`}
                            </button> */}

                            <button
                                onClick={() => {
                                    if (selectedEmails.length === 0) {
                                        alert("Please select at least one user");
                                        return;
                                    }

                                    setShowEmailModal(true);   // 👈 open second modal
                                }}
                                disabled={selectedEmails.length === 0}
                            >
                                Confirm Send ({selectedEmails.length})
                            </button>
                        </div>
                    </div>

                    {showEmailModal && (
                        <div className={styles.smallModalOverlay}>
                            <div className={styles.smallModal}>
                                <h3>Compose Email</h3>

                                <input
                                    type="text"
                                    placeholder="Email Subject"
                                    value={emailSubject}
                                    onChange={(e) => setEmailSubject(e.target.value)}
                                />

                                {/* To Field */}
                                <div className={styles.toField}>
                                    <h3>To</h3>
                                    <div className={styles.emailTagsWrapper}>
                                        {selectedEmails.length === 0 ? (
                                            <span className={styles.noRecipients}>
                                                No recipients selected
                                            </span>
                                        ) : (
                                            selectedEmails.map((email, index) => (
                                                <span key={index} className={styles.emailTag}>
                                                    {email}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* <textarea
                                    rows="6"
                                    placeholder="Write email body..."
                                    value={emailBody}
                                    onChange={(e) => setEmailBody(e.target.value)}
                                /> */}
                                <h3>Email Body</h3>
                                <RichTextEditor
                                    value={emailBody}
                                    onChange={setEmailBody}
                                />

                                <div className={styles.smallModalActions}>
                                    <button onClick={() => setShowEmailModal(false)}>
                                        Back
                                    </button>

                                    <button
                                        onClick={handleConfirmSend}
                                        disabled={loading}
                                        className={styles.sendButton}
                                    >
                                        {loading ? (
                                            <span className={styles.loader}></span>
                                        ) : (
                                            "Send Certificates"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default CertificateList;
