import React, { useState, useEffect } from 'react';
import {
    Card,
    Breadcrumb,
    Row,
    Col,
    List,
    Divider,
    Spin,
    notification,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { useApi } from '../../hooks/useApi';
import { Player } from '../../types';
import PlayersList from '../PlayersList/PlayersList';
import TeamLogo from '../TeamLogo/TeamLogo';
import css from './PlayerCard.module.css';

interface PlayerCardProps {
    player: Player;
}

const playerImagesAPI = 'https://nba-players.herokuapp.com/players';
const playerStatsAPI =
    'https://www.balldontlie.io/api/v1/stats?seasons[]=2019&per_page=1&';
const gameStatsAPI = 'https://www.balldontlie.io/api/v1/stats?';

const PlayerCard: React.FC<PlayerCardProps> = ({ player }: PlayerCardProps) => {
    const [
        playerStatsReq,
        playerStats,
        playerStatsErr,
        fetchPlayerStats,
    ] = useApi();
    const [gameReq, gameStats, gameStatsErr, fetchGameData] = useApi();
    const [lastGameId, setLastGameId] = useState<number | null>(null);
    const [teamMembers, setTeamMembers] = useState<Player[] | null>(null);
    const [playerImage, setPlayerImage] = useState<string>(
        `${playerImagesAPI}/${player.last_name}/${player.first_name}`
    );

    const handleImageFallback = (
        evt: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        setPlayerImage(
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        );
    };

    useEffect(() => {
        if (!player.id || player.id === 0) return;
        fetchPlayerStats(`${playerStatsAPI}player_ids[]=${player.id}`);
        setPlayerImage(
            `${playerImagesAPI}/${player.last_name}/${
                player.first_name
            }?${Date.now()}`
        );
    }, [player.id, fetchPlayerStats, player.last_name, player.first_name]);

    useEffect(() => {
        if (playerStats === null || !playerStats.data[0]) return;

        setLastGameId(playerStats.data[0].game.id);
    }, [playerStats]);

    useEffect(() => {
        if (lastGameId === null) return;

        fetchGameData(`${gameStatsAPI}game_ids[]=${lastGameId}`);
    }, [lastGameId, fetchGameData]);

    useEffect(() => {
        if (gameStats === null) return;

        const tm: Player[] = gameStats.data
            .filter((row: any) => row.player.team_id === player.team!.id)
            .map((row: any) => {
                const pl = {
                    ...row.player,
                    team: { ...player.team },
                };
                delete pl.team_id;
                return pl;
            });
        setTeamMembers(tm);
    }, [gameStats, player.team]);

    useEffect(() => {
        if (playerStatsErr === null) return;

        notification.error({
            message: 'Network Request Error',
            description: playerStatsErr.message,
            placement: 'bottomRight',
            duration: 3,
        });
    }, [playerStatsErr]);

    useEffect(() => {
        if (gameStatsErr === null) return;

        notification.error({
            message: 'Network Request Error',
            description: gameStatsErr.message,
            placement: 'bottomRight',
            duration: 3,
        });
    }, [gameStatsErr]);

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
                            <Spin spinning={playerStatsReq === 'pending'}>
                                <img
                                    src={playerImage}
                                    alt={
                                        'Picture of ' +
                                        player.first_name +
                                        ' ' +
                                        player.last_name
                                    }
                                    className={css.PlayerImage}
                                    onError={handleImageFallback}
                                />
                            </Spin>
                        </div>
                    </Col>
                    <Col span={16}>
                        <h2>Player's Info</h2>
                        <List>
                            {/* TODO: Estrarre questa logica in un componente per visualizzare Oggetti */}
                            {Object.keys(player).map((key) => {
                                return key === 'team' ? null : (
                                    <List.Item key={key}>
                                        <strong>
                                            {key.replace('_', ' ')}:
                                        </strong>{' '}
                                        {player[key]}
                                    </List.Item>
                                );
                            })}
                        </List>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    <Col span={10}>
                        <h2>Team's Info</h2>
                        <List>
                            {player.team && (
                                <>
                                    <List.Item>
                                        <strong>Name:</strong>{' '}
                                        {player.team.full_name}{' '}
                                        <strong>
                                            [{player.team.abbreviation}]
                                        </strong>
                                    </List.Item>
                                    <List.Item>
                                        <strong>City:</strong>{' '}
                                        {player.team.city}
                                    </List.Item>
                                    <List.Item>
                                        <strong>Conference:</strong>{' '}
                                        {player.team.conference}
                                    </List.Item>
                                    <List.Item>
                                        <strong>Division:</strong>{' '}
                                        {player.team.division}
                                    </List.Item>
                                </>
                            )}
                        </List>
                    </Col>
                    <Col span={14}>
                        <h2>Team's Players</h2>
                        <Spin
                            spinning={
                                gameReq === 'pending' ||
                                playerStatsReq === 'pending'
                            }
                        >
                            {teamMembers !== null ? (
                                <PlayersList players={teamMembers} cols={2} />
                            ) : (
                                <h3>
                                    This player is either retired or has not
                                    played a single game in the 2019-2020
                                    season. So we cannot find Teammate's data.
                                </h3>
                            )}
                        </Spin>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default PlayerCard;
