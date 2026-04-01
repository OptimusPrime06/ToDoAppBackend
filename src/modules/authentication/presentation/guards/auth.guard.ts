import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}

    // Checks access token is still valid or not
    // TO BE USED in get user data in user module
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        let request = context.switchToHttp().getRequest();
        let authorization = request.headers.authorization;
        let token = authorization?.split(' ')[1];

        if(!token) {
            throw new UnauthorizedException();
        }

        try {
            await this.jwtService.verify(token);
            return true
        } catch(error) {
            throw new UnauthorizedException();
        }
    }
}