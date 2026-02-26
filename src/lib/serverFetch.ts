import { getCookies } from "@/services/auth/tokenHandler"


const BackendURL =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL

const buildRequestUrl = (endpoint: string): string | null => {
    if (!BackendURL) {
        return null
    }

    try {
        const normalizedBase = BackendURL.endsWith("/")
            ? BackendURL
            : `${BackendURL}/`
        const normalizedEndpoint = endpoint.startsWith("/")
            ? endpoint.slice(1)
            : endpoint

        return new URL(normalizedEndpoint, normalizedBase).toString()
    } catch {
        return null
    }
}

const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options
    const accessToken = await getCookies("accessToken")
    const requestUrl = buildRequestUrl(endpoint)

    if (!requestUrl) {
        console.error("Server fetch error: Backend URL is missing or invalid")
        return new Response(
            JSON.stringify({
                success: false,
                message: "Backend URL is missing or invalid",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        )
    }

    const requestHeaders = new Headers(headers)
    if (accessToken) {
        requestHeaders.set("Cookie", `accessToken=${accessToken}`)
    }

    try {
        const response = await fetch(requestUrl, {
            headers: requestHeaders,
            ...restOptions
        })
        return response
    } catch (error) {
        console.error("Server fetch network error:", error)
        return new Response(
            JSON.stringify({
                success: false,
                message: "Failed to connect to backend service",
            }),
            {
                status: 503,
                headers: { "Content-Type": "application/json" },
            }
        )
    }


}

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),

    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),

}
