<template>
    <div>
        <app-breadcrumb :items="breadcrumbs" />
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
                title: 'Dashboard'
            };
        },
        data() {
            return {
                breadcrumbs: [
                    { index: 0, name: 'dashboard', path: null }
                ]
            };
        }
    };
</script>
