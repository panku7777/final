import React from 'react';
import { Tabs } from 'antd';
import './panel.css'; // Import the external CSS file

import Addbook from './Screens/Addbook';
import BooksTable from './Tables/Books';
import AddGenreForm from './Screens/Addgenre';
import AddLanguageForm from './Screens/Addlanguage';
import GenreTable from './Tables/Genretable';
import LanguageTable from './Tables/Languagetable';
import UsersTable from './Tables/Usertable';
import DownloadList from './Tables/Downloadtable';

const { TabPane } = Tabs;

function Pnael() {
  return (
    <div className="panel-container" style={{ backgroundImage: 'url("https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg")' }}>
      <h2 className="panel-title">
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey='1' tabPosition='left'>
        <TabPane tab='Admin' key='1'>
          <h1>WELCOME</h1>
        </TabPane>
        <TabPane tab='Add book' key='2'>
          <Addbook/>
        </TabPane>
        <TabPane tab='Add Genre' key='3'>
          <AddGenreForm/>
        </TabPane>
        <TabPane tab='Add Language' key='4'>
          <AddLanguageForm/>
        </TabPane>
        <TabPane tab='Books' key='5'>
          <BooksTable/>
        </TabPane>
        <TabPane tab='Genres' key='6'>
          <GenreTable/>
        </TabPane>
        <TabPane tab='Languages' key='7'>
          <LanguageTable/>
        </TabPane>
        <TabPane tab='Users' key='8'>
          <UsersTable/>
        </TabPane>
        <TabPane tab="Downloads" key="9">
          <DownloadList/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Pnael;
