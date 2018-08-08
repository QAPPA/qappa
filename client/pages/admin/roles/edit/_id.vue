<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Edit team role</h1>
                <el-form
                    ref="form"
                    :model="form"
                    :rules="rules"
                    label-width="150px">
                    <el-form-item
                        label="Name"
                        prop="name">
                        <el-input
                            v-model="form.name"
                            :maxlength="100"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="handleSubmit">Add</el-button>
                    </el-form-item>
                </el-form>
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
        validate({ params }) {
            // route parameter id must be a number
            return /^\d+$/.test(params.id);
        },
        data() {
            return {
                pageTitle: 'New team role',
                form: {
                    id: -1,
                    name: ''
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: 'Please fill in role name.',
                            trigger: 'change'
                        },
                        {
                            max: 100,
                            message: 'Role name must be less than 100 characters long.',
                            trigger: 'change'
                        }
                    ]
                }
            };
        },
        mounted() {
            // TODO: API call for role detail using id: this.$route.params.id
            const response = {
                id: 0,
                name: 'Tester',
            };
            this.form.id = response.id;
            this.form.name = response.name;
        },
        methods: {
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    // TODO: actual call to backend
                    this.$router.push('/admin/roles');
                    this.$notify({
                        type: 'success',
                        title: 'Success',
                        message: 'Role updated',
                        position: 'bottom-right'
                    });
                });
            }
        }
    };
</script>
