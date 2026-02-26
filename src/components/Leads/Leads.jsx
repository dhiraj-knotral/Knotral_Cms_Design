"use client";
import { useEffect, useState } from "react";
import styles from "./Leads.module.css";
import { authFetch } from "@/utils/authFetch";
import moment from "moment";

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);

    const [searchForm, setSearchForm] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                // const res = await fetch(
                //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/registration/get-registrations`,
                //   {
                //     method: "POST",
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //   }
                // );
                const res = await authFetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-all-leads`,
                    { method: "GET" }
                );

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to fetch");

                setLeads(data.response || []);
                setFilteredLeads(data.response || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    /* 🔍 FILTER LOGIC */
    useEffect(() => {
        let filtered = [...leads];

        if (searchForm) {
            filtered = filtered.filter(r =>
                r.FORM_NAME?.toLowerCase().includes(searchForm.toLowerCase())
            );
        }

        if (searchDate) {
            filtered = filtered.filter(r => {
                if (!r.createdAt) return false;

                return moment(r.createdAt).format("YYYY-MM-DD") === searchDate;
            });
        }

        setFilteredLeads(filtered);
    }, [searchForm, searchDate, leads]);

    const downloadCSV = () => {
        const headers = [
            "First Name",
            "Last Name",
            "Email",
            "Mobile",
            "Form Name",
            "Created Date",
            "Designation",
            "Company",
            "City",
        ];

        // Map leads data to CSV rows
        const rows = filteredLeads.map(r => [
            r.First_Name || "",
            r.Last_Name || "",
            r.Email || "",
            r.Mobile || "",
            r.FORM_NAME || "",
            r.createdAt
                ? new Date(r.createdAt).toLocaleString()
                : "",
            r.Designation || "",
            r.Company || "",
            r.City || "",
        ]);

        // Combine headers + rows
        const csvContent =
            [headers, ...rows].map(e => e.map(v => `"${v}"`).join(",")).join("\n");

        // Create a blob and trigger download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "leads.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    if (loading) return <div className={styles.status}>Loading leads…</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.wrapper}>

            {/* 🔍 SEARCH BAR */}
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search by Form Name"
                    value={searchForm}
                    onChange={(e) => setSearchForm(e.target.value)}
                />

                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />

                {(searchForm || searchDate) && (
                    <button
                        className={styles.clearBtn}
                        onClick={() => {
                            setSearchForm("");
                            setSearchDate("");
                        }}
                    >
                        Clear
                    </button>
                )}
                <button className={styles.clearBtn} onClick={downloadCSV}>
                    Download CSV
                </button>
            </div>

            {filteredLeads.length === 0 ? (
                <div className={styles.status}>No leads found.</div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Form Name</th>
                                <th>Created Date</th>
                                {/* <th>Company</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((r) => (
                                <tr key={r._id}>
                                    <td>{r.First_Name} {r.Last_Name}</td>
                                    <td>{r.Email}</td>
                                    <td>{r.Mobile}</td>
                                    <td>{r.FORM_NAME}</td>
                                    <td>
                                        {r.createdAt
                                            ? new Date(r.createdAt).toLocaleString()
                                            : "—"}
                                    </td>
                                    {/* <td>{r.Company || "—"}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Leads;
