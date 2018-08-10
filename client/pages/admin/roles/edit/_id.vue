<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Edit team role</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6">
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
                            @click="handleSubmit">Submit</el-button>
                    </el-form-item>
                </el-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

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
                form: {
                    id: '',
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
        computed: {
            ...mapGetters({
                error: 'errors/rolesError'
            })
        },
        mounted() {
            if (this.error) {
                this.$router.replace({ path: '/admin/roles' });
            }
        },
        async asyncData({ app, params, store }) {
            try {
                const response = await app.$axios.$get(`/roles/${params.id}`);
                return {
                    form: {
                        ...response
                    }
                };
            } catch (error) {
                store.dispatch('errors/setRolesError', error.response.data.message);
            }
        },
        methods: {
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    this.$axios.$put(`/roles/${this.form.id}`, {
                        name: this.form.name
                    }).then(() => {
                        this.$router.push('/admin/roles');
                        this.$notify({
                            type: 'success',
                            title: 'Success',
                            message: 'Role updated',
                            position: 'bottom-right'
                        });
                    }).catch((error) => {
                        this.$notify({
                            type: 'error',
                            title: 'Error',
                            message: error.response.data.message,
                            position: 'bottom-right'
                        });
                    });
                });
            }
        }
    };
</script>

<style lang="sass" scoped>
    .el-form
        margin-top: 20px
</style>
