export interface backendResponseInterface {
    statusCode: number;
    message: string;
}

export interface authResponseInterface {
    statusCode: number
    message?: string;
    error?: string;
    user?: {
        id: number;
        email: string;
        role: string;
        iat: number;
        exp: number;
    };
}