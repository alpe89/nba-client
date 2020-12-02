import React from 'react';
import { List, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
                    <Card title={player.first_name + ' ' + player.last_name}>
                        {player.team?.full_name || 'N/D'}
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default PlayersList;
