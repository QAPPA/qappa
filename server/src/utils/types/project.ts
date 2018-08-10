export interface IProjectMember {
    userId: number;
    roleIds: number[];
}

export interface IProjectCreate {
    name: string;
    deadline: string;
    responsibleUserId: number;
    users: IProjectMember[];
}

export interface IProjectEdit extends IProjectCreate {
    open: boolean;
}
