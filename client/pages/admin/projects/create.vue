<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>Project create</h1>
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
            pageTitle: 'Create a project'
        };
    },
};
</script>
