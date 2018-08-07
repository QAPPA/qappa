<template>
    <div><h4>Users hub</h4></div>
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
            pageTitle: 'Users'
        };
    }
};
</script>
