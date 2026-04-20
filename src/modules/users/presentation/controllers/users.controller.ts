import { Controller, Query, Delete, Inject, NotFoundException, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "../../business-logic/services/users.service";
import { AuthGuard } from "src/modules/authentication/presentation/guards/auth.guard";

@Controller('users')
export class UsersController {
    constructor(@Inject() private readonly usersService: UsersService,){}

    //Delete User
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Delete('delete')
    async deleteUser(@Query('userId') userId: string) {
        let didDeleteUser = await this.usersService.deleteUserById(userId);
        if(didDeleteUser === false) {
            throw new NotFoundException('User not found');
        }
        return {
            message: 'user account and data deleted successfully'
        }
    }

}