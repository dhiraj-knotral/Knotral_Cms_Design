import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = React.forwardRef(({ open, webinars }, ref) => {
    const pathname = usePathname(); // App router

    return (
        <aside
            ref={ref}
            className={`${styles.sidebar} ${open ? styles.open : ""}`}
        >

            <div className={styles.sidebarheader}>
                <a href="/dashboard" className={styles.sidebarlogo}>
                    <img src="/knotralFoot.png" alt="Knotral" />
                </a>
            </div>

            <nav className={styles.sidebarnav}>
                <div className={styles.navsection}>
                    <div className={styles.navsectiontitle}>Main</div>
                    <Link
                        href="/dashboard"
                        className={`${styles.navitem} ${pathname === "/dahsboard" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>📊</span>
                        Dashboard
                    </Link>
                    {/* <a href="/cms/analytics" className={styles.navitem}>
                        <span className={styles.navicon}>📈</span>
                        Analytics
                    </a> */}
                    {/* <Link
                     href="/on-demand-library" 
                     className={`${styles.navitem} ${pathname === "/on-demand-library" ? styles.active : ""}`}>
                        <span className={styles.navicon}>📹</span>
                        On-Demand Library
                    </Link> */}
                </div>

                <div className={styles.navsection}>
                    <div className={styles.navsectiontitle}>Content</div>
                    <Link
                        href="/webinar-list"
                        className={`${styles.navitem} ${pathname === "/webinar-list" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>🎓</span>
                        Webinars
                        <span className={styles.navbadge}>{webinars?.count ?? 0}</span>
                    </Link>

                    <Link
                        href="/create-webinar"
                        className={`${styles.navitem} ${pathname === "/create-webinar" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>📁</span>
                        Create Webinars
                    </Link>
                    <Link
                        href="/registrations"
                        className={`${styles.navitem} ${pathname === "/registrations" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>🧾</span>
                        Registrations
                    </Link>

                     <Link
                        href="/certificate-list"
                        className={`${styles.navitem} ${pathname === "/certificate-list" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>🏆</span>
                        Certificate List
                    </Link>
                     <Link
                        href="/leads"
                        className={`${styles.navitem} ${pathname === "/leads" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>👥</span>
                         Leads
                    </Link>

                    <Link
                        href="/users"
                        className={`${styles.navitem} ${pathname === "/users" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>🧑</span>
                         Users
                    </Link>
                    
                    {/* <a href="/cms/certifications" className={styles.navitem}>
                        <span className={styles.navicon}>🏆</span>
                        Certifications
                    </a> */}
                    {/* <a href="/cms/categories" className={styles.navitem}>
                        <span className={styles.navicon}>📁</span>
                        Categories
                    </a> */}
                    {/* <a href="/cms/providers" className={styles.navitem}>
                        <span className={styles.navicon}>🌍</span>
                        Solution Providers
                    </a> */}
                </div>

                {/* <div className={styles.navsection}>
                    <div className={styles.navsectiontitle}>Users</div>
                    <Link
                        href="/teachers"
                        className={`${styles.navitem} ${pathname === "/teachers" ? styles.active : ""}`}
                    >
                        <span className={styles.navicon}>👩‍🏫</span>
                        Teachers
                    </Link>
                    <a href="/cms/schools" className={styles.navitem}>
                        <span className={styles.navicon}>🏫</span>
                        Schools
                    </a>
                    <a href="/cms/registrations" className={styles.navitem}>
                        <span className={styles.navicon}>📝</span>
                        Registrations
                        <span className={styles.navbadge}>45</span>
                    </a>
                </div> */}

                {/* <div className={styles.navsection}>
                    <div className={styles.navsectiontitle}>Communication</div>
                    <a href="/cms/emails" className={styles.navitem}>
                        <span className={styles.navicon}>✉️</span>
                        Email Campaigns
                    </a>
                    <a href="/cms/notifications" className={styles.navitem}>
                        <span className={styles.navicon}>🔔</span>
                        Notifications
                    </a>
                    <a href="/cms/contacts" className={styles.navitem}>
                        <span className={styles.navicon}>📞</span>
                        Contact Inquiries
                        <span className={styles.navbadge}>8</span>
                    </a>
                </div> */}

                {/* <div className={styles.navsection}>
                    <div className={styles.navsectiontitle}>Settings</div>
                    <a href="/cms/pages" className={styles.navitem}>
                        <span className={styles.navicon}>📄</span>
                        Pages
                    </a>
                    <a href="/cms/users" className={styles.navitem}>
                        <span className={styles.navicon}>👤</span>
                        CMS Users
                    </a>
                    <a href="/cms/settings" className={styles.navitem}>
                        <span className={styles.navicon}>⚙️</span>
                        Settings
                    </a>
                </div> */}
            </nav>
        </aside>
    );
});

export default Sidebar;
