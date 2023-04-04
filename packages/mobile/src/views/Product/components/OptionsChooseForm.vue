<template>
  <van-form label-width="50">
    <van-cell-group inset>
      <van-field label="版本">
        <template #input>
          <van-radio-group v-model="state.activeOption">
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
              "
            >
              <van-radio
                v-for="(item, index) in props.options"
                :key="index"
                style="padding: 5px 0"
                :name="index"
              >
                {{ item.optionName }}
              </van-radio>
            </div>
          </van-radio-group>
        </template>
      </van-field>

      <van-field label="数量">
        <template #input>
          <van-stepper
            v-model="state.buyCount"
            integer
          />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button
        round
        block
        type="primary"
        @click="onSubmit"
        native-type="submit"
      >
        确定
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import { reactive } from 'vue'

interface Props {
  activeOption: number
  options: Record<string, any>[]
}

const props = defineProps<Props>()

const emit = defineEmits(['complete'])

const state = reactive({
  activeOption: props.activeOption,
  buyCount: 1,
})
const onSubmit = () => {
  emit('complete', toRaw(state))
}
</script>

<style lang="scss" scoped></style>
