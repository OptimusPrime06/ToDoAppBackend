import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { AccessTokenPayload } from "../repositories.interfaces/access.token.payload";
import { RefreshTokenPayload } from "../repositories.interfaces/refresh.token.payload";
import ms from 'ms'

@Injectable()
export class TokenService {

    async generateAccessToken(payload: AccessTokenPayload): Promise<string> {
        return jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as ms.StringValue}
        );
    }

    async generateRefreshToken(payload: RefreshTokenPayload): Promise<string>  {
        return jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as ms.StringValue}
        );
    }
    
}