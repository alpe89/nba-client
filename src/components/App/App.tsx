import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import SearchPlayer from '../SearchPlayer/SearchPlayer';

import css from './App.module.css';
import Logo from '../../1F3C0.svg';

const { Header, Content } = Layout;

const App: React.FC = () => {
    return (
        <Layout>
            <Header className={css.Header}>
                <div className={css.LogoContainer}>
                    <img
                        className={css.Logo}
                        src={Logo}
                        alt="League Inspector Logo"
                    />
                    <h1>League Inspector</h1>
                </div>
            </Header>
            <Content className={css.Content}>
                <Switch>
                    <Route exact path="/">
                        <SearchPlayer />
                    </Route>
                </Switch>
            </Content>
        </Layout>
    );
};

export default App;
