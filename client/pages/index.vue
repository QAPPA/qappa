<template>
    <div>
        <h1>Welcome, user</h1>
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: this.title
            };
        },
        data() {
            return {
                title: 'Dashboard'
            };
        }
    };
</script>

<style lang="sass">
    h1
        margin: 0
        padding: 0
</style>
