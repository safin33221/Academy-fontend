import { getCookies } from "@/services/auth/tokenHandler"


const BackendURL = process.env.NEXT_PUBLIC_BACKEND_URL
// const BackendURL = "https://future-programmer-innovators-sever-production.up.railway.app/api/v1"
const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options
    const accessToken = await getCookies("accessToken")

    const response = await fetch(`${BackendURL}${endpoint}`, {
        headers: {
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            ...headers
        },
        ...restOptions
    })
    return response


}

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),

    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),

}