export interface authState {
    user: { name: string, email: string },
    isAuthenticated: boolean,
    isGuest: boolean,
    loading: boolean
}

export interface authContextType {
    auth: authState,
    login: (userData: { name: string, email: string }) => void,
    logout: () => void
}