<script lang="ts">
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import type { AppInfo } from "../../dto/dto_interface";
    import { Card, Toast, Toggle } from "flowbite-svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import { BugSolid } from "flowbite-svelte-icons";
    import { slide } from "svelte/transition";

    export let data: AppInfo[];
    let open: boolean = false;
    let errorCounter: number = 6;

    function convertToHourMinute(time: number): [number, number] {
        const hour = time / 60;
        const minute = time % 60;
        return [hour, minute];
    }

    function triggerError() {
        open = true;
        errorTimeout();
    }

    function errorTimeout() {
        if (--errorCounter > 0) return setTimeout(errorTimeout, 1000);
        errorCounter = 6;
        open = false;
    }

    async function handleCheck(e: EventTarget, app: AppInfo) {
        try {
            const response = await fetch(
                `${PUBLIC_HTTP_SERVER}/api/apps/update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...app,
                        LockStatus: e.target.checked,
                        DateLocked: app.DateLocked.String,
                        TimeStartLocked: app.TimeStartLocked.String,
                        TimeEndLocked: app.TimeEndLocked.String,
                    }),
                    credentials: "include",
                },
            );
            if (response.ok) {
                app.LockStatus = e.target.checked;
            } else {
                triggerError();
            }
        } catch (error) {
            console.log("Error fetching app data:", error);
            triggerError();
        }
    }
</script>

<div class="flex mt-4 mb-12">
    <MainSidebar />

    <main class="flex flex-col gap-6 flex-1">
        <Card class="max-w-[90%]">
            <div class="my-4 mx-2">
                <h1 class="font-bold text-lg">Lock Specific Application</h1>
                <p>
                    Here you can lock or unlock which application that needs to
                    be locked.
                </p>
            </div>

            {#each data as app}
                <div
                    class="flex items-center justify-between p-4 rounded-lg shadow-md mb-4"
                >
                    <div>
                        <div class="flex gap-2 items-center mb-2">
                            <div>
                                <img src={app.Icon} alt={app.Name} width="30" />
                            </div>
                            <h2 class="text-lg font-bold">{app.Name}</h2>
                        </div>
                        <p class="text-sm">
                            Today's time usage: {convertToHourMinute(
                                app.TimeUsage,
                            )[0].toFixed(0)} Hour
                            {convertToHourMinute(app.TimeUsage)[1]} Minute
                        </p>
                    </div>
                    <div>
                        <Toggle
                            checked={app.LockStatus}
                            on:change={(e) => handleCheck(e, app)}
                            >{app.LockStatus ? "Locked" : "Unlocked"}</Toggle
                        >
                    </div>
                </div>
            {/each}
        </Card>
    </main>
</div>

<div class="fixed bottom-5 right-20 z-10">
    <Toast dismissable={false} bind:open transition={slide}>
        <BugSolid slot="icon" class="w-5 h-5" />
        Something when wrong, please try again later!
    </Toast>
</div>
