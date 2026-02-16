"use client"
import React from 'react'
import Topbar from '../Topbar/Topbar'
import styles from "./Dashboard.module.css"
import Link from 'next/link'
import moment from 'moment'
import { useRouter } from 'next/navigation'

const Dashboard = ({ webinars }) => {

    const router = useRouter();

    const sortedWebinars = (webinars || [])
        .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
        .slice(0, 5);


    const latestLiveWebinar = (webinars || [])
        .filter(w => w.isLive) // only live webinars
        .sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())[0];

    const newWebinarsThisMonth = (webinars || []).filter(w =>
  moment(w.date).isSame(moment(), "month")
).length;

    return (
        <>
            <div className={styles.contentarea}>
                <div className={styles.pageheader}>
                    {/* <h1 className={styles.pagetitle}>Dashboard</h1> */}
                    <p className={styles.pagesubtitle}>Welcome back! Here's what's happening with Knotral Training today.</p>
                </div>

                <div className={styles.statsgrid}>
                    {/* <div className={styles.statcard}>
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
                    </div> */}

                    <div className={styles.statcard}>
                        <div className={styles.statheader}>
                            <div>
                                <div className={styles.statvalue}>{webinars.length}</div>
                                <div className={styles.statlabel}>Total Webinars</div>
                                <div
                                    className={`${styles.statchange} ${newWebinarsThisMonth > 0 ? styles.positive : styles.neutral
                                        }`}
                                >
                                    {newWebinarsThisMonth > 0
                                        ? `↑ ${newWebinarsThisMonth} new this month`
                                        : "No new webinars this month"}
                                </div>
                            </div>
                            <div className={styles.staticon}>🎓</div>
                        </div>
                    </div>
{/* 
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
                    </div> */}
                    {/* 
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
                    </div> */}
                </div>

                <div className={styles.contentgrid}>
                    <div className={styles.contentcard}>
                        <div className={styles.cardheader}>
                            <h2 className={styles.cardtitle}>Recent Webinars</h2>
                            <Link href="/webinar-list" className={styles.cardaction}>View All →</Link>
                        </div>
                        <div className={styles.cardbody}>
                            <div className={styles.tablescroll}>
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
                                    {sortedWebinars.length > 0 ? (
                                        sortedWebinars.map((webinar) => (
                                            <tr key={webinar._id}>
                                                <td>{webinar.title}</td>
                                                <td>{moment(webinar.date).format("MMM DD, YYYY")}</td>
                                                <td>{webinar.views || 0}</td>
                                                <td>
                                                    <span
                                                        className={`${styles.statusbadge} ${webinar.isLive ? styles.live : webinar.isStopped ? styles.completed : styles.upcoming
                                                            }`}
                                                    >
                                                        {webinar.isLive ? "Live" : webinar.isStopped ? "Completed" : "Upcoming"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className={styles.actionbtn}
                                                        onClick={() => router.push(`/edit-webinar/${webinar.slug}`)}

                                                        title="Edit">
                                                        ✏️
                                                    </button>
                                                    {/* <button className={styles.actionbtn} title="View">
                                                        👁️
                                                    </button> */}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: "center" }}>
                                                No webinars found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentcard}>
                        <div className={styles.cardheader}>
                            <h2 className={styles.cardtitle}>Recent Activity</h2>
                            <a href="/cms/activity" className={styles.cardaction}>View All →</a>
                        </div>
                        <div className={styles.cardbody}>
                            <ul className={styles.activitylist}>
                                {/* <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newuser}`}>👤</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>25 new teachers registered</div>
                                        <div className={styles.activitytime}>2 hours ago</div>
                                    </div>
                                </li> */}
                                <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newwebinar}`}>🎓</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>New webinar published: "{latestLiveWebinar.title}"</div>
                                        <div className={styles.activitytime}>{moment(latestLiveWebinar.createdAt).fromNow()}</div>
                                    </div>
                                </li>
                                {/* <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.registration}`}>📝</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>156 registrations for upcoming sessions</div>
                                        <div className={styles.activitytime}>1 day ago</div>
                                    </div>
                                </li> */}
                                {/* <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newuser}`}>🏫</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>Delhi Public School joined as partner</div>
                                        <div className={styles.activitytime}>2 days ago</div>
                                    </div>
                                </li> */}
                                {/* <li className={styles.activityitem}>
                                    <div className={`${styles.activityicon} ${styles.newwebinar}`}>🎓</div>
                                    <div className={styles.activitycontent}>
                                        <div className={styles.activitytitle}>Webinar completed: 234 certificates issued</div>
                                        <div className={styles.activitytime}>3 days ago</div>
                                    </div>
                                </li> */}
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
                            <Link href="/upload-certificates" className={styles.quickactionbtn}>
                                <div className={styles.quickactionicon}>🏆</div>
                                <div className={styles.quickactionlabel}>Create Certification</div>
                            </Link>
                            <a href="/cms/emails/new" className={styles.quickactionbtn}>
                                <div className={styles.quickactionicon}>✉️</div>
                                <div className={styles.quickactionlabel}>Send Email Campaign</div>
                            </a>
                            {/* <a href="/cms/reports" className={styles.quickactionbtn}>
                                <div className={styles.quickactionicon}>📊</div>
                                <div className={styles.quickactionlabel}>Generate Report</div>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Dashboard