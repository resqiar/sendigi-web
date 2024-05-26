<script lang="ts">
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import type { AppInfo } from "../../dto/dto_interface";
    import { Badge, Button, Card, Toast } from "flowbite-svelte";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import { Accordion, AccordionItem } from "flowbite-svelte";
    import {
        BugSolid,
        CheckCircleSolid,
        ChevronDoubleDownOutline,
        ChevronDoubleUpOutline,
        LockTimeSolid,
    } from "flowbite-svelte-icons";
    import { slide } from "svelte/transition";
    import Flatpickr from "svelte-flatpickr";
    import "flatpickr/dist/flatpickr.css";

    export let data: AppInfo[];
    let errorOpen: boolean = false;
    let successOpen: boolean = false;
    let successResetOpen: boolean = false;
    let counter: number = 6;

    function convertToHourMinute(time: number): [number, number] {
        const hour = Math.floor(time / 60);
        const minute = time % 60;
        return [hour, minute];
    }

    function triggerError() {
        errorOpen = true;
        timeout();
    }

    function triggerSuccess() {
        successOpen = true;
        timeout();
    }

    function triggerSuccessReset() {
        successResetOpen = true;
        timeout();
    }

    function timeout() {
        if (--counter > 0) return setTimeout(timeout, 1000);
        counter = 6;
        errorOpen = false;
        successOpen = false;
        successResetOpen = false;
    }

    async function handleReset(app: AppInfo) {
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
                        DateLocked: "",
                        TimeStartLocked: "",
                        TimeEndLocked: "",
                    }),
                    credentials: "include",
                },
            );
            if (response.ok) {
                triggerSuccessReset();
            } else {
                triggerError();
            }
        } catch (error) {
            console.log("Error fetching app data:", error);
            triggerError();
        }
    }

    async function handleTriggerScheduler(app: AppInfo) {
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
                        LockStatus: true,
                        DateLocked: app.DateLockedFormatted,
                        TimeStartLocked: app.TimeStartLockedFormatted,
                        TimeEndLocked: app.TimeEndLockedFormatted,
                    }),
                    credentials: "include",
                },
            );
            if (response.ok) {
                triggerSuccess();
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
                <h1 class="font-bold text-lg">
                    Schedule Date or Time to Lock Application
                </h1>
                <p>
                    This page allows you to make a schedule on when to lock the
                    application.
                </p>
            </div>

            <Accordion
                class="flex flex-col w-full items-center justify-between px-4"
                flush
            >
                {#each data as app}
                    <div class="w-full">
                        <AccordionItem>
                            <div slot="arrowup">
                                <ChevronDoubleUpOutline
                                    class="h-6 w-6 -me-0.5"
                                />
                            </div>
                            <span slot="arrowdown">
                                <ChevronDoubleDownOutline
                                    class="h-6 w-6 -me-0.5"
                                />
                            </span>
                            <div slot="header" class="w-full">
                                <div>
                                    <div class="flex gap-2 items-center mb-2">
                                        <div>
                                            <img
                                                src={app.Icon}
                                                alt={app.Name}
                                                width="30"
                                            />
                                        </div>
                                        <h2 class="text-lg font-bold">
                                            {app.Name}
                                        </h2>
                                    </div>
                                    <p class="text-sm">
                                        Today's time usage: {convertToHourMinute(
                                            app.TimeUsage,
                                        )[0]} Hour
                                        {convertToHourMinute(app.TimeUsage)[1]} Minute
                                    </p>
                                </div>

                                {#if app.DateLockedFormatted || app.TimeStartLockedFormatted || app.TimeStartLockedFormatted}
                                    <div class="mt-4">
                                        {#if app.DateLockedFormatted}
                                            <Badge color="red"
                                                >{app.DateLockedFormatted}</Badge
                                            >
                                        {/if}
                                        {#if app.TimeStartLockedFormatted}
                                            <Badge color="blue"
                                                >Start Time: {app.TimeStartLockedFormatted}</Badge
                                            >
                                        {/if}
                                        {#if app.TimeEndLockedFormatted}
                                            <Badge color="blue"
                                                >End Time: {app.TimeEndLockedFormatted}</Badge
                                            >
                                        {/if}
                                    </div>
                                {/if}
                            </div>

                            <div class="w-full">
                                <Card class="max-w-full">
                                    <div class="mt-6">
                                        <h2 class="font-semibold text-lg">
                                            Lock <strong>{app.Name}</strong> by Dates
                                        </h2>
                                        <p class="text-sm">
                                            You can set a recurring lock for
                                            entire days to block access to
                                            specific apps, like preventing your
                                            child from using certain apps on
                                            weekends when they use your device.
                                        </p>

                                        <div class="w-full my-2">
                                            <Flatpickr
                                                options={{
                                                    mode: "multiple",
                                                    dateFormat: "Y-m-d",
                                                    minDate: "today",
                                                }}
                                                bind:value={app.DateLocked
                                                    .String}
                                                bind:formattedValue={app.DateLockedFormatted}
                                                name="date"
                                                class="w-full"
                                                placeholder="Select Dates"
                                            />
                                        </div>
                                    </div>

                                    <div class="mt-6">
                                        <h2 class="font-semibold text-lg">
                                            Lock <strong>{app.Name}</strong> by Time
                                        </h2>
                                        <p class="text-sm">
                                            Setting a recurring lock for time
                                            periods when the device shouldn't be
                                            used by your child, like bedtime,
                                            can be an effective way to limit
                                            usage.
                                        </p>

                                        <div
                                            class="w-full my-2 flex flex-col gap-2"
                                        >
                                            <div>
                                                <span class="text-sm"
                                                    >Start Time:</span
                                                >
                                                <Flatpickr
                                                    options={{
                                                        enableTime: true,
                                                        noCalendar: true,
                                                        dateFormat: "H:i",
                                                        time_24hr: true,
                                                    }}
                                                    name="time"
                                                    class="w-full"
                                                    placeholder="Select Start Time"
                                                    bind:value={app
                                                        .TimeStartLocked.String}
                                                    bind:formattedValue={app.TimeStartLockedFormatted}
                                                />
                                            </div>

                                            <div>
                                                <span class="text-sm"
                                                    >End Time:</span
                                                >
                                                <Flatpickr
                                                    options={{
                                                        enableTime: true,
                                                        noCalendar: true,
                                                        dateFormat: "H:i",
                                                        time_24hr: true,
                                                    }}
                                                    name="time"
                                                    class="w-full"
                                                    placeholder="Select End Time"
                                                    bind:value={app
                                                        .TimeEndLocked.String}
                                                    bind:formattedValue={app.TimeEndLockedFormatted}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="flex gap-2 mt-6 mb-4 w-full justify-end"
                                    >
                                        {#if app.DateLocked.String || app.TimeStartLocked.String || app.TimeEndLocked.String}
                                            <Button
                                                color="alternative"
                                                on:click={() => {
                                                    app.DateLocked.String = "";
                                                    app.TimeStartLocked.String =
                                                        "";
                                                    app.TimeEndLocked.String =
                                                        "";
                                                    app.DateLockedFormatted =
                                                        "";
                                                    app.TimeStartLockedFormatted =
                                                        "";
                                                    app.TimeEndLockedFormatted =
                                                        "";
                                                    handleReset(app);
                                                }}>Reset Input</Button
                                            >
                                        {/if}
                                        <Button
                                            on:click={() =>
                                                handleTriggerScheduler(app)}
                                            disabled={app.DateLocked.String ||
                                            app.TimeStartLocked.String ||
                                            app.TimeEndLocked.String
                                                ? false
                                                : true}
                                            ><LockTimeSolid
                                                class="w-5 h-5 me-2"
                                            />Start Scheduler</Button
                                        >
                                    </div>
                                </Card>
                            </div>
                        </AccordionItem>
                    </div>
                {/each}
            </Accordion>
        </Card>
    </main>
</div>

<div class="fixed bottom-5 right-20 z-10">
    <Toast dismissable={false} bind:open={errorOpen} transition={slide}>
        <BugSolid slot="icon" class="w-5 h-5" />
        Something when wrong, please try again later!
    </Toast>

    <Toast dismissable={false} bind:open={successOpen} transition={slide}>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Successfully trigger a new scheduler!
    </Toast>

    <Toast dismissable={false} bind:open={successResetOpen} transition={slide}>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Successfully reset a scheduler!
    </Toast>
</div>
