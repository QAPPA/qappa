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
            pageTitle: 'Team roles',
            roles: []
        };
    }
};
</script>
