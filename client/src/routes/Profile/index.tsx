import React, {useEffect, PropsWithChildren} from 'react';
import './index.less'
import { AxiosError } from "axios";
import {RouteComponentProps} from 'react-router-dom';
import { Descriptions, Button, Alert, message } from "antd";
import { ProfileState, LOGIN_TYPES } from "@/types/state";
import { CombinedState } from "@/types/state";
import { connect } from 'react-redux';
import mapDispatchToProps from '@/store/actions/profile'
import Nav from '@/components/Nav';
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps>

function Profile(props: Props) {
    console.log('xxx', props);
    
    let content;
    useEffect(() => {
        // props.validate();
    }, []);
    if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
        content = null
    } else if (props.loginState === LOGIN_TYPES.LOGINED){
        content = (
            <div className="user-info">
                <Descriptions title="当前用户">
                    <Descriptions.item label="用户名">jeffywin</Descriptions.item>
                    <Descriptions.item label="邮箱">jeffywin@126.com</Descriptions.item>
                </Descriptions>
                <Button type="退出" onClick={() => props.history.push("/logout")}>退出</Button>
            </div>
        )
    } else {
        content = (
            <>
                <Alert
                    type="warning"
                    message="当前未登录"
                    description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
                />
                <div style={{ textAlign: "center", padding: ".5rem" }}>
                <Button type="dashed" onClick={() => props.history.push("/login")}>
                    登录
                </Button>
                <Button
                    type="dashed"
                    style={{ marginLeft: ".5rem" }}
                    onClick={() => props.history.push("/register")}
                >
                    注册
                </Button>
        </div>
            </>
        )
    }
    return (
        <div>
            <Nav history={props.history}>个人中心</Nav>
            {content}
        </div>
    )
}
const mapStateToProps = (state: CombinedState):ProfileState => state.profile;
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
