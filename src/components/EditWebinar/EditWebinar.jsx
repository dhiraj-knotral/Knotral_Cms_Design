"use client"
import React, { useEffect, useState } from 'react'
import styles from "./EditWebinar.module.css"
import { useRouter } from 'next/navigation';

const EditWebinar = ({ webinar }) => {
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


    // For files
    const [ogImageFile, setOgImageFile] = useState(null);

    const [trainers, setTrainers] = useState([
        {
            trainerId: "",
            trainerName: "",
            designation: "",
            worksAt: "",
            description: "",
            imageFile: null,
            preview: null,
        }
    ]);

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

    const [pastSessions, setPastSessions] = useState([
        { title: "", youtubeUrl: "", date: "" },
    ]);

    //Past Sessions Change
    const handlePastSessionChange = (index, field, value) => {
        setPastSessions(prev =>
            prev.map((session, i) =>
                i === index ? { ...session, [field]: value } : session
            )
        );
    };

    const addPastSession = () => {
        setPastSessions(prev => [
            ...prev,
            { title: "", youtubeUrl: "", date: "" } // new empty session
        ]);
    };

    const removePastSession = (index) => {
        setPastSessions(prev => prev.filter((_, i) => i !== index));
    };

    //Title change
    const handleTitleChange = (value) => {
        setTitle(value);

        // Only auto-update slug if user hasn't manually edited it
        if (!slugEdited) {
            const generatedSlug = slugify(value, { lower: true, strict: true });
            setSlug(generatedSlug);
        }
    };


    //Session Agenda change
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

    //Feature change
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

    //Why Needed change
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


    //School Feature change
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

    //Resellers change
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

    //Webinar Feature
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

    //Attendee Benifir
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

    //Logo
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

    const addTrainer = () => {
    setTrainers([
        ...trainers,
        {
            trainerName: "",
            designation: "",
            worksAt: "",
            description: "",
            trainerImageFile: null,
            trainerPreview: null,
        },
    ]);
};

    //Trainer Image
    const handleTrainerImageChange = (e, index) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const updated = [...trainers];

        // clean old preview if exists
        if (updated[index].trainerPreview) {
            URL.revokeObjectURL(updated[index].trainerPreview);
        }

        updated[index].trainerImageFile = file;
        updated[index].trainerPreview = URL.createObjectURL(file);

        setTrainers(updated);
    };

    const removeTrainerImage = (index) => {
    const updated = [...trainers];

    // cleanup object URL if it exists
    if (updated[index].trainerPreview) {
        URL.revokeObjectURL(updated[index].trainerPreview);
    }

    updated[index].trainerImageFile = null;
    updated[index].trainerPreview = null;

    setTrainers(updated);
};


    //Og Image
    const handleOgImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setOgImageFile(file);
        setOgImagePreview(URL.createObjectURL(file));
    };

    //Time conversion
    const extractMinutes = (duration) => {
        if (!duration) return "";

        const hours = duration.match(/(\d+)\s*hour/)?.[1] || 0;
        const minutes = duration.match(/(\d+)\s*minute/)?.[1] || 0;

        return Number(hours) * 60 + Number(minutes);
    };

    //Time Conversion
    const convertTo24Hour = (time12) => {
        if (!time12) return "";

        const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return "";

        let [, hour, minute, ampm] = match;
        hour = Number(hour);

        if (ampm.toUpperCase() === "PM" && hour !== 12) hour += 12;
        if (ampm.toUpperCase() === "AM" && hour === 12) hour = 0;

        return `${hour.toString().padStart(2, "0")}:${minute}`;
    };


    useEffect(() => {
        if (!webinar) return;

        setTitle(webinar.title || "");
        setDescription(webinar.description || "");
        setOrganisedBy(webinar.organisedBy || "");
        setCategory(webinar.category || "");
        setDate(webinar.date ? webinar.date.split("T")[0] : "");
        setStartTime(convertTo24Hour(webinar.startTime));
        setDuration(extractMinutes(webinar.duration));
        setPrice(webinar.price || "");
        setIsFree(webinar.isFree ?? true);
        setIsLive(webinar.isLive ?? false);
        setIsCertified(webinar.isCertified ?? false);
        setIsOnDemand(webinar.isOnDemand ?? false);

        setBonus(webinar.bonus?.title || "");

        setSlug(webinar.slug || "");
        setSlugEdited(true); // IMPORTANT: prevent auto-regeneration

        setMetaTitle(webinar.metaTitle || "");
        setMetaDescription(webinar.metaDescription || "");
        setSchemaMarkup(webinar.schemaMarkup || "");

         // Images (preview only)
        setLogoPreview(webinar.logo?.url || null);
        setOgImagePreview(webinar.ogImage?.url || null);

        if (!webinar?.trainer?.length) return;

        setTrainers(
            webinar.trainer.map(t => ({
                trainerId: t._id || "",
                trainerName: t.trainerName || "",
                designation: t.designation || "",
                worksAt: t.worksAt || "",
                description: t.description || "",
                imageFile: null,
                trainerPreview: t.trainerImage?.url || null,
            }))
        );


        // Links
        setLink(webinar.link || "");

        // Arrays
        setSessionAgenda(webinar.sessionAgenda?.length ? webinar.sessionAgenda : [{ time: "", title: "" }]);

        setTeachersBenefitsFeatures(
            webinar.teachersBenifits?.features?.length
                ? webinar.teachersBenifits.features
                : [""]
        );

        setTeachersBenefitsWhyNeeded(
            webinar.teachersBenifits?.whyNeeded?.length
                ? webinar.teachersBenifits.whyNeeded
                : [""]
        );

        setSchoolBenefitsFeatures(
            webinar.schoolBenifits?.features?.length
                ? webinar.schoolBenifits.features
                : [""]
        );

        setResellerBenefitsFeatures(
            webinar.resellerBenifits?.features?.length
                ? webinar.resellerBenifits.features
                : [""]
        );

        setFeatures(
            webinar.features?.length
                ? webinar.features.map(f => ({ feature: f.feature }))
                : [{ feature: "" }]
        );

        setAttendeeBenefitsFeatures(
            webinar.attendeeBenefits?.features?.length
                ? webinar.attendeeBenefits.features
                : [""]
        );

        if (!webinar?.pastSessions?.length) return;

        const sessions = webinar.pastSessions.map(session => ({
            title: session.title || "",
            youtubeUrl: session.youtubeId ? `https://www.youtube.com/watch?v=${session.youtubeId}` : "",
            date: session.date ? session.date.split("T")[0] : "",
        }));

        setPastSessions(sessions);

    }, [webinar]);


    // console.log("trainerId data",trainerId)

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

        // const cleanedSchemaMarkup = schemaMarkup?.trim();

        try {
            // Step 1: Update webinar
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
                schemaMarkup

            };

            const updateRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/update-webinar`,
                {
                    method: "PUT", // or POST if backend expects POST
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        webinarId: webinar._id,
                        ...webinarPayload,
                    }),
                }
            );



            const webinarData = await updateRes.json();
            if (!updateRes.ok) throw new Error(webinarData.message || "Error creating webinar");

            const webinarId = webinar._id; // make sure your API returns webinar id

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

            // Upload trainer
            for (const trainer of trainers) {
                if (!trainer.trainerName && !trainer.designation && !trainer.worksAt) continue;

                const fdTrainer = new FormData();
                fdTrainer.append("webinarId", webinarId);
                if (trainer.trainerId) fdTrainer.append("trainerId", trainer.trainerId);
                fdTrainer.append("trainerName", trainer.trainerName);
                fdTrainer.append("designation", trainer.designation);
                fdTrainer.append("worksAt", trainer.worksAt);
                fdTrainer.append("description", trainer.description);
                if (trainer.imageFile) fdTrainer.append("image", trainer.imageFile);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/update-trainer`,
                    {
                        method: "POST",
                        body: fdTrainer,
                    }
                );

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Trainer update failed");
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

            const validPastSessions = pastSessions.filter(
                session =>
                    session.title &&
                    session.youtubeUrl &&
                    session.date
            );

            console.log("Valid Past sessions", validPastSessions)

            const payload = {
                webinarId,
                pastSessions: validPastSessions,
            };

            console.log(payload)

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/webinars/upload-past-sessions`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Redirect to webinar list
            router.push("/webinar-list");


        } catch (error) {
            console.error(error);
            alert(error.message || "Something went wrong");
        }
    };

    const handleCancel = () => {
        if (!webinar) return; // no data, maybe create mode

        // Revert all fields to webinar's original values
        setTitle(webinar.title || "");
        setDescription(webinar.description || "");
        setOrganisedBy(webinar.organisedBy || "");
        setCategory(webinar.category || "");
        setDate(webinar.date ? webinar.date.split("T")[0] : "");
        setStartTime(convertTo24Hour(webinar.startTime));
        setDuration(extractMinutes(webinar.duration));
        setPrice(webinar.price || "");
        setIsFree(webinar.isFree ?? true);
        setIsLive(webinar.isLive ?? false);
        setIsCertified(webinar.isCertified ?? false);
        setIsOnDemand(webinar.isOnDemand ?? false);

        setBonus(webinar.bonus?.title || "");
        setLink(webinar.link || "");
        setSlug(webinar.slug || "");
        setSlugEdited(true); // prevent slug regeneration

        setFeatures(
            webinar.features?.length ? webinar.features.map(f => ({ feature: f.feature })) : [{ feature: "" }]
        );

        setSessionAgenda(
            webinar.sessionAgenda?.length ? webinar.sessionAgenda : [{ time: "", title: "" }]
        );

        setTeachersBenefitsFeatures(
            webinar.teachersBenifits?.features?.length ? webinar.teachersBenifits.features : [""]
        );

        setTeachersBenefitsWhyNeeded(
            webinar.teachersBenifits?.whyNeeded?.length ? webinar.teachersBenifits.whyNeeded : [""]
        );

        setSchoolBenefitsFeatures(
            webinar.schoolBenifits?.features?.length ? webinar.schoolBenifits.features : [""]
        );

        setResellerBenefitsFeatures(
            webinar.resellerBenifits?.features?.length ? webinar.resellerBenifits.features : [""]
        );

        setAttendeeBenefitsFeatures(
            webinar.attendeeBenefits?.features?.length ? webinar.attendeeBenefits.features : [""]
        );

        setMetaTitle(webinar.metaTitle || "");
        setMetaDescription(webinar.metaDescription || "");
        setSchemaMarkup(webinar.schemaMarkup || "");

        setLogoPreview(webinar.logo?.url || null);
        setTrainerPreview(webinar.trainer?.[0]?.trainerImage?.url || null);
        setOgImagePreview(webinar.ogImage?.url || null);

        const trainer = webinar.trainer?.[0];
        if (trainer) {
            setTrainerName(trainer.trainerName || "");
            setTrainerDesignation(trainer.designation || "");
            setTrainerWorksAt(trainer.worksAt || "");
            setTrainerDescription(trainer.description || "");
        }
    };

    return (
        <div className={styles.contentarea}>
            {/* Page Header */}
            <div className={styles.pageheader}>
                <div>
                    <div className={styles.breadcrumb}>
                        <a href="/dashboard">Dashboard</a> /{" "}
                        <a href="/webinar-list">Webinars</a> / Edit Webinar
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
        document.getElementById("webinarLogoInput")?.click()
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

            {/* cancel icon */}
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    setLogoFile(null);
                    setLogoPreview(null);

                    const input = document.getElementById("webinarLogoInput");
                    if (input) input.value = "";
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
        <div className={styles.uploadtext}>
            Click to upload logo
        </div>
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
                                    Instructor Information {trainers.length > 1 && `#${index + 1}`}
                                </h2>

                                {/* Name + Title */}
                                <div className={styles.formrow}>
                                    <div className={styles.formgroup}>
                                        <label className={`${styles.formlabel} ${styles.required}`}>
                                            Instructor Name
                                        </label>
                                        <input
                                            type="text"
                                            className={styles.forminput}
                                            value={trainer.trainerName}
                                            onChange={(e) => {
                                                const updated = [...trainers];
                                                updated[index].trainerName = e.target.value;
                                                setTrainers(updated);
                                            }}
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
                                            value={trainer.designation}
                                            onChange={(e) => {
                                                const updated = [...trainers];
                                                updated[index].designation = e.target.value;
                                                setTrainers(updated);
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Works At */}
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>
                                        Works At
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.forminput}
                                        value={trainer.worksAt}
                                        onChange={(e) => {
                                            const updated = [...trainers];
                                            updated[index].worksAt = e.target.value;
                                            setTrainers(updated);
                                        }}
                                        required
                                    />
                                </div>

                                {/* Description / Bio */}
                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Instructor Bio</label>
                                    <textarea
                                        className={styles.formtextarea}
                                        rows={4}
                                        value={trainer.description}
                                        onChange={(e) => {
                                            const updated = [...trainers];
                                            updated[index].description = e.target.value;
                                            setTrainers(updated);
                                        }}
                                    />
                                </div>

                                {/* Instructor Image */}
                                {/* Instructor Image */}
                                <div className={styles.formgroup}>
                                    <label className={styles.formlabel}>Instructor Image</label>

                                    {/* hidden file input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id={`trainerImageInput-${index}`}
                                        style={{ display: "none" }}
                                        onChange={(e) => handleTrainerImageChange(e, index)}
                                    />

                                    <div
                                        className={styles.imageupload}
                                        onClick={() =>
                                            document
                                                .getElementById(`trainerImageInput-${index}`)
                                                ?.click()
                                        }
                                        style={{ position: "relative" }}
                                    >
                                        {trainer.trainerPreview ? (
                                            <>
                                                <img
                                                    src={trainer.trainerPreview}
                                                    alt="Instructor"
                                                    className={styles.previewImage}
                                                />

                                                {/* ❌ cancel icon */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeTrainerImage(index);

                                                        const input = document.getElementById(
                                                            `trainerImageInput-${index}`
                                                        );
                                                        if (input) input.value = "";
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
                                            <div className={styles.uploadtext}>
                                                Click to upload image
                                            </div>
                                        )}
                                    </div>
                                </div>


                                {/* Remove Instructor */}
                                {trainers.length > 1 && (
                                    <button
                                        type="button"
                                        className={styles.btnremove}
                                        onClick={() =>
                                            setTrainers(trainers.filter((_, i) => i !== index))
                                        }
                                    >
                                        Remove Instructor
                                    </button>
                                )}
                            </div>
                        ))}

{/* ➕ Add Instructor button */}
<button
    type="button"
    className={`${styles.btn} ${styles.uploadbtn}`}
    style={{ marginLeft: "8px" }}
    onClick={addTrainer}
>
    Add Instructor
</button>


                        {/* Past Sessions */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Past Sessions</h2>

                            {pastSessions.map((session, index) => (
                                <div key={index} className={styles.pastSessionItem}>
                                    <div className={styles.formrow}>
                                        <div className={styles.formgroup}>
                                            <label className={styles.formlabel}>Title</label>
                                            <input
                                                type="text"
                                                className={styles.forminput}
                                                placeholder="Session Title"
                                                value={session.title}
                                                onChange={(e) =>
                                                    handlePastSessionChange(index, "title", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className={styles.formgroup}>
                                            <label className={styles.formlabel}>YouTube URL</label>
                                            <input
                                                type="text"
                                                className={styles.forminput}
                                                placeholder="https://youtube.com/..."
                                                value={session.youtubeUrl}
                                                onChange={(e) =>
                                                    handlePastSessionChange(index, "youtubeUrl", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className={styles.formgroup}>
                                            <label className={styles.formlabel}>Date</label>
                                            <input
                                                type="date"
                                                className={styles.forminput}
                                                value={session.date}
                                                onChange={(e) =>
                                                    handlePastSessionChange(index, "date", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Remove button outside formrow for smaller size */}
                                    <div className={styles.btnContainer}>
                                        <button
                                            type="button"
                                            className={styles.btnremove}
                                            onClick={() => removePastSession(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add new past session */}
                            <button
                                type="button"
                                className={`${styles.btn} ${styles.uploadbtn}`}
                                onClick={addPastSession}
                            >
                                Add Past Session
                            </button>
                        </div>


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
                                Save
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
                                        setSlugEdited(!!webinar?.slug);
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditWebinar
