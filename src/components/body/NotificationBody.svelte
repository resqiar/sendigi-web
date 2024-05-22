<script lang="ts">
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import type {
        NotificationConfig,
        UserProfile,
    } from "../../dto/dto_interface";
    import {
        Input,
        Card,
        Helper,
        Label,
        ButtonGroup,
        InputAddon,
        Toggle,
        Radio,
        Button,
        Checkbox,
        Modal,
        Toast,
    } from "flowbite-svelte";
    import {
        BugSolid,
        CheckCircleSolid,
        ExclamationCircleOutline,
        InboxFullSolid,
        MessagesSolid,
        UserSettingsSolid,
        WhatsappSolid,
    } from "flowbite-svelte-icons";
    import { copy } from "svelte-copy";
    import { PUBLIC_HTTP_SERVER } from "$env/static/public";
    import { slide } from "svelte/transition";

    export let data: NotificationConfig;
    export let user: UserProfile;

    let emailStatus: boolean = data.EmailStatus;
    let telegram: string = data.Telegram.String;
    let telegramStatus: boolean = data.TelegramStatus;
    let whatsapp: string = data.Whatsapp.String;
    let whatsappStatus: boolean = data.WhatsappStatus;
    let strategy: string = data.Strategy;
    let telegramConfirmationModal = false;

    let errorOpen: boolean = false;
    let successOpen: boolean = false;
    let counter: number = 3;

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
        counter = 3;
        errorOpen = false;
        successOpen = false;
    }

    async function triggerSave() {
        try {
            const response = await fetch(
                `${PUBLIC_HTTP_SERVER}/api/notification/update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...data,
                        EmailStatus: emailStatus,
                        Whatsapp: whatsapp,
                        WhatsappStatus: whatsappStatus,
                        Telegram: telegram,
                        TelegramStatus: telegramStatus,
                        Strategy: strategy,
                    }),
                    credentials: "include",
                },
            );
            if (!response.ok) return triggerError();
            triggerSuccess();
        } catch (error) {
            console.log(error);
        }
    }
</script>

<div class="flex mt-4 mb-12">
    <MainSidebar />

    <main class="flex flex-col gap-6 flex-1">
        <Card class="max-w-[90%]">
            <div class="my-4 mx-2">
                <h1 class="font-bold text-lg">Notification Settings</h1>
            </div>

            {#if data}
                <div class="flex flex-col p-4 rounded-lg mb-4">
                    <div class="my-2">
                        <div class="mb-6">
                            <Label
                                for="success"
                                color="green"
                                class="block mb-2">Send over Email</Label
                            >
                            <ButtonGroup class="w-full" size="sm">
                                <InputAddon><InboxFullSolid /></InputAddon>
                                <Input value={data.Email} disabled />
                                <Toggle bind:checked={emailStatus} class="px-4"
                                    >{emailStatus ? "On" : "Off"}</Toggle
                                >
                            </ButtonGroup>
                            <Helper class="mt-2" color="green">
                                This is the email address for notifications, but
                                changing it is currently unavailable.
                            </Helper>
                        </div>

                        <div class="mb-6">
                            <Label
                                for="success"
                                color="green"
                                class="block mb-2">Send over Whatsapp</Label
                            >
                            <ButtonGroup class="w-full" size="sm">
                                <InputAddon>
                                    <WhatsappSolid />
                                </InputAddon>
                                <Input type="text" bind:value={whatsapp} />
                                <Toggle
                                    bind:checked={whatsappStatus}
                                    class="px-4"
                                    >{whatsappStatus ? "On" : "Off"}</Toggle
                                >
                            </ButtonGroup>
                            <Helper class="mt-2" color="green">
                                Enter your number without +; for example
                                6281217xxxx
                            </Helper>
                        </div>

                        <div class="mb-6">
                            <Label
                                for="success"
                                color="green"
                                class="block mb-2">Send over Telegram</Label
                            >
                            <ButtonGroup class="w-full" size="sm">
                                <InputAddon>
                                    <MessagesSolid />
                                </InputAddon>
                                <div
                                    class="flex rounded border border-gray-200 dark:border-gray-700 w-full"
                                >
                                    {#if !telegram.length}
                                        <Checkbox
                                            checked={false}
                                            class="w-full p-4"
                                            disabled
                                            >You have not yet setting up
                                            Telegram to receive notification.
                                        </Checkbox>
                                        <Button color="primary">
                                            <a
                                                href={`https://t.me/SenDigi_bot`}
                                                use:copy={`/save ${user.ID}`}
                                            >
                                                Click here to copy command & set
                                                up Telegram
                                            </a>
                                        </Button>
                                    {:else}
                                        <Checkbox
                                            checked={true}
                                            class="w-full p-4"
                                            disabled
                                        >
                                            You successfully set-up telegram to
                                            receive notification
                                        </Checkbox>
                                        <Button
                                            on:click={() =>
                                                (telegramConfirmationModal = true)}
                                            color="alternative"
                                        >
                                            Unlink Telegram
                                        </Button>
                                    {/if}
                                </div>
                                <Toggle
                                    bind:checked={telegramStatus}
                                    class="px-4"
                                    >{data.TelegramStatus
                                        ? "On"
                                        : "Off"}</Toggle
                                >
                            </ButtonGroup>
                            <Helper class="mt-2" color="green">
                                You need to setup telegram using designated
                                number before we are able to send notifications
                                to you.
                            </Helper>
                        </div>

                        <div class="my-6">
                            <h1 class="block mb-2 font-bold">
                                Notification Strategy
                            </h1>
                            <div class="w-full flex flex-col gap-4 py-4">
                                <div>
                                    <Radio
                                        aria-describedby="helper-checkbox-text"
                                        bind:group={strategy}
                                        value="LOCKED">Locked Only</Radio
                                    >
                                    <Helper
                                        id="helper-checkbox-text"
                                        class="ps-6"
                                        >The notification will only be sent when
                                        the child open a locked application
                                        (Recommended).</Helper
                                    >
                                </div>

                                <div>
                                    <Radio
                                        aria-describedby="helper-checkbox-text"
                                        bind:group={strategy}
                                        value="ALL">All Activity</Radio
                                    >
                                    <Helper
                                        id="helper-checkbox-text"
                                        class="ps-6"
                                    >
                                        You can opt to receive notifications for
                                        any app activity, but be aware this may
                                        result in spam notifications.
                                    </Helper>
                                </div>

                                <div>
                                    <Radio
                                        aria-describedby="helper-checkbox-text"
                                        bind:group={strategy}
                                        value="OFF">Off</Radio
                                    >
                                    <Helper
                                        id="helper-checkbox-text"
                                        class="ps-6"
                                    >
                                        You can also disable notifications
                                        entirely while still tracking activity
                                        history.
                                    </Helper>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2 items-center justify-end mb-2">
                        <Button on:click={() => triggerSave()}>
                            <UserSettingsSolid />
                            Update Settings</Button
                        >
                    </div>
                </div>
            {/if}
        </Card>
    </main>
</div>

<Modal bind:open={telegramConfirmationModal} size="xs" autoclose>
    <div class="text-center">
        <ExclamationCircleOutline
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
        />
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to unlink Telegram?
        </h3>
        <Button
            color="red"
            size="sm"
            class="me-2"
            on:click={() => {
                telegram = "";
                triggerSave();
            }}>Yes, I'm sure</Button
        >
        <Button color="alternative" size="sm">No, cancel</Button>
    </div>
</Modal>

<div class="fixed bottom-5 right-20 z-10">
    <Toast dismissable={false} bind:open={errorOpen} transition={slide}>
        <BugSolid slot="icon" class="w-5 h-5" />
        Something when wrong, please try again later!
    </Toast>

    <Toast dismissable={false} bind:open={successOpen} transition={slide}>
        <CheckCircleSolid slot="icon" class="w-5 h-5" />
        Successfully updating your settings!
    </Toast>
</div>
