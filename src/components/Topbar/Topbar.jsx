"use client"
import React, { useEffect, useRef, useState } from "react";
import styles from "./Topbar.module.css"
import { useRouter } from "next/navigation";


const Topbar = ({ title, onMenuClick, menuToggleRef }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Clear auth
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminUser");

        // Optional: clear cookie if you added one
        document.cookie =
            "adminAccessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        router.push("/");
    };
    return (
        <div className={styles.topbar}>
            <div className={styles.topbarleft}>
                <button
                    ref={menuToggleRef}
                    className={styles.menutoggle}
                    onClick={(e) => {
                        e.stopPropagation();
                        onMenuClick();
                    }}
                >
                    ☰
                </button>
                {/* <div className={styles.searchbox}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search..." />
                </div> */}
                <h1 className={styles.pagetitle}>{title}</h1>

            </div>

            <div className={styles.topbarright}>
                {/* <button className={styles.notificationbtn}>
                    🔔
                    <span className={styles.notificationbadge}>5</span>
                </button> */}
                <div
                    className={styles.userprofile}
                    ref={dropdownRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen((prev) => !prev);
                    }}
                >
                    <div className={styles.useravatar}>AS</div>
                    <div className={styles.userinfo}>
                        <div className={styles.username}>Admin User</div>
                        <div className={styles.userrole}>Super Admin</div>
                    </div>

                    {open && (
                        <div className={styles.dropdown}>
                            <button
                                className={styles.dropdownitem}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Topbar;
