<template>
    <b-navbar
        sticky
        toggleable="md"
        type="dark"
        variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">QAPPA</b-navbar-brand>
        <b-collapse
            id="nav_collapse"
            is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item-dropdown
                    text="Admin"
                    right>
                    <b-dropdown-item to="/admin/list">Show all users</b-dropdown-item>
                    <b-dropdown-item to="/admin/register">Register new user</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-text><strong>Logged user: </strong></b-nav-text>
                <b-nav-item-dropdown
                    :text="user"
                    right>
                    <b-dropdown-item href="#">My account</b-dropdown-item>
                    <b-dropdown-item href="#">Settings</b-dropdown-item>
                    <b-dropdown-item @click="handleLogout">Log out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        computed: {
            user() {
                const user = this.$auth.user;
                return `${user.name} ${user.surname}`;
            }
        },
        methods: {
            async handleLogout() {
                await this.$auth.logout();
                this.$notify({
                    title: 'Success',
                    message: 'You have been successfully logged off from system.',
                    type: 'success',
                    position: 'bottom-right'
                });
            }
        }
    };
</script>

<style lang="sass" scoped>
</style>
