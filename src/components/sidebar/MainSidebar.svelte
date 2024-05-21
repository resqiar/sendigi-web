<script>
    import { page } from "$app/stores";
    import {
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
    } from "flowbite-svelte-icons";

    $: activeUrl = $page.url.pathname;
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
                <SidebarItem label="Logout" href="/logout">
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
