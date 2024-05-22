<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { DeviceInfo, UserProfile } from "../../dto/dto_interface";
    import DeviceBody from "../../components/body/DeviceBody.svelte";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import type { PageData } from "../$types";
    import { SelectedRefreshTimeTemplate } from "../../stores/store";
    import Meta from "../../components/meta/Meta.svelte";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let deviceInfo: DeviceInfo | undefined;

    let fetchInterval: number;
    SelectedRefreshTimeTemplate.subscribe((v) => {
        clearInterval(fetchInterval);
        fetchInterval = setInterval(async () => {
            getDeviceInfo();
        }, v);
    });

    onMount(function () {
        getDeviceInfo();
        return () => clearInterval(fetchInterval);
    });

    async function getDeviceInfo() {
        try {
            const response = await fetch(`${PUBLIC_HTTP_SERVER}/api/devices`, {
                credentials: "include",
            });

            if (!response.ok) return;
            const raw = await response.json();
            if (raw.data) {
                deviceInfo = raw.data[0];
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<Meta title="Device Information | SenDigi" />
<MainNavbar {userProfile} />
<DeviceBody device={deviceInfo} />
