import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SiderMenu from './components/SiderMenu'
import Home from './pages/Home'
import Login from './pages/Login'

export default class App extends React.Component {

    render() {
        return (

            <Layout style={{ minHeight: '100vh' }}>
                <SiderMenu />
                <Layout>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>


                        <Route path="/login" element={<Login/>} />

                    </Routes>
                </Layout>
            </Layout>

        )
    }
}