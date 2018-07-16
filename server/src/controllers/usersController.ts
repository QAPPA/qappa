import {
    Controller, Get, Post,
    Authenticated, Required, BodyParams,
    Delete
} from '@tsed/common';

export interface User {
    id: string;
    name: string;
}

@Controller('/users')
export class UsersController {

    @Get('/')
    async getUsers() {
        return [{ id: '1', name: 'test' }];
    }

    @Post('/')
    @Authenticated()
    async post(@Required() @BodyParams('user') user: User) {
        return new Promise<User>((resolve: Function, reject: Function) => {
            user.id = '1';
            resolve(user);
        });
    }

    @Delete('/')
    @Authenticated()
    async deleteItem(@BodyParams('user.id') @Required() id: string) {
        return { id, name: 'user' };
    }
}
