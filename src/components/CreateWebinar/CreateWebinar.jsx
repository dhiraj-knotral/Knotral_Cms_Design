"use client"
import React, { useState } from "react";
import styles from "./CreateWebinar.module.css"
import slugify from "slugify";
import { useRouter } from "next/navigation";

const CreateWebinar = () => {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [organisedBy, setOrganisedBy] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [isFree, setIsFree] = useState(true);
    const [isLive, setIsLive] = useState(true);
    const [isCertified, setIsCertified] = useState(false);
    const [isOnDemand, setIsOnDemand] = useState(false);

    const [bonus, setBonus] = useState("");

    const [slug, setSlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);


    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    // For files
    const [logoFile, setLogoFile] = useState(null);
    const [trainerImageFile, setTrainerImageFile] = useState(null);

    // For files
    const [ogImageFile, setOgImageFile] = useState(null);
    const [link, setLink] = useState("");

    const [schemaMarkup, setSchemaMarkup] = useState("");


    const [sessionAgenda, setSessionAgenda] = useState([{ time: "", title: "" },]);

    const [teachersBenefitsFeatures, setTeachersBenefitsFeatures] = useState([""]);

    const [teachersBenefitsWhyNeeded, setTeachersBenefitsWhyNeeded] = useState(["",]);

    const [schoolBenefitsFeatures, setSchoolBenefitsFeatures] = useState([""]);

    const [resellerBenefitsFeatures, setResellerBenefitsFeatures] = useState([""]);

    const [features, setFeatures] = useState([{ feature: "" }]);

    const [attendeeBenefitsFeatures, setAttendeeBenefitsFeatures] = useState([""]);

    const [logoPreview, setLogoPreview] = useState(null);
    const [trainerPreview, setTrainerPreview] = useState(null);

    const [ogImagePreview, setOgImagePreview] = useState(null);

    const handleTitleChange = (value) => {
        setTitle(value);

        // Only auto-update slug if user hasn't manually edited it
        if (!slugEdited) {
            const generatedSlug = slugify(value, { lower: true, strict: true });
            setSlug(generatedSlug);
        }
    };


    const addAgendaItem = () => {
        setSessionAgenda([
            ...sessionAgenda,
            { time: "", title: "" },
        ]);
    };

    const removeAgendaItem = (index) => {
        setSessionAgenda(sessionAgenda.filter((_, i) => i !== index));
    };

    const handleAgendaChange = (index, field, value) => {
        const updated = [...sessionAgenda];
        updated[index][field] = value;
        setSessionAgenda(updated);
    };

    const handleFeatureChange = (index, value) => {
        const updated = [...teachersBenefitsFeatures];
        updated[index] = value;
        setTeachersBenefitsFeatures(updated);
    };

    const addFeature = () => {
        setTeachersBenefitsFeatures([...teachersBenefitsFeatures, ""]);
    };

    const removeFeature = (index) => {
        const updated = teachersBenefitsFeatures.filter((_, i) => i !== index);
        setTeachersBenefitsFeatures(updated);
    };

    const addWhyNeeded = () => {
        setTeachersBenefitsWhyNeeded([...teachersBenefitsWhyNeeded, ""]);
    };

    const removeWhyNeeded = (index) => {
        setTeachersBenefitsWhyNeeded(
            teachersBenefitsWhyNeeded.filter((_, i) => i !== index)
        );
    };

    const handleWhyNeededChange = (index, value) => {
        const updated = [...teachersBenefitsWhyNeeded];
        updated[index] = value;
        setTeachersBenefitsWhyNeeded(updated);
    };


    const addSchoolFeature = () => {
        setSchoolBenefitsFeatures([...schoolBenefitsFeatures, ""]);
    };

    const removeSchoolFeature = (index) => {
        setSchoolBenefitsFeatures(
            schoolBenefitsFeatures.filter((_, i) => i !== index)
        );
    };

    const handleSchoolFeatureChange = (index, value) => {
        const updated = [...schoolBenefitsFeatures];
        updated[index] = value;
        setSchoolBenefitsFeatures(updated);
    };

    const addResellerFeature = () => {
        setResellerBenefitsFeatures([...resellerBenefitsFeatures, ""]);
    };

    const removeResellerFeature = (index) => {
        setResellerBenefitsFeatures(
            resellerBenefitsFeatures.filter((_, i) => i !== index)
        );
    };

    const handleResellerFeatureChange = (index, value) => {
        const updated = [...resellerBenefitsFeatures];
        updated[index] = value;
        setResellerBenefitsFeatures(updated);
    };

    const addWebinarFeature = () => {
        setFeatures([...features, { feature: "" }]);
    };

    const removeWebinarFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleWebinarFeatureChange = (index, value) => {
        const updated = [...features];
        updated[index].feature = value;
        setFeatures(updated);
    };

    const addAttendeeBenefit = () => {
        setAttendeeBenefitsFeatures([...attendeeBenefitsFeatures, ""]);
    };

    const removeAttendeeBenefit = (index) => {
        setAttendeeBenefitsFeatures(
            attendeeBenefitsFeatures.filter((_, i) => i !== index)
        );
    };

    const handleAttendeeBenefitChange = (index, value) => {
        const updated = [...attendeeBenefitsFeatures];
        updated[index] = value;
        setAttendeeBenefitsFeatures(updated);
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!["image/png", "image/jpeg"].includes(file.type)) {
            alert("Only PNG or JPG allowed");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image must be under 2MB");
            return;
        }

        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    // Trainer info
    const [trainers, setTrainers] = useState([
        {
            name: "",
            designation: "",
            worksAt: "",
            description: "",
            imageFile: null,
            preview: null,
        },
    ]);

    const handleOgImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setOgImageFile(file);
        setOgImagePreview(URL.createObjectURL(file));
    };

    const addTrainer = () => {
        setTrainers([
            ...trainers,
            {
                name: "",
                designation: "",
                worksAt: "",
                description: "",
                imageFile: null,
                preview: null,
            },
        ]);
    };

    const removeTrainer = (index) => {
        if (trainers.length === 1) return;
        setTrainers(trainers.filter((_, i) => i !== index));
    };

    const updateTrainer = (index, field, value) => {
        const updated = [...trainers];
        updated[index][field] = value;
        setTrainers(updated);
    };

    const handleTrainerImageChange = (index, file) => {
        if (!file) return;

        const updated = [...trainers];
        updated[index].imageFile = file;
        updated[index].preview = URL.createObjectURL(file);
        setTrainers(updated);
    };

    const removeTrainerImage = (index) => {
        const updated = [...trainers];
        updated[index].imageFile = null;
        updated[index].preview = null;
        setTrainers(updated);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        let durationValue = Number(duration); // e.g., 60 from input
        let durationToStore;

        if (durationValue >= 60) {
            const hours = Math.floor(durationValue / 60);
            const minutes = durationValue % 60;
            durationToStore = minutes === 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
        } else {
            durationToStore = `${durationValue} minutes`;
        }

        const formatTimeTo12Hour = (time24) => {
            if (!time24) return "";
            const [hourStr, minute] = time24.split(":");
            let hour = Number(hourStr);
            const ampm = hour >= 12 ? "PM" : "AM";
            hour = hour % 12 || 12; // Convert 0 -> 12
            return `${hour}:${minute} ${ampm} IST`;
        };

        const formattedStartTime = formatTimeTo12Hour(startTime);

        const cleanedSchemaMarkup = schemaMarkup?.trim();

        try {
            // Step 1: Create webinar
            const webinarPayload = {
                title,
                slug,
                description,
                organisedBy,
                category,
                date,
                mode: "Virtual Webinar",
                startTime: formattedStartTime,
                duration: durationToStore,
                price,
                isFree,
                isLive,
                link,
                isCertified,
                bonus: {
                    title: bonus,
                },
                isOnDemand,
                features: features.map(f => ({ feature: f.feature })),
                sessionAgenda,
                teachersBenifits: {
                    features: teachersBenefitsFeatures.filter(Boolean),
                    whyNeeded: teachersBenefitsWhyNeeded.filter(Boolean)
                },
                schoolBenifits: { features: schoolBenefitsFeatures.filter(Boolean), whyNeeded: [] },
                resellerBenifits: { features: resellerBenefitsFeatures.filter(Boolean), whyNeeded: [] },
                attendeeBenefits: {
                    title: "Key Takeaways",
                    features: attendeeBenefitsFeatures.filter(Boolean),
                },

                //meta tags
                metaTitle,
                metaDescription,
                schemaMarkup: cleanedSchemaMarkup

            };

            console.log(webinarPayload)

            const createRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/create-webinar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(webinarPayload)
            });

            const webinarData = await createRes.json();
            if (!createRes.ok) throw new Error(webinarData.message || "Error creating webinar");

            // console.log("webinar data", webinarData)

            const webinarId = webinarData.response._id; // make sure your API returns webinar id

            // console.log("webinar Id", webinarId)

            if (logoFile) {
                const fdLogo = new FormData();
                fdLogo.append("id", webinarId);
                fdLogo.append("logo", logoFile); // key matches backend

                const logoRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/upload-webinar-logo`, {
                    method: "POST",
                    body: fdLogo, // do not set headers
                });

                const logoData = await logoRes.json();
                if (!logoRes.ok) throw new Error(logoData.message || "Logo upload failed");
            }

            if (ogImageFile) {
                const fdOg = new FormData();
                fdOg.append("id", webinarId);
                fdOg.append("ogImage", ogImageFile); // ⚠️ key must match multer field name

                const ogRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/upload-webinar-og`,
                    {
                        method: "POST",
                        body: fdOg, // DO NOT set headers
                    }
                );

                const ogData = await ogRes.json();
                if (!ogRes.ok) {
                    throw new Error(ogData.message || "OG image upload failed");
                }
            }

            // Upload trainer
            for (const trainer of trainers) {
                const { name, designation, worksAt, description, imageFile } = trainer;

                // basic validation
                if (!name || !designation || !worksAt) continue;

                const fdTrainer = new FormData();
                fdTrainer.append("webinarId", webinarId);
                fdTrainer.append("trainerName", name);
                fdTrainer.append("designation", designation);
                fdTrainer.append("worksAt", worksAt);
                fdTrainer.append("description", description || "");

                if (imageFile) {
                    fdTrainer.append("trainerImage", imageFile, imageFile.name); // ✅ filename is important
                }

                const trainerRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/add-trainer`,
                    {
                        method: "POST",
                        body: fdTrainer, // ❌ do NOT set headers
                    }
                );

                const trainerData = await trainerRes.json();

                if (!trainerRes.ok) {
                    throw new Error(trainerData.message || "Trainer upload failed");
                }
            }


            // Redirect to webinar list
            router.push("/webinar-list");


        } catch (error) {
            console.error(error);
            alert(error.message || "Something went wrong");
        }
    };

    const handleCancel = () => {
        // Reset all states
        setTitle("");
        setSlug("");
        setDescription("");
        setOrganisedBy("");
        setCategory("");
        setDate("");
        setStartTime("");
        setDuration("");
        setPrice("");
        setIsFree(true);
        setIsLive(true);
        setIsCertified(false);
        setIsOnDemand(false);
        setBonus("");
        setLink("");
        setFeatures([{ feature: "" }]);
        setSessionAgenda([{ time: "", title: "" }]);
        setTeachersBenefitsFeatures([""]);
        setTeachersBenefitsWhyNeeded([""]);
        setSchoolBenefitsFeatures([""]);
        setResellerBenefitsFeatures([""]);
        setAttendeeBenefitsFeatures([""]);
        setMetaTitle("");
        setMetaDescription("");
        setSchemaMarkup("");
        setLogoFile(null);
        setOgImageFile(null);
        setLogoPreview(null);
        setTrainerPreview(null);
        setOgImagePreview(null);
        // ✅ Reset trainers
        setTrainers([
            {
                trainerName: "",
                trainerDesignation: "",
                trainerWorksAt: "",
                trainerDescription: "",
                trainerImageFile: null,
                trainerPreview: null,
            },
        ]);

    };


    return (
        <div className={styles.contentarea}>
            {/* Page Header */}
            <div className={styles.pageheader}>
                <div>
                    <div className={styles.breadcrumb}>
                        <a href="/dashboard">Dashboard</a> /{" "}
                        <a href="/webinar-list">Webinars</a> / Add New
                    </div>
                    {/* <h1 className={styles.pagetitle}>Add New Webinar</h1> */}
                </div>
            </div>

            <form id="webinarForm" onSubmit={handleSubmit}>
                <div className={styles.formcontainer}>
                    {/* Main Form */}
                    <div className={styles.mainform}>
                        {/* Basic Information */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Basic Information</h2>

                            <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>Webinar Title</label>
                                <input
                                    type="text"
                                    className={styles.forminput}
                                    placeholder="e.g., AI in IB Mathematics"
                                    value={title}
                                    onChange={(e) => handleTitleChange(e.target.value)} // use custom handler
                                    required
                                />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>Description</label>
                                <textarea
                                    className={styles.formtextarea}
                                    placeholder="Brief summary for webinar..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            {/* <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>Full Description</label>
                                <textarea
                                    className={styles.formtextarea}
                                    style={{ minHeight: "200px" }}
                                    placeholder="Detailed description..."
                                    required
                                />
                            </div> */}

                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Category</label>
                                    <select className={styles.formselect}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Category</option>
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

                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Solution Provider</label>
                                    <input
                                        type="text"
                                        className={styles.forminput}
                                        placeholder="e.g., EdShed, Matific"
                                        name="solutionProvider"
                                        value={organisedBy}
                                        onChange={(e) => setOrganisedBy(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* <div className={styles.formgroup}>
                                <label className={styles.formlabel}>
                                    Tags (Press Enter to add)
                                </label>

                                <div className={styles.tagscontainer} id="tagsContainer">
                                    <div className={styles.tag}>
                                        IB
                                        <span className={styles.tagremove}>×</span>
                                    </div>

                                    <div className={styles.tag}>
                                        Mathematics
                                        <span className={styles.tagremove}>×</span>
                                    </div>

                                    <input
                                        type="text"
                                        className={styles.taginput}
                                        placeholder="Add tag..."
                                    />
                                </div>

                                <p className={styles.formhelp}>
                                    Add relevant tags for better searchability
                                </p>
                            </div> */}

                        </div>

                        {/* Schedule */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Schedule & Registration</h2>

                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Date</label>
                                    <input type="date" className={styles.forminput}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required />
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Time (IST)</label>
                                    <input type="time" className={styles.forminput}
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Duration (minutes)</label>
                                    <input type="number" className={styles.forminput} required placeholder="e.g., 60"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    />
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Max Participants</label>
                                    <input type="number" className={styles.forminput} placeholder="Leave empty for unlimited" />
                                </div>
                            </div>

                            {/* Registration Type */}
                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>
                                        Registration Type
                                    </label>
                                    <select
                                        className={styles.formselect}
                                        value={isFree ? "free" : "paid"}
                                        onChange={(e) => setIsFree(e.target.value === "free")}
                                        required
                                    >
                                        <option value="free">Free</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>
                                        Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        className={styles.forminput}
                                        placeholder="e.g., 999"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <p className={styles.formhelp}>
                                        Leave empty if free
                                    </p>
                                </div>
                            </div>

                            {/* Session Link */}
                            {/* <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>
                                    Session Link / Platform
                                </label>
                                <input
                                    type="url"
                                    className={styles.forminput}
                                    placeholder="Zoom / Google Meet link"
                                    required
                                />
                                <p className={styles.formhelp}>
                                    Participants will receive this link upon registration
                                </p>
                            </div> */}
                        </div>


                        {/* Webinar Features */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Webinar Features</h2>

                            {features.map((item, index) => (
                                <div className={styles.card} key={index}>
                                    <input
                                        type="text"
                                        className={styles.forminput}
                                        placeholder={`Feature ${index + 1}`}
                                        value={item.feature}
                                        onChange={(e) =>
                                            handleWebinarFeatureChange(index, e.target.value)
                                        }
                                    />

                                    {features.length > 1 && (
                                        <button
                                            type="button"
                                            className={styles.btnremove}
                                            onClick={() => removeWebinarFeature(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                className={`${styles.btn} ${styles.uploadbtn}`}
                                onClick={addWebinarFeature}
                            >
                                Add Feature
                            </button>

                            <p className={styles.formhelp}>
                                Example: Live Q&A, Downloadable resources, Certificate of completion
                            </p>
                        </div>


                        {/* Session Agenda */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Session Agenda</h2>

                            {sessionAgenda.map((item, index) => (
                                <div className={styles.card} key={index}>
                                    <div className={styles.formgroup}>
                                        <label className={styles.formlabel}>Time</label>
                                        <input
                                            type="text"
                                            className={styles.forminput}
                                            placeholder="e.g., 10:00 – 10:15"
                                            value={item.time}
                                            onChange={(e) =>
                                                handleAgendaChange(index, "time", e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className={styles.formgroup}>
                                        <label className={styles.formlabel}>Agenda Title</label>
                                        <input
                                            type="text"
                                            className={styles.forminput}
                                            placeholder="e.g., Introduction & Objectives"
                                            value={item.title}
                                            onChange={(e) =>
                                                handleAgendaChange(index, "title", e.target.value)
                                            }
                                        />
                                    </div>

                                    {sessionAgenda.length > 1 && (
                                        <button
                                            type="button"
                                            className={styles.btnremove}
                                            onClick={() => removeAgendaItem(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                className={`${styles.btn} ${styles.uploadbtn}`}
                                onClick={addAgendaItem}
                            >
                                Add Agenda Item
                            </button>
                        </div>

                        {/* Target Audience*/}
                        {/* <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Target Audience</h2>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Grade Levels</label>

                                <div className={styles.checkboxgroup}>
                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="early-years" name="grades" value="early-years" />
                                        <label htmlFor="early-years">Early Years (Pre-K to K)</label>
                                    </div>

                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="primary" name="grades" value="primary" />
                                        <label htmlFor="primary">Primary (Grades 1–5)</label>
                                    </div>

                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="middle" name="grades" value="middle" />
                                        <label htmlFor="middle">Middle School (Grades 6–8)</label>
                                    </div>

                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="high" name="grades" value="high" />
                                        <label htmlFor="high">High School (Grades 9–12)</label>
                                    </div>

                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="all-grades" name="grades" value="all" />
                                        <label htmlFor="all-grades">All Grade Levels</label>
                                    </div>
                                </div>
                            </div> */}

                        {/* <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Suitable For</label>

                                <div className={styles.checkboxgroup}>
                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="teachers" name="audience" value="teachers" />
                                        <label htmlFor="teachers">Teachers</label>
                                    </div>

                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="coordinators" name="audience" value="coordinators" />
                                        <label htmlFor="coordinators">Coordinators</label>
                                    </div>

                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="principals" name="audience" value="principals" />
                                        <label htmlFor="principals">Principals</label>
                                    </div>

                                    <div className={styles.checkboxitem}>
                                        <input type="checkbox" id="parents" name="audience" value="parents" />
                                        <label htmlFor="parents">Parents</label>
                                    </div>
                                </div>
                            </div> */}
                        {/* </div> */}

                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Webinar Benefits</h2>

                            {/* Teachers Benefits */}
                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Teachers Benefits</label>
                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Features</label>

                                    {teachersBenefitsFeatures.map((feature, index) => (
                                        <div className={styles.card} key={index}>
                                            <input
                                                type="text"
                                                className={styles.forminput}
                                                placeholder={`Feature ${index + 1}`}
                                                value={feature}
                                                onChange={(e) =>
                                                    handleFeatureChange(index, e.target.value)
                                                }
                                            />

                                            {teachersBenefitsFeatures.length > 1 && (
                                                <button
                                                    type="button"
                                                    className={styles.btnremove}
                                                    onClick={() => removeFeature(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className={`${styles.btn} ${styles.uploadbtn}`}
                                        onClick={addFeature}
                                    >
                                        Add Feature
                                    </button>

                                    <p className={styles.formhelp}>
                                        Example: Gain insights, Improve teaching skills
                                    </p>
                                </div>


                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Why Needed</label>
                                    {teachersBenefitsWhyNeeded.map((reason, index) => (
                                        <div className={styles.card} key={index}>
                                            <input
                                                type="text"
                                                className={styles.forminput}
                                                placeholder={`Reason ${index + 1}`}
                                                value={reason}
                                                onChange={(e) =>
                                                    handleWhyNeededChange(index, e.target.value)
                                                }
                                            />

                                            {teachersBenefitsWhyNeeded.length > 1 && (
                                                <button
                                                    type="button"
                                                    className={styles.btnremove}
                                                    onClick={() => removeWhyNeeded(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className={`${styles.btn} ${styles.uploadbtn}`}
                                        onClick={addWhyNeeded}
                                    >
                                        Add Reason
                                    </button>

                                    <p className={styles.formhelp}>
                                        Example: To enhance classroom performance, To support professional growth
                                    </p>
                                </div>
                            </div>

                            {/* School Benefits */}
                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>School Benefits</label>
                                {schoolBenefitsFeatures.map((feature, index) => (
                                    <div className={styles.card} key={index}>
                                        <input
                                            type="text"
                                            className={styles.forminput}
                                            placeholder={`Benefit ${index + 1}`}
                                            value={feature}
                                            onChange={(e) =>
                                                handleSchoolFeatureChange(index, e.target.value)
                                            }
                                        />

                                        {schoolBenefitsFeatures.length > 1 && (
                                            <button
                                                type="button"
                                                className={styles.btnremove}
                                                onClick={() => removeSchoolFeature(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className={`${styles.btn} ${styles.uploadbtn}`}
                                    onClick={addSchoolFeature}
                                >
                                    Add Benefit
                                </button>

                                <p className={styles.formhelp}>
                                    Example: Improved institutional performance, Better teacher engagement
                                </p>
                            </div>

                            {/* Reseller Benefits */}
                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Reseller Benefits</label>

                                {resellerBenefitsFeatures.map((feature, index) => (
                                    <div className={styles.card} key={index}>
                                        <input
                                            type="text"
                                            className={styles.forminput}
                                            placeholder={`Benefit ${index + 1}`}
                                            value={feature}
                                            onChange={(e) =>
                                                handleResellerFeatureChange(index, e.target.value)
                                            }
                                        />

                                        {resellerBenefitsFeatures.length > 1 && (
                                            <button
                                                type="button"
                                                className={styles.btnremove}
                                                onClick={() => removeResellerFeature(index)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className={`${styles.btn} ${styles.uploadbtn}`}
                                    onClick={addResellerFeature}
                                >
                                    Add Benefit
                                </button>

                                <p className={styles.formhelp}>
                                    Example: New revenue opportunities, Expanded market reach
                                </p>
                            </div>

                            {/* Attendee Benefits */}
                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Attendee Benefits</label>

                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Title</label>
                                    <input
                                        type="text"
                                        className={styles.forminput}
                                        value="Key Takeaways"
                                        disabled
                                    />
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Features</label>
                                    {attendeeBenefitsFeatures.map((feature, index) => (
                                        <div className={styles.card} key={index}>
                                            <input
                                                type="text"
                                                className={styles.forminput}
                                                placeholder={`Takeaway ${index + 1}`}
                                                value={feature}
                                                onChange={(e) =>
                                                    handleAttendeeBenefitChange(index, e.target.value)
                                                }
                                            />

                                            {attendeeBenefitsFeatures.length > 1 && (
                                                <button
                                                    type="button"
                                                    className={styles.btnremove}
                                                    onClick={() => removeAttendeeBenefit(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className={`${styles.btn} ${styles.uploadbtn}`}
                                        onClick={addAttendeeBenefit}
                                    >
                                        Add Takeaway
                                    </button>

                                    <p className={styles.formhelp}>
                                        Example: Gain insights, Improve skills, Certification
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Media & Resources */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Media & Resources</h2>

                            <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>
                                    Webinar Logo
                                </label>

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    id="webinarLogoInput"
                                    style={{ display: "none" }}
                                    onChange={handleLogoChange}
                                />

                                {/* Upload UI */}
                                <div
                                    className={styles.imageupload}
                                    onClick={() =>
                                        document.getElementById("webinarLogoInput").click()
                                    }
                                    style={{ position: "relative" }}
                                >
                                    {logoPreview ? (
                                        <>
                                            <img
                                                src={logoPreview}
                                                alt="Webinar Logo"
                                                className={styles.previewImage}
                                            />

                                            {/* ❌ Cancel button */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // prevent file dialog
                                                    setLogoFile(null);
                                                    setLogoPreview(null);

                                                    // reset file input (important!)
                                                    document.getElementById("webinarLogoInput").value = "";
                                                }}
                                                style={{
                                                    position: "absolute",
                                                    top: "6px",
                                                    right: "6px",
                                                    width: "24px",
                                                    height: "24px",
                                                    borderRadius: "50%",
                                                    border: "none",
                                                    background: "rgba(0,0,0,0.6)",
                                                    color: "#fff",
                                                    fontSize: "16px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                ×
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.uploadicon}>🖼️</div>
                                            <div className={styles.uploadtext}>
                                                Click to upload or drag and drop
                                            </div>
                                            <div
                                                className={styles.uploadtext}
                                                style={{ fontSize: "0.85rem" }}
                                            >
                                                PNG, JPG up to 2MB (1200x600px recommended)
                                            </div>
                                            <div style={{ marginTop: "1rem" }}>
                                                <span className={styles.uploadbtn}>
                                                    Choose File
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>


                            {/* <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Promotional Video URL</label>
                                <input
                                    type="url"
                                    className={styles.forminput}
                                    placeholder="YouTube or Vimeo URL"
                                />
                                <p className={styles.formhelp}>
                                    Optional: Add a promotional video
                                </p>
                            </div> */}

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Knotral Link For Webinar</label>
                                <input
                                    type="url"
                                    className={styles.forminput}
                                    placeholder="https://knotral.com/johnnie-max"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                                {/* <p className={styles.formhelp}>
                                    Optional: Add a promotional video
                                </p> */}
                            </div>

                            {/* <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Downloadable Resources</label>

                                <div className={styles.imageupload}>
                                    <div className={styles.uploadicon}>📄</div>
                                    <div className={styles.uploadtext}>
                                        Upload PDFs, presentations, or other materials
                                    </div>
                                    <div style={{ marginTop: "1rem" }}>
                                        <span className={styles.uploadbtn}>Upload Files</span>
                                    </div>
                                </div>

                                <p className={styles.formhelp}>
                                    These will be available to registered participants
                                </p>
                            </div> */}
                        </div>

                        {/* Instructor Information */}
                        {trainers.map((trainer, index) => (
                            <div className={styles.formsection} key={index}>
                                <h2 className={styles.sectiontitle}>
                                    Instructor Information {trainers.length > 1 && `(${index + 1})`}
                                </h2>

                                <div className={styles.formrow}>
                                    <div className={styles.formgroup}>
                                        <label className={`${styles.formlabel} ${styles.required}`}>
                                            Instructor Name
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.forminput}
                                            placeholder="Full name"
                                            value={trainer.name}
                                            onChange={(e) =>
                                                updateTrainer(index, "name", e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className={styles.formgroup}>
                                        <label className={`${styles.formlabel} ${styles.required}`}>
                                            Instructor Title
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.forminput}
                                            placeholder="e.g., Senior Math Educator"
                                            value={trainer.designation}
                                            onChange={(e) =>
                                                updateTrainer(index, "designation", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>
                                        Instructor Works At
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.forminput}
                                        placeholder="e.g., India Market Entry"
                                        value={trainer.worksAt}
                                        onChange={(e) =>
                                            updateTrainer(index, "worksAt", e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Instructor Bio</label>
                                    <textarea
                                        className={styles.formtextarea}
                                        placeholder="Brief biography..."
                                        value={trainer.description}
                                        onChange={(e) =>
                                            updateTrainer(index, "description", e.target.value)
                                        }
                                    />
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Instructor Photo</label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        id={`trainerImageInput-${index}`}
                                        style={{ display: "none" }}
                                        onChange={(e) =>
                                            handleTrainerImageChange(index, e.target.files[0])
                                        }
                                    />

                                    <div
                                        className={styles.imageupload}
                                        onClick={() =>
                                            document.getElementById(`trainerImageInput-${index}`).click()
                                        }
                                        style={{ position: "relative" }}
                                    >
                                        {trainer.preview ? (
                                            <>
                                                <img
                                                    src={trainer.preview}
                                                    alt="Instructor"
                                                    className={styles.previewImage}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeTrainerImage(index);
                                                        document.getElementById(
                                                            `trainerImageInput-${index}`
                                                        ).value = "";
                                                    }}
                                                    style={{
                                                        position: "absolute",
                                                        top: "6px",
                                                        right: "6px",
                                                        width: "24px",
                                                        height: "24px",
                                                        borderRadius: "50%",
                                                        border: "none",
                                                        background: "rgba(0,0,0,0.6)",
                                                        color: "#fff",
                                                        fontSize: "16px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles.uploadicon}>👤</div>
                                                <div className={styles.uploadtext}>
                                                    Upload instructor photo
                                                </div>
                                                <div style={{ marginTop: "1rem" }}>
                                                    <span className={styles.uploadbtn}>Choose File</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {trainers.length > 1 && (
                                    <button
                                        type="button"
                                        className={styles.btnremove}
                                        onClick={() => removeTrainer(index)}
                                    >
                                        Remove Instructor
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            className={`${styles.btn} ${styles.uploadbtn}`}
                            onClick={addTrainer}
                            style={{ marginLeft: "30px" }}
                        >
                            Add Instructor
                        </button>


                        {/* Certificate & CPD */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Certificate & CPD</h2>

                            <div className={styles.formgroup}>
                                <div className={styles.checkboxitem}>
                                    <input
                                        type="checkbox"
                                        id="certificate"
                                        name="certificate"
                                        checked={isCertified}
                                        onChange={(e) => setIsCertified(e.target.checked)}
                                    />
                                    <label htmlFor="certificate">
                                        Issue Certificate of Participation
                                    </label>
                                </div>
                            </div>

                            {/* <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>CPD Hours</label>
                                    <input
                                        type="number"
                                        className={styles.forminput}
                                        placeholder="e.g., 1.5"
                                        step="0.5"
                                    />
                                    <p className={styles.formhelp}>
                                        Professional development hours awarded
                                    </p>
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Certification Type</label>
                                    <select className={styles.formselect}>
                                        <option value="participation">Participation</option>
                                        <option value="completion">
                                            Completion with Assessment
                                        </option>
                                        <option value="professional">
                                            Professional Certification
                                        </option>
                                    </select>
                                </div>
                            </div> */}
                        </div>

                        {/* Actions */}
                        <div className={styles.formactions}>
                            <button type="submit" className={`${styles.btn} ${styles.btnprimary}`}>
                                Publish Webinar
                            </button>
                            {/* <button type="button" className={`${styles.btn} ${styles.btnsecondary}`}>
                                Save as Draft
                            </button> */}
                            {/* <button type="button"
                                className={`${styles.btn} ${styles.btnoutline}`}
                            >
                                Preview
                            </button> */}

                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnoutline}`}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebarpanel}>
                        {/* <div className={styles.panelcard}>
                            <h3 className={styles.paneltitle}>Status</h3>
                            <div className={styles.statusindicator}>
                                <div className={`${styles.statusdot} ${styles.draft}`}></div>
                                <span>Draft</span>
                            </div>
                        </div> */}

                        {/* <div className={styles.formgroup}>
                            <label className={styles.formlabel}>Visibility</label>
                            <select className={styles.formselect}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="schools-only">Schools Only</option>
                            </select>
                        </div> */}

                        {/* <div className={styles.panelcard}>
                            <h3 className={styles.paneltitle}>Quick Schedule</h3>
                            <div className={styles.scheduleoptions}>
                                <div className={styles.scheduleoption}>
                                    <div className={styles.scheduleicon}>📅</div>
                                    <div>Schedule</div>
                                </div>

                                <div className={`${styles.scheduleoption} ${styles.active}`}>
                                    <div className={styles.scheduleicon}>✏️</div>
                                    <div>Draft</div>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className={styles.panelcard}>
                            <h3 className={styles.paneltitle}>Notifications</h3>
                            <div className={styles.checkboxgroup}>
                                <div className={styles.checkboxitem}>
                                    <input type="checkbox" id="notify-all" defaultChecked />
                                    <label htmlFor="notify-all">Notify all users</label>
                                </div>

                                <div className={styles.checkboxitem}>
                                    <input type="checkbox" id="notify-category" defaultChecked />
                                    <label htmlFor="notify-category">Notify category followers</label>
                                </div>

                                <div className={styles.checkboxitem}>
                                    <input type="checkbox" id="notify-provider" />
                                    <label htmlFor="notify-provider">Notify provider followers</label>
                                </div>
                            </div>
                        </div> */}

                        <div className={styles.panelcard}>
                            <h3 className={styles.paneltitle}>SEO</h3>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Meta Title</label>
                                <input
                                    type="text"
                                    className={styles.forminput}
                                    placeholder="SEO title..."
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Meta Description</label>
                                <textarea
                                    className={styles.formtextarea}
                                    placeholder="SEO description..."
                                    style={{ minHeight: "80px" }}
                                    maxLength={160}
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                />
                                <p className={styles.formhelp}>Max 160 characters</p>
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Meta Schema (JSON-LD)</label>
                                <textarea
                                    className={styles.formtextarea}
                                    placeholder='Paste JSON-LD schema here...'
                                    style={{ minHeight: "200px", fontFamily: "monospace" }}
                                    value={schemaMarkup}
                                    onChange={(e) => setSchemaMarkup(e.target.value)}
                                />
                                <p className={styles.formhelp}>
                                    Paste valid JSON-LD schema markup
                                </p>
                            </div>

                            <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>
                                    OG Image
                                </label>

                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    id="ogImageInput"
                                    style={{ display: "none" }}
                                    onChange={handleOgImageChange}
                                />

                                {/* Upload UI */}
                                <div
                                    className={styles.imageupload}
                                    onClick={() => document.getElementById("ogImageInput").click()}
                                    style={{ position: "relative" }}
                                >
                                    {ogImagePreview ? (
                                        <>
                                            <img
                                                src={ogImagePreview}
                                                alt="OG Image"
                                                className={styles.previewImage}
                                            />
                                            {/* Cancel button */}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent opening file dialog
                                                    setOgImageFile(null);
                                                    setOgImagePreview(null);
                                                }}
                                                style={{
                                                    position: "absolute",
                                                    top: "5px",
                                                    right: "5px",
                                                    background: "rgba(0,0,0,0.5)",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "50%",
                                                    width: "24px",
                                                    height: "24px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                ×
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.uploadicon}>🖼️</div>
                                            <div className={styles.uploadtext}>
                                                Click to upload or drag and drop
                                            </div>
                                            <div className={styles.uploadtext} style={{ fontSize: "0.85rem" }}>
                                                PNG, JPG up to 2MB (1200x600px recommended)
                                            </div>
                                            <div style={{ marginTop: "1rem" }}>
                                                <span className={styles.uploadbtn}>Choose File</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>



                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Slug</label>
                                <input
                                    type="text"
                                    className={styles.forminput}
                                    placeholder="url-friendly-slug"
                                    value={slug}
                                    onChange={(e) => {
                                        setSlug(e.target.value); // allow manual editing
                                        setSlugEdited(true);     // mark that user manually edited
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateWebinar;
