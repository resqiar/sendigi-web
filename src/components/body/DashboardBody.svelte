<script lang="ts">
    import { Badge, Card, Progressbar } from "flowbite-svelte";
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import type {
        ActivityInfo,
        AppInfo,
        DeviceInfo,
    } from "../../dto/dto_interface";

    export let deviceInfo: DeviceInfo | undefined;
    export let appInfo: AppInfo[] = [];
    export let activityInfo: ActivityInfo[] = [];

    let totalTimeUsage = 0;
    let totalLockedApps: AppInfo[] = [];
    let totalScheduledApps: AppInfo[] = [];
    let totalOpenedLockApplication: ActivityInfo[] = [];
    let openedAppOccurences = new Map();
    let mostOpenedLockedApp: AppInfo | undefined;
    let mostOpenedLockedPackageName: string;
    let mostOpenedLockedAppTime = 0;

    $: if (appInfo.length) {
        totalTimeUsage = 0;
        totalLockedApps = [];
        totalScheduledApps = [];

        appInfo.map((v) => {
            totalTimeUsage = totalTimeUsage + v.TimeUsage;
            if (v.LockStatus) totalLockedApps = [...totalLockedApps, v];
            if (
                v.DateLocked.String ||
                v.TimeStartLocked.String ||
                v.TimeEndLocked.String
            ) {
                totalScheduledApps = [...totalScheduledApps, v];
            }
        });
    }

    $: if (activityInfo.length) {
        openedAppOccurences = new Map();
        totalOpenedLockApplication = [];

        activityInfo.map((v) => {
            if (v.Description.String.startsWith("[Warning]")) {
                totalOpenedLockApplication = [...totalOpenedLockApplication, v];

                openedAppOccurences.set(
                    v.PackageName,
                    openedAppOccurences.get(v.PackageName) !== undefined
                        ? openedAppOccurences.get(v.PackageName) + 1
                        : 1,
                );

                openedAppOccurences = openedAppOccurences;
            }
        });
    } else {
        openedAppOccurences = new Map();
        totalOpenedLockApplication = [];
    }

    $: if (openedAppOccurences.size) {
        for (const [key, value] of openedAppOccurences.entries()) {
            if (mostOpenedLockedAppTime < value) {
                mostOpenedLockedPackageName = key;
                mostOpenedLockedAppTime = value;
                mostOpenedLockedApp = appInfo.find(
                    (v) => v.PackageName === mostOpenedLockedPackageName,
                );
            }
        }
    } else {
        mostOpenedLockedApp = undefined;
    }

    function convertToHourMinute(time: number): [number, number] {
        const hour = Math.floor(time / 60);
        const minute = time % 60;
        return [hour, minute];
    }
</script>

<div class="flex">
    <MainSidebar />

    <main
        class="grid md:grid-cols-3 gap-3 auto-rows-fr items-center flex-1 mr-24 mb-24"
    >
        <Card href="/device" class="h-min">
            <p class="text-sm text-gray-700 dark:text-gray-400">Device Name</p>
            <h5
                class="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {deviceInfo ? deviceInfo.DeviceName : "Loading Data..."}
            </h5>
        </Card>

        <Card href="/usage" class="h-min">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Total Installed Applications
            </p>
            <h5
                class="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {appInfo.length} Applications
            </h5>
        </Card>

        <Card href="/usage" class="h-min">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Total Time Usage
            </p>
            <h5
                class="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {convertToHourMinute(totalTimeUsage)[0]} Hours {convertToHourMinute(
                    totalTimeUsage,
                )[1]} Minutes
            </h5>
        </Card>

        <Card href="/usage" class="h-full max-w-full col-span-2">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Top Most Used Applications
            </p>
            {#if appInfo}
                <div
                    class="overflow-y-hidden flex items-center justify-evenly gap-1 mt-4"
                >
                    {#each appInfo.slice(0, 4) as app}
                        <div class="flex items-center gap-2">
                            <img src={app.Icon} alt="icon" width="20" />
                            <div>
                                <p class="text-sm font-semibold">{app.Name}</p>
                                <p class="text-xs">
                                    {convertToHourMinute(app.TimeUsage)[0]} Hours
                                    {convertToHourMinute(app.TimeUsage)[1]}
                                    Minutes
                                </p>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </Card>

        <Card href="/device" class="h-full">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Device Battery Level
            </p>
            <div class="mt-4">
                {#if deviceInfo}
                    <Progressbar
                        progress={deviceInfo.BatteryLevel}
                        size="h-4"
                        color={deviceInfo.BatteryLevel < 20 ? "red" : "yellow"}
                        labelInside
                    />
                {:else}
                    <p class="text-xs">Loading data...</p>
                {/if}
            </div>
        </Card>

        <Card href="/usage" class="h-min">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Total Locked Applications
            </p>
            <h5
                class="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {totalLockedApps.length} Locked Applications
            </h5>
        </Card>

        <Card href="/lock" class="h-full max-w-full row-span-2 col-span-1">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Locked Applications
            </p>
            {#if totalLockedApps.length}
                <div class="overflow-y-auto flex flex-col max-h-40 mt-4 gap-4">
                    {#each totalLockedApps as app}
                        <div class="flex items-center gap-2">
                            <img src={app.Icon} alt="icon" width="20" />
                            <div>
                                <p class="text-sm font-semibold">{app.Name}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="h-full flex items-center">
                    <h5>You don't have any locked applications</h5>
                </div>
            {/if}
        </Card>

        <Card href="/schedule" class="h-full max-w-full row-span-2 col-span-1">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Scheduled Applications
            </p>
            {#if totalScheduledApps.length}
                <div class="overflow-y-auto flex flex-col max-h-40 mt-4 gap-4">
                    {#each totalScheduledApps as app}
                        <div class="flex flex-col gap-2">
                            <div class="flex items-center gap-2">
                                <img src={app.Icon} alt="icon" width="20" />
                                <div>
                                    <p class="font-bold">{app.Name}</p>
                                </div>
                            </div>

                            <div>
                                {#if app.DateLocked.String}
                                    <Badge color="red"
                                        >{app.DateLocked.String}</Badge
                                    >
                                {/if}
                                {#if app.TimeStartLocked.String}
                                    <Badge color="blue"
                                        >Start Time: {app.TimeStartLocked
                                            .String}</Badge
                                    >
                                {/if}
                                {#if app.TimeEndLocked.String}
                                    <Badge color="blue"
                                        >End Time: {app.TimeEndLocked
                                            .String}</Badge
                                    >
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="h-full flex items-center">
                    <h5>You don't have any scheduled applications</h5>
                </div>
            {/if}
        </Card>

        <Card href="/schedule" class="h-min">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Total Scheduled Applications
            </p>
            <h5
                class="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {totalScheduledApps.length} Scheduled Applications
            </h5>
        </Card>

        <Card href="/activity" class="h-full max-w-full row-span-2 col-span-2">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Last Device Activity
            </p>
            <div class="flex flex-col overflow-y-auto max-h-40 mt-4 gap-2">
                {#each activityInfo.slice(0, 4) as app}
                    <div
                        class="flex flex-col border-b-gray-100 border-b-2 py-4"
                    >
                        <div>
                            <p class="font-bold">
                                {app.Description.String}
                            </p>
                        </div>
                        <div class="flex gap-2 items-center mb-2">
                            <div>
                                <img src={app.Icon} alt={app.Name} width="20" />
                            </div>
                            <h2 class="font-semibold">{app.Name}</h2>
                        </div>
                        <div>
                            <p>
                                {new Intl.DateTimeFormat("id-ID", {
                                    dateStyle: "full",
                                    timeStyle: "long",
                                }).format(new Date(app.CreatedAt))}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </Card>

        <Card href="/activity" class="h-full max-w-full">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Total Opened Locked Application
            </p>
            <h5
                class="mt-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
                {totalOpenedLockApplication.length} Times
            </h5>
        </Card>

        <Card href="/activity" class="h-full max-w-full">
            <p class="text-sm text-gray-700 dark:text-gray-400">
                Most Opened Locked Application
            </p>
            <div class="flex gap-2 items-center my-2">
                {#if mostOpenedLockedApp !== undefined}
                    <img src={mostOpenedLockedApp.Icon} alt="icon" width="40" />
                    <div>
                        <p class="text-lg font-bold">
                            {mostOpenedLockedApp.Name}
                        </p>
                    </div>
                {/if}
            </div>
        </Card>
    </main>
</div>
