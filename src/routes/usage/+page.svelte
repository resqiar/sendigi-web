<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import type { AppInfo, UserProfile } from "../../dto/dto_interface";
    import MainNavbar from "../../components/navbar/MainNavbar.svelte";
    import UsageBody from "../../components/body/UsageBody.svelte";
    import type { PageData } from "../$types";
    import { SelectedRefreshTimeTemplate } from "../../stores/store";
    import Meta from "../../components/meta/Meta.svelte";

    export let data: PageData;
    let userProfile: UserProfile = data.user;
    let appInfo: AppInfo[] = [];

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
            const response = await fetch(`${PUBLIC_HTTP_SERVER}/api/apps`, {
                credentials: "include",
            });

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

<Meta title="Time Usage | SenDigi" />
<MainNavbar {userProfile} />
<UsageBody data={appInfo} />
