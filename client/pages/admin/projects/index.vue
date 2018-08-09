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
                        label="Status">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.open"
                                class="openedProject">
                                <span class="el-icon-success"></span> Opened
                            </span>
                            <span
                                v-else
                                class="closedProject">
                                <span class="el-icon-error"></span> Closed
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="Operations">
                        <template slot-scope="scope">
                            <nuxt-link
                                :to="`/admin/projects/edit/${scope.row.id}`"
                                title="Edit project">
                                <span class="el-icon-edit"></span>
                            </nuxt-link>
                            <el-button
                                :title="`${scope.row.open ? 'Close' : 'Open'} project`"
                                class="operationButton"
                                type="text"
                                @click="handleProjectToggle(scope.row.id)">
                                <span
                                    v-if="scope.row.open"
                                    class="el-icon-circle-close-outline">
                                </span>
                                <span
                                    v-else
                                    class="el-icon-circle-check-outline">
                                </span>
                            </el-button>
                            <el-button
                                class="operationButton"
                                type="text"
                                title="Delete project"
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
                pageTitle: 'Projects',
                projects: [
                    {
                        id: '',
                        name: '',
                        deadline: '',
                        open: false,
                        responsible: '',
                        team: ''
                    }
                ]
            };
        },
        async asyncData() {
            // TODO: simulated API call, probably not accurate, depicting mostly the data transformation
            const response = [
                {
                    id: 0,
                    name: 'Project 1',
                    deadline: '27/08/2018',
                    open: true,
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
                    open: false,
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
                    open: project.open,
                    responsible,
                    team
                };
            });
            return {
                projects
            };
        },
        methods: {
            handleProjectToggle(id) {
                const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
                const project = this.projects.find(p => p.id === id);
                const operation = (project.open) ? 'close' : 'open';
                this.$confirm(`Are you sure you want to ${operation} this project?`, {
                    type: 'warning',
                    confirmButtonText: capitalize(operation),
                    confirmButtonClass: 'el-button--danger'
                }).then(() => {
                    console.log(`${capitalize(operation)} project id`, id);
                    project.open = !project.open;
                });
            },
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
    span.el-icon-delete, span.el-icon-circle-close-outline
        color: red
        font-size: x-large
    span.el-icon-circle-check-outline
        color: green
        font-size: x-large
    .operationButton
        margin-left: 10px
        padding: 0
    .openedProject
        color: green
    .closedProject
        color: red
</style>
