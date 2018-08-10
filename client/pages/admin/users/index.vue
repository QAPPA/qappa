<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Users</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <el-table
                    :data="users"
                    empty-text="No users found">
                    <el-table-column
                        prop="id"
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="Name">
                    </el-table-column>
                    <el-table-column
                        prop="surname"
                        label="Surname">
                    </el-table-column>
                    <el-table-column
                        prop="email"
                        label="Email">
                    </el-table-column>
                    <el-table-column
                        label="Admin">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.admin"
                                class="admin">
                                <span class="el-icon-success"></span> True
                            </span>
                            <span
                                v-else
                                class="notAdmin">
                                <span class="el-icon-error"></span> False
                            </span>
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
            pageTitle: 'Users',
            users: [
                {
                    id: '',
                    name: '',
                    surname: '',
                    email: '',
                    admin: ''
                }
            ]
        };
    },
    async asyncData({ app }) {
        const { users } = await app.$axios.$get('/users');
        return {
            users
        };
    }
};
</script>

<style lang="sass" scoped>
    .admin
        color: green
    .notAdmin
        color: red
    .el-table
        margin-top: 20px
</style>
