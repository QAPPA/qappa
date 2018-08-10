<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Team roles</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <el-table
                    :data="roles"
                    empty-text="No roles found">
                    <el-table-column
                        prop="id"
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="Name">
                    </el-table-column>
                    <el-table-column
                        label="Operations">
                        <template slot-scope="scope">
                            <nuxt-link
                                :to="`/admin/roles/edit/${scope.row.id}`"
                                title="Edit team role">
                                <span class="el-icon-edit"></span>
                            </nuxt-link>
                            <el-button
                                class="deleteButton"
                                type="text"
                                title="Delete team role"
                                @click="handleRoleDelete(scope.row.id)">
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
import { mapGetters, mapActions } from 'vuex';

export default {
    head() {
        return {
            title: this.pageTitle
        };
    },
    middleware: 'admin',
    data() {
        return {
            pageTitle: 'Team roles',
            roles: [
                {
                    id: '',
                    name: ''
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
          error: 'errors/rolesError'
        })
    },
    async asyncData({ app }) {
        const roles = await app.$axios.$get('/roles');
        return {
            roles
        };
    },
    mounted() {
        if (this.error) {
            this.$notify({
                type: 'error',
                title: 'Error',
                message: this.error,
                position: 'bottom-right'
            });
            this.removeRolesError();
        }
    },
    methods: {
        ...mapActions({
           removeRolesError: 'errors/removeRolesError'
        }),
        handleRoleDelete(id) {
            this.$confirm('Are you sure you want to delete this role?', {
                type: 'warning',
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger'
            }).then(() => {
                this.$axios.$delete(`/roles/${id}`)
                    .then((response) => {
                        this.$notify({
                            type: 'success',
                            title: 'Success',
                            message: response.message,
                            position: 'bottom-right'
                        });
                        this.roles = this.roles.filter(role => role.id !== id);
                    }).catch((error) => {
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
    span.el-icon-delete
        color: red
        font-size: x-large
    .deleteButton
        margin-left: 10px
        padding: 0
    .el-table
        margin-top: 20px
</style>
