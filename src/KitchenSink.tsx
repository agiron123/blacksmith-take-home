import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
  MenubarCheckboxItem,
} from "@/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Kbd } from "@/components/ui/kbd";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export function KitchenSink() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [rangeValue, setRangeValue] = useState([20, 80]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [singleToggle, setSingleToggle] = useState<string>("");
  const [multipleToggle, setMultipleToggle] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Introduction Section */}
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Welcome to the Kitchen Sink</CardTitle>
              <CardDescription>
                This page showcases all available shadcn/ui components with interactive examples.
                Scroll down to explore each component.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Layout & Structure Components */}
        <section id="layout" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Layout & Structure</h2>
            <p className="text-muted-foreground">
              Components for organizing and structuring your UI
            </p>
          </div>

          {/* Card */}
          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>Display content in a structured card container</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the card content area. Cards can contain any content.</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">Card Footer</p>
                </CardFooter>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Outlined Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>This card has a border variant.</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Separator */}
          <Card>
            <CardHeader>
              <CardTitle>Separator</CardTitle>
              <CardDescription>Visual divider between content sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p>Content above</p>
                <Separator />
                <p>Content below</p>
              </div>
              <div className="flex items-center gap-4">
                <span>Left</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Middle</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Right</span>
              </div>
            </CardContent>
          </Card>

          {/* Aspect Ratio */}
          <Card>
            <CardHeader>
              <CardTitle>Aspect Ratio</CardTitle>
              <CardDescription>Maintain consistent aspect ratios for media content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">16:9</p>
                  <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                    <div className="flex items-center justify-center h-full">16:9</div>
                  </AspectRatio>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">4:3</p>
                  <AspectRatio ratio={4 / 3} className="bg-muted rounded-md overflow-hidden">
                    <div className="flex items-center justify-center h-full">4:3</div>
                  </AspectRatio>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">1:1</p>
                  <AspectRatio ratio={1 / 1} className="bg-muted rounded-md overflow-hidden">
                    <div className="flex items-center justify-center h-full">1:1</div>
                  </AspectRatio>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resizable */}
          <Card>
            <CardHeader>
              <CardTitle>Resizable</CardTitle>
              <CardDescription>Resizable panels for flexible layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResizablePanelGroup direction="horizontal" className="border rounded-lg">
                  <ResizablePanel defaultSize={50} className="p-4">
                    <div className="h-full flex items-center justify-center bg-muted rounded">
                      <p>Left Panel - Drag to resize</p>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} className="p-4">
                    <div className="h-full flex items-center justify-center bg-muted rounded">
                      <p>Right Panel - Drag to resize</p>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </CardContent>
          </Card>

          {/* Scroll Area */}
          <Card>
            <CardHeader>
              <CardTitle>Scroll Area</CardTitle>
              <CardDescription>
                Customizable scrollable areas with styled scrollbars
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full border rounded-md p-4">
                <div className="space-y-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="p-2 bg-muted rounded">
                      Scrollable item {i + 1}
                    </div>
                  ))}
                </div>
                <ScrollBar />
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
              <CardDescription>Placeholder content for loading states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation Components */}
        <section id="navigation" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Navigation</h2>
            <p className="text-muted-foreground">Components for navigation and wayfinding</p>
          </div>

          {/* Breadcrumb */}
          <Card>
            <CardHeader>
              <CardTitle>Breadcrumb</CardTitle>
              <CardDescription>Display navigation hierarchy and current location</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>

          {/* Navigation Menu */}
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menu</CardTitle>
              <CardDescription>Horizontal navigation with dropdown menus</CardDescription>
            </CardHeader>
            <CardContent>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components built with Radix UI and Tailwind CSS.
                            </p>
                          </div>
                        </li>
                        <NavigationMenuLink
                          href="#"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Introduction</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Re-usable components built using Radix UI and Tailwind CSS.
                          </p>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <NavigationMenuLink
                          href="#"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Alert Dialog</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            A modal dialog that interrupts the user.
                          </p>
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Documentation
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </CardContent>
          </Card>

          {/* Menubar */}
          <Card>
            <CardHeader>
              <CardTitle>Menubar</CardTitle>
              <CardDescription>Menu bar component for application menus</CardDescription>
            </CardHeader>
            <CardContent>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>New Tab</MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>Undo</MenubarItem>
                    <MenubarItem>Redo</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>View</MenubarTrigger>
                  <MenubarContent>
                    <MenubarCheckboxItem checked>Always Show Bookmarks Bar</MenubarCheckboxItem>
                    <MenubarCheckboxItem>Always Show Full URLs</MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarRadioGroup value="pedro">
                      <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                      <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                      <MenubarRadioItem value="pedro">Pedro</MenubarRadioItem>
                    </MenubarRadioGroup>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </CardContent>
          </Card>

          {/* Pagination */}
          <Card>
            <CardHeader>
              <CardTitle>Pagination</CardTitle>
              <CardDescription>Navigate through paginated content</CardDescription>
            </CardHeader>
            <CardContent>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>Organize content into tabbed sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Make changes to your account here. Click save when you're done.
                  </p>
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Change your password here. After saving, you'll be logged out.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Manage your application settings here.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Form Components */}
        <section id="forms" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Forms</h2>
            <p className="text-muted-foreground">Input components and form controls</p>
          </div>

          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Text input field</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="text" placeholder="Enter text here" />
              <Input type="email" placeholder="email@example.com" />
              <Input type="password" placeholder="Password" />
              <Input type="text" placeholder="Disabled input" disabled />
            </CardContent>
          </Card>

          {/* Label */}
          <Card>
            <CardHeader>
              <CardTitle>Label</CardTitle>
              <CardDescription>Form field labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" />
              </div>
            </CardContent>
          </Card>

          {/* Textarea */}
          <Card>
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
              <CardDescription>Multi-line text input</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Type your message here..." rows={4} />
            </CardContent>
          </Card>

          {/* Select */}
          <Card>
            <CardHeader>
              <CardTitle>Select</CardTitle>
              <CardDescription>Dropdown selection</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Input OTP */}
          <Card>
            <CardHeader>
              <CardTitle>Input OTP</CardTitle>
              <CardDescription>One-time password input</CardDescription>
            </CardHeader>
            <CardContent>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </CardContent>
          </Card>

          {/* Checkbox */}
          <Card>
            <CardHeader>
              <CardTitle>Checkbox</CardTitle>
              <CardDescription>Checkbox input</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" defaultChecked />
                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled" className="opacity-50">
                  Disabled checkbox
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Radio Group */}
          <Card>
            <CardHeader>
              <CardTitle>Radio Group</CardTitle>
              <CardDescription>Single selection from options</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Option 2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="r3" />
                  <Label htmlFor="r3">Option 3</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Switch */}
          <Card>
            <CardHeader>
              <CardTitle>Switch</CardTitle>
              <CardDescription>Toggle switch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                <Switch id="airplane-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="disabled-switch" className="opacity-50">
                  Disabled
                </Label>
                <Switch id="disabled-switch" disabled />
              </div>
            </CardContent>
          </Card>

          {/* Slider */}
          <Card>
            <CardHeader>
              <CardTitle>Slider</CardTitle>
              <CardDescription>Range slider input</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Volume: {sliderValue[0]}</Label>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
              </div>
              <div className="space-y-2">
                <Label>
                  Range: {rangeValue[0]} - {rangeValue[1]}
                </Label>
                <Slider value={rangeValue} onValueChange={setRangeValue} max={100} step={1} />
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Date picker calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </section>

        {/* Buttons & Actions */}
        <section id="buttons" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Buttons & Actions</h2>
            <p className="text-muted-foreground">Interactive button components</p>
          </div>

          {/* Button */}
          <Card>
            <CardHeader>
              <CardTitle>Button</CardTitle>
              <CardDescription>Various button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Toggle</CardTitle>
              <CardDescription>Toggle button</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Toggle>Toggle</Toggle>
                <Toggle pressed>Pressed</Toggle>
                <Toggle disabled>Disabled</Toggle>
              </div>
            </CardContent>
          </Card>

          {/* Toggle Group */}
          <Card>
            <CardHeader>
              <CardTitle>Toggle Group</CardTitle>
              <CardDescription>Group of toggle buttons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleGroup type="single" value={singleToggle} onValueChange={setSingleToggle}>
                <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup type="multiple" value={multipleToggle} onValueChange={setMultipleToggle}>
                <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
              </ToggleGroup>
            </CardContent>
          </Card>
        </section>

        {/* Feedback & Overlays */}
        <section id="overlays" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Feedback & Overlays</h2>
            <p className="text-muted-foreground">Dialogs, tooltips, and overlays</p>
          </div>

          {/* Alert */}
          <Card>
            <CardHeader>
              <CardTitle>Alert</CardTitle>
              <CardDescription>Alert messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>This is an alert message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>Modal dialog</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" defaultValue="John Doe" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Drawer */}
          <Card>
            <CardHeader>
              <CardTitle>Drawer</CardTitle>
              <CardDescription>Slide-out drawer panel</CardDescription>
            </CardHeader>
            <CardContent>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>

          {/* Sheet */}
          <Card>
            <CardHeader>
              <CardTitle>Sheet</CardTitle>
              <CardDescription>Slide-over panel</CardDescription>
            </CardHeader>
            <CardContent>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sheet-name" className="text-right">
                        Name
                      </Label>
                      <Input id="sheet-name" defaultValue="John Doe" className="col-span-3" />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>

          {/* Popover */}
          <Card>
            <CardHeader>
              <CardTitle>Popover</CardTitle>
              <CardDescription>Popover overlay</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Tooltip */}
          <Card>
            <CardHeader>
              <CardTitle>Tooltip</CardTitle>
              <CardDescription>Tooltip on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          {/* Hover Card */}
          <Card>
            <CardHeader>
              <CardTitle>Hover Card</CardTitle>
              <CardDescription>Card that appears on hover</CardDescription>
            </CardHeader>
            <CardContent>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">@nextjs</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">The React Framework for Production</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>

          {/* Context Menu */}
          <Card>
            <CardHeader>
              <CardTitle>Context Menu</CardTitle>
              <CardDescription>Right-click context menu</CardDescription>
            </CardHeader>
            <CardContent>
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                  Right click here
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Back</ContextMenuItem>
                  <ContextMenuItem>Forward</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Reload</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </CardContent>
          </Card>

          {/* Command */}
          <Card>
            <CardHeader>
              <CardTitle>Command</CardTitle>
              <CardDescription>Command palette</CardDescription>
            </CardHeader>
            <CardContent>
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CardContent>
          </Card>

          {/* Dropdown Menu */}
          <Card>
            <CardHeader>
              <CardTitle>Dropdown Menu</CardTitle>
              <CardDescription>Dropdown menu</CardDescription>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </section>

        {/* Data Display */}
        <section id="data" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Data Display</h2>
            <p className="text-muted-foreground">Components for displaying data</p>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Table</CardTitle>
              <CardDescription>Data table</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Admin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>Inactive</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Badge */}
          <Card>
            <CardHeader>
              <CardTitle>Badge</CardTitle>
              <CardDescription>Status badges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Avatar */}
          <Card>
            <CardHeader>
              <CardTitle>Avatar</CardTitle>
              <CardDescription>User avatar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
              <CardDescription>Progress indicator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={33} />
              <Progress value={66} />
              <Progress value={100} />
            </CardContent>
          </Card>

          {/* Kbd */}
          <Card>
            <CardHeader>
              <CardTitle>Kbd</CardTitle>
              <CardDescription>Keyboard key display</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
                <Kbd>Ctrl</Kbd>
                <Kbd>Alt</Kbd>
                <Kbd>Del</Kbd>
              </div>
            </CardContent>
          </Card>

          {/* Empty */}
          <Card>
            <CardHeader>
              <CardTitle>Empty</CardTitle>
              <CardDescription>Empty state component</CardDescription>
            </CardHeader>
            <CardContent>
              <Empty>
                <EmptyTitle>No items found</EmptyTitle>
                <EmptyDescription>Get started by creating a new item.</EmptyDescription>
              </Empty>
            </CardContent>
          </Card>
        </section>

        {/* Interactive Components */}
        <section id="interactive" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Interactive</h2>
            <p className="text-muted-foreground">Interactive content components</p>
          </div>

          {/* Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Accordion</CardTitle>
              <CardDescription>Collapsible content sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other components' aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It's animated by default, but you can disable it if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Collapsible */}
          <Card>
            <CardHeader>
              <CardTitle>Collapsible</CardTitle>
              <CardDescription>Collapsible content</CardDescription>
            </CardHeader>
            <CardContent>
              <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
                <div className="flex items-center justify-between space-x-4">
                  <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {isOpen ? "Hide" : "Show"}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                  <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
                  <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
                  <div className="rounded-md border px-4 py-2 text-sm">@stitches/react</div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </section>

        {/* Notifications */}
        <section id="notifications" className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
            <p className="text-muted-foreground">Toast notifications</p>
          </div>

          {/* Sonner */}
          <Card>
            <CardHeader>
              <CardTitle>Sonner</CardTitle>
              <CardDescription>Toast notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => toast("Event has been created")}>
                Show Toast
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Toaster />
    </div>
  );
}
