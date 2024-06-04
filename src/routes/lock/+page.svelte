<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { AppInfo, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import LockBody from "../../components/body/LockBody.svelte";
    import type { PageData } from "../$types";
    import {
        DeviceTemplate,
        SelectedRefreshTimeTemplate,
    } from "../../stores/store";
    import Meta from "../../components/meta/Meta.svelte";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let appInfo: AppInfo[] = [];
    let device: string;

    DeviceTemplate.subscribe((deviceId) => {
        device = deviceId;
        getAppInfo(device);
    });

    let fetchInterval: number;
    SelectedRefreshTimeTemplate.subscribe((v) => {
        clearInterval(fetchInterval);
        fetchInterval = setInterval(async () => {
            getAppInfo(device);
        }, v);
    });

    onMount(function () {
        getAppInfo(device);
        return () => clearInterval(fetchInterval);
    });

    async function getAppInfo(deviceId: string) {
        try {
            const response = await fetch(
                `${PUBLIC_HTTP_SERVER}/api/apps?device_id=${deviceId}`,
                {
                    credentials: "include",
                },
            );

            if (!response.ok) return;
            const raw = await response.json();
            if (raw.data) {
                appInfo = raw.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<Meta title="Lock Application | SenDigi" />
<MainNavbar {userProfile} />
<LockBody data={appInfo} />
