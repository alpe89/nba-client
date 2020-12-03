import React from 'react';
import { Image } from 'antd';

interface TeamLogoProps {
    shortName: string;
    width?: string | number;
    height?: string | number;
}

const TeamLogo: React.FC<TeamLogoProps> = ({
    shortName,
    width = '100%',
    height = 'auto',
}: TeamLogoProps) => {
    const imageURL = `${window.location.origin}/logos/${shortName}.png`;

    return (
        <Image
            preview={false}
            src={imageURL}
            width={width}
            height={height}
            fallback="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        />
    );
};

export default TeamLogo;
