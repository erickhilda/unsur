// Module surface wrapper (shadcn-vue style): lets consumers import
// { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
// (extensionless) — TS moduleResolution=bundler doesn't append .vue to paths.
export {
  default,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './tabs.vue'
