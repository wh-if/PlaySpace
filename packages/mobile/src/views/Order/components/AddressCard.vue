<template>
  <div>
    <van-cell
      center
      size="large"
      clickable
      class="address-box"
      is-link
      @click="handleAddressClick"
    >
      <template #icon>
        <van-icon
          style="margin: 0 10px"
          size="25"
          name="location-o"
          color="#ee0a24"
        />
      </template>
      <template #title>
        <div v-if="addressNeedAdd">点击添加地址信息</div>
        <div v-else>
          <p style="font-size: 14px; color: gray">
            {{ currentAddress?.position }}
          </p>
          <p>{{ currentAddress?.detailAddress }}</p>
          <p style="font-size: 14px; color: gray">
            {{
              currentAddress?.receiverName +
              '  ' +
              currentAddress?.receiverPhone
            }}
          </p>
        </div>
      </template>
    </van-cell>
    <VanPopup
      v-model:show="addressFormState.visible"
      position="bottom"
      closeable
      :style="{ paddingTop: '50px' }"
      round
    >
      <van-address-edit
        :area-list="areaList"
        :address-info="addressFormState.whenUpdateAddressInfo ?? {}"
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </VanPopup>
    <VanPopup
      v-model:show="addressListState.visible"
      position="bottom"
      closeable
      :style="{ paddingTop: '50px' }"
      round
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="addresslist"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
import type { AddressListAddress, AddressEditInfo } from 'vant'

import {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
  Address,
} from '@/api/user'
import { computed, watch, reactive, ref } from 'vue'

const props = defineProps<{ addressId?: number | string }>()

const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    // ....
  },
}

const addressFormState = reactive({
  visible: false,
  whenUpdateAddressInfo: {} as (AddressEditInfo & { id: string }) | null,
})

const addressListState = reactive({
  visible: false,
  list: [] as Address[],
})

const chosenAddressId = ref()
const addresslist = computed(() => {
  return addressListState.list.map(
    (item) =>
      ({
        id: item.id,
        name: item.receiverName,
        tel: item.receiverPhone,
        address: item.position + item.detailAddress,
        isDefault: item.isDefault,
      } as AddressListAddress)
  )
})

const addressNeedAdd = computed(() => addressListState.list.length === 0)
const currentAddress = computed(() => {
  return addressListState.list.find((item) => item.id === chosenAddressId.value)
})

const onSave = (info: Record<string, any>) => {
  const data = {
    receiverName: info.name,
    receiverPhone: info.tel,
    position: info.areaCode,
    isDefault: info.isDefault,
    detailAddress: info.addressDetail,
  }
  if (!addressFormState.whenUpdateAddressInfo) {
    addAddress(data).then(() => {
      addressFormState.visible = false

      getAddressData()
    })
  } else {
    updateAddress({
      id: addressFormState.whenUpdateAddressInfo.id,
      ...data,
    }).then(() => {
      addressFormState.visible = false
      addressFormState.whenUpdateAddressInfo = null
      getAddressData()
    })
  }
}
const onDelete = () => {
  // deleteAddress('').then(() => {
  //     addressFormState.visible = false
  // getAddressData()
  // })
}

const onAdd = () => {
  addressFormState.whenUpdateAddressInfo = null
  addressFormState.visible = true
}
const onEdit = (item: AddressListAddress, index: number) => {
  const result = addressListState.list.find((i) => i.id === item.id)!
  console.log(result)
  addressFormState.whenUpdateAddressInfo = {
    tel: result.receiverPhone,
    name: result.receiverName,
    city: '',
    county: '',
    country: '',
    province: '',
    areaCode: result.position,
    isDefault: result.isDefault,
    addressDetail: result.detailAddress,
    id: result.id!,
  }
  addressFormState.visible = true
}

function handleAddressClick() {
  if (!!props.addressId) {
    return
  }
  if (addressNeedAdd.value) {
    addressFormState.visible = true
  } else {
    addressListState.visible = true
  }
}

function getAddressData() {
  getAddress().then((res) => {
    addressListState.list = res.data
  })
}

defineExpose({
  chosenAddressId,
})

watch(
  () => props.addressId,
  (val) => {
    chosenAddressId.value = val
  }
)

getAddress().then((res) => {
  addressListState.list = res.data
  let result = addressListState.list.find((val) => val.isDefault)
  chosenAddressId.value = result?.id ?? addressListState.list[0]?.id
})
</script>

<style lang="scss" scoped>
.address-box {
  background: linear-gradient(90.95deg, #ffeef2 9.36%, #fff5eb 96.6%);
  font-weight: bold;
  height: 80px;

  width: auto;
  border-radius: 8px;
  margin: 0 10px;
}
</style>
