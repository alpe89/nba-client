import React, { useState, useEffect } from 'react';
import { Input, Spin, Divider, notification } from 'antd';

import { useApi } from '../../hooks/useApi';
import PlayersList from '../PlayersList/PlayersList';

const { Search } = Input;

const SearchPlayer: React.FC = () => {
    const [searchFor, setSearchFor] = useState<string>('');
    const [request, players, error, getPlayers] = useApi(
        'https://www.balldontlie.io/api/v1/players'
    );

    const handleSearch = (value: string): void => {
        if (value === '') {
            notification.warning({
                message: 'Search term cannot be blank',
                description: 'You may search something like Kobe...',
                placement: 'topRight',
                duration: 2,
            });
        } else {
            setSearchFor(value);
        }
    };

    useEffect(() => {
        if (searchFor === '') return;

        getPlayers(
            `https://www.balldontlie.io/api/v1/players?search=${searchFor}`
        );
    }, [searchFor, getPlayers]);

    return (
        <main>
            <section>
                <form>
                    <div>
                        <label>Search for Players</label>
                        <Search
                            placeholder="Enter something like Lebron or Michael Jordan or Shaq"
                            allowClear
                            enterButton
                            size="large"
                            onSearch={handleSearch}
                        />
                    </div>
                </form>
            </section>
            <Divider />
            <section>
                <Spin spinning={request === 'pending'}>
                    {players && <PlayersList players={players.data} />}
                    {error &&
                        notification.error({
                            message: 'Network Request Error',
                            description: error.message,
                            placement: 'bottomRight',
                            duration: 3,
                        })}
                </Spin>
            </section>
        </main>
    );
};

export default SearchPlayer;
