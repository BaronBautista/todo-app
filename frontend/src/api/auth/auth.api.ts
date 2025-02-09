import axiosInstance from "../../axios/axiosInstance"

export const registerApi = async (username: string, password: string) => {
    const response = axiosInstance.post("/api/register", {
        username,
        password
    })

    return response
}

export const loginApi = async (username: string, password: string) => {
    const response = axiosInstance.post("/api/login", {
        username,
        password
    })

    return response
}