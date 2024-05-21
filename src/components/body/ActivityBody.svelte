<script lang="ts">
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import type { ActivityInfo } from "../../dto/dto_interface";
    import { Badge, Card } from "flowbite-svelte";

    export let data: ActivityInfo[];
</script>

<div class="flex mt-4 mb-12">
    <MainSidebar />

    <main class="flex flex-col gap-6 flex-1">
        <Card class="max-w-[90%]">
            <div class="my-4 mx-2">
                <h1 class="font-bold text-lg">
                    Device Activities History (Last 24 Hours)
                </h1>
                <p>
                    This page shows logs of your device's app activity for 24
                    hours, allowing you to analyze your child's usage before the
                    data is automatically deleted to maintain privacy.
                </p>
            </div>

            {#each data as app}
                <div class="flex flex-col p-4 rounded-lg shadow-md mb-4">
                    <div class="my-2">
                        <h1 class="font-bold text-lg">
                            {app.Description.String}
                        </h1>
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
                        <Badge color="yellow" class="mt-2"
                            >Device ID: {app.DeviceID}</Badge
                        >
                    </div>
                </div>
            {/each}
        </Card>
    </main>
</div>
