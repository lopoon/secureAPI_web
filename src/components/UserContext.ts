import React from 'react';

type UserData = {
    email: string,
    display_name: string,
    status: string,
    terms_of_service_opt_in: boolean,
    terms_version: string,
    privacy_opt_in: boolean,
    privacy_version: string,
    last_login: string,
    url_hash: string,
}
interface ContextProps {
    userData: UserData | null;
    setUserData: (userData: UserData) => void;
}
const UserContext = React.createContext<ContextProps>({
    userData: null,
    setUserData: () => null
});
export default UserContext;