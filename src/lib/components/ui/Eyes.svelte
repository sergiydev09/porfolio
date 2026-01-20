<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { spring } from "svelte/motion";

    let { interactionState = "idle", emotion = "neutral" } = $props<{
        interactionState?: "idle" | "typing" | "thinking" | "speaking";
        emotion?: "neutral" | "happy" | "sad";
    }>();

    let container: HTMLDivElement | null = null;
    let blinkInterval: ReturnType<typeof setInterval>;
    let isBlinking = $state(false);
    let isPoke = $state(false);

    // Spring animation for smooth movement
    const pupilCoords = spring(
        { x: 0, y: 0 },
        {
            stiffness: 0.1,
            damping: 0.4,
        },
    );

    function updateEyes(x: number, y: number) {
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate angle and distance
        const dx = x - centerX;
        const dy = y - centerY;
        const angle = Math.atan2(dy, dx);

        // Limit the movement radius
        const maxRadius = 15; // Max pupil movement in pixels
        const distance = Math.min(maxRadius, Math.hypot(dx, dy) / 10);

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        pupilCoords.set({ x: moveX, y: moveY });
    }

    function blink() {
        isBlinking = true;
        setTimeout(() => {
            isBlinking = false;
        }, 150);
    }

    function startBlinking() {
        // Random blink interval between 2s and 6s
        const delay = Math.random() * 4000 + 2000;
        blinkInterval = setTimeout(() => {
            blink();
            startBlinking();
        }, delay);
    }

    function handleClick() {
        isPoke = true;
        // Squeeze eyes shut
        setTimeout(() => {
            isPoke = false;
        }, 800);
    }

    onMount(() => {
        startBlinking();
    });

    onDestroy(() => {
        if (blinkInterval) clearTimeout(blinkInterval);
    });

    let shiftRight = $state(false);

    $effect(() => {
        if (interactionState === "typing") {
            // Look down
            pupilCoords.set({ x: 0, y: 15 });
            shiftRight = false;
        } else if (interactionState === "thinking") {
            // Keep centered for rolling animation
            pupilCoords.set({ x: 0, y: 0 });
            shiftRight = false;
        } else if (interactionState === "idle") {
            // Return to mouse tracking
        }
    });

    function handleMouseMove(event: MouseEvent) {
        if (interactionState === "idle" && !isPoke) {
            // Check if user is interacting with the scheduling panel
            const target = event.target as HTMLElement;
            if (target && target.closest("#scheduling-panel")) {
                // Focus intently to the right (bypassing maxRadius)
                // AND move the whole eye container significantly
                shiftRight = true;
                // Continue to update eyes to track mouse from new position
            } else {
                shiftRight = false;
            }

            updateEyes(event.clientX, event.clientY);
        }
    }
</script>

<svelte:window onmousemove={handleMouseMove} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="eyes-container flex gap-4 justify-center items-center py-4 cursor-pointer transition-transform duration-500 ease-out"
    class:translate-x-[18vw]={shiftRight}
    bind:this={container}
    onclick={handleClick}
>
    <!-- Left Eye -->
    <div
        class="eye bg-white relative rounded-full overflow-hidden shadow-inner border-2 border-dark-700"
    >
        <!-- Eyelids for blinking and emotions -->
        <div
            class="eyelid-top absolute w-full bg-dark-900 z-20 transition-all duration-100"
            class:closed={isBlinking || isPoke}
            class:focused-happy={shiftRight && !isBlinking && !isPoke}
        ></div>

        <div
            class="pupil bg-dark-900 absolute rounded-full z-10"
            style="transform: translate({$pupilCoords.x}px, {$pupilCoords.y}px);"
            class:thinking={interactionState === "thinking"}
        >
            <div
                class="reflection bg-white absolute rounded-full opacity-80"
            ></div>
        </div>

        <!-- Bottom Eyelid - only shows when focused (right side) or poke -->
        <div
            class="eyelid-bottom absolute bottom-0 bg-dark-900 z-20 transition-all duration-300"
            class:closed-bottom={isPoke}
            class:focused-happy={shiftRight && !isBlinking && !isPoke}
        ></div>

        {#if interactionState === "thinking" && !isBlinking && !isPoke}
            <div
                class="lid-thinking bg-dark-800/20 absolute w-full h-full animate-pulse z-0"
            ></div>
        {/if}
    </div>

    <!-- Right Eye -->
    <div
        class="eye bg-white relative rounded-full overflow-hidden shadow-inner border-2 border-dark-700"
    >
        <div
            class="eyelid-top absolute w-full bg-dark-900 z-20 transition-all duration-100"
            class:closed={isBlinking || isPoke}
            class:focused-happy={shiftRight && !isBlinking && !isPoke}
        ></div>

        <div
            class="pupil bg-dark-900 absolute rounded-full z-10"
            style="transform: translate({$pupilCoords.x}px, {$pupilCoords.y}px);"
            class:thinking={interactionState === "thinking"}
        >
            <div
                class="reflection bg-white absolute rounded-full opacity-80"
            ></div>
        </div>

        <div
            class="eyelid-bottom absolute bottom-0 bg-dark-900 z-20 transition-all duration-300"
            class:closed-bottom={isPoke}
            class:focused-happy={shiftRight && !isBlinking && !isPoke}
        ></div>

        {#if interactionState === "thinking" && !isBlinking && !isPoke}
            <div
                class="lid-thinking bg-dark-800/20 absolute w-full h-full animate-pulse z-0"
                style="animation-delay: 0.1s"
            ></div>
        {/if}
    </div>
</div>

<style>
    .eye {
        width: 60px;
        height: 80px;
    }

    .pupil {
        width: 36px;
        height: 36px;
        top: 50%;
        left: 50%;
        margin-top: -18px;
        margin-left: -18px;
    }

    .reflection {
        width: 10px;
        height: 10px;
        top: 5px;
        left: 5px;
    }

    .eyelid-top {
        top: 0;
        height: 0%;
    }

    .eyelid-top.closed {
        height: 60%; /* Meet in the middle */
    }

    /* Focused + Happy expression when looking at scheduling panel */
    .eyelid-top.focused-happy {
        height: 45%;
        -webkit-mask-image: radial-gradient(ellipse 120% 70% at 50% 90%, transparent 50%, black 51%);
        mask-image: radial-gradient(ellipse 120% 70% at 50% 90%, transparent 50%, black 51%);
    }

    .eyelid-bottom {
        height: 0%;
        width: 100%;
        left: 0;
        border-radius: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .eyelid-bottom.closed-bottom {
        height: 60%; /* Meet in the middle */
    }

    /* Focused + Happy expression - curved bottom eyelid like a smile */
    .eyelid-bottom.focused-happy {
        height: 30%;
        border-radius: 120% 120% 0 0 / 70% 70% 0 0;
    }

    .thinking {
        animation: roll 2s infinite ease-in-out;
    }

    @keyframes roll {
        0% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(10px, -5px);
        }
        50% {
            transform: translate(0, -10px);
        }
        75% {
            transform: translate(-10px, -5px);
        }
        100% {
            transform: translate(0, 0);
        }
    }
</style>
