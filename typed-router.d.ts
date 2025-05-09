/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/apply': RouteRecordInfo<'/apply', '/apply', Record<never, never>, Record<never, never>>,
    '/console': RouteRecordInfo<'/console', '/console', Record<never, never>, Record<never, never>>,
    '/console/apply/account': RouteRecordInfo<'/console/apply/account', '/console/apply/account', Record<never, never>, Record<never, never>>,
    '/console/apply/review': RouteRecordInfo<'/console/apply/review', '/console/apply/review', Record<never, never>, Record<never, never>>,
    '/console/attendance': RouteRecordInfo<'/console/attendance', '/console/attendance', Record<never, never>, Record<never, never>>,
    '/console/correct': RouteRecordInfo<'/console/correct', '/console/correct', Record<never, never>, Record<never, never>>,
    '/console/course/[id]': RouteRecordInfo<'/console/course/[id]', '/console/course/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/console/course/[id].[crid]': RouteRecordInfo<'/console/course/[id].[crid]', '/console/course/:id/:crid', { id: ParamValue<true>, crid: ParamValue<true> }, { id: ParamValue<false>, crid: ParamValue<false> }>,
    '/console/course/[id].manage': RouteRecordInfo<'/console/course/[id].manage', '/console/course/:id/manage', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/console/course/check': RouteRecordInfo<'/console/course/check', '/console/course/check', Record<never, never>, Record<never, never>>,
    '/console/course/manage': RouteRecordInfo<'/console/course/manage', '/console/course/manage', Record<never, never>, Record<never, never>>,
    '/console/declare/check': RouteRecordInfo<'/console/declare/check', '/console/declare/check', Record<never, never>, Record<never, never>>,
    '/console/declare/manage': RouteRecordInfo<'/console/declare/manage', '/console/declare/manage', Record<never, never>, Record<never, never>>,
    '/console/home': RouteRecordInfo<'/console/home', '/console/home', Record<never, never>, Record<never, never>>,
    '/console/homework/examine': RouteRecordInfo<'/console/homework/examine', '/console/homework/examine', Record<never, never>, Record<never, never>>,
    '/console/homework/manage': RouteRecordInfo<'/console/homework/manage', '/console/homework/manage', Record<never, never>, Record<never, never>>,
    '/console/notice': RouteRecordInfo<'/console/notice', '/console/notice', Record<never, never>, Record<never, never>>,
    '/console/org': RouteRecordInfo<'/console/org', '/console/org', Record<never, never>, Record<never, never>>,
    '/console/resource/courseware': RouteRecordInfo<'/console/resource/courseware', '/console/resource/courseware', Record<never, never>, Record<never, never>>,
    '/console/resource/questions': RouteRecordInfo<'/console/resource/questions', '/console/resource/questions', Record<never, never>, Record<never, never>>,
    '/console/resource/report-template': RouteRecordInfo<'/console/resource/report-template', '/console/resource/report-template', Record<never, never>, Record<never, never>>,
    '/console/resource/share': RouteRecordInfo<'/console/resource/share', '/console/resource/share', Record<never, never>, Record<never, never>>,
    '/console/resource/simulation': RouteRecordInfo<'/console/resource/simulation', '/console/resource/simulation', Record<never, never>, Record<never, never>>,
    '/console/resource/testpaper/': RouteRecordInfo<'/console/resource/testpaper/', '/console/resource/testpaper', Record<never, never>, Record<never, never>>,
    '/console/resource/testpaper/[id]': RouteRecordInfo<'/console/resource/testpaper/[id]', '/console/resource/testpaper/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/console/sign-in': RouteRecordInfo<'/console/sign-in', '/console/sign-in', Record<never, never>, Record<never, never>>,
    '/console/site': RouteRecordInfo<'/console/site', '/console/site', Record<never, never>, Record<never, never>>,
    '/console/stats/course-browse': RouteRecordInfo<'/console/stats/course-browse', '/console/stats/course-browse', Record<never, never>, Record<never, never>>,
    '/console/stats/role-statistics': RouteRecordInfo<'/console/stats/role-statistics', '/console/stats/role-statistics', Record<never, never>, Record<never, never>>,
    '/console/stats/statistics': RouteRecordInfo<'/console/stats/statistics', '/console/stats/statistics', Record<never, never>, Record<never, never>>,
    '/console/stats/VirtualLabStats': RouteRecordInfo<'/console/stats/VirtualLabStats', '/console/stats/VirtualLabStats', Record<never, never>, Record<never, never>>,
    '/console/stats/visit-statistics': RouteRecordInfo<'/console/stats/visit-statistics', '/console/stats/visit-statistics', Record<never, never>, Record<never, never>>,
    '/console/system/database': RouteRecordInfo<'/console/system/database', '/console/system/database', Record<never, never>, Record<never, never>>,
    '/console/system/log': RouteRecordInfo<'/console/system/log', '/console/system/log', Record<never, never>, Record<never, never>>,
    '/console/user/[rids]': RouteRecordInfo<'/console/user/[rids]', '/console/user/:rids', { rids: ParamValue<true> }, { rids: ParamValue<false> }>,
    '/console/user/permission': RouteRecordInfo<'/console/user/permission', '/console/user/permission', Record<never, never>, Record<never, never>>,
    '/console/user/role': RouteRecordInfo<'/console/user/role', '/console/user/role', Record<never, never>, Record<never, never>>,
    '/home': RouteRecordInfo<'/home', '/home', Record<never, never>, Record<never, never>>,
    '/home/': RouteRecordInfo<'/home/', '/home', Record<never, never>, Record<never, never>>,
    '/home/[path]': RouteRecordInfo<'/home/[path]', '/home/:path', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/home/[path]/': RouteRecordInfo<'/home/[path]/', '/home/:path', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/home/[path]/[id]': RouteRecordInfo<'/home/[path]/[id]', '/home/:path/:id', { path: ParamValue<true>, id: ParamValue<true> }, { path: ParamValue<false>, id: ParamValue<false> }>,
    '/home/center/': RouteRecordInfo<'/home/center/', '/home/center', Record<never, never>, Record<never, never>>,
    '/home/center/[id]': RouteRecordInfo<'/home/center/[id]', '/home/center/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/login': RouteRecordInfo<'/login', '/login', Record<never, never>, Record<never, never>>,
  }
}
