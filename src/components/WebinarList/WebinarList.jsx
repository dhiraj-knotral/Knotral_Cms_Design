"use client"
import React, { useEffect, useState } from "react";
import styles from "./WebinarList.module.css"
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";

const WebinarList = ({ webinars, pagination, filters }) => {
    const endItem = Math.min(pagination.page * pagination.limit, pagination.totalItems);

    const router = useRouter();
    const searchParams = useSearchParams()

    const [localFilters, setLocalFilters] = useState({
        search: filters?.search || "",
        type: filters?.type || "",
        category: filters?.category || "",
    });

    const [webinarList, setWebinarList] = useState(webinars);

    useEffect(() => {
        setWebinarList(webinars);
    }, [webinars]);

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (localFilters.search) params.set("search", localFilters.search);
        if (localFilters.type) params.set("type", localFilters.type);
        if (localFilters.category) params.set("category", localFilters.category);

        params.set("page", 1);

        router.push(`/webinar-list?${params.toString()}`);
        router.refresh();
    };

    /* ---------------- RESET FILTERS ---------------- */
    const resetFilters = () => {
        setLocalFilters({
            search: "",
            type: "",
            category: "",
        });

        router.push("/webinar-list?page=1");
        router.refresh();
    };

    const getDurationInMinutes = (duration) => {
        const hours = duration.match(/(\d+)\s*hour/)?.[1] || 0;
        const minutes = duration.match(/(\d+)\s*minute/)?.[1] || 0;
        return Number(hours) * 60 + Number(minutes);
    };

    const getWebinarStatus = (webinar) => {
        if (webinar.isLive) return "live";
        if (webinar.isStopped) return "completed";
        if (webinar.isOnDemand) return "ondemand";
        return "upcoming";
    };


    const stopWebinar = async (webinarId) => {
        const confirmStop = window.confirm(
            "Are you sure you want to stop this webinar?"
        );

        if (!confirmStop) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/stop-webinar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ webinarId }),
            });

            const data = await res.json();

            if (data.success) {
                alert("Webinar stopped successfully!");
                // Update the webinar locally
                setWebinarList(prev =>
                    prev.map(w =>
                        w._id === webinarId
                            ? { ...w, isStopped: true, isLive: false }
                            : w
                    )
                );
            } else {
                alert(data.message || "Failed to stop webinar");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };


    const deleteWebinar = async (webinarId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this webinar? This action cannot be undone."
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/delete-webinar`,
                {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ webinarId }),
                }
            );

            const data = await res.json();

            if (data.success) {
                alert("Webinar deleted successfully!");

                // 🔥 Remove webinar from UI instantly
                setWebinarList((prev) =>
                    prev.filter((w) => w._id !== webinarId)
                );
            } else {
                alert(data.message || "Failed to delete webinar");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };
    return (
        <div className={styles.contentarea}>
            {/* <div className={styles.pageheader}>
                <h1 className={styles.pagetitle}>Manage Webinars</h1>
                <Link href="/create-webinar" className={styles.btnprimary}>
                    ➕ Add New Webinar
                </Link>
            </div> */}

            {/* Filters */}
            <div className={styles.filtersbar}>
                <div className={styles.filtergroup}>
                    <label className={styles.filterlabel}>Search</label>
                    <input
                        type="text"
                        className={styles.filterinput}
                        placeholder="Search by topic or provider..."
                        value={localFilters.search}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className={styles.filtergroup}>
                    <label className={styles.filterlabel}>Status</label>
                    <select
                        className={styles.filterselect}
                        value={localFilters.type}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                type: e.target.value,
                            }))
                        }
                    >
                        <option value="">All Status</option>
                        <option value="live">Live</option>
                        <option value="certified">Certification</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className={styles.filtergroup}>
                    <label className={styles.filterlabel}>Category</label>
                    <select
                        className={styles.filterselect}
                        value={localFilters.category}
                        onChange={(e) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                category: e.target.value,
                            }))
                        }
                    >
                        <option value="">All Categories</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Literacy">Literacy</option>
                        <option value="Science">Science</option>
                        <option value="EdTech">EdTech</option>
                        <option value="SEL & Wellbeing">SEL & Wellbeing</option>
                        <option value="Assessment">Assessment</option>
                        <option value="NEP 2020">NEP 2020</option>
                        <option value="Arts & Music">Arts & Music</option>
                        <option value="Languages">Languages</option>
                        <option value="Early Years">Early Years</option>
                    </select>
                </div>
                <div className={styles.filteractions}>
                    <button className={styles.btnsecondary} onClick={resetFilters}>Reset</button>
                    <button className={styles.btnprimary} onClick={applyFilters}>Apply Filters</button>
                    <Link href="/create-webinar" className={styles.btnprimary}>
                        Add New Webinar
                    </Link>
                </div>
            </div>

            {/* Webinars Grid */}
            <div className={styles.webinarsgrid}>
                {webinarList.map((webinar) => (
                    <div key={webinar._id} className={styles.webinarcard}>
                        <div className={styles.webinarimage}>
                            <img
                                src={webinar.logo?.url}
                                alt={webinar.title}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.webinarcontent}>
                            <div className={styles.webinarheader}>
                                <span
                                    className={`${styles.webinarbadge} ${styles[getWebinarStatus(webinar)]
                                        }`}
                                >
                                    {getWebinarStatus(webinar).charAt(0).toUpperCase() +
                                        getWebinarStatus(webinar).slice(1)}
                                </span>
                            </div>
                            <h3 className={styles.webinartitle}>{webinar.title}</h3>
                            <div className={styles.webinarmeta}>
                                <div className={styles.webinarmeta}>
                                    📅 {webinar.date ? moment(webinar.date).format("MMM DD, YYYY") : "—"}
                                </div>
                                <div className={styles.webinarmeta}>🌍 Provider: {webinar.organisedBy}</div>
                                <div className={styles.webinarmeta}>📁 Category: {webinar.category}</div>
                            </div>
                            <div className={styles.webinarstats}>
                                <div className={styles.statitem}>
                                    <div className={styles.statvalue}>{webinar.views}</div>
                                    <div className={styles.statlabel}>Registered</div>
                                </div>
                                <div className={styles.statitem}>
                                    <div className={styles.statvalue}>{getDurationInMinutes(webinar.duration)}</div>
                                    <div className={styles.statlabel}>Minutes</div>
                                </div>
                                <div className={styles.statitem}>
                                    <div className={styles.statvalue}>
                                        {webinar.isFree ? "Free" : `₹${webinar.price}`}
                                    </div>
                                    <div className={styles.statlabel}>Price</div>
                                </div>
                            </div>
                            <div className={styles.webinaractions}>
                                <button
                                    className={`${styles.btnaction} ${styles.edit}`}
                                    onClick={() => router.push(`/edit-webinar/${webinar.slug}`)}
                                >
                                    ✏️ Edit
                                </button>                                <button className={`${styles.btnaction} ${styles.view}`} onClick={() => stopWebinar(webinar._id)}>⏹ Stop</button>
                                <button className={`${styles.btnaction} ${styles.delete}`} onClick={() => deleteWebinar(webinar._id)}>🗑️ Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                {/* Previous */}
                {pagination.page > 1 && (() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", pagination.page - 1);

                    return (
                        <Link
                            href={`/webinar-list?${params.toString()}`}
                            className={styles.pagebtn}
                        >
                            ← Previous
                        </Link>
                    );
                })()}

                {/* Page Numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", p);

                    return (
                        <Link
                            key={p}
                            href={`/webinar-list?${params.toString()}`}
                            className={
                                p === pagination.page
                                    ? `${styles.pagebtn} ${styles.active}`
                                    : styles.pagebtn
                            }
                        >
                            {p}
                        </Link>
                    );
                })}

                {/* Next */}
                {pagination.page < pagination.totalPages && (() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("page", pagination.page + 1);

                    return (
                        <Link
                            href={`/webinar-list?${params.toString()}`}
                            className={styles.pagebtn}
                        >
                            Next →
                        </Link>
                    );
                })()}
            </div>
        </div>
    );
};

export default WebinarList;
