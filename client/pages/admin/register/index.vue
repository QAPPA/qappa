<template>
    <el-col :span="12">
        <h1>Register new user</h1>
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="150px">
            <el-form-item
                label="E-mail"
                prop="email">
                <el-input
                    v-model="form.email"
                    :minlength="5"
                    :maxlength="100"></el-input>
            </el-form-item>
            <el-form-item
                label="Password"
                prop="password">
                <el-input
                    v-model="form.password"
                    :minlength="5"
                    :maxlength="255"
                    type="password"></el-input>
            </el-form-item>
            <el-form-item label="Admin">
                <el-switch v-model="form.admin"></el-switch>
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
            form: {
                email: '',
                password: '',
                admin: true,
            },
            rules: {
                email: [
                    {
                        required: true,
                        message: 'Please fill in email.',
                        trigger: 'change'
                    },
                    {
                        type: 'email',
                        message: 'Email must be a valid email.',
                        trigger: 'change'
                    },
                    {
                        min: 5,
                        max: 100,
                        message: 'Email must be between 5 and 100 characters long.',
                        trigger: 'change'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: 'Please fill in password.',
                        trigger: 'change'
                    },
                    {
                        min: 5,
                        max: 255,
                        message: 'Password must be between 5 and 255 characters long.',
                        trigger: 'change'
                    }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.$axios.$post('/users', {
                    email: this.form.email,
                    password: this.form.password,
                    admin: this.form.admin
                }).then(() => {
                    this.$router.push('/admin');
                    this.$notify({
                        type: 'success',
                        title: 'Success',
                        message: 'Registration successful'
                    });
                }).catch((error) => {
                    this.$notify({
                        type: 'error',
                        title: 'Error',
                        message: error.response.data.message
                    });
                });
            });
        }
    }
};
</script>
