<script lang="ts">
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import type {
        NotificationConfig,
        UserProfile,
    } from "../../dto/dto_interface";
    import NotificationBody from "../../components/body/NotificationBody.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    let user: UserProfile = data.user;
    let configData: NotificationConfig = data.data;
</script>

<MainNavbar />
<NotificationBody data={configData} {user} />
