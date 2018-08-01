<template>
    <el-col :span="12">
        <h1>Register new user</h1>
        <el-form
            ref="form"
            label-width="150px">
            <el-form-item label="E-mail">
                <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input
                    v-model="password"
                    type="password"></el-input>
            </el-form-item>
            <el-form-item label="Admin">
                <el-switch v-model="admin"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="handleSubmit">Register</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
export default {
    head() {
        return {
            title: 'Register'
        };
    },
    data() {
        return {
            email: '',
            password: '',
            admin: true
        };
    },
    methods: {
        handleSubmit() {

        }
    }
};
</script>
