<script lang="ts">
    import { Avatar, Navbar, NavBrand, Select } from "flowbite-svelte";
    import type { DeviceInfo, UserProfile } from "../../dto/dto_interface";
    import {
        DeviceTemplate,
        SelectedRefreshTimeTemplate,
    } from "../../stores/store";
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";

    export let userProfile: UserProfile;
    let selected: number;

    SelectedRefreshTimeTemplate.subscribe((v) => (selected = v));
    $: SelectedRefreshTimeTemplate.set(selected);

    let refreshTimeTemplate = [
        { value: 1000, name: "1 Second" },
        { value: 1000 * 5, name: "5 Seconds" },
        { value: 1000 * 10, name: "10 Seconds" },
        { value: 1000 * 30, name: "30 Seconds" },
        { value: 1000 * 60, name: "1 Minute" },
        { value: 1000 * 60 * 5, name: "5 Minutes" },
    ];

    let deviceIdTemplate: { value: any; name: any }[] = [];
    let selectedDevice: string;

    DeviceTemplate.subscribe((v) => (selectedDevice = v));
    $: DeviceTemplate.set(selectedDevice);

    onMount(function () {
        getDeviceInfo();
    });

    async function getDeviceInfo() {
        try {
            const response = await fetch(`${PUBLIC_HTTP_SERVER}/api/devices`, {
                credentials: "include",
            });

            if (!response.ok) return;
            const raw = await response.json();
            if (raw.data) {
                for (let i = 0; i < raw.data.length; i++) {
                    const value: DeviceInfo = raw.data[i];
                    deviceIdTemplate.push({
                        value: value.ID,
                        name: `${value.DeviceName} - (${value.ID})`,
                    });
                }
                deviceIdTemplate = deviceIdTemplate;
                if (deviceIdTemplate.length) {
                    DeviceTemplate.set(deviceIdTemplate[0].value);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<Navbar class="py-6 mb-4">
    <NavBrand href="/">
        <img
            src="https://sendigi.id/logosendigi.png"
            class="me-3 h-6 sm:h-9"
            alt="SenDigi"
        />
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
            >SenDigi</span
        >
    </NavBrand>

    <div class="flex items-center gap-6">
        <div class="flex gap-2">
            <Select
                placeholder="Devices"
                items={deviceIdTemplate}
                bind:value={selectedDevice}
                class="w-[300px]"
            />

            <Select
                placeholder="Refresh Time"
                items={refreshTimeTemplate}
                bind:value={selected}
            />
        </div>

        <Avatar id="avatar-menu" src={userProfile.PictureURL} />
    </div>
</Navbar>
