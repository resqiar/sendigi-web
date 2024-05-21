<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { ActivityInfo, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import ActivityBody from "../../components/body/ActivityBody.svelte";
    import type { PageData } from "../$types";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let activityInfo: ActivityInfo[] = [];

    onMount(function () {
        getDeviceInfo();
        const fetchInterval = setInterval(
            async () => getDeviceInfo(),
            1000 * 60,
        );

        return () => clearInterval(fetchInterval);
    });

    async function getDeviceInfo() {
        try {
            const response = await fetch(
                `${PUBLIC_HTTP_SERVER}/api/activities`,
                {
                    credentials: "include",
                },
            );

            if (!response.ok) return;
            const raw = await response.json();
            activityInfo = raw.data;
        } catch (error) {
            console.log(error);
        }
    }
</script>

<MainNavbar {userProfile} />
<ActivityBody data={activityInfo} />
