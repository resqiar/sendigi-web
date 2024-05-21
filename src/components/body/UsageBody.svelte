<script lang="ts">
    import MainSidebar from "../sidebar/MainSidebar.svelte";
    import type { AppInfo } from "../../dto/dto_interface";
    import { Bar } from "svelte-chartjs";
    import {
        Chart,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
    } from "chart.js";
    import { Card } from "flowbite-svelte";

    Chart.register(
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
    );

    export let data: AppInfo[];

    let dataset = {
        labels: [],
        datasets: [
            {
                label: "Last 24 Hours Application Usage (Minutes)",
                data: [],
                backgroundColor: "green",
                borderWidth: 1,
            },
        ],
        images: [],
    };

    $: {
        dataset.labels = [];
        dataset.images = [];
        dataset.datasets[0].data = [];

        for (let i = 0; i < data.length; i++) {
            const [hour, minute] = convertToHourMinute(data[i].TimeUsage);
            const decimalPoint = convertToDecimal(hour, minute);

            dataset.labels.push(data[i].Name as never);
            dataset.images.push(data[i].Icon as never);
            dataset.datasets[0].data.push(decimalPoint as never);

            // trigger updating
            dataset.labels = dataset.labels;
            dataset.images = dataset.images;
            dataset.datasets[0] = dataset.datasets[0];
        }
    }

    function convertToHourMinute(time: number): [number, number] {
        const hour = time / 60;
        const minute = time % 60;
        return [hour, minute];
    }

    function convertToDecimal(hours: number, minutes: number): string {
        const decimalHours = hours + minutes / 60;
        return decimalHours.toFixed(2);
    }
</script>

<div class="flex mt-4 mb-12">
    <MainSidebar />

    <main class="flex flex-col gap-6 flex-1">
        <Card class="max-w-[90%]">
            <Bar
                data={dataset}
                plugins={[
                    {
                        id: "draw-icon",
                        afterDraw: (chart) => {
                            const {
                                ctx,
                                scales: { x },
                            } = chart;

                            ctx.save();

                            dataset.images.map((image, index) => {
                                const label = new Image();
                                label.src = image;
                                const width = 20;

                                ctx.drawImage(
                                    label,
                                    x.getPixelForValue(index) - width / 2,
                                    x.top - width / 2,
                                    width,
                                    width,
                                );
                            });
                        },
                    },
                ]}
            />
        </Card>

        <Card class="max-w-[90%]">
            <div class="my-4 mx-2">
                <h1 class="font-bold text-lg">Application Usage</h1>
                <p>
                    Application usage counts how many hours and minutes you
                    spend with each installed application in your device. It
                    counts for the last 24 hours.
                </p>
            </div>

            {#each data as app}
                <div class="p-4 rounded-lg shadow-md mb-4">
                    <div class="flex gap-2 items-center mb-2">
                        <div>
                            <img src={app.Icon} alt={app.Name} width="30" />
                        </div>
                        <h2 class="text-lg font-bold">{app.Name}</h2>
                    </div>
                    <p>
                        Today's time usage: {convertToHourMinute(
                            app.TimeUsage,
                        )[0].toFixed(0)} Hour
                        {convertToHourMinute(app.TimeUsage)[1]} Minute
                    </p>
                </div>
            {/each}
        </Card>
    </main>
</div>
