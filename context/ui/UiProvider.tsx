import { FC, useReducer } from 'react';
import { UiContext, uiReducer } from './';

type Props = {
    children?: JSX.Element | JSX.Element[];
}
export interface UiState {
    isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false
}

export const UiProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE)


    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' })
    }

    return (
        < UiContext.Provider value={{
            ...state

            //methods
            , toggleSideMenu
        }}>
            {children}
        </ UiContext.Provider>
    )
};