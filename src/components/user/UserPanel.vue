<template>
  <div class="mr-2">
    <v-btn v-if="accountStore.token" class="ms-1" icon>
      <v-avatar image="@/assets/avatar/default-avatar.svg" />
      <v-menu activator="parent" width="280">
        <v-card variant="text" class=" rounded-lg	 border">
          <v-responsive class="bg-surface-light rounded-0" style="height: 88px;"></v-responsive>
          <div class="text-center mt-n9 mb-4">
            <v-avatar size="72" class="border-md border-opacity-100 border-surface-light bg-surface">
              <v-img src="@/assets/avatar/default-avatar.svg"></v-img>
            </v-avatar>
            <div class="text-h6 mt-2">{{ accountStore.info.name }}</div>
          </div>
          <VDivider></VDivider>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" link title="首页" @click="router.replace('/')" />
            <v-list-item prepend-icon="mdi-school" link title="控制台" to="/console/home" />
            <v-list-item prepend-icon="mdi-account-cog" link title="账号设置" @click="dialog = true" />
            <v-list-item prepend-icon="mdi-logout" link title="注销" @click="accountStore.logout" />
          </v-list>
        </v-card>
      </v-menu>
    </v-btn>
    <v-btn v-else class="text-none me-2" prepend-icon="mdi-login" @click="goLogin">
      <span style="font-size: 14px">登录</span>
    </v-btn>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600"
      :fullscreen="$vuetify.display.smAndDown">
      <v-card>
        <v-toolbar>
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
          <v-toolbar-title>设置</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list lines="two" subheader>
          <v-list-subheader>默认主题</v-list-subheader>

          <v-list-item>
            <v-radio-group v-model="settingsStore.useSystemThemes" inline>
              <v-radio label="基于系统首选项主题" :value="true" @change="settingsStore.initTheme()"></v-radio>
              <v-radio label="手动设置" :value="false"> </v-radio>
            </v-radio-group>
          </v-list-item>

          <v-list-subheader>切换主题</v-list-subheader>
          <v-list-item>
            <ThemeSwitch class="pl-2" :disabled="settingsStore.useSystemThemes"></ThemeSwitch>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/account";
import { useSettingsStore } from "@/stores/settings";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const accountStore = useAccountStore();
const settingsStore = useSettingsStore()
const route = useRoute()
const router = useRouter();

const dialog = ref(false);

const goLogin = () => {
  router.push('/login?redirect=' + route.fullPath)
}

onMounted(() => {
  if (accountStore.token) {
    accountStore.validateValid()
  }
})
</script>

<style scoped></style>
