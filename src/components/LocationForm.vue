<template>
    <div class="h-screen flex flex-col items-start pt-4 bg-gray-50 overflow-y-auto">
        <!-- Form Dropdown -->
        <div class="w-full max-w-2xl space-y-4 flex mx-2">
            <div class="flex gap-4 w-full">
                <select v-model="provId" @change="fetchKab" class=" p-2 border rounded">
                    <option value="">Pilih Provinsi</option>
                    <option v-for="prov in provinsi" :key="prov.id_prov" :value="prov.id_prov">
                        {{ prov.provinsi }}
                    </option>
                </select>

                <select v-model="kabkotId" @change="fetchKec" class="p-2 border rounded" :disabled="!provId">
                    <option value="">Pilih Kabupaten/Kota</option>
                    <option v-for="kab in kabkota" :key="kab.id_kabkot" :value="kab">
                        {{ kab.kabupaten }}
                    </option>
                </select>
            </div>

        </div>

        <!-- Grid card -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 w-full max-w-6xl">
            <div v-for="item in kecamatanList" :key="item.id" class="p-4 border rounded shadow bg-white text-black">
                <p>Kecamatan</p>
                <h3 class="font-semibold text-lg">{{ item.kecamatan }}</h3>

                <p>Jumlah Dapur: {{ item.jumlah_kecamatan }}</p>
                <p>Total Tersedia: {{ item.plan_kitchen_sum }}</p>
                <p>Sisa Tersedia: {{ item.plan_kitchen_sum - item.jumlah_kecamatan }}</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import api from '../lib/axiox'

const provinsi = ref([])
const kabkota = ref([])
const kecamatanList = ref([])

const provId = ref('')
const kabkotId = ref('')
const kecamatan = ref('')

const regionalData = ref([])
const kasatpelData = ref([])

const mergedResults = ref([])

onMounted(async () => {
    const res = await api.get('regional')
    provinsi.value = res.data
})

const fetchKab = async () => {
    kabkotId.value = ''
    kecamatan.value = ''
    kabkota.value = []
    kecamatanList.value = []
    kasatpelData.value = []
    regionalData.value = []

    const res = await api.get(`regional?prov=${provId.value}`)
    kabkota.value = res.data
}

const fetchKec = async () => {
    kecamatan.value = ''
    kasatpelData.value = []
    regionalData.value = []
    const res = await api.get(`regional?kota=${kabkotId.value.kabupaten}&id_kota=${kabkotId.value.id_kabkot}`)
    kecamatanList.value = res.data
}
</script>
