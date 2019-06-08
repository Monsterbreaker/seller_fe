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

const UserInfoModify = React.createClass({
    getInitialState() {
        return {
            username : '',
            phone    : '',
            mail     : '',
            question : '',
            answer   : '',
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
    onInputChange(e){
        let ele         = e.target,
            inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    },
    // 提交表单
    onSubmit(e){
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let modifyInfo   = {
            username: this.state.username,
            phone   : this.state.phone,
            email    : this.state.email,
            question: this.state.question,
            answer  : this.state.answer,
        },
        checkModify = _user.checkModifyInfo(modifyInfo);;
        // 验证通过后，提交商品信息
        if(checkModify.state){
            // 提交修改
            _user.modifyUserInfo(modifyInfo).then(res => {
                alert('修改成功');
                window.location.href = '#/user/index';
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }else{
            alert(checkModify.msg);
        }
        return false;
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
                            <input type="text" className="input" name="phone" value={this.state.phone} onChange={this.onInputChange}></input>
                        </div>
                        <div className="form-line">
                            <span className="label">邮 箱：</span>
                            <input type="text" className="input" name="email"value={this.state.email} onChange={this.onInputChange}></input>
                        </div>
                        <div className="form-line">
                            <span className="label">问 题：</span>
                            <input type="text" className="input" name="question"  value={this.state.question} onChange={this.onInputChange}></input>
                        </div>
                        <div className="form-line">
                            <span className="label">答 案：</span>
                            <input type="text" className="input" name="answer"  value={this.state.answer} onChange={this.onInputChange}></input>
                        </div>
                        <button type="btn" className="btn btn-xl btn-primary" onClick={this.onSubmit}>提交</button>
                    </div>
                </div>
            </div>
        );
    }
});

export default UserInfoModify;
