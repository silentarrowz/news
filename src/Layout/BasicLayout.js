import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Router,Switch, Route, Link } from "react-router-dom";
import { Layout, Icon, message } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import BaseRoute from '../Component/BaseRoute';
import Sidebar from '../Common/Sidebar';
import styles from './BasicLayout.scss';

const { Content, Header, Footer,Sider } = Layout;


const query = {
    'screen-xs': {
      maxWidth: 575,
    },
    'screen-sm': {
      minWidth: 576,
      maxWidth: 767,
    },
    'screen-md': {
      minWidth: 768,
      maxWidth: 991,
    },
    'screen-lg': {
      minWidth: 992,
      maxWidth: 1199,
    },
    'screen-xl': {
      minWidth: 1200,
    },
  };


let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export default class BasicLayout extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            isMobile
        }
    }

    componentDidMount(){
      this.enquireHandler = enquireScreen(mobile => {
        this.setState({
          isMobile: mobile,
        });
      });
    }

    componentWillUnmount() {
      unenquireScreen(this.enquireHandler);
    }


    render(){
        let layout = (  <Layout>
            <Sidebar history={this.props.history} isMobile={this.state.isMobile}/>
            <Layout style={{overflow:'hidden'}}>                
                <Content className="contentStyle" style={{ padding: '0 5px', marginTop: 14,position:'relative',display:'inline-block' }}>
               <Router pathname={this.props.path} history={this.props.history} >
                   <Route path='/' component={BaseRoute} />
               
             </Router>
             
                </Content>


            </Layout> 
        </Layout>);
        return(
            <ContainerQuery query={query}>
            {params => <div className={classNames(params)}>{layout}</div>}
          </ContainerQuery>
        )
    }
}

