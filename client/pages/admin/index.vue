<template>
    <div>
        <app-breadcrumb :items="breadcrumbItems" />
        <b-row>
            <b-col>
                <h1>Welcome, admin</h1>
            </b-col>
        </b-row>
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
                title: 'Admin page',
                breadcrumbItems: [
                    { id: 0, name: 'admin', path: null }
                ]
            };
        }
    };
</script>
