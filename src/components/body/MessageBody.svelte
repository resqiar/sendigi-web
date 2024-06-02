<script lang="ts">
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import type { RequestMessage } from "../../dto/dto_interface";
    import {
        Alert,
        Button,
        Card,
        Label,
        Textarea,
        Toast,
        Toggle,
    } from "flowbite-svelte";
    import { Accordion, AccordionItem } from "flowbite-svelte";
    import {
        BugSolid,
        CheckCircleSolid,
        ChevronDoubleDownOutline,
        ChevronDoubleUpOutline,
        MessageCaptionSolid,
        PaperPlaneSolid,
    } from "flowbite-svelte-icons";
    import { slide } from "svelte/transition";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";

    export let data: RequestMessage[];
    let messageValue: string;
    let errorOpen: boolean = false;
    let successOpen: boolean = false;
    let counter: number = 6;

    function triggerError() {
        errorOpen = true;
        timeout();
    }

    function triggerSuccess() {
        successOpen = true;
        timeout();
    }

    function timeout() {
        if (--counter > 0) return setTimeout(timeout, 1000);
        counter = 6;
        errorOpen = false;
        successOpen = false;
    }

    async function triggerUpdate(data: RequestMessage) {
        try {
            const response = await fetch(
                `${PUBLIC_HTTP_SERVER}/api/message/send`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: messageValue,
                        packageName: data.PackageName,
                        lockStatus: data.LockStatus,
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
            triggerError();
        }
    }
</script>

<div class="flex mt-4 mb-12">
    <MainSidebar />

    <main class="flex flex-col gap-6 flex-1">
        <Card class="max-w-[90%]">
            <div class="my-4 mx-2">
                <h1 class="font-bold text-lg">Request Messages</h1>
                <p>
                    This page list request to unlock application from mobile
                    app. Pay attention here, your child might send you a message
                    requesting to unlock certain apps, you can respond to them
                    by message or directly unlock the app.
                </p>
            </div>

            <Accordion
                class="flex flex-col w-full items-center justify-between px-4"
                flush
            >
                {#each data as message}
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
                                                src={message.Icon}
                                                alt={message.Name}
                                                width="25"
                                            />
                                        </div>
                                        <h2 class="text-lg font-bold">
                                            {message.Name}
                                        </h2>
                                    </div>
                                    <Alert
                                        class="!items-start mr-8"
                                        color="yellow"
                                    >
                                        <span slot="icon">
                                            <MessageCaptionSolid
                                                slot="icon"
                                                class="w-5 h-4"
                                            />
                                            <span class="sr-only">Info</span>
                                        </span>
                                        <p class="text-sm">
                                            Here is the message from your
                                            device:
                                        </p>
                                        <p class="mt-2 w-full py-4 font-bold">
                                            "{message.Message}"
                                        </p>
                                    </Alert>
                                    <div
                                        class="flex gap-2 mt-2 items-center mb-2"
                                    >
                                        <p class="text-sm">
                                            Received at <span>
                                                {new Intl.DateTimeFormat(
                                                    "id-ID",
                                                    {
                                                        dateStyle: "full",
                                                        timeStyle: "long",
                                                    },
                                                ).format(
                                                    new Date(message.CreatedAt),
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="w-full">
                                <Card class="max-w-full mt-4">
                                    <div class="mt-2">
                                        <h2 class="font-bold">Respond Back</h2>
                                        <p class="text-sm">
                                            You can respond to the request by
                                            sending a message back or also
                                            granted the request by unlocking the
                                            specified application.
                                        </p>
                                    </div>

                                    <div class="mt-4">
                                        <Label class="pb-2">Send Message</Label>
                                        <Textarea
                                            bind:value={messageValue}
                                            rows={5}
                                            placeholder="Leave a message"
                                        />
                                    </div>

                                    <div
                                        class="flex items-center justify-between my-4"
                                    >
                                        <h2 class="font-bold">
                                            {message.Name} Lock Status
                                        </h2>
                                        <Toggle
                                            checked={message.LockStatus}
                                            on:change={(e) => {
                                                message.LockStatus =
                                                    e.target.checked;
                                            }}
                                            >{message.LockStatus
                                                ? "Locked"
                                                : "Unlocked"}</Toggle
                                        >
                                    </div>

                                    <div
                                        class="flex gap-2 items-center justify-end my-4"
                                    >
                                        <Button
                                            on:click={() =>
                                                triggerUpdate(message)}
                                            class="flex gap-2 items-center"
                                        >
                                            Send Update
                                            <PaperPlaneSolid
                                                class="rotate-90 mt-1"
                                            />
                                        </Button>
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
        Successfully sent the update to the mobile!
    </Toast>
</div>
