interface PlayerObjKeys {
    [key: string]: any;
}

interface Player extends PlayerObjKeys {
    first_name: string;
    height_feet: number | undefined;
    height_inches: number | undefined;
    id: number;
    last_name: string;
    position: 'PM' | 'G' | 'F' | 'G-F' | 'C' | '';
    team: Team | undefined;
    weight_pounds: number | undefined;
}

type Team = {
    abbreviation: string;
    city: string;
    conference: 'East' | 'West';
    division:
        | 'Atlantic'
        | 'Pacific'
        | 'Southeast'
        | 'Central'
        | 'Southwest'
        | 'Northwest';
    full_name: string;
    name: string;
};

type RequestState = 'idle' | 'pending';

export { Player, Team, RequestState };
