"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar";

export default function CMSLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const menuToggleRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                window.innerWidth <= 768 &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                menuToggleRef.current &&
                !menuToggleRef.current.contains(e.target)
            ) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
        }
    }, [sidebarOpen]);

    return (
        <div className="cmscontainer">
            <Sidebar ref={sidebarRef} open={sidebarOpen} />

            <main className="maincontent">
                <Topbar
                    onMenuClick={() => setSidebarOpen((o) => !o)}
                    menuToggleRef={menuToggleRef}
                />
                {children}
            </main>
        </div>
    );
}
