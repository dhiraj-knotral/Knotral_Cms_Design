import React from "react";
import styles from "./Topbar.module.css"

const Topbar = ({ onMenuClick, menuToggleRef }) => {
    return (
        <div className={styles.topbar}>
            <div className={styles.topbarleft}>
                <button
                    ref={menuToggleRef}
                    className={styles.menutoggle}
                    onClick={(e) => {
                        e.stopPropagation();   // 🔴 THIS IS THE KEY
                        onMenuClick();
                    }}
                >
                    ☰
                </button>
                <div className={styles.searchbox}>
                    <span>🔍</span>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className={styles.topbarright}>
                <button className={styles.notificationbtn}>
                    🔔
                    <span className={styles.notificationbadge}>5</span>
                </button>
                <div className={styles.userprofile}>
                    <div className={styles.useravatar}>AS</div>
                    <div className={styles.userinfo}>
                        <div className={styles.username}>Admin User</div>
                        <div className={styles.userrole}>Super Admin</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
