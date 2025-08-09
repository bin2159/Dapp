"use client"

import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items
}) {


  const pathname = usePathname();
  console.log('Pathname - ',pathname)
  return (
    (<SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Link href="/dashboard/appointments/add">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">

                  <IconCirclePlusFilled className="!size-5" />
                  <span>Quick Create</span>
              </SidebarMenuButton>
            </Link>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline">
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const fullUrl = `/dashboard/${item.url.replace(/^\/+/, '')}`;
            return(
            <Link href={fullUrl} key={item.title}>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className="!size-5"/>}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          )})}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>)
  );
}
