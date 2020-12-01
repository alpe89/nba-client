import { useState, useCallback } from 'react';

import { RequestState } from '../types';

const useApi = (endpoint: string): [RequestState, any, any, Function] => {
    const [request, setRequest] = useState<RequestState>('idle');
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const trigger = useCallback(
        async (
            updatedEndpoint: string | undefined = undefined
        ): Promise<void> => {
            try {
                setRequest('pending');
                setData(null);
                const data = await fetch(
                    updatedEndpoint ? updatedEndpoint : endpoint
                );
                const json = await data.json();
                setRequest('idle');
                setData(json);
            } catch (err) {
                setRequest('idle');
                setError(err);
            }
        },
        [endpoint]
    );

    return [request, data, error, trigger];
};

export { useApi };
