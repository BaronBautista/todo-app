export type AccountType = {
    _id: string;
    username: string;
}

export type AuthStoreType = {
    account: AccountType | null
    setAuthUser: (account: AccountType) => void
    logoutUser: () => void
}