type Player = {
    first_name: string;
    height_feet: number | undefined;
    height_inches: number | undefined;
    id: number;
    last_name: string;
    position: 'PM' | 'G' | 'F' | 'G-F' | 'C' | '';
    team: Team;
    weight_pounds: number;
};

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
