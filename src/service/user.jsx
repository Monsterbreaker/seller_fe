/*
* @Author: Rosen
* @Date:   2017-02-24 15:49:17
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:59:59
*/

'use strict';

import MMUtile from 'util/mm.jsx';

const mm = new MMUtile();

export default class User{
    // 检查用于登录的信息是否合法
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    // 检查用于的信息是否合法
    checkRegisterInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        if(userInfo.password.length<6){
            return {
                state: false,
                msg: '密码长度不能小于6位'
            }
        }
        if(!userInfo.confirmPassword){
            return {
                state: false,
                msg: '请再次输入密码'
            }
        }
        if(userInfo.password!=userInfo.confirmPassword){
            return {
                state: false,
                msg: '两次输入密码不一致'
            }
        }
        if(!mm.validate(userInfo.phone, 'phone')){
            return {
                state: false,
                msg: '手机号格式不正确'
            }
        }
        if(!mm.validate(userInfo.email, 'email')){
            return {
                state: false,
                msg: '邮箱格式不正确'
            }
        }
        // 验证密码提示问题是否为空
        if(!mm.validate(userInfo.question, 'require')){
            return {
                state: false,
                msg: '密码提示问题不能为空'
            }
        }
        // 验证密码提示问题答案是否为空
        if(!mm.validate(userInfo.answer, 'require')){
            return {
                state: false,
                msg: '密码提示问题答案不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    // 检查修改信息是否合法
    checkModifyInfo(userInfo){
        if(!mm.validate(userInfo.phone, 'phone')){
            return {
                state: false,
                msg: '手机号格式不正确'
            }
        }
        if(!mm.validate(userInfo.email, 'email')){
            return {
                state: false,
                msg: '邮箱格式不正确'
            }
        }
        // 验证密码提示问题是否为空
        if(!mm.validate(userInfo.question, 'require')){
            return {
                state: false,
                msg: '密码提示问题不能为空'
            }
        }
        // 验证密码提示问题答案是否为空
        if(!mm.validate(userInfo.answer, 'require')){
            return {
                state: false,
                msg: '密码提示问题答案不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    checkPassword(password,confirmPassword){
        if(!password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        if(password.length<6){
            return {
                state: false,
                msg: '密码长度不能小于6位'
            }
        }
        if(!confirmPassword){
            return {
                state: false,
                msg: '请再次输入密码'
            }
        }
        if(password!=confirmPassword){
            return {
                state: false,
                msg: '两次输入密码不一致'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    // 登录
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/user/seller_login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // 退出登录
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/logout.do'),
            method  : 'GET',
        });
    }
    //注册
    register(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/user/seller_register.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || '',
                email    : userInfo.email    || '',
                phone    : userInfo.phone    || '',
                question : userInfo.question || '',
                answer   : userInfo.answer   || '',
            }
        });
    }
    // 获取商家信息
    getUserInfo(){
        return mm.request({
            url     : mm.getServerUrl('/user/info.do'),
            method  : 'GET',
        });
    }
    //修改商家信息
    modifyUserInfo(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/user/info_modify.do'),
            method  : 'POST',
            data    : {
                email    : userInfo.email    || '',
                phone    : userInfo.phone    || '',
                question : userInfo.question || '',
                answer   : userInfo.answer   || '',
            }
        })
    }

    // 获取用户密码提示问题
    getQuestion(username){
        return mm.request({
            url     : mm.getServerUrl('/user/question.do'),
            data    : {
                username : username
            },
            method  : 'GET',
        });
    }
    // 检查密码提示问题答案
    checkAnswer(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/user/answer_check.do'),
            data    : userInfo,
            method  : 'POST',
        });
    }
    // 重置密码
    resetPassword(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/user/password_reset.do'),
            data    : userInfo,
            method  : 'POST',
        });
    }
}