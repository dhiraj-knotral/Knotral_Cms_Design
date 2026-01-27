import React from "react";
import styles from "./CreateWebinar.module.css"

const CreateWebinar = () => {
    return (
        <div className={styles.contentarea}>
            {/* Page Header */}
            <div className={styles.pageheader}>
                <div>
                    <div className={styles.breadcrumb}>
                        <a href="/cms/dashboard">Dashboard</a> /{" "}
                        <a href="/cms/webinars">Webinars</a> / Add New
                    </div>
                    <h1 className={styles.pagetitle}>Add New Webinar</h1>
                </div>
            </div>

            <form id="webinarForm">
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
                                    required
                                />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>Short Description</label>
                                <textarea
                                    className={styles.formtextarea}
                                    placeholder="Brief summary for listing pages..."
                                    required
                                />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>Full Description</label>
                                <textarea
                                    className={styles.formtextarea}
                                    style={{ minHeight: "200px" }}
                                    placeholder="Detailed description..."
                                    required
                                />
                            </div>

                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Category</label>
                                    <select className={styles.formselect} required>
                                        <option value="">Select Category</option>
                                        <option value="mathematics">Mathematics</option>
                                        <option value="literacy">Literacy</option>
                                        <option value="science">Science</option>
                                        <option value="edtech">EdTech</option>
                                    </select>
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Solution Provider</label>
                                    <select className={styles.formselect} required>
                                        <option value="">Select Provider</option>
                                        <option value="edshed">EdShed</option>
                                        <option value="matific">Matific</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formgroup}>
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
                            </div>

                        </div>

                        {/* Schedule */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Schedule & Registration</h2>

                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Date</label>
                                    <input type="date" className={styles.forminput} required />
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Time (IST)</label>
                                    <input type="time" className={styles.forminput} required />
                                </div>
                            </div>
                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Duration (minutes)</label>
                                    <input type="number" className={styles.forminput} required placeholder="e.g., 60" />
                                </div>

                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>Max Participants</label>
                                    <input type="number" className={styles.forminput} required placeholder="Leave empty for unlimited" />
                                </div>
                            </div>

                            {/* Registration Type */}
                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>
                                        Registration Type
                                    </label>
                                    <select className={styles.formselect} required>
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
                                    />
                                    <p className={styles.formhelp}>
                                        Leave empty if free
                                    </p>
                                </div>
                            </div>

                            {/* Session Link */}
                            <div className={styles.formgroup}>
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
                            </div>
                        </div>

                        {/* Target Audience*/}
                        <div className={styles.formsection}>
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
                            </div>

                            <div className={styles.formgroup}>
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
                            </div>
                        </div>

                        {/* Media & Resources */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Media & Resources</h2>

                            <div className={styles.formgroup}>
                                <label className={`${styles.formlabel} ${styles.required}`}>
                                    Featured Image
                                </label>

                                <div className={styles.imageupload}>
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
                                        <span className={styles.uploadbtn}>Choose File</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Promotional Video URL</label>
                                <input
                                    type="url"
                                    className={styles.forminput}
                                    placeholder="YouTube or Vimeo URL"
                                />
                                <p className={styles.formhelp}>
                                    Optional: Add a promotional video
                                </p>
                            </div>

                            <div className={styles.formgroup}>
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
                            </div>
                        </div>

                        {/* Instructor Information */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Instructor Information</h2>

                            <div className={styles.formrow}>
                                <div className={styles.formgroup}>
                                    <label className={`${styles.formlabel} ${styles.required}`}>
                                        Instructor Name
                                    </label>
                                    <input
                                        type="text"
                                        className={styles.forminput}
                                        placeholder="Full name"
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Instructor Bio</label>
                                <textarea
                                    className={styles.formtextarea}
                                    placeholder="Brief biography..."
                                />
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Instructor Photo</label>

                                <div className={styles.imageupload}>
                                    <div className={styles.uploadicon}>👤</div>
                                    <div className={styles.uploadtext}>
                                        Upload instructor photo
                                    </div>
                                    <div style={{ marginTop: "1rem" }}>
                                        <span className={styles.uploadbtn}>Choose File</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certificate & CPD */}
                        <div className={styles.formsection}>
                            <h2 className={styles.sectiontitle}>Certificate & CPD</h2>

                            <div className={styles.formgroup}>
                                <div className={styles.checkboxitem}>
                                    <input type="checkbox" id="certificate" name="certificate" />
                                    <label htmlFor="certificate">
                                        Issue Certificate of Participation
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formrow}>
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
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.formactions}>
                            <button type="submit" className={`${styles.btn} ${styles.btnprimary}`}>
                                Publish Webinar
                            </button>
                            <button type="button" className={`${styles.btn} ${styles.btnsecondary}`}>
                                Save as Draft
                            </button>
                            <button type="button"
                                className={`${styles.btn} ${styles.btnoutline}`}
                            >
                                Preview
                            </button>

                            <button
                                type="button"
                                className={`${styles.btn} ${styles.btnoutline}`}
                            // onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebarpanel}>
                        <div className={styles.panelcard}>
                            <h3 className={styles.paneltitle}>Status</h3>
                            <div className={styles.statusindicator}>
                                <div className={`${styles.statusdot} ${styles.draft}`}></div>
                                <span>Draft</span>
                            </div>
                        </div>

                        <div className={styles.formgroup}>
                            <label className={styles.formlabel}>Visibility</label>
                            <select className={styles.formselect}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="schools-only">Schools Only</option>
                            </select>
                        </div>

                        <div className={styles.panelcard}>
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
                        </div>

                        <div className={styles.panelcard}>
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
                        </div>

                        <div className={styles.panelcard}>
                            <h3 className={styles.paneltitle}>SEO</h3>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Meta Description</label>
                                <textarea
                                    className={styles.formtextarea}
                                    placeholder="SEO description..."
                                    style={{ minHeight: "80px" }}
                                />
                                <p className={styles.formhelp}>Max 160 characters</p>
                            </div>

                            <div className={styles.formgroup}>
                                <label className={styles.formlabel}>Slug</label>
                                <input
                                    type="text"
                                    className={styles.forminput}
                                    placeholder="url-friendly-slug"
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
