import React from 'react'
import Topbar from '../Topbar/Topbar'
import styles from "./Dashboard.module.css"
import Link from 'next/link'

const Dashboard = () => {
    return (
        <>
            <div className={styles.contentarea}>
                <div className={styles.pageheader}>
                    <h1 className={styles.pagetitle}>Dashboard</h1>
                    <p className={styles.pagesubtitle}>Welcome back! Here's what's happening with Knotral Training today.</p>
                </div>

                <div className={styles.statsgrid}>
                    <div className={styles.statcard}>
                        <div className={styles.statheader}>
                            <div>
                                <div className={styles.statvalue}>12,487</div>
                                <div className={styles.statlabel}>Total Teachers</div>
                                <div className={`${styles.statchange} ${styles.positive}`}>
                                    ↑ 12.5% from last month
                                </div>
                            </div>
                            <div className={styles.staticon}>👩‍🏫</div>
                        </div>
                    </div>

                    <div className={styles.statcard}>
                        <div className={styles.statheader}>
                            <div>
                                <div className={styles.statvalue}>158</div>
                                <div className={styles.statlabel}>Total Webinars</div>
                                <div className={`${styles.statchange} ${styles.positive}`}>
                                    ↑ 8 new this month
                                </div>
                            </div>
                            <div className={styles.staticon}>🎓</div>
                        </div>
                    </div>

                    <div className={styles.statcard}>
                        <div className={styles.statheader}>
                            <div>
                                <div className={styles.statvalue}>1,245</div>
                                <div className={styles.statlabel}>Active Registrations</div>
                                <div className={`${styles.statchange} ${styles.positive}`}>
                                    ↑ 23% this week
                                </div>
                            </div>
                            <div className={styles.staticon}>📝</div>
                        </div>
                    </div>

                    <div className={styles.statcard}>
                        <div className={styles.statheader}>
                            <div>
                                <div className={styles.statvalue}>47</div>
                                <div className={styles.statlabel}>Partner Providers</div>
                                <div className={`${styles.statchange} ${styles.positive}`}>
                                    ↑ 2 new partners
                                </div>
                            </div>
                            <div className={styles.staticon}>🌍</div>
                        </div>
                    </div>
                </div>

                <div className={styles.contentgrid}>
                    <div className={styles.contentcard}>
                        <div className={styles.cardheader}>
                            <h2 className={styles.cardtitle}>Recent Webinars</h2>
                            <a href="/cms/webinars" className={styles.cardaction}>View All →</a>
                        </div>
                        <div className={styles.cardbody}>
                            <table className={styles.datatable}>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Registered</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AI in IB Mathematics</td>
                                        <td>Jan 08, 2026</td>
                                        <td>234</td>
                                        <td><span className={`${styles.statusbadge} ${styles.upcoming}`}>Upcoming</span></td>
                                        <td>
                                            <button className={styles.actionbtn} title="Edit">✏️</button>
                                            <button className={styles.actionbtn} title="View">👁️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gamified Abacus Learning</td>
                                        <td>Jan 06, 2026</td>
                                        <td>189</td>
                                        <td><span className={`${styles.statusbadge} ${styles.live}`}>Live</span></td>
                                        <td>
                                            <button className={styles.actionbtn} title="Edit">✏️</button>
                                            <button className={styles.actionbtn} title="View">👁️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>SEL Workshop KG-5</td>
                                        <td>Jan 13, 2026</td>
                                        <td>456</td>
                                        <td><span className={`${styles.statusbadge} ${styles.upcoming}`}>Upcoming</span></td>
                                        <td>
                                            <button className={styles.actionbtn} title="Edit">✏️</button>
                                            <button className={styles.actionbtn} title="View">👁️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Spelling Builds Literacy</td>
                                        <td>Jan 13, 2026</td>
                                        <td>312</td>
                                        <td><span className={`${styles.statusbadge} ${styles.upcoming}`}>Upcoming</span></td>
                                        <td>
                                            <button className={styles.actionbtn} title="Edit">✏️</button>
                                            <button className={styles.actionbtn} title="View">👁️</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Reggio Emilia Approach</td>
                                        <td>Dec 28, 2025</td>
                                        <td>567</td>
                                        <td><span className={`${styles.statusbadge} ${styles.completed}`}>Completed</span></td>
                                        <td>
                                            <button className={styles.actionbtn} title="Edit">✏️</button>
                                            <button className={styles.actionbtn} title="View">👁️</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.contentcard}>
                        <div className={styles.cardheader}>
                            <h2 className={styles.cardtitle}>Recent Activity</h2>
                            <a href="/cms/activity" className={styles.cardaction}>View All →</a>
                        </div>
                        <div className={styles.cardbody}>
                            <ul className={styles.activitylist}>
                                <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newuser}`}>👤</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>25 new teachers registered</div>
                                        <div className={styles.activitytime}>2 hours ago</div>
                                    </div>
                                </li>
                                <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newwebinar}`}>🎓</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>New webinar published: "EdTech Trends 2026"</div>
                                        <div className={styles.activitytime}>5 hours ago</div>
                                    </div>
                                </li>
                                <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.registration}`}>📝</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>156 registrations for upcoming sessions</div>
                                        <div className={styles.activitytime}>1 day ago</div>
                                    </div>
                                </li>
                                <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newuser}`}>🏫</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>Delhi Public School joined as partner</div>
                                        <div className={styles.activitytime}>2 days ago</div>
                                    </div>
                                </li>
                                <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newwebinar}`}>🎓</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>Webinar completed: 234 certificates issued</div>
                                        <div className={styles.activitytime}>3 days ago</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.contentcard}>
                    <div className={styles.cardheader}>
                        <h2 className={styles.cardtitle}>Quick Actions</h2>
                    </div>
                    <div className={styles.cardbody}>
                        <div className={styles.quickactions}>
                             <Link href="/create-webinar" className={styles.quickactionbtn}>
                                <div className={styles.quickactionicon}>➕</div>
                                <div className={styles.quickactionlabel}>Add New Webinar</div>
                            </Link>
                            <a href="/cms/certifications/new" className={styles.quickactionbtn}>
                                <div className={styles.quickactionicon}>🏆</div>
                                <div className={styles.quickactionlabel}>Create Certification</div>
                            </a>
                            <a href="/cms/emails/new" className={styles.quickactionbtn}>
                                <div className={styles.quickactionicon}>✉️</div>
                                <div className={styles.quickactionlabel}>Send Email Campaign</div>
                            </a>
                            <a href="/cms/reports" className={styles.quickactionbtn}>
                                <div className={styles.quickactionicon}>📊</div>
                                <div className={styles.quickactionlabel}>Generate Report</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Dashboard