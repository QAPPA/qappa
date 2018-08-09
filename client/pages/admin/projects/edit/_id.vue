<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Edit project</h1>
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
                        label="Opened"
                        prop="open">
                        <el-switch v-model="form.open"></el-switch>
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
                        prop="users">
                        <b-row
                            v-for="(user, index) in form.users"
                            :key="index"
                            class="mb-2">
                            <b-col cols="2">
                                <el-select
                                    v-model="user.userId"
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
                                    v-if="user.userId !== undefined && user.userId !== ''"
                                    v-model="user.roleIds"
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
                            @click="handleSubmit">Submit</el-button>
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
            // route param id must be a number
            return /^\d+$/.test(params.id);
        },
        data() {
            return {
                pageTitle: 'Edit project',
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
                    id: '',
                    name: '',
                    deadline: '',
                    open: false,
                    responsibleUserId: '',
                    users: [
                        {
                            userId: '',
                            roleIds: []
                        }
                    ]
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
                    open: [
                        {
                            required: true,
                            message: 'Please select project status.',
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
                    users: [
                        {
                            validator: (rule, value, callback) => {
                                // if at least one user is valid, return ok
                                value.forEach(user => {
                                    if (user.userId !== '' && user.roleIds.length > 0) {
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
                                    const user = value[i];
                                    if (user.userId === '' || user.roleIds.length === 0) {
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
        computed: {
            userSelectOptions() {
                // returns all users, but those that are used have disabled flag set to true
                return this.users.map(user => {
                    const isUsed = this.form.users.some(formUser => formUser.userId === user.id);
                    return {
                        id: user.id,
                        name: user.name,
                        disabled: isUsed
                    };
                });
            },
            availableUsers() {
                // returns only those users that have not been used
                return this.users.filter(user => this.form.users.every(formUser => formUser.userId !== user.id));
            }
        },
        async asyncData({ params }) {
            // TODO: API call using params.id
            // TODO: error handling https://nuxtjs.org/guide/async-data#handling-errors
            const data = {
                form: {}
            };
            const response = {
                id: 0,
                name: 'Project 1',
                deadline: '2018-08-27',
                open: true,
                responsibleUserId: 0,
                users: [
                    {
                        userId: 0,
                        roleIds: [0, 1]
                    },
                    {
                        userId: 1,
                        roleIds: [1]
                    },
                    {
                        userId: 2,
                        roleIds: [2]
                    },
                ]
            };
            data.form.id = response.id;
            data.form.name = response.name;
            data.form.deadline = response.deadline;

            // construct available users
            // API calls
            const userResponse = {
                users: [
                    {
                        id: 0,
                        name: 'Carl',
                        surname: 'Johnson',
                        email: 'carl@qappa.net',
                        admin: false,
                    },
                    {
                        id: 1,
                        name: 'Jessica',
                        surname: 'Mellow',
                        email: 'jessica@qappa.net',
                        admin: false,
                    },
                    {
                        id: 2,
                        name: 'John',
                        surname: 'Duke',
                        email: 'john@qappa.net',
                        admin: false,
                    },
                    {
                        id: 3,
                        name: 'Lucas',
                        surname: 'Frowning',
                        email: 'lucas@qappa.net',
                        admin: false,
                    }
                ]
            };
            data.users = userResponse.users.map(user => ({
                id: user.id,
                name: `${user.name} ${user.surname}`
            }));
            // direct API call, returns exactly this format
            data.roles = [
                { id: 0, name: 'Tester' },
                { id: 1, name: 'Developer' },
                { id: 2, name: 'Analyst' }
            ];
            data.form.open = response.open;
            data.form.responsibleUserId = response.responsibleUserId;
            data.form.users = response.users;

            const availableUsers = data.users.filter(user => data.form.users.every(formUser => formUser.userId !== user.id));
            if (availableUsers.length > 0) {
                data.form.users.push({
                    userId: '',
                    roleIds: []
                });
            }
            return data;
        },
        methods: {
            handlePersonChange() {
                const lastUser = this.form.users[this.form.users.length - 1];
                // if last user in array is picked and there are more available users, add another row
                if (lastUser.userId !== '' && this.availableUsers.length > 0) {
                    this.form.users.push({
                        userId: '',
                        roleIds: []
                    });
                }
            },
            handlePersonClear(index) {
                // if there's more than 1 row, remove the whole row, otherwise just reset data
                if (this.form.users.length > 1) {
                    this.form.users.splice(index, 1);
                }
                else {
                    this.form.users[index].userId = '';
                    this.form.users[index].roleIds = [];
                }
            },
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    // API call
                    console.log('Calling API with');
                    console.log('form.id', this.form.id);
                    console.log('form.name', this.form.name);
                    console.log('form.deadline', this.form.deadline);
                    console.log('form.open', this.form.open);
                    console.log('form.responsibleUserId', this.form.responsibleUserId);
                    console.log('form.users', JSON.stringify(this.form.users, null, 4));
                    alert('Project edited');
                });
            }
        }
    };
</script>

<style lang="sass" scoped>
    .roleSelect
        width: 50%
</style>
