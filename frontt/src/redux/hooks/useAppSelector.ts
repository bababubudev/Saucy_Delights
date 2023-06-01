import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {GlobalState} from '../store';

const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;
export default useAppSelector;