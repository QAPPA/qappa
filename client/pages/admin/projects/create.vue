<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Create a new project</h1>
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
                    <el-form-item
                        label="Deadline"
                        prop="deadline">
                        <el-date-picker
                            v-model="form.deadline"
                            :picker-options="deadlineOptions"
                            type="date"
                            placeholder="Pick a date"
                            format="dd/MM/yyyy"
                            value-format="dd/MM/yyyy">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="handleSubmit">Create</el-button>
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
    data() {
        return {
            pageTitle: 'Create a project',
            form: {
                name: '',
                deadline: '', // in the format dd/MM/yyyy !
            },
            deadlineOptions: {
                disabledDate(time) {
                    const yesterday = Date.now() - (24 * 60 * 60 * 1000);
                    return time.getTime() <= yesterday;
                }
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: 'Please fill in project name.',
                        trigger: 'change'
                    },
                    {
                        max: 100,
                        message: 'Project name must be less than 100 characters long.',
                        trigger: 'change'
                    }
                ],
                deadline: [
                    {
                        required: true,
                        message: 'Please fill in project deadline.',
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
                // API call
                console.log('Calling API with', this.form.name, this.form.deadline);
                alert('Project created');
            });
        }
    }
};
</script>
