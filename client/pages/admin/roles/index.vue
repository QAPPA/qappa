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
                            <nuxt-link :to="`/admin/roles/edit/${scope.row.id}`">
                                <span class="el-icon-edit"></span>
                            </nuxt-link>
                            <el-button
                                class="deleteButton"
                                type="text"
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
export default {
    head() {
        return {
            title: this.pageTitle
        };
    },
    middleware: 'admin',
    data() {
        return {
            pageTitle: 'Team roles'
        };
    },
    async asyncData() {
        // TODO: API call for roles
        const roles = [
            {
                id: 0,
                name: 'Tester'
            },
            {
                id: 1,
                name: 'Developer'
            },
            {
                id: 2,
                name: 'Analyst'
            }
        ];
        return {
            roles
        };
    },
    methods: {
        handleRoleDelete(id) {
            this.$confirm('Are you sure you want to delete this role?', {
                type: 'warning',
                confirmButtonText: 'Delete',
                confirmButtonClass: 'el-button--danger'
            }).then(() => {
                console.log('Delete role id', id);
                this.roles = this.roles.filter(role => role.id !== id);
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
