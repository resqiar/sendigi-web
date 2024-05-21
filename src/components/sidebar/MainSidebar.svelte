<script lang="ts">
    import { page } from "$app/stores";
    import {
        PUBLIC_HTTP_SERVER,
        PUBLIC_SENDIGI_LEGACY,
    } from "$env/static/public";
    import {
        Button,
        Modal,
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
    } from "flowbite-svelte";
    import {
        GridSolid,
        ArrowRightToBracketOutline,
        MobilePhoneSolid,
        ChartLineUpOutline,
        LockSolid,
        FileChartBarSolid,
        BellRingSolid,
        LockTimeSolid,
        ExclamationCircleOutline,
    } from "flowbite-svelte-icons";

    $: activeUrl = $page.url.pathname;

    let logoutConfirmationModal = false;

    async function triggerLogout() {
        try {
            const res = await fetch(`${PUBLIC_HTTP_SERVER}/auth/logout`, {
                method: "GET",
                credentials: "include",
            });
            if (res.ok) {
                window.location.href = `${PUBLIC_SENDIGI_LEGACY}/login`;
            }
        } catch (error) {
            console.log(error);
        }
    }
</script>

<navbar>
    <Sidebar class="mx-12 w-fit sticky top-5" {activeUrl}>
        <SidebarWrapper>
            <SidebarGroup>
                <SidebarItem label="Dashboard" href="/">
                    <svelte:fragment slot="icon">
                        <GridSolid
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Device Information" href="/device">
                    <svelte:fragment slot="icon">
                        <MobilePhoneSolid
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Time Usage" href="/usage">
                    <svelte:fragment slot="icon">
                        <ChartLineUpOutline
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Lock Application" href="/lock">
                    <svelte:fragment slot="icon">
                        <LockSolid
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Schedule Application" href="/schedule">
                    <svelte:fragment slot="icon">
                        <LockTimeSolid
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Device Activity History" href="/activity">
                    <svelte:fragment slot="icon">
                        <FileChartBarSolid
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem label="Notifications" href="/notification">
                    <svelte:fragment slot="icon">
                        <BellRingSolid
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem
                    label="Logout"
                    on:click={() => (logoutConfirmationModal = true)}
                >
                    <svelte:fragment slot="icon">
                        <ArrowRightToBracketOutline
                            class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        />
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</navbar>

<Modal bind:open={logoutConfirmationModal} size="xs" autoclose>
    <div class="text-center">
        <ExclamationCircleOutline
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
        />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to logout from SenDigi?
        </h3>
        <Button color="red" size="sm" class="me-2" on:click={triggerLogout}
            >Yes, I'm sure</Button
        >
        <Button color="alternative" size="sm">No, cancel</Button>
    </div>
</Modal>
