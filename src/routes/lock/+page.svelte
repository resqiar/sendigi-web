<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { AppInfo, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import LockBody from "../../components/body/LockBody.svelte";
    import type { PageData } from "../$types";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let appInfo: AppInfo[] = [];

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
            const response = await fetch(`${PUBLIC_HTTP_SERVER}/api/apps`, {
                credentials: "include",
            });

            if (!response.ok) return;
            const raw = await response.json();
            appInfo = raw.data;
        } catch (error) {
            console.log(error);
        }
    }
</script>

<MainNavbar {userProfile} />
<LockBody data={appInfo} />
