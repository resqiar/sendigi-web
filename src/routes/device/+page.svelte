<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { DeviceInfo, UserProfile } from "../../dto/dto_interface";
    import DeviceBody from "../../components/body/DeviceBody.svelte";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import type { PageData } from "../$types";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let deviceInfo: DeviceInfo[] = [];

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
            const response = await fetch(`${PUBLIC_HTTP_SERVER}/api/devices`, {
                credentials: "include",
            });

            if (!response.ok) return;
            const raw = await response.json();
            deviceInfo = raw.data;
        } catch (error) {
            console.log(error);
        }
    }
</script>

<MainNavbar {userProfile} />
<DeviceBody data={deviceInfo} />
