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
    import {
        DeviceTemplate,
        SelectedRefreshTimeTemplate,
    } from "../stores/store";
    import Meta from "../components/meta/Meta.svelte";

    export let data: PageData;
    let userProfile: UserProfile = data.user;

    let deviceInfo: DeviceInfo | undefined;
    let appInfo: AppInfo[] = [];
    let activityInfo: ActivityInfo[] = [];
    let device: string;

    DeviceTemplate.subscribe((deviceId) => {
        device = deviceId;
        getData(device);
    });

    let fetchInterval: number;
    SelectedRefreshTimeTemplate.subscribe((v) => {
        clearInterval(fetchInterval);
        fetchInterval = setInterval(async () => {
            getData(device);
        }, v);
    });

    onMount(function () {
        getData(device);
        return () => clearInterval(fetchInterval);
    });

    async function getData(deviceId: string) {
        if (!deviceId) return;

        try {
            const [appRes, deviceRes, activityRes] = await Promise.allSettled([
                fetch(`${PUBLIC_HTTP_SERVER}/api/apps?device_id=${deviceId}`, {
                    credentials: "include",
                }),
                fetch(`${PUBLIC_HTTP_SERVER}/api/device/${deviceId}`, {
                    credentials: "include",
                }),
                fetch(
                    `${PUBLIC_HTTP_SERVER}/api/activities?device_id=${deviceId}`,
                    {
                        credentials: "include",
                    },
                ),
            ]);

            if (appRes.status === "fulfilled" && appRes.value.ok) {
                const value = await appRes.value.json();
                if (value.data) {
                    appInfo = value.data;
                }
            }

            if (deviceRes.status === "fulfilled" && deviceRes.value.ok) {
                const value = await deviceRes.value.json();
                if (value.data) {
                    deviceInfo = value.data;
                }
            }

            if (activityRes.status === "fulfilled" && activityRes.value.ok) {
                const value = await activityRes.value.json();
                if (value.data) {
                    activityInfo = value.data;
                } else {
                    activityInfo = [];
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<Meta title="Dashboard | SenDigi" />
<MainNavbar {userProfile} />
<DashboardBody {deviceInfo} {appInfo} {activityInfo} />
