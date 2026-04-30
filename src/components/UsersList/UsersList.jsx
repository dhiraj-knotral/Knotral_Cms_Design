"use client";
import React, { useState, useEffect } from "react";
import styles from "./UsersList.module.css";
import moment from "moment";
import { authFetch } from "../../utils/authFetch";

const UsersList = () => {
    const [users, setUsers] = useState([]);

    const [showEmailModal, setShowEmailModal] = useState(false);

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
    });

    const [searchForm, setSearchForm] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* 🔥 GLOBAL SELECTION */
    const [selectAll, setSelectAll] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [excludedIds, setExcludedIds] = useState([]);

    /* ================= FETCH USERS ================= */
    const fetchUsers = async (page = 1) => {
        try {
            setLoading(true);

            const res = await authFetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-users?page=${page}&limit=10`,
                { method: "GET" }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed");

            const usersData = (data.response || []).filter(
                (u) => !u.isSuperAdmin
            );

            setUsers(usersData);
            setPagination(data.pagination);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(pagination.page);
    }, [pagination.page]);

    /* ================= FILTER ================= */
    const filteredUsers = users.filter((u) => {
        const query = searchForm.toLowerCase();

        const fullName =
            `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();

        return (
            (!searchForm ||
                fullName.includes(query) ||
                u.email?.toLowerCase().includes(query) ||
                String(u.mobileNumber || "").includes(query) ||
                u.organizationName?.toLowerCase().includes(query) ||
                u.roleDescription?.toLowerCase().includes(query))
            &&
            (!searchDate ||
                (u.createdAt &&
                    moment(u.createdAt).format("YYYY-MM-DD") === searchDate))
        );
    });

    /* ================= CHECKBOX ================= */

    const isChecked = (id) =>
        selectAll ? !excludedIds.includes(id) : selectedIds.includes(id);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectAll(true);
            setSelectedIds([]);
            setExcludedIds([]);
        } else {
            setSelectAll(false);
            setSelectedIds([]);
            setExcludedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        if (selectAll) {
            setExcludedIds((prev) =>
                prev.includes(id)
                    ? prev.filter((i) => i !== id)
                    : [...prev, id]
            );
        } else {
            setSelectedIds((prev) =>
                prev.includes(id)
                    ? prev.filter((i) => i !== id)
                    : [...prev, id]
            );
        }
    };

    const isHeaderChecked = selectAll && excludedIds.length === 0;

    const isHeaderIndeterminate =
        (!selectAll && selectedIds.length > 0) ||
        (selectAll && excludedIds.length > 0);

    /* ================= FINAL PAYLOAD ================= */
    const getSelectedUsers = () => {
        if (selectAll) {
            return {
                type: "ALL",
                excludedIds,
            };
        }
        return {
            type: "PARTIAL",
            selectedIds,
        };
    };

    /* ================= CSV ================= */
    const downloadCSV = () => {
        const headers = [
            "First Name",
            "Last Name",
            "Email",
            "Mobile",
            "Role",
            "Created Date",
            "Organization",
        ];

        const rows = filteredUsers.map((u) => [
            u.firstName || "",
            u.lastName || "",
            u.email || "",
            `${u.countryCode || ""} ${u.mobileNumber || ""}`,
            u.roleDescription || "",
            u.createdAt
                ? new Date(u.createdAt).toLocaleString()
                : "",
            u.organizationName || "",
        ]);

        const csvContent = [headers, ...rows]
            .map((e) => e.map((v) => `"${v}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "users.csv";
        link.click();
    };

    /* ================= SEND MAIL ================= */
    const sendBulkMail = async () => {
        try {
            setSending(true);

            const payload = {
                ...getSelectedUsers(),
                subject,
                message,
            };

            const res = await authFetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/send-email`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            alert(`✅ ${data.message}`);

            setShowEmailModal(false);
            setSubject("");
            setMessage("");

            setSelectedIds([]);
            setExcludedIds([]);
            setSelectAll(false);
        } catch (err) {
            alert(err.message);
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className={styles.status}>Loading users…</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.pageContainer}>

            <div className={styles.wrapper}>
                {/* SEARCH */}
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchForm}
                        onChange={(e) => setSearchForm(e.target.value)}
                    />

                    <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />

                    <button onClick={downloadCSV} className={styles.clearBtn}>
                        Download CSV
                    </button>
                    <button
                        className={styles.clearBtn}
                        disabled={
                            (!selectAll && selectedIds.length === 0) ||
                            (selectAll && excludedIds.length === users.length)
                        }
                        onClick={() => setShowEmailModal(true)}
                    >
                        Send Mail
                    </button>
                </div>

                {/* TABLE */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={isHeaderChecked}
                                        ref={(el) => {
                                            if (el) el.indeterminate = isHeaderIndeterminate;
                                        }}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>
                                <th>Organization</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((u) => (
                                <tr key={u._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={isChecked(u._id)}
                                            onChange={() => handleSelectOne(u._id)}
                                        />
                                    </td>
                                    <td>{u.firstName} {u.lastName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.countryCode} {u.mobileNumber}</td>
                                    <td>{u.roleDescription}</td>
                                    <td>{u.organizationName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGINATION */}
            <div className={styles.pagination}>
                {pagination.page > 1 && (
                    <button
                        onClick={() =>
                            setPagination((p) => ({ ...p, page: p.page - 1 }))
                        }
                        className={styles.pagebtn}
                    >
                        ← Prev
                    </button>
                )}

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() =>
                            setPagination((prev) => ({ ...prev, page: p }))
                        }
                        className={
                            p === pagination.page
                                ? `${styles.pagebtn} ${styles.active}`
                                : styles.pagebtn
                        }
                    >
                        {p}
                    </button>
                ))}

                {pagination.page < pagination.totalPages && (
                    <button
                        onClick={() =>
                            setPagination((p) => ({ ...p, page: p.page + 1 }))
                        }
                        className={styles.pagebtn}
                    >
                        Next →
                    </button>
                )}
            </div>

            {showEmailModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>

                        <h3>Compose Email</h3>

                        {/* OPTIONAL: SHOW SELECTED COUNT */}
                        {/* <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                            Recipients: {selectAll ? "All Users" : selectedIds.length} selected
                        </p> */}

                        <input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Subject"
                        />

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message"
                            rows={6}
                        />

                        {/* OPTIONAL: SHOW SAMPLE EMAIL LIST */}
                        {/* <div style={{ fontSize: "12px", marginBottom: "10px", color: "#666" }}>
                            {selectAll
                                ? `All users will receive this email (${users.length} users)`
                                : `Selected users: ${selectedIds.length}`}
                        </div> */}

                        <div className={styles.modalActions}>
                            <button onClick={() => setShowEmailModal(false)}>
                                Cancel
                            </button>

                            <button
                                onClick={sendBulkMail}
                                disabled={sending || !subject || !message}
                            >
                                {sending ? "Sending..." : "Send Mail"}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;