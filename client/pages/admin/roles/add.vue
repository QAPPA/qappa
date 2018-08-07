<template>
    <div>
        <app-breadcrumb />
        <b-row>
            <b-col>
                <h1>New team role</h1>
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
                pageTitle: 'New team role'
            };
        },
    };
</script>
