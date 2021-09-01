import {useLocation} from 'react-router-dom';

export function useUrlParams(): URLSearchParams {
    return new URLSearchParams(useLocation().search)
}
