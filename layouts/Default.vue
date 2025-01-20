
<template>
    <div class="flex flex-col h-full bg-slate-100 min-h-screen">
        <navbar-top class="sticky top-0 z-50"></navbar-top>
        <div class="flex-1 flex flex-col">
            <slot></slot>
        </div>
    </div>
</template>