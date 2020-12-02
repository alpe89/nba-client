import React from 'react';
import { Layout } from 'antd';
import { GithubFilled } from '@ant-design/icons';
import { Switch, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchPlayer from '../SearchPlayer/SearchPlayer';
import PlayerCard from '../PlayerCard/PlayerCard';

import { SelectedPlayer } from '../../.redux/store';
import { Player } from '../../types';
import css from './App.module.css';
import Logo from '../../1F3C0.svg';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    const selectedPlayer = useSelector<SelectedPlayer, Player>(
        (state) => state.selectedPlayer
    );

    console.log(selectedPlayer);

    return (
        <Layout className={css.Layout}>
            <Header className={css.Header}>
                <div className={css.LogoContainer}>
                    <img
                        className={css.Logo}
                        src={Logo}
                        alt="League Inspector Logo"
                    />
                    <Link to="/">
                        <h1>League Inspector</h1>
                    </Link>
                </div>
            </Header>
            <Content className={css.Content}>
                <Switch>
                    <Route exact path="/">
                        <SearchPlayer />
                    </Route>
                    <Route path="/player">
                        <PlayerCard player={selectedPlayer} />
                    </Route>
                </Switch>
            </Content>
            <Footer className={css.Footer}>
                <p>© Alberto Pertusi - 2020</p>
                <a
                    href="https://github.com/alpe89"
                    target="_blank"
                    rel="noreferrer"
                >
                    <GithubFilled
                        style={{
                            fontSize: '1.2rem',
                            color: '#333',
                            alignSelf: 'center',
                        }}
                    />
                </a>
            </Footer>
        </Layout>
    );
};

export default App;
