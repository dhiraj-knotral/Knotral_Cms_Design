"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar";
import { usePathname } from "next/navigation";

const pageTitles = {
    "/dashboard": "Dashboard",
    "/webinar-list": "Manage Webinars",
    "/create-webinar": "Add New Webinar",
    "/registrations": "Registrations",
    "/upload-certificates": "Upload Certificates",
    "/certificate-list": "Certificate List",



};

export const getPageTitle = (pathname) => {
    if (pathname.startsWith("/edit-webinar")) {
        return "Edit Webinar";
    }

    return pageTitles[pathname] || "Dashboard";
};

export default function CMSLayout({ children, webinars = [] }) {
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

    const pathname = usePathname();

    useEffect(() => {
  if (window.innerWidth <= 768) {
    setSidebarOpen(false);
  }
}, [pathname]);

    return (
        <div className="cmscontainer">
            <Sidebar ref={sidebarRef} open={sidebarOpen} webinars={{ count: webinars.length }} />

            <main className="maincontent">
                <Topbar
                    title={getPageTitle(pathname)}
                    onMenuClick={() => setSidebarOpen((o) => !o)}
                    menuToggleRef={menuToggleRef}
                />
                {children}
            </main>
        </div>
    );
}
