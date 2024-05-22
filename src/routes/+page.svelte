<script lang="ts">
    import { onMount } from "svelte";
    import DashboardBody from "../components/body/DashboardBody.svelte";
    import MainNavbar from "../components/navbar/MainNavbar.svelte";
    import type {
        ActivityInfo,
        AppInfo,
        DeviceInfo,
        UserProfile,
    } from "../dto/dto_interface";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { PageData } from "./$types";
    import { SelectedRefreshTimeTemplate } from "../stores/store";

    export let data: PageData;
    let userProfile: UserProfile = data.user;

    let deviceInfo: DeviceInfo;
    let appInfo: AppInfo[] = [];
    let activityInfo: ActivityInfo[] = [];

    let fetchInterval: number;
    SelectedRefreshTimeTemplate.subscribe((v) => {
        clearInterval(fetchInterval);
        fetchInterval = setInterval(async () => {
            getData();
        }, v);
    });

    onMount(function () {
        getData();
        return () => clearInterval(fetchInterval);
    });

    async function getData() {
        try {
            const [appRes, deviceRes, activityRes] = await Promise.allSettled([
                fetch(`${PUBLIC_HTTP_SERVER}/api/apps`, {
                    credentials: "include",
                }),
                fetch(`${PUBLIC_HTTP_SERVER}/api/devices`, {
                    credentials: "include",
                }),
                fetch(`${PUBLIC_HTTP_SERVER}/api/activities`, {
                    credentials: "include",
                }),
            ]);

            appInfo =
                appRes.status === "fulfilled" && appRes.value.ok
                    ? (await appRes.value.json()).data
                    : [];

            deviceInfo =
                deviceRes.status === "fulfilled" && deviceRes.value.ok
                    ? (await deviceRes.value.json()).data[0]
                    : undefined;

            activityInfo =
                activityRes.status === "fulfilled" && activityRes.value.ok
                    ? (await activityRes.value.json()).data
                    : [];
        } catch (error) {
            console.log(error);
        }
    }
</script>

<MainNavbar {userProfile} />
<DashboardBody {deviceInfo} {appInfo} {activityInfo} />
