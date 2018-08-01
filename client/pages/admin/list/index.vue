<template>
    <div>
        <h1>Users</h1>
        <el-table :data="users">
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
            users: [
                {
                    id: 1,
                    email: 'dummy1@qappa.net',
                    admin: true.toString(),
                },
                {
                    id: 2,
                    email: 'dummy2@qappa.net',
                    admin: false.toString(),
                }
            ]
        };
    }
};
</script>
