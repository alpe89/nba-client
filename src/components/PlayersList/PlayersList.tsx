import React from 'react';
import { List, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TeamLogo from '../TeamLogo/TeamLogo';
import { Player } from '../../types';
import { playerSelected } from '../../.redux/store';

interface PlayersListProps {
    players: Player[];
    cols?: number;
}

const PlayersList: React.FC<PlayersListProps> = ({
    players,
    cols = 4,
}: PlayersListProps) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const selectPlayer = (player: Player) => {
        dispatch(playerSelected(player));
        history.push('/player');
    };

    return players.length > 0 ? (
        <List
            grid={{ gutter: 16, xs: 1, sm: cols, md: cols, lg: cols, xl: cols }}
            dataSource={players}
            renderItem={(player) => (
                <List.Item
                    onClick={() => selectPlayer(player)}
                    style={{ cursor: 'pointer' }}
                >
                    <Card
                        title={player.first_name + ' ' + player.last_name}
                        style={{
                            textAlign: 'center',
                            minHeight: '175px',
                            minWidth: `${100 / cols}%`,
                        }}
                    >
                        {player.team ? (
                            <>
                                <TeamLogo
                                    shortName={player.team.abbreviation}
                                    width={50}
                                />
                                <span style={{ marginLeft: '0.5rem' }}>
                                    <strong>{player.team.full_name}</strong>
                                </span>
                            </>
                        ) : (
                            'N/D'
                        )}
                    </Card>
                </List.Item>
            )}
        />
    ) : (
        <h2>No player was found</h2>
    );
};

export default PlayersList;
