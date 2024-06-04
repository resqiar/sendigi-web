<script lang="ts">
    import { Card, DeviceMockup, Progressbar } from "flowbite-svelte";
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import { MobilePhoneSolid } from "flowbite-svelte-icons";
    import type { DeviceInfo } from "../../dto/dto_interface";

    export let devices: DeviceInfo[] = [];
</script>

<div class="flex mt-4 mb-12">
    <MainSidebar />

    <main class="flex flex-1 justify-center">
        {#each devices as device, idx}
            <Card>
                <div class="flex gap-1 items-center py-2">
                    <MobilePhoneSolid />
                    <h1>Device {idx + 1}</h1>
                </div>

                <div>
                    <DeviceMockup device="android">
                        <div class="py-2 px-2">
                            <Card size="xs" class="my-4 text-black">
                                <p class="text-xs">Device Name:</p>
                                <p class="font-bold text-lg">
                                    {device
                                        ? device.DeviceName
                                        : "Loading data..."}
                                </p>
                            </Card>

                            <Card
                                size="xs"
                                class="my-4 flex flex-col gap-2 text-black"
                            >
                                <div>
                                    <p class="text-xs">Device ID:</p>
                                    <p class="font-bold">
                                        {device ? device.ID : "Loading data..."}
                                    </p>
                                </div>

                                <div>
                                    <p class="text-xs">Device Brand:</p>
                                    <p class="font-bold">
                                        {device
                                            ? device.DeviceBrand
                                            : "Loading data..."}
                                    </p>
                                </div>

                                <div>
                                    <p class="text-xs">Manufacturers:</p>
                                    <p class="font-bold">
                                        {device
                                            ? device.Manufacturer
                                            : "Loading data..."}
                                    </p>
                                </div>

                                <div>
                                    <p class="text-xs">Android Version:</p>
                                    <span class="flex gap-2 items-center">
                                        <p class="font-bold">
                                            {device
                                                ? device.AndroidVersion
                                                : "Loading data..."}
                                        </p>
                                        <p class="text-xs">
                                            (API Level {device
                                                ? device.APILevel
                                                : "Loading data..."})
                                        </p>
                                    </span>
                                </div>
                            </Card>

                            <Card
                                size="xs"
                                class="my-4 flex flex-col gap-2 text-black"
                            >
                                <div>
                                    <p class="text-xs">Battery Level:</p>
                                    <div class="py-2">
                                        {#if device}
                                            <Progressbar
                                                progress={device.BatteryLevel}
                                                size="h-4"
                                                color={device.BatteryLevel < 20
                                                    ? "red"
                                                    : "yellow"}
                                                labelInside
                                            />
                                        {:else}
                                            <p class="text-xs">
                                                Loading data...
                                            </p>
                                        {/if}
                                    </div>
                                </div>

                                <div>
                                    <p class="text-xs">Is Charging?:</p>
                                    <p class="font-bold">
                                        {device?.IsCharging
                                            ? "Charging"
                                            : "Not Charging"}
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </DeviceMockup>
                </div>
            </Card>
        {/each}
    </main>
</div>
