import React from 'react'
import styles from "./TeachersList.module.css"

export const teachersMock = [
  {
    id: 1,
    initials: "PR",
    name: "Priya Kapoor",
    email: "priya.k@school.com",
    school: "Delhi Public School",
    gradeSubject: "Grade 6-8 • Mathematics",
    board: "CBSE",
    joined: "Jan 2024",
    webinars: 23,
    status: "active",
    isPremium: false
  },
  {
    id: 2,
    initials: "AS",
    name: "Amit Sharma",
    email: "amit.s@international.edu",
    school: "International School",
    gradeSubject: "Grade 9-12 • Science",
    board: "IB",
    joined: "Aug 2023",
    webinars: 45,
    status: "active",
    isPremium: true
  },
  {
    id: 3,
    initials: "SK",
    name: "Sneha Kumar",
    email: "sneha.kumar@school.in",
    school: "Modern School",
    gradeSubject: "Grade 1-5 • English",
    board: "CBSE",
    joined: "Mar 2024",
    webinars: 12,
    status: "active",
    isPremium: false
  },
  {
    id: 4,
    initials: "RM",
    name: "Rajesh Mehta",
    email: "r.mehta@cambridge.edu",
    school: "Cambridge School",
    gradeSubject: "Grade 9-12 • Mathematics",
    board: "Cambridge",
    joined: "Dec 2023",
    webinars: 34,
    status: "inactive",
    isPremium: false
  },
  {
    id: 5,
    initials: "NJ",
    name: "Neha Joshi",
    email: "neha.j@primaryschool.com",
    school: "Little Angels School",
    gradeSubject: "Pre-K to K • Early Years",
    board: "ICSE",
    joined: "May 2024",
    webinars: 8,
    status: "active",
    isPremium: false
  }
];

const TeachersList = () => {
  return (
    <div className={styles.contentarea}>
      {/* Header */}
      <div className={styles.pageheader}>
        <h1 className={styles.pagetitle}>Manage Teachers</h1>
        <button className={`${styles.btn} ${styles.btnprimary}`}>➕ Add Teacher</button>
      </div>

      {/* Stats */}
      <div className={styles.statsbar}>
        <div className={styles.statbox}>
          <div className={styles.statvalue}>12,487</div>
          <div className={styles.statlabel}>Total Teachers</div>
        </div>
        <div className={styles.statbox} style={{ borderLeftColor: "var(--success)" }}>
          <div className={styles.statvalue}>11,234</div>
          <div className={styles.statlabel}>Active Users</div>
        </div>
        <div className={styles.statbox} style={{ borderLeftColor: "var(--warning)" }}>
          <div className={styles.statvalue}>1,245</div>
          <div className={styles.statlabel}>New This Month</div>
        </div>
        <div className={styles.statbox} style={{ borderLeftColor: "var(--primary-navy)" }}>
          <div className={styles.statvalue}>567</div>
          <div className={styles.statlabel}>Premium Members</div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersbar}>
        <div className={styles.filtersrow}>
          <div className={styles.filtergroup}>
            <label className={styles.filterlabel}>Search</label>
            <input
              type="text"
              className={styles.filterinput}
              placeholder="Search by name, email, school..."
            />
          </div>

          <div className={styles.filtergroup}>
            <label className={styles.filterlabel}>Status</label>
            <select className={styles.filterselect}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className={styles.filtergroup}>
            <label className={styles.filterlabel}>Grade Level</label>
            <select className={styles.filterselect}>
              <option value="">All Grades</option>
              <option value="early">Early Years</option>
              <option value="primary">Primary</option>
              <option value="middle">Middle School</option>
              <option value="high">High School</option>
            </select>
          </div>

          <div className={styles.filtergroup}>
            <label className={styles.filterlabel}>Board</label>
            <select className={styles.filterselect}>
              <option value="">All Boards</option>
              <option value="cbse">CBSE</option>
              <option value="icse">ICSE</option>
              <option value="ib">IB</option>
              <option value="cambridge">Cambridge</option>
              <option value="state">State Board</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className={`${styles.btn} ${styles.btnsecondary}`}>Reset</button>
            <button className={`${styles.btn} ${styles.btnprimary}`}>Apply</button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className={styles.bulkactions}>
        <input type="checkbox" id="selectAll" className={styles.tablecheckbox} />
        <label htmlFor="selectAll" style={{ fontWeight: 600 }}>
          Select All
        </label>
        <button className={`${styles.btn} ${styles.btnsecondary}`}>Send Email</button>
        <button className={`${styles.btn} ${styles.btnsecondary}`}>Export Selected</button>
        <button className={`${styles.btn} ${styles.btnsecondary}`}>Assign to Webinar</button>
      </div>

      {/* Table */}
      <div className={styles.tablecontainer}>
        <table className={styles.datatable}>
          <thead>
            <tr>
              <th><input type="checkbox" className={styles.tablecheckbox} /></th>
              <th>Teacher</th>
              <th>School</th>
              <th>Grade/Subject</th>
              <th>Board</th>
              <th>Joined</th>
              <th>Webinars</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
<tbody>
  {teachersMock.map((teacher) => (
    <tr key={teacher.id}>
      <td data-label="Select">
        <input type="checkbox" className={styles.tablecheckbox} />
      </td>

      <td data-label="Teacher">
        <div className={styles.usercell}>
          <div className={styles.useravatarsmall}>
            {teacher.initials}
          </div>
          <div className={styles.userinfo}>
            <h4>
              {teacher.name}
              {teacher.isPremium && (
                <span
                  className={`${styles.badge} ${styles.premium}`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Premium
                </span>
              )}
            </h4>
            <p>{teacher.email}</p>
          </div>
        </div>
      </td>

      <td data-label="School">{teacher.school}</td>
      <td data-label="Grade / Subject">{teacher.gradeSubject}</td>
      <td data-label="Board">{teacher.board}</td>
      <td data-label="Joined">{teacher.joined}</td>
      <td data-label="Webinars">{teacher.webinars}</td>

      <td data-label="Status">
        <span
          className={`${styles.badge} ${
            teacher.status === "active"
              ? styles.active
              : styles.inactive
          }`}
        >
          {teacher.status.charAt(0).toUpperCase() +
            teacher.status.slice(1)}
        </span>
      </td>

      <td data-label="Actions">
        <div className={styles.actionbtns}>
          <button className={styles.actionbtn}>👁️ View</button>
          <button className={styles.actionbtn}>✏️ Edit</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>


        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.pagebtn}>← Previous</button>
        <button className={`${styles.pagebtn} ${styles.active}`}>1</button>
        <button className={styles.pagebtn}>2</button>
        <button className={styles.pagebtn}>3</button>
        <button className={styles.pagebtn}>...</button>
        <button className={styles.pagebtn}>50</button>
        <button className={styles.pagebtn}>Next →</button>
      </div>
    </div>
  );
};

export default TeachersList;
