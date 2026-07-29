import React, { useState } from 'react';
import AppShell from '../../../components/layout/AppShell';
import AppButton from '../../../components/buttons/AppButton';
import AppFooter from '../../../components/common/AppFooter';
import { mockUsers } from '../../../utils/mockSelectors';
import downloadCsv from '../../../utils/downloadCsv';
import './AdminStudentsPage.css';

function AdminStudentsPage() {
  const [students, setStudents] = useState(mockUsers.slice(0, 6));
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [adding, setAdding] = useState(false);
  const departments = [...new Set(students.map((student) => student.department))];
  const list = students.filter((student) => {
    const matchesQuery = `${student.name} ${student.studentId} ${student.email}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (department === 'All Departments' || student.department === department);
  });

  function addStudent(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStudents((current) => [...current, {
      id: `user-${current.length + 1}`,
      name: data.get('name'),
      email: data.get('email'),
      studentId: data.get('studentId'),
      department: data.get('department'),
      joinedDate: new Date().toISOString(),
      status: 'active'
    }]);
    setAdding(false);
  }

  return (
    <AppShell section="admin" active="students">
      <section className="admin-students-page">
        <header className="head-row"><div><h1 className="section-title">Student Directory</h1><p className="subtle">Manage institution-wide student records and access levels.</p></div><div className="cta"><AppButton variant="outline" onClick={() => downloadCsv('students.csv', list)}>Export CSV</AppButton><AppButton onClick={() => setAdding((value) => !value)}>{adding ? 'Close Form' : 'Add Student'}</AppButton></div></header>
        {adding ? <form className="surface-card add-student-form" onSubmit={addStudent}><h2>Add Student</h2><input name="name" placeholder="Full name" required /><input name="email" type="email" placeholder="Campus email" required /><input name="studentId" placeholder="Student ID" required /><input name="department" placeholder="Department" required /><AppButton type="submit">Create Student</AppButton></form> : null}
        <section className="surface-card table-wrap">
          <div className="toolbar"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter by name, ID or email..." /><select value={department} onChange={(event) => setDepartment(event.target.value)}><option>All Departments</option>{departments.map((item) => <option key={item}>{item}</option>)}</select></div>
          <table><thead><tr><th>Student Name</th><th>Student ID</th><th>Department</th><th>Join Date</th><th>Status</th></tr></thead><tbody>{list.map((u)=><tr key={u.id}><td><strong>{u.name}</strong><p>{u.email}</p></td><td>{u.studentId}</td><td>{u.department}</td><td>{new Date(u.joinedDate).toLocaleDateString()}</td><td><span className={u.status==='active'?'ok':'bad'}>{u.status}</span></td></tr>)}</tbody></table>
        </section>
      </section>
      <AppFooter />
    </AppShell>
  );
}

export default AdminStudentsPage;