import React from 'react';
import { List, Card } from 'antd';

import { Player } from '../../types';

interface PlayersListProps {
    players: Player[];
}

const PlayersList: React.FC<PlayersListProps> = ({
    players,
}: PlayersListProps) => {
    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={players}
            renderItem={(player) => (
                <List.Item>
                    <Card title={player.first_name + ' ' + player.last_name}>
                        {player.team.full_name}
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default PlayersList;
