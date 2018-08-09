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
                pageTitle: 'Edit team role',
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
        async asyncData({ app, params }) {
            app.$axios
                .$get(`/roles/${params.id}`)
                .then(response => {
                    return {
                        form: {
                            id: response.id,
                            name: response.name
                        }
                    };
                }).catch(error => {
                    app.$router.push('/admin/roles');
                    app.$notify({
                        type: 'error',
                        title: 'Error',
                        message: error.response.data.message,
                        position: 'bottom-right'
                    });
                });
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
