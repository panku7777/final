import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import './panel.css'; // Import the external CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import Addbook from './Screens/Addbook';
import BooksTable from './Tables/Books';
import AddGenreForm from './Screens/Addgenre';
import AddLanguageForm from './Screens/Addlanguage';
import GenreTable from './Tables/Genretable';
import LanguageTable from './Tables/Languagetable';
import UsersTable from './Tables/Usertable';
import DownloadList from './Tables/Downloadtable';

const { TabPane } = Tabs;

function Panel() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('AdminData'));
    if (!adminData) {
      navigate('/signin');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('AdminData');
    navigate('/signin');
  };

  return (
    <div>
      <nav className="panel-navbar">
        <div className="navbar-heading"></div>
        <div className="navbar-menu">
          <div className="logout-icon" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </div>
        </div>
      </nav>

      <div className="panel-container" style={{ backgroundImage: 'url("https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg")' }}>
        <Tabs defaultActiveKey='1' tabPosition='left'>
          <TabPane tab='Admin' key='1'>
            <h1>WELCOME</h1>
          </TabPane>
          <TabPane tab='Add book' key='2'>
            <Addbook />
          </TabPane>
          <TabPane tab='Add Genre' key='3'>
            <AddGenreForm />
          </TabPane>
          <TabPane tab='Add Language' key='4'>
            <AddLanguageForm />
          </TabPane>
          <TabPane tab='Books' key='5'>
            <BooksTable />
          </TabPane>
          <TabPane tab='Genres' key='6'>
            <GenreTable />
          </TabPane>
          <TabPane tab='Languages' key='7'>
            <LanguageTable />
          </TabPane>
          <TabPane tab='Users' key='8'>
            <UsersTable />
          </TabPane>
          <TabPane tab="Downloads" key="9">
            <DownloadList />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Panel;
