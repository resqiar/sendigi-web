<script lang="ts">
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import type {
        NotificationConfig,
        UserProfile,
    } from "../../dto/dto_interface";
    import NotificationBody from "../../components/body/NotificationBody.svelte";
    import type { PageData } from "./$types";
    import Meta from "../../components/meta/Meta.svelte";

    export let data: PageData;
    let user: UserProfile = data.user;
    let configData: NotificationConfig = data.data;
</script>

<Meta title="Notifications Settings | SenDigi" />
<MainNavbar userProfile={user} />
<NotificationBody data={configData} {user} />
