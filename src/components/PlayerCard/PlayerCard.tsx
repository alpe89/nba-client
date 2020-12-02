import React from 'react';
import { Card, Breadcrumb, Image, Row, Col, List, Divider } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Player } from '../../types';
import TeamLogo from '../TeamLogo/TeamLogo';
import css from './PlayerCard.module.css';

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }: PlayerCardProps) => {
    const playerImage = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;
    return (
        <>
            <Breadcrumb style={{ paddingLeft: '0.5rem' }}>
                <Breadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Player's Card</Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{ marginTop: '0.5rem' }}
                title={
                    <div className={css.CardTitle}>
                        {player.team && (
                            <TeamLogo
                                shortName={player.team.abbreviation}
                                width={50}
                            />
                        )}
                        <h1>{player.first_name + ' ' + player.last_name}</h1>
                    </div>
                }
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <div className={css.Figure}>
                            <Image
                                width="100%"
                                height="auto"
                                src={playerImage}
                                fallback="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <h2>Player's Info</h2>
                        <List>
                            {/* TODO: Estrarre questa logica in un componente per visualizzare Oggetti */}
                            {Object.keys(player).map((key) => {
                                return key === 'team' ? null : (
                                    <List.Item key={key}>
                                        {key}: {player[key]}
                                    </List.Item>
                                );
                            })}
                        </List>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <h2>Team's Info</h2>
                        <List>
                            {player.team && (
                                <>
                                    <List.Item>
                                        <List
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <List.Item>
                                                Name: {player.team.full_name} [
                                                {player.team.abbreviation}]
                                            </List.Item>
                                            <List.Item>
                                                City: {player.team.city}
                                            </List.Item>
                                            <List.Item>
                                                Conference:{' '}
                                                {player.team.conference}
                                            </List.Item>
                                            <List.Item>
                                                Division: {player.team.division}
                                            </List.Item>
                                        </List>
                                    </List.Item>
                                </>
                            )}
                        </List>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default PlayerCard;
