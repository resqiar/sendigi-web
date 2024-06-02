<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { RequestMessage, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import type { PageData } from "../$types";
    import { SelectedRefreshTimeTemplate } from "../../stores/store";
    import Meta from "../../components/meta/Meta.svelte";
    import MessageBody from "../../components/body/MessageBody.svelte";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let messages: RequestMessage[] = [];

    let fetchInterval: number;
    SelectedRefreshTimeTemplate.subscribe((v) => {
        clearInterval(fetchInterval);
        fetchInterval = setInterval(async () => {
            getAppInfo();
        }, v);
    });

    onMount(function () {
        getAppInfo();
        return () => clearInterval(fetchInterval);
    });

    async function getAppInfo() {
        try {
            const response = await fetch(`${PUBLIC_HTTP_SERVER}/api/message`, {
                credentials: "include",
            });

            if (!response.ok) return;
            const raw = await response.json();
            if (raw.data) {
                messages = raw.data;
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<Meta title="Message from Mobile | SenDigi" />
<MainNavbar {userProfile} />
<MessageBody data={messages} />
