<script lang="ts" setup>
  import { ref } from "vue";

  import { PlusIcon } from "@heroicons/vue/20/solid";

  defineProps<{
    filters: {
      id: string;
      name: string;
      options:
        | {
            value: string;
            label: string | number;
          }[]
        | undefined;
    }[];
    mobileFiltersOpen: boolean;
  }>();

  defineEmits<{
    (e: "update:mobileFiltersOpen", value: boolean): void;
  }>();

  function handleFilterChange(checked: boolean, value: string | number) {}
</script>

<template>
  <aside>
    <h2 class="sr-only">Filters</h2>

    <button
      type="button"
      class="inline-flex items-center lg:hidden"
      @click="() => $emit('update:mobileFiltersOpen', true)"
    >
      <span class="text-sm font-medium text-gray-700">Filters</span>
      <PlusIcon
        class="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
        aria-hidden="true"
      />
    </button>

    <div class="hidden lg:block">
      <form class="space-y-10 divide-y divide-gray-200">
        <div
          v-for="(section, sectionIdx) in filters"
          :key="section.name"
          :class="sectionIdx === 0 ? null : 'pt-10'"
        >
          <fieldset>
            <legend class="block text-sm font-medium text-gray-900">
              {{ section.name }}
            </legend>
            <div class="space-y-3 pt-6">
              <div
                v-for="(option, optionIdx) in section.options"
                :key="option.value"
                class="flex items-center"
              >
                <input
                  :id="`${section.id}-${optionIdx}`"
                  :name="`${section.id}[]`"
                  :value="option.value"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  @change="
                    handleFilterChange(
                      ($event.target as HTMLInputElement).checked,
                      option.label
                    )
                  "
                />
                <label
                  :for="`${section.id}-${optionIdx}`"
                  class="ml-3 text-sm text-gray-600"
                  >{{ option.label }}</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  </aside>
</template>

<style scoped></style>
