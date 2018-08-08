<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Project</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <el-table
                    :data="projects"
                    empty-text="No projects found">
                    <el-table-column
                        prop="id"
                        label="ID"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="Name"
                        width="400">
                    </el-table-column>
                    <el-table-column
                        prop="deadline"
                        label="Deadline"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="responsible"
                        label="Responsible person"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        prop="team"
                        label="Team members">
                    </el-table-column>
                    <el-table-column
                        label="Operations">
                        <template slot-scope="scope">
                            <nuxt-link :to="`/admin/projects/edit/${scope.row.id}`">
                                <span class="el-icon-edit"></span>
                            </nuxt-link>
                            <el-button
                                class="deleteButton"
                                type="text"
                                @click="handleProjectDelete(scope.row.id)">
                                <span class="el-icon-delete"></span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: this.pageTitle
            };
        },
        data() {
            return {
                pageTitle: 'Projects'
            };
        },
        async asyncData() {
            // TODO: simulated API call, probably not accurate, depicting mostly the data transformation
            const response = [
                {
                    id: 0,
                    name: 'Project 1',
                    deadline: '27/08/2018',
                    responsibleUser: {
                        id: 0,
                        name: 'Carl',
                        surname: 'Johnson'
                    },
                    users: [
                        {
                            user: {
                                id: 0,
                                name: 'Carl',
                                surname: 'Johnson'
                            },
                            roles: [
                                {
                                    id: 0,
                                    name: 'Tester'
                                },
                                {
                                    id: 1,
                                    name: 'Developer'
                                }
                            ]
                        },
                        {
                            user: {
                                id: 1,
                                name: 'Jessica',
                                surname: 'Mellow'
                            },
                            roles: [
                                {
                                    id: 1,
                                    name: 'Developer'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Project 2',
                    deadline: '30/04/2019',
                    responsibleUser: {
                        id: 1,
                        name: 'Jessica',
                        surname: 'Mellow'
                    },
                    users: [
                        {
                            user: {
                                id: 1,
                                name: 'Jessica',
                                surname: 'Mellow'
                            },
                            roles: [
                                {
                                    id: 1,
                                    name: 'Developer'
                                }
                            ]
                        }
                    ]
                }
            ];
            const projects = response.map(project => {
                const responsible = `${project.responsibleUser.name} ${project.responsibleUser.surname}`;
                const team = project.users.map(member => {
                   const name = `${member.user.name} ${member.user.surname}`;
                   const roles = member.roles.map(role => role.name).join(',');
                   return `${name} (${roles})`;
                }).join(', ');
                return {
                    id: project.id,
                    name: project.name,
                    deadline: project.deadline,
                    responsible,
                    team
                };
            });
            return {
                projects
            };
        },
        methods: {
            handleProjectDelete(id) {
                this.$confirm('Are you sure you want to delete this project?', {
                    type: 'warning',
                    confirmButtonText: 'Delete',
                    confirmButtonClass: 'el-button--danger'
                }).then(() => {
                    console.log('Delete project id', id);
                    this.projects = this.projects.filter(project => project.id !== id);
                });
            }
        }
    };
</script>

<style lang="sass" scoped>
    span.el-icon-edit
        color: orange
        font-size: x-large
    span.el-icon-delete
        color: red
        font-size: x-large
    .deleteButton
        margin-left: 10px
        padding: 0
</style>
