<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Project</h1>
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
        data() {
            return {
                pageTitle: 'Projects'
            };
        },
    };
</script>
