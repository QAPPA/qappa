<template>
    <b-navbar
        toggleable="md"
        type="dark"
        variant="info"
        sticky="true">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">QAPPA</b-navbar-brand>
        <b-collapse
            id="nav_collapse"
            is-nav>
            <b-navbar-nav>
                <b-nav-item href="/admin">Home</b-nav-item>
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
        data() {
            return {
                activeIndex: '1'
            };
        },
        computed: {
            user() {
                return this.$auth.user;
            }
        },
        methods: {
            async handleLogout() {
                await this.$auth.logout();
            }
        }
    };
</script>

<style lang="sass" scoped>
</style>
