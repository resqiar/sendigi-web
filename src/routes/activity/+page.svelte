<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { ActivityInfo, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import ActivityBody from "../../components/body/ActivityBody.svelte";
    import type { PageData } from "../$types";
    import { SelectedRefreshTimeTemplate } from "../../stores/store";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let activityInfo: ActivityInfo[] = [];

    let fetchInterval: number;
    SelectedRefreshTimeTemplate.subscribe((v) => {
        clearInterval(fetchInterval);
        fetchInterval = setInterval(async () => {
            getActivityInfo();
        }, v);
    });

    onMount(function () {
        getActivityInfo();
        return () => clearInterval(fetchInterval);
    });

    async function getActivityInfo() {
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
