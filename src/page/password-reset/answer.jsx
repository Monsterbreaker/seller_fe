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
            question : '',
            username : '',
            answer   : '',
            redirect : _mm.getHashParam('redirect')
        };
    },
    componentDidMount: function(){
        this.loadQuestion();
    },
    loadQuestion(){
        let question=_mm.getStorage('question');
        let username=_mm.getStorage('username');
        this.setState(question);
        this.setState(username);
    },
    // 点击提交答案
    onClick(e){
        e.preventDefault();
        if(_mm.validate(this.state.answer,'require')){
            let userInfo={
                username:this.state.username,
                answer:this.state.answer
            }
            _user.checkAnswer(userInfo).then(res => {
                let q={
                    'token':res
                }
                _mm.setStorage('token', q);
                window.location.href = '#/password-confirm';
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips('请输入答案');
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
                                    <span>{this.state.question}</span>
                                    <input className="form-control" 
                                        placeholder="请输入答案" 
                                        name="answer" 
                                        type="text" 
                                        autoComplete="off" 
                                        autoFocus 
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