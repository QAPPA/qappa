<template>
    <div>
        <h1>Users</h1>
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
            users: []
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
