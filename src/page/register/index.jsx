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


const Register = React.createClass({
    getInitialState() {
        return {
            username : '',
            password : '',
            confirmPassword:'',
            phone    : '',
            mail     : '',
            question : '',
            answer   : '',
            // redirect : _mm.getHashParam('redirect')
        };
    },
    // 点击注册
    onRegister(e){
        e.preventDefault();
        let registerInfo   = {
                username: this.state.username,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                phone   : this.state.phone,
                email    : this.state.email,
                question: this.state.question,
                answer  : this.state.answer,
            },
            checkRegister  = _user.checkRegisterInfo(registerInfo);
        if(checkRegister.state){
            // 登录成功后进行跳转
            _user.register(registerInfo).then(res => {
                alert("注册成功！");
                window.location.href = this.state.redirect || '#/login';
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(checkLogin.msg);
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
                            <h3 className="panel-title">商家——用户注册</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form" onSubmit={this.onRegister}>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="请输入用户名（店名）" 
                                        name="username" 
                                        type="text" 
                                        autoComplete="off" 
                                        autoFocus 
                                        onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="请输入密码" 
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
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="请输入手机号" 
                                        name="phone" 
                                        type="text"
                                        onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="请输入邮箱" 
                                        name="email" 
                                        type="text" 
                                        onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="请输入密保问题" 
                                        name="question" 
                                        type="text" 
                                        onChange={this.onInputChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" 
                                        placeholder="请输入密保答案" 
                                        name="answer" 
                                        type="text" 
                                        onChange={this.onInputChange}/>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block">注册</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Register;