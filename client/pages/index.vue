<template>
    <div>
        <app-breadcrumb :items="breadcrumbItems" />
        <b-row>
            <b-col>
                <h1>Welcome, user</h1>
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
                title: 'Dashboard',
                breadcrumbItems: [
                    { id: 0, name: 'dashboard', path: null }
                ]
            };
        }
    };
</script>
