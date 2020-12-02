import React from 'react';
import { List, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TeamLogo from '../TeamLogo/TeamLogo';
import { Player } from '../../types';
import { playerSelected } from '../../.redux/store';

interface PlayersListProps {
    players: Player[];
}

const PlayersList: React.FC<PlayersListProps> = ({
    players,
}: PlayersListProps) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const selectPlayer = (player: Player) => {
        dispatch(playerSelected(player));
        history.push('/player');
    };

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
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
                            minHeight: '170px',
                            minWidth: '275px',
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
    );
};

export default PlayersList;
