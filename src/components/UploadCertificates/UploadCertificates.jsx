"use client";
import React, { useEffect, useState } from "react";
import styles from "./UploadCertificates.module.css";
import { useRouter } from "next/navigation";

const UploadCertificates = () => {
    const [webinars, setWebinars] = useState([]);
    const [selectedWebinar, setSelectedWebinar] = useState("");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();


    // ===============================
    // Fetch Webinars
    // ===============================
    useEffect(() => {
        const fetchWebinars = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/get-webinars`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch webinars");
                }

                const data = await res.json();

                const webinarList = Array.isArray(data)
                    ? data
                    : data?.response || [];

                setWebinars(
                    webinarList.filter(webinar => webinar.isCertified)
                );
            } catch (error) {
                console.error("Error fetching webinars:", error);
            }
        };

        fetchWebinars();
    }, []);

    // ===============================
    // Handle Webinar Selection
    // ===============================
    const handleWebinarChange = async (e) => {
        const webinarId = e.target.value;

        setSelectedWebinar(webinarId);
        setFile(null);
        setMessage("");
        setPreviewUrl(null);

        if (!webinarId) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-webinar-certificate?webinarId=${webinarId}`
            );

            const data = await res.json();

            if (res.ok && data.response) {
                let fileUrl =
                    data.response.certificateFile?.secure_url ||
                    data.response.certificateFile?.url;

                // Force inline preview for raw PDF
                if (fileUrl) {
                    fileUrl = `${fileUrl}?response-content-disposition=inline`;
                }

                setPreviewUrl(fileUrl);
            }
        } catch (error) {
            console.error("Error fetching certificate:", error);
        }
    };


    // ===============================
    // Handle File Selection
    // ===============================
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Allow only image files
        if (!selectedFile.type.startsWith("image/")) {
            setMessage("Only image files are allowed.");
            return;
        }

        // Optional: restrict specific formats
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(selectedFile.type)) {
            setMessage("Only JPG, PNG, or WEBP images are allowed.");
            return;
        }

        // Optional: file size limit (5MB example)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setMessage("Image size must be less than 5MB.");
            return;
        }

        // Clean previous object URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setMessage("");
    };


    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (previewUrl && file) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl, file]);

    // ===============================
    // Upload Certificate
    // ===============================
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedWebinar) {
            return setMessage("Please select a webinar.");
        }

        if (!file) {
            return setMessage("Please upload a Image certificate.");
        }

        const formData = new FormData();
        formData.append("webinarId", selectedWebinar);
        formData.append("certificate", file);

        try {
            setLoading(true);
            setMessage("");

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/upload-webinar-certificate`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Upload failed");
            }

            setMessage(data.message || "Certificate uploaded successfully");
            router.push("/certificate-list");

            // Reset state
            setFile(null);
        } catch (error) {
            setMessage(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.heading}>Upload Webinar Certificate</h2>

                <form onSubmit={handleUpload} className={styles.form}>
                    {/* Webinar Dropdown */}
                    <div className={styles.formGroup}>
                        <label>Select Webinar</label>
                        <select
                            value={selectedWebinar}
                            onChange={handleWebinarChange}
                            className={styles.input}
                        >
                            <option value="">-- Select Webinar --</option>
                            {webinars.map((webinar) => (
                                <option key={webinar._id} value={webinar._id}>
                                    {webinar.organisedBy}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* File Upload */}
                    <div className={styles.formGroup}>
                        <label>Upload Certificate (IMAGE 2000px × 1414px)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Existing Certificate Info */}
                    {previewUrl && !file && (
                        <p className={styles.message}>
                            Existing certificate loaded. Upload a new file to replace it.
                        </p>
                    )}

                    {/* PDF Preview */}
                    {previewUrl && (
                        <div className={styles.previewContainer}>
                            <p className={styles.previewTitle}>Preview:</p>
                            <img
                                src={previewUrl}
                                alt="Certificate Preview"
                                className={styles.previewImage}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Certificate"}
                    </button>

                    {message && (
                        <p className={styles.message}>{message}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UploadCertificates;
