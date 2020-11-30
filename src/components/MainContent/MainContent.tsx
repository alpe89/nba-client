import React, { useState, useEffect } from "react";
import { Input, Button, Divider } from "antd";

import { Player } from "../../types";

const MainContent: React.FC = () => {
    const [playerName, setPlayerName] = useState<string>("");
    const [playerSurname, setPlayerSurname] = useState<string>("");
    const [playerFullName, setPlayerFullName] = useState<string | null>(null);
    const [playerData, setPlayerData] = useState<Player | null>(null);

    const handlePlayerSearch = (evt: React.FormEvent<HTMLFormElement>): void => {
        evt.preventDefault();
        if (playerName === "" && playerSurname === "") {
            setPlayerFullName(null);
        } else {
            setPlayerFullName(playerName + " " + playerSurname);
        }
    };

    const resetFullName = (): void => {
        if (playerName === "" && playerSurname === "") {
            setPlayerFullName(null);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${playerFullName}`);
            return await response.json();
        }
        console.log("full name", playerFullName);
        if (playerFullName !== null) {
            fetchData().then(response => setPlayerData(response.data[0]));
        }
    }, [playerFullName]);

    return (
        <main>
            <section>
                <form onSubmit={handlePlayerSearch}>
                    <div>
                        <label>Player Name</label>
                        <Input
                            placeholder="Player's name here..."
                            allowClear
                            size="large"
                            value={playerName}
                            onChange={(evt) => {setPlayerName(evt.target.value); resetFullName();}}
                            />
                    </div>
                    <div>
                        <label>Player Surname</label>
                        <Input
                            placeholder="Player's surname here..."
                            allowClear
                            size="large"
                            value={playerSurname}
                            onChange={(evt) => {setPlayerSurname(evt.target.value); resetFullName();}}
                            />
                    </div>
                    <div>
                        <Button htmlType="submit" type="primary">Get Player's Card</Button>
                    </div>
                </form>
            </section>
            <Divider />
            <section>
                { playerData && <pre>{JSON.stringify(playerData, null, 4)}</pre>}
            </section>
        </main>
    );
};

export default MainContent;