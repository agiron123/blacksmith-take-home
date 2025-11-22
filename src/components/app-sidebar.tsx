// import { Home, LayoutGrid } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// interface AppSidebarProps {
//   showKitchenSink: boolean;
//   onNavigate: (view: "home" | "kitchen-sink") => void;
// }

// export function AppSidebar({ showKitchenSink, onNavigate }: AppSidebarProps) {
//   const items = [
//     {
//       title: "Home",
//       icon: Home,
//       onClick: () => onNavigate("home"),
//       isActive: !showKitchenSink,
//     },
//     {
//       title: "Kitchen Sink",
//       icon: LayoutGrid,
//       onClick: () => onNavigate("kitchen-sink"),
//       isActive: showKitchenSink,
//     },
//   ];

//   return (
//     <Sidebar>
//       <SidebarHeader />
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton onClick={item.onClick} isActive={item.isActive}>
//                     <item.icon />
//                     <span>{item.title}</span>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter />
//     </Sidebar>
//   );
// }
