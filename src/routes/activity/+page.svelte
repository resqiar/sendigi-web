<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { ActivityInfo, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import ActivityBody from "../../components/body/ActivityBody.svelte";
    import type { PageData } from "../$types";
    import {
        DeviceTemplate,
        SelectedRefreshTimeTemplate,
    } from "../../stores/store";
    import Meta from "../../components/meta/Meta.svelte";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let activityInfo: ActivityInfo[] = [];
    let device: string;

    DeviceTemplate.subscribe((deviceId) => {
        device = deviceId;
        getActivityInfo(device);
    });

    let fetchInterval: number;
    SelectedRefreshTimeTemplate.subscribe((v) => {
        clearInterval(fetchInterval);
        fetchInterval = setInterval(async () => {
            getActivityInfo(device);
        }, v);
    });

    onMount(function () {
        getActivityInfo(device);
        return () => clearInterval(fetchInterval);
    });

    async function getActivityInfo(deviceId: string) {
        try {
            const response = await fetch(
                `${PUBLIC_HTTP_SERVER}/api/activities?device_id=${deviceId}`,
                {
                    credentials: "include",
                },
            );

            if (!response.ok) return;
            const raw = await response.json();
            if (raw.data) {
                activityInfo = raw.data;
            } else {
                activityInfo = [];
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<Meta title="Device Activity | SenDigi" />
<MainNavbar {userProfile} />
<ActivityBody data={activityInfo} />
