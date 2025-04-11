import { initTranslations } from "@/components/i18n"
import { Header } from "./Header"
import { getMenuData } from "@/const/menu"

type Props = LocaleProp
export async function LayoutHeader({ locale }: Props) {

   const { t } = await initTranslations({
      locale,
      namespaces: ['global'],
   })

   return <Header locale={locale} menuData={getMenuData(t).filter((item) => !item.olnyFooter)}  />
}