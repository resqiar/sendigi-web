<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { AppInfo } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import LockBody from "../../components/body/LockBody.svelte";

    let data: AppInfo[] = [];

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
            data = raw.data;
        } catch (error) {
            console.log(error);
        }
    }
</script>

<MainNavbar />
<LockBody {data} />
