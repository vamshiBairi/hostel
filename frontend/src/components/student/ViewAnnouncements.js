import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Fetching announcements failed', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(150deg, #E6F0DC, #94DEA5)',
        minHeight: '100vh',
        padding: '20px',
        margin: '0',
      }}
    >
      <div className="container-fluid">
        <h2 className="text-center mb-4" style={{ color: '#023D54' }}>
          Announcements
        </h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr style={{ backgroundColor: '#3c4542', color: 'white' }}>
                <th>Date</th>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement._id}>
                  <td>{new Date(announcement.date).toLocaleDateString()}</td>
                  <td>{announcement.title}</td>
                  <td>{announcement.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewAnnouncements;
