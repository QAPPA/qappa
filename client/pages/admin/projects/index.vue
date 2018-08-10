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
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="Name">
                    </el-table-column>
                    <el-table-column
                        prop="deadline"
                        label="Deadline">
                    </el-table-column>
                    <el-table-column
                        prop="responsible"
                        label="Responsible person">
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
        async asyncData({ app }) {
            const response = await app.$axios.$get('/projects');
            const projects = response.map(project => {
                const responsible = `${project.responsibleUser.name} ${project.responsibleUser.surname}`;
                const team = project.members.map(member => {
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
        mounted() {
            const { error } = this.$route.query;
            if (error) {
                this.$notify({
                    type: 'error',
                    title: 'Error',
                    message: error,
                    position: 'bottom-right'
                });
            }
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
                    this.$axios.$put(`/projects/${id}/toggle`)
                        .then(response => {
                            project.open = !project.open;
                            this.$notify({
                                type: 'success',
                                title: 'Success',
                                message: response.message,
                                position: 'bottom-right'
                            });
                        }).catch(error => {
                            this.$notify({
                                type: 'error',
                                title: 'Error',
                                message: error.response.data.message,
                                position: 'bottom-right'
                            });
                        });
                });
            },
            handleProjectDelete(id) {
                this.$confirm('Are you sure you want to delete this project?', {
                    type: 'warning',
                    confirmButtonText: 'Delete',
                    confirmButtonClass: 'el-button--danger'
                }).then(() => {
                    this.$axios.$delete(`/projects/${id}`)
                        .then(response => {
                            this.projects = this.projects.filter(project => project.id !== id);
                            this.$notify({
                                type: 'success',
                                title: 'Success',
                                message: response.message,
                                position: 'bottom-right'
                            });
                        }).catch(error => {
                            this.$notify({
                                type: 'error',
                                title: 'Error',
                                message: error.response.data.message,
                                position: 'bottom-right'
                            });
                        });
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
    .el-table
        margin-top: 20px
</style>
