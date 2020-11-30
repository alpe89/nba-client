import React from "react";
import { Input } from "antd";

const {Search} = Input;

const MainContent: React.FC = () => {
    return (
        <main>
            <section>
                <form>
                    <div>
                        <label>Search for a Player</label>
                        <Search
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={() => { console.log('search')} }
                            />
                    </div>
                </form>
            </section>
            <hr/>
            <section>
                
            </section>
        </main>
    );
};

export default MainContent;