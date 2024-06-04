<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { RequestMessage, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import type { PageData } from "../$types";
    import {
        DeviceTemplate,
        SelectedRefreshTimeTemplate,
    } from "../../stores/store";
    import Meta from "../../components/meta/Meta.svelte";
    import MessageBody from "../../components/body/MessageBody.svelte";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let messages: RequestMessage[] = [];
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
                `${PUBLIC_HTTP_SERVER}/api/message/${deviceId}`,
                {
                    credentials: "include",
                },
            );

            if (!response.ok) return;
            const raw = await response.json();
            if (raw.data) {
                messages = raw.data;
            } else {
                messages = [];
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<Meta title="Message from Mobile | SenDigi" />
<MainNavbar {userProfile} />
<MessageBody data={messages} />
