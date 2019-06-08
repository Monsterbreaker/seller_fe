/*
* @Author: Rosen
* @Date:   2016-11-06 12:39:33
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:44:13
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import MMUtile from 'util/mm.jsx';
import User from 'service/user.jsx';

const _mm    = new MMUtile();
const _user  = new User();

const Login = React.createClass({
    getInitialState() {
        return {
            password:'',
            confirmPassword:'',
            redirect : _mm.getHashParam('redirect')
        };
    },
    // 点击重置新密码
    onClick(e){
        e.preventDefault();
        let check=_user.checkPassword(this.state.password,this.state.confirmPassword)
        if(check.state){
            let userInfo={
                username:_mm.getStorage('username')['username'],
                forgetToken:_mm.getStorage('token')['token'],
                newPassword:this.state.password,
            }
            _user.resetPassword(userInfo).then(res => {
                alert(res);
                window.location.href = this.state.redirect || '#/login';
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(check.msg);
        }
    },
    // 输入框内容变化时，更新state中的字段
    onInputChange(e){
        let ele         = e.target,
            inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">找回密码</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form" onSubmit={this.onClick}>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="请输入新密码" 
                                        name="password" 
                                        type="password" 
                                        onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="再次输入密码" 
                                        name="confirmPassword" 
                                        type="password" 
                                        onChange={this.onInputChange}/>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block">确认</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Login;