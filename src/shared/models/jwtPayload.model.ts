
export interface JwtPayload {
    correo: string;
    userId: string;
    exp: number;
    iat: number;    
}