"use client";
import { useEffect, useState } from "react";
import styles from "./Registrations.module.css";

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  const [searchForm, setSearchForm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/registration/get-registrations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setRegistrations(data.data || []);
        setFilteredRegistrations(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  /* 🔍 FILTER LOGIC */
  useEffect(() => {
    let filtered = [...registrations];

    if (searchForm) {
      filtered = filtered.filter(r =>
        r.FORM_NAME?.toLowerCase().includes(searchForm.toLowerCase())
      );
    }

    if (searchDate) {
      filtered = filtered.filter(r => {
        if (!r.Webinar_Date_TIme) return false;
        const webinarDate = new Date(r.Webinar_Date_TIme)
          .toISOString()
          .split("T")[0];
        return webinarDate === searchDate;
      });
    }

    setFilteredRegistrations(filtered);
  }, [searchForm, searchDate, registrations]);

  if (loading) return <div className={styles.status}>Loading registrations…</div>;
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
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className={styles.status}>No registrations found.</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Form Name</th>
                <th>Webinar Date</th>
                <th>Company</th>
                <th>Designation</th>
                <th>City</th>

              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((r) => (
                <tr key={r._id}>
                  <td>{r.First_Name} {r.Last_Name}</td>
                  <td>{r.Email}</td>
                  <td>{r.Mobile}</td>
                  <td>{r.FORM_NAME}</td>
                  <td>
                    {r.Webinar_Date_TIme
                      ? new Date(r.Webinar_Date_TIme).toLocaleString()
                      : "—"}
                  </td>
                  <td>{r.Company || "—"}</td>
                  <td>{r.Designation || "—"}</td>
                  <td>{r.City || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Registrations;
