<template>
    <div>
        <app-breadcrumb :items="breadcrumbItems" />
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
                        prop="email"
                        label="Email">
                    </el-table-column>
                    <el-table-column
                        prop="admin"
                        label="Admin">
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
            title: 'Users'
        };
    },
    data() {
        return {
            users: [],
            breadcrumbItems: [
                { id: 0, name: 'admin', path: '/admin' },
                { id: 1, name: 'list all users', path: '/admin/list' }
            ]
        };
    },
    async mounted() {
        const { users } = await this.$axios.$get('/users');
        this.users = users.map(user => ({
            id: user.id,
            email: user.email,
            admin: user.admin.toString()
        }));
    }
};
</script>
