<template>
    <div id="main">
        <top-menu />
        <b-container fluid>
            <b-row>
                <b-col xs="12">
                    <nuxt />
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>
    import TopMenu from '~/components/TopMenu.vue';

    export default {
        components: {
            TopMenu
        }
    };
</script>

<style lang="sass">
</style>
