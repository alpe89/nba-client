import { useState, useCallback } from 'react';

import { RequestState } from '../types';
/**
 *
 * Custom Hook per l'interrogazione di un endpoint, permette di
 * specificare o meno nel momento di inizializzazione un endpoint su
 * cui effettuare una richiesta. Se ciò non avviene si può comunque
 * utilizzare la funzione trigger ritornata per effettuare una chiamata
 * GET verso l'endpoint specificato come parametro.
 *
 * Ritorna un array contenenti, nel seguente ordine:
 *      Stato: della richiesta (pending o idle)
 *      Data: ricavata dalla chiamata in JSON
 *      Error: il messaggio derivante dall'errore verificatosi
 *      trigger: la funzione che esegue la chiamata get
 *
 * TODO: Permettere l'utilizzo di altri metodi HTTP
 *
 * @param {string | undefined} [endpoint]
 * @return {*}  {[RequestState, any, any, Function]}
 */
const useApi = (endpoint?: string): [RequestState, any, any, Function] => {
    const [request, setRequest] = useState<RequestState>('idle');
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const trigger = useCallback(
        async (
            updatedEndpoint: string | undefined = undefined
        ): Promise<void> => {
            try {
                setRequest('pending');
                setError(null);
                setData(null);
                if (!updatedEndpoint && !endpoint) {
                    throw new Error('An URL must be provided to useApi hook');
                }
                const data = await fetch(
                    updatedEndpoint ? updatedEndpoint : endpoint!
                );
                const json = await data.json();
                setRequest('idle');
                setData(json);
            } catch (err) {
                setRequest('idle');
                console.error(err);
                setError(err.message);
            }
        },
        [endpoint]
    );

    return [request, data, error, trigger];
};

export { useApi };
