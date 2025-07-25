import {
  LayoutDashboard,
  Users,
  User as UserIcon,
  Settings,
  Microchip,
  MapIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { User } from "@/domain/users/user.model";
import { AppSidebarDropdowMenuContent } from "./app-sidebar-dropdown-menu-content";

type Route = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type RoleBasedRoutes = {
  [role: string]: {
    [section: string]: Route[];
  };
};

const roleBasedRoutes: RoleBasedRoutes = {
  ADMIN: {
    Admin: [
      {
        label: "Microcontroladores",
        href: "/microcontrollers",
        icon: Microchip,
      },
      {
        label: "Mapas",
        href: "/maps",
        icon: MapIcon,
      },
      {
        label: "Usuários",
        href: "/users",
        icon: Users,
      },
    ],
    Menu: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
    Pessoal: [
      {
        label: "Perfil",
        href: "/profile",
        icon: UserIcon,
      },
      {
        label: "Configurações",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
  USER: {
    Microcontroladores: [
      {
        label: "Microcontroladores",
        href: "/microcontrollers",
        icon: Microchip,
      },
      {
        label: "Mapas",
        href: "/maps",
        icon: MapIcon,
      },
    ],
    Menu: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
    Pessoal: [
      {
        label: "Perfil",
        href: "/profile",
        icon: UserIcon,
      },
      {
        label: "Configurações",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
};

export function AppSidebar({ user }: { user?: User }) {
  const routes = user?.role && roleBasedRoutes[user.role] ? user.role : "USER";

  return (
    <Sidebar className="md:min-w-[200px]">
      <SidebarHeader className="border-b px-6 py-3">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Raster Logo" width={16} height={26} />
          <span className="text-xl font-bold">Raster</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {roleBasedRoutes[routes] ? (
          Object.keys(roleBasedRoutes[routes]).map((section) => (
            <SidebarGroup key={section}>
              <SidebarGroupLabel>{section}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {roleBasedRoutes[routes][section].map((route: Route) => (
                    <SidebarMenuItem key={route.label}>
                      <SidebarMenuButton asChild>
                        <Link href={route.href}>
                          <route.icon className="h-4 w-4" />
                          {route.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        ) : (
          <div className="text-center">
            Nenhuma rota disponível para este usuário.
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>{user?.email?.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>

          <AppSidebarDropdowMenuContent />
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
