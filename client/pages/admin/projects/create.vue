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
                            format="dd.MM.yyyy"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item
                        label="Responsible person"
                        prop="responsibleUserId">
                        <el-select
                            v-model="form.responsibleUserId"
                            clearable
                            placeholder="Select a person">
                            <el-option
                                v-for="user in users"
                                :key="user.id"
                                :label="user.name"
                                :value="user.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="Team members"
                        prop="members">
                        <b-row
                            v-for="(member, index) in form.members"
                            :key="index"
                            class="mb-2">
                            <b-col cols="2">
                                <el-select
                                    v-model="member.userId"
                                    clearable
                                    placeholder="Select a person"
                                    @change="handlePersonChange"
                                    @clear="handlePersonClear(index)">
                                    <el-option
                                        v-for="user in userSelectOptions"
                                        :key="user.id"
                                        :label="user.name"
                                        :value="user.id"
                                        :disabled="user.disabled">
                                    </el-option>
                                </el-select>
                            </b-col>
                            <b-col cols="8">
                                <el-select
                                    v-if="member.userId !== undefined && member.userId !== ''"
                                    v-model="member.roleIds"
                                    class="roleSelect"
                                    multiple
                                    placeholder="Select roles"
                                    @change="handlePersonChange">
                                    <el-option
                                        v-for="role in roles"
                                        :key="role.id"
                                        :label="role.name"
                                        :value="role.id">
                                    </el-option>
                                </el-select>
                            </b-col>
                        </b-row>
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
            roles: [
                {
                    id: '',
                    name: ''
                }
            ],
            users: [
                {
                    id: '',
                    name: ''
                }
            ],
            form: {
                name: '',
                deadline: '',
                responsibleUserId: '',
                members: [
                    {
                        userId: '',
                        roleIds: []
                    }
                ],
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
                ],
                responsibleUserId: [
                    {
                        required: true,
                        message: 'Please select a responsible person for this project.',
                        trigger: 'change'
                    }
                ],
                members: [
                    {
                        validator: (rule, value, callback) => {
                            // if at least one user is valid, return ok
                            value.forEach(member => {
                                if (member.userId !== '' && member.roleIds.length > 0) {
                                    return callback();
                                }
                            });
                            callback(new Error(rule.message));
                        },
                        required: true,
                        message: 'Please select at least one team member',
                        trigger: 'change'
                    },
                    {
                        validator: (rule, value, callback) => {
                            // if we have another user available, there's an empty row, that's why we need to limit the loop
                            // validates all selected users so they have at least one role
                            const limit = (this.availableUsers.length === 0) ? value.length : value.length - 1;
                            for (let i = 0; i < limit; i++) {
                                const member = value[i];
                                if (member.userId === '' || member.roleIds.length === 0) {
                                    return callback(new Error(rule.message));
                                }
                            }
                            callback();
                        },
                        required: true,
                        message: 'Make sure all selected members have at least 1 role',
                        trigger: 'change'
                    }
                ]
            }
        };
    },
    async asyncData() {
        // TODO: API calls for users and roles
        const users = [
            { id: 0, name: 'Carl' },
            { id: 1, name: 'John' },
            { id: 2, name: 'Jessica' }
        ];
        const roles = [
            { id: 0, name: 'Tester' },
            { id: 1, name: 'Developer' },
            { id: 2, name: 'Analyst' }
        ];
        return {
            users,
            roles
        };
    },
    computed: {
        userSelectOptions() {
            // returns all users, but those that are used have disabled flag set to true
            return this.users.map(user => {
                const isUsed = this.form.members.some(member => member.userId === user.id);
                return {
                    id: user.id,
                    name: user.name,
                    disabled: isUsed
                };
            });
        },
        availableUsers() {
            // returns only those users that have not been used
            return this.users.filter(user => this.form.members.every(member => member.userId !== user.id));
        }
    },
    methods: {
        handlePersonChange() {
            const lastMember = this.form.members[this.form.members.length - 1];
            // if last user in array is picked and there are more available users, add another row
            if (lastMember.userId !== '' && this.availableUsers.length > 0) {
                this.form.members.push({
                    userId: '',
                    roleIds: []
                });
            }
        },
        handlePersonClear(index) {
            // if there's more than 1 row, remove the whole row, otherwise just reset data
            if (this.form.members.length > 1) {
                this.form.members.splice(index, 1);
            }
            else {
                this.form.members[index].userId = '';
                this.form.members[index].roleIds = [];
            }
        },
        handleSubmit() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return;
                }
                // API call
                console.log('Calling API with');
                console.log('form.name', this.form.name);
                console.log('form.deadline', this.form.deadline);
                console.log('form.responsibleUserId', this.form.responsibleUserId);
                console.log('form.members', this.form.members);
                alert('Project created');
            });
        }
    }
};
</script>

<style lang="sass" scoped>
    .roleSelect
        width: 50%
</style>
