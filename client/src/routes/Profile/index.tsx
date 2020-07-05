import React, {PropsWithChildren} from 'react';
import './index.less'
import {RouteComponentProps} from 'react-router-dom';
import { ProfileState, LOGIN_TYPES } from "@/types/state";
import { CombinedState } from "@/types/state";
import { connect } from 'react-redux';
import mapDispatchToProps from '@/store/actions/profile'
import Nav from '@/components/Nav';
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps>

function Profile(props: Props) {
    let content;
    console.log('🍌', props)
    if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
        content = null
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
