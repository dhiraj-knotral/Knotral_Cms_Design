import React from "react";
import styles from "./WebinarList.module.css"
import Link from "next/link";

// Mock webinar data
const webinars = [
    {
        id: 1,
        title: "AI in IB Mathematics: What Works",
        date: "Jan 08, 2026 • 6:00 PM IST",
        provider: "Matific",
        category: "Mathematics",
        status: "upcoming",
        registered: 234,
        minutes: 90,
        price: "Free",
    },
    {
        id: 2,
        title: "Gamified Abacus Learning",
        date: "Jan 06, 2026 • 6:00 PM IST",
        provider: "WeSkool House",
        category: "Early Years",
        status: "live",
        registered: 189,
        minutes: 60,
        price: "Free",
    },
    {
        id: 3,
        title: "Certified SEL Workshop",
        date: "Jan 13, 2026 • 7:00 PM IST",
        provider: "SEL Academy",
        category: "SEL & Wellbeing",
        status: "upcoming",
        registered: 456,
        minutes: 120,
        price: "₹999",
    },
    {
        id: 4,
        title: "Reggio Emilia Approach",
        date: "Dec 28, 2025 • 6:00 PM IST",
        provider: "WeSkool House",
        category: "Early Years",
        status: "completed",
        registered: 567,
        minutes: 90,
        price: "4.8★",
    },
    {
        id: 5,
        title: "Spelling Builds Literacy",
        date: "Jan 13, 2026 • 6:00 PM IST",
        provider: "EdShed",
        category: "Literacy",
        status: "upcoming",
        registered: 312,
        minutes: 60,
        price: "Free",
    },
    {
        id: 6,
        title: "AI Tools for Teachers",
        date: "Not Scheduled",
        provider: "TechEd Global",
        category: "EdTech",
        status: "draft",
        registered: 0,
        minutes: "—",
        price: "—",
    },
];

const WebinarList = () => {
    return (
        <div className={styles.contentarea}>
            <div className={styles.pageheader}>
                <h1 className={styles.pagetitle}>Manage Webinars</h1>
                <Link href="/create-webinar" className={styles.btnprimary}>
                    ➕ Add New Webinar
                </Link>
            </div>

            {/* Filters */}
            <div className={styles.filtersbar}>
                <div className={styles.filtergroup}>
                    <label className={styles.filterlabel}>Search</label>
                    <input
                        type="text"
                        className={styles.filterinput}
                        placeholder="Search webinars..."
                    />
                </div>
                <div className={styles.filtergroup}>
                    <label className={styles.filterlabel}>Status</label>
                    <select className={styles.filterselect}>
                        <option value="">All Status</option>
                        <option value="live">Live</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
                <div className={styles.filtergroup}>
                    <label className={styles.filterlabel}>Category</label>
                    <select className={styles.filterselect}>
                        <option value="">All Categories</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="literacy">Literacy</option>
                        <option value="science">Science</option>
                        <option value="sel">SEL & Wellbeing</option>
                        <option value="edtech">EdTech</option>
                    </select>
                </div>
                <div className={styles.filtergroup}>
                    <label className={styles.filterlabel}>Provider</label>
                    <select className={styles.filterselect}>
                        <option value="">All Providers</option>
                        <option value="edshed">EdShed</option>
                        <option value="matific">Matific</option>
                        <option value="weskool">WeSkool House</option>
                    </select>
                </div>
                <div className={styles.filteractions}>
                    <button className={styles.btnsecondary}>Reset</button>
                    <button className={styles.btnprimary}>Apply Filters</button>
                </div>
            </div>

            {/* Webinars Grid */}
            <div className={styles.webinarsgrid}>
                {webinars.map((webinar) => (
                    <div key={webinar.id} className={styles.webinarcard}>
                        <div className={styles.webinarimage}></div>
                        <div className={styles.webinarcontent}>
                            <div className={styles.webinarheader}>
                                <span className={`${styles.webvianrbadge} ${styles[webinar.status]}`}>
                                    {webinar.status.charAt(0).toUpperCase() + webinar.status.slice(1)}
                                </span>
                            </div>
                            <h3 className={styles.webinartitle}>{webinar.title}</h3>
                            <div className={styles.webinarmeta}>
                                <div className={styles.webinarmeta}>📅 {webinar.date}</div>
                                <div className={styles.webinarmeta}>🌍 Provider: {webinar.provider}</div>
                                <div className={styles.webinarmeta}>📁 Category: {webinar.category}</div>
                            </div>
                            <div className={styles.webinarstats}>
                                <div className={styles.statitem}>
                                    <div className={styles.statvalue}>{webinar.registered}</div>
                                    <div className={styles.statlabel}>Registered</div>
                                </div>
                                <div className={styles.statitem}>
                                    <div className={styles.statvalue}>{webinar.minutes}</div>
                                    <div className={styles.statlabel}>Minutes</div>
                                </div>
                                <div className={styles.statitem}>
                                    <div className={styles.statvalue}>{webinar.price}</div>
                                    <div className={styles.statlabel}>Price</div>
                                </div>
                            </div>
                            <div className={styles.webinaractions}>
                                <button className={`${styles.btnaction} ${styles.view}`}>👁️ View</button>
                                <button className={`${styles.btnaction} ${styles.edit}`}>✏️ Edit</button>
                                <button className={`${styles.btnaction} ${styles.delete}`}>🗑️ Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <button className={styles.pagebtn}>← Previous</button>
                <button className={`${styles.pagebtn} ${styles.active}`}>1</button>
                <button className={styles.pagebtn}>2</button>
                <button className={styles.pagebtn}>3</button>
                <button className={styles.pagebtn}>4</button>
                <button className={styles.pagebtn}>Next →</button>
            </div>
        </div>
    );
};

export default WebinarList;
