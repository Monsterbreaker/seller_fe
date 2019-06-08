/*
* @Author: Rosen
* @Date:   2017-02-11 19:03:26
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-12 11:36:24
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import MMUtile      from 'util/mm.jsx';
import User         from 'service/user.jsx';

const _mm =new MMUtile();
const _user=new User();

import './index.scss';

const UserInfo = React.createClass({
    getInitialState() {
        return {
            // hello: 'User did mount'
        };
    },
    componentDidMount: function(){
        this.loadUserInfo();
    },
    loadUserInfo(){
        _user.getUserInfo().then(res=>{
            this.setState(res);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="用户管理"/>
                <div className="row">
                    <div className="user-info">
                        <div className="form-line">
                            <span className="label">用户名：</span>
                            <span className="text">{this.state.username}</span>
                        </div>
                        <div className="form-line">
                            <span className="label">电 话：</span>
                            <span className="text">{this.state.phone}</span>
                        </div>
                        <div className="form-line">
                            <span className="label">邮 箱：</span>
                            <span className="text">{this.state.email}</span>
                        </div>
                        <div className="form-line">
                            <span className="label">问 题：</span>
                            <span className="text">{this.state.question}</span>
                        </div>
                        <div className="form-line">
                            <span className="label">答 案：</span>
                            <span className="text">{this.state.answer}</span>
                        </div>
                        <Link className="btn btn-primary" to="/user/modify"><i className="fa fa-plus fa-pencil"></i>修改信息</Link>
                    </div>
                </div>
            </div>
        );
    }
});

export default UserInfo;
