<template>
    <component :is="currentMenuName"></component>
</template>

<script>
import Default from './Default';
import Admin from './Admin';

export default {
    components: {
        Default,
        Admin
    },
    computed: {
        currentMenuName() {
            return (this.$route.path.includes('admin')) ? 'admin' : 'default';
        }
    },
};
</script>

<style lang="sass">
    .side-menu
        height: 100%
</style>
