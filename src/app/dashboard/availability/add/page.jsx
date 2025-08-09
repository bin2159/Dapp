"use client"

import * as React from "react"
import { Search, Calendar, Clock, User, MapPin, Filter, Download, Eye, Edit, Copy, MoreHorizontal, ChevronLeft, ChevronRight, CalendarDays, Users, Building2, Stethoscope, CheckCircle, XCircle, AlertCircle, Coffee, Play, Pause, Settings, RefreshCw } from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, subWeeks, isToday, isTomorrow, isThisWeek, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Sample data
const doctorAvailability = [
  {
    id: "1",
    doctorId: "DOC001",
    doctorName: "Dr. Sarah Johnson",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=SJ",
    specialty: "Cardiology",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Cardiology",
    status: "active",
    lastUpdated: "2024-01-15",
    weeklySchedule: {
      Monday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "12:00", type: "consultation", isBreak: false },
          { start: "13:00", end: "17:00", type: "procedure", isBreak: false }
        ]
      },
      Tuesday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "12:00", type: "consultation", isBreak: false },
          { start: "12:00", end: "13:00", type: "break", isBreak: true },
          { start: "13:00", end: "16:00", type: "consultation", isBreak: false }
        ]
      },
      Wednesday: {
        isAvailable: true,
        slots: [
          { start: "10:00", end: "14:00", type: "procedure", isBreak: false },
          { start: "15:00", end: "18:00", type: "consultation", isBreak: false }
        ]
      },
      Thursday: {
        isAvailable: true,
        slots: [
          { start: "08:00", end: "12:00", type: "consultation", isBreak: false },
          { start: "14:00", end: "17:00", type: "procedure", isBreak: false }
        ]
      },
      Friday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "13:00", type: "consultation", isBreak: false }
        ]
      },
      Saturday: { isAvailable: false, slots: [] },
      Sunday: { isAvailable: false, slots: [] },
    },
    exceptionDates: [
      { date: "2024-01-20", reason: "Medical Conference", isAvailable: false },
      { date: "2024-01-25", reason: "Extended Hours", isAvailable: true, customSlots: [{ start: "08:00", end: "20:00", type: "consultation" }] }
    ],
    totalHoursPerWeek: 32,
    availableDays: 5,
    appointmentTypes: ["consultation", "procedure"],
    nextAvailableSlot: "Today 2:00 PM",
    bookingSettings: {
      maxAdvanceBooking: 30,
      allowSameDayBooking: true,
      bufferTime: 15
    }
  },
  {
    id: "2",
    doctorId: "DOC002",
    doctorName: "Dr. Michael Chen",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=MC",
    specialty: "Neurology",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Neurology",
    status: "active",
    lastUpdated: "2024-01-14",
    weeklySchedule: {
      Monday: {
        isAvailable: true,
        slots: [
          { start: "08:00", end: "16:00", type: "consultation", isBreak: false }
        ]
      },
      Tuesday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "17:00", type: "procedure", isBreak: false }
        ]
      },
      Wednesday: {
        isAvailable: true,
        slots: [
          { start: "08:00", end: "12:00", type: "consultation", isBreak: false },
          { start: "14:00", end: "18:00", type: "consultation", isBreak: false }
        ]
      },
      Thursday: {
        isAvailable: true,
        slots: [
          { start: "10:00", end: "15:00", type: "procedure", isBreak: false }
        ]
      },
      Friday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "14:00", type: "consultation", isBreak: false }
        ]
      },
      Saturday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "13:00", type: "consultation", isBreak: false }
        ]
      },
      Sunday: { isAvailable: false, slots: [] },
    },
    exceptionDates: [
      { date: "2024-01-22", reason: "Surgery Day", isAvailable: true, customSlots: [{ start: "06:00", end: "14:00", type: "procedure" }] }
    ],
    totalHoursPerWeek: 38,
    availableDays: 6,
    appointmentTypes: ["consultation", "procedure"],
    nextAvailableSlot: "Tomorrow 9:00 AM",
    bookingSettings: {
      maxAdvanceBooking: 45,
      allowSameDayBooking: false,
      bufferTime: 10
    }
  },
  {
    id: "3",
    doctorId: "DOC003",
    doctorName: "Dr. Emily Rodriguez",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=ER",
    specialty: "Emergency Medicine",
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    department: "Emergency Medicine",
    status: "on-leave",
    lastUpdated: "2024-01-10",
    weeklySchedule: {
      Monday: { isAvailable: false, slots: [] },
      Tuesday: { isAvailable: false, slots: [] },
      Wednesday: { isAvailable: false, slots: [] },
      Thursday: { isAvailable: false, slots: [] },
      Friday: { isAvailable: false, slots: [] },
      Saturday: { isAvailable: false, slots: [] },
      Sunday: { isAvailable: false, slots: [] },
    },
    exceptionDates: [
      { date: "2024-02-01", reason: "Return from Leave", isAvailable: true, customSlots: [{ start: "08:00", end: "16:00", type: "emergency" }] }
    ],
    totalHoursPerWeek: 0,
    availableDays: 0,
    appointmentTypes: ["emergency", "consultation"],
    nextAvailableSlot: "Feb 1, 2024",
    bookingSettings: {
      maxAdvanceBooking: 7,
      allowSameDayBooking: true,
      bufferTime: 5
    }
  },
  {
    id: "4",
    doctorId: "DOC004",
    doctorName: "Dr. James Wilson",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=JW",
    specialty: "Surgery",
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    department: "Surgery",
    status: "active",
    lastUpdated: "2024-01-16",
    weeklySchedule: {
      Monday: {
        isAvailable: true,
        slots: [
          { start: "07:00", end: "15:00", type: "procedure", isBreak: false }
        ]
      },
      Tuesday: {
        isAvailable: true,
        slots: [
          { start: "07:00", end: "15:00", type: "procedure", isBreak: false }
        ]
      },
      Wednesday: {
        isAvailable: true,
        slots: [
          { start: "08:00", end: "12:00", type: "consultation", isBreak: false },
          { start: "13:00", end: "16:00", type: "procedure", isBreak: false }
        ]
      },
      Thursday: {
        isAvailable: true,
        slots: [
          { start: "07:00", end: "14:00", type: "procedure", isBreak: false }
        ]
      },
      Friday: {
        isAvailable: true,
        slots: [
          { start: "08:00", end: "12:00", type: "consultation", isBreak: false }
        ]
      },
      Saturday: { isAvailable: false, slots: [] },
      Sunday: { isAvailable: false, slots: [] },
    },
    exceptionDates: [],
    totalHoursPerWeek: 35,
    availableDays: 5,
    appointmentTypes: ["procedure", "consultation"],
    nextAvailableSlot: "Today 8:00 AM",
    bookingSettings: {
      maxAdvanceBooking: 60,
      allowSameDayBooking: false,
      bufferTime: 30
    }
  },
  {
    id: "5",
    doctorId: "DOC005",
    doctorName: "Dr. Lisa Thompson",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=LT",
    specialty: "Internal Medicine",
    hospitalId: "3",
    hospitalName: "Regional Health Institute",
    department: "Internal Medicine",
    status: "inactive",
    lastUpdated: "2024-01-05",
    weeklySchedule: {
      Monday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "17:00", type: "consultation", isBreak: false }
        ]
      },
      Tuesday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "17:00", type: "consultation", isBreak: false }
        ]
      },
      Wednesday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "17:00", type: "consultation", isBreak: false }
        ]
      },
      Thursday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "17:00", type: "consultation", isBreak: false }
        ]
      },
      Friday: {
        isAvailable: true,
        slots: [
          { start: "09:00", end: "17:00", type: "consultation", isBreak: false }
        ]
      },
      Saturday: { isAvailable: false, slots: [] },
      Sunday: { isAvailable: false, slots: [] },
    },
    exceptionDates: [],
    totalHoursPerWeek: 40,
    availableDays: 5,
    appointmentTypes: ["consultation"],
    nextAvailableSlot: "Not available",
    bookingSettings: {
      maxAdvanceBooking: 14,
      allowSameDayBooking: true,
      bufferTime: 10
    }
  },
]

const hospitals = [
  { id: "all", name: "All Hospitals" },
  { id: "1", name: "City General Hospital" },
  { id: "2", name: "St. Mary's Medical Center" },
  { id: "3", name: "Regional Health Institute" },
]

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Emergency Medicine",
  "Surgery",
  "Internal Medicine",
  "Dermatology",
  "Orthopedics",
]

const departments = [
  "All Departments",
  "Cardiology",
  "Neurology",
  "Emergency Medicine",
  "Surgery",
  "Internal Medicine",
  "Dermatology",
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "on-leave", label: "On Leave" },
]

const appointmentTypes = [
  { id: "consultation", name: "Consultation", color: "bg-blue-100 text-blue-800" },
  { id: "procedure", name: "Procedure", color: "bg-green-100 text-green-800" },
  { id: "emergency", name: "Emergency", color: "bg-red-100 text-red-800" },
  { id: "follow-up", name: "Follow-up", color: "bg-yellow-100 text-yellow-800" },
]

const sortOptions = [
  { value: "name", label: "Doctor Name (A-Z)" },
  { value: "name-desc", label: "Doctor Name (Z-A)" },
  { value: "hospital", label: "Hospital Name" },
  { value: "specialty", label: "Specialty" },
  { value: "hours", label: "Total Hours (High to Low)" },
  { value: "availability", label: "Available Days" },
  { value: "updated", label: "Recently Updated" },
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function DoctorAvailabilityList() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedHospital, setSelectedHospital] = React.useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = React.useState("All Specialties")
  const [selectedDepartment, setSelectedDepartment] = React.useState("All Departments")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [selectedAppointmentTypes, setSelectedAppointmentTypes] = React.useState([])
  const [sortBy, setSortBy] = React.useState("name")
  const [showAvailableToday, setShowAvailableToday] = React.useState(false)
  const [showWithExceptions, setShowWithExceptions] = React.useState(false)
  const [minHoursPerWeek, setMinHoursPerWeek] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")
  const [currentWeek, setCurrentWeek] = React.useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [viewMode, setViewMode] = React.useState<"card" | "schedule">("card")

  // Filter and sort availability data
  const filteredAvailability = React.useMemo(() => {
    const filtered = doctorAvailability.filter((availability) => {
      const matchesSearch =
        availability.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        availability.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        availability.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        availability.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesHospital = selectedHospital === "all" || availability.hospitalId === selectedHospital
      const matchesSpecialty = selectedSpecialty === "All Specialties" || availability.specialty === selectedSpecialty
      const matchesDepartment = selectedDepartment === "All Departments" || availability.department === selectedDepartment
      const matchesStatus = selectedStatus === "all" || availability.status === selectedStatus
      const matchesAppointmentTypes =
        selectedAppointmentTypes.length === 0 ||
        selectedAppointmentTypes.some((type) => availability.appointmentTypes.includes(type))
      const matchesAvailableToday = !showAvailableToday || isAvailableToday(availability)
      const matchesWithExceptions = !showWithExceptions || availability.exceptionDates.length > 0
      const matchesMinHours = !minHoursPerWeek || availability.totalHoursPerWeek >= Number.parseInt(minHoursPerWeek)
      const matchesTab = activeTab === "all" || availability.status === activeTab

      return (
        matchesSearch &&
        matchesHospital &&
        matchesSpecialty &&
        matchesDepartment &&
        matchesStatus &&
        matchesAppointmentTypes &&
        matchesAvailableToday &&
        matchesWithExceptions &&
        matchesMinHours &&
        matchesTab
      )
    })

    // Sort availability data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.doctorName.localeCompare(b.doctorName)
        case "name-desc":
          return b.doctorName.localeCompare(a.doctorName)
        case "hospital":
          return a.hospitalName.localeCompare(b.hospitalName)
        case "specialty":
          return a.specialty.localeCompare(b.specialty)
        case "hours":
          return b.totalHoursPerWeek - a.totalHoursPerWeek
        case "availability":
          return b.availableDays - a.availableDays
        case "updated":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [
    searchTerm,
    selectedHospital,
    selectedSpecialty,
    selectedDepartment,
    selectedStatus,
    selectedAppointmentTypes,
    sortBy,
    showAvailableToday,
    showWithExceptions,
    minHoursPerWeek,
    activeTab,
  ])

  const handleAppointmentTypeToggle = (type) => {
    setSelectedAppointmentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedHospital("all")
    setSelectedSpecialty("All Specialties")
    setSelectedDepartment("All Departments")
    setSelectedStatus("all")
    setSelectedAppointmentTypes([])
    setSortBy("name")
    setShowAvailableToday(false)
    setShowWithExceptions(false)
    setMinHoursPerWeek("")
  }

  const isAvailableToday = (availability) => {
    const today = format(new Date(), "EEEE")
    return availability.weeklySchedule[today]?.isAvailable || false
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "inactive":
        return <XCircle className="w-4 h-4" />
      case "on-leave":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <XCircle className="w-4 h-4" />
    }
  }

  const getAppointmentTypeColor = (type) => {
    const appointmentType = appointmentTypes.find((t) => t.id === type)
    return appointmentType?.color || "bg-gray-100 text-gray-800"
  }

  const getStatusCounts = () => {
    return {
      all: doctorAvailability.length,
      active: doctorAvailability.filter((a) => a.status === "active").length,
      inactive: doctorAvailability.filter((a) => a.status === "inactive").length,
      "on-leave": doctorAvailability.filter((a) => a.status === "on-leave").length,
    }
  }

  const statusCounts = getStatusCounts()

  const getWeekDates = () => {
    return daysOfWeek.map((_, index) => addDays(currentWeek, index))
  }

  const navigateWeek = (direction) => {
    setCurrentWeek((prev) => (direction === "prev" ? subWeeks(prev, 1) : addWeeks(prev, 1)))
  }

  const formatTimeSlot = (slot) => {
    return `${slot.start} - ${slot.end}`
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Availability</h1>
          <p className="text-muted-foreground mt-2">View and manage doctor schedules across all hospitals</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "card" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("card")}
            >
              <Users className="w-4 h-4 mr-2" />
              Card View
            </Button>
            <Button
              variant={viewMode === "schedule" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("schedule")}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Schedule View
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Manage Schedules
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg">Filters & Search</CardTitle>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>Apply additional filters to refine your search</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-medium">Appointment Types</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {appointmentTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={type.id}
                              checked={selectedAppointmentTypes.includes(type.id)}
                              onCheckedChange={() => handleAppointmentTypeToggle(type.id)}
                            />
                            <Label htmlFor={type.id} className="text-sm font-normal">
                              {type.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="min-hours">Minimum Hours per Week</Label>
                      <Input
                        id="min-hours"
                        type="number"
                        placeholder="e.g., 20"
                        value={minHoursPerWeek}
                        onChange={(e) => setMinHoursPerWeek(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available-today">Available Today</Label>
                      <Switch
                        id="available-today"
                        checked={showAvailableToday}
                        onCheckedChange={setShowAvailableToday}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="with-exceptions">Has Exception Dates</Label>
                      <Switch
                        id="with-exceptions"
                        checked={showWithExceptions}
                        onCheckedChange={setShowWithExceptions}
                      />
                    </div>
                    <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
                      Clear All Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedHospital} onValueChange={setSelectedHospital}>
              <SelectTrigger>
                <SelectValue placeholder="Hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((hospital) => (
                  <SelectItem key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(selectedAppointmentTypes.length > 0 || showAvailableToday || showWithExceptions || minHoursPerWeek) && (
            <div className="flex flex-wrap gap-2">
              {selectedAppointmentTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleAppointmentTypeToggle(type)}
                >
                  {appointmentTypes.find((t) => t.id === type)?.name} ×
                </Badge>
              ))}
              {showAvailableToday && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowAvailableToday(false)}>
                  Available Today ×
                </Badge>
              )}
              {showWithExceptions && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowWithExceptions(false)}>
                  Has Exceptions ×
                </Badge>
              )}
              {minHoursPerWeek && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setMinHoursPerWeek("")}>
                  Min {minHoursPerWeek}h/week ×
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Doctors
            <Badge variant="secondary" className="ml-1">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            Active
            <Badge variant="secondary" className="ml-1">
              {statusCounts.active}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex items-center gap-2">
            Inactive
            <Badge variant="secondary" className="ml-1">
              {statusCounts.inactive}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="on-leave" className="flex items-center gap-2">
            On Leave
            <Badge variant="secondary" className="ml-1">
              {statusCounts["on-leave"]}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {viewMode === "schedule" && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5" />
                    Weekly Schedule Overview
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateWeek("prev")}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium">
                      Week of {format(currentWeek, "MMM dd, yyyy")}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateWeek("next")}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Header */}
                    <div className="grid grid-cols-8 gap-2 mb-4">
                      <div className="font-medium text-sm">Doctor</div>
                      {daysOfWeek.map((day, index) => {
                        const date = getWeekDates()[index]
                        return (
                          <div key={day} className="text-center">
                            <div className="font-medium text-sm">{day.slice(0, 3)}</div>
                            <div className="text-xs text-muted-foreground">
                              {format(date, "MMM dd")}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Schedule Grid */}
                    {filteredAvailability.map((availability) => (
                      <div key={availability.id} className="grid grid-cols-8 gap-2 py-3 border-b">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={availability.doctorPhoto || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {availability.doctorName.split(" ").map((n) => n.charAt(0)).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{availability.doctorName}</p>
                            <p className="text-xs text-muted-foreground">{availability.specialty}</p>
                          </div>
                        </div>
                        {daysOfWeek.map((day) => {
                          const daySchedule = availability.weeklySchedule[day]
                          return (
                            <div key={day} className="text-center">
                              {daySchedule.isAvailable ? (
                                <div className="space-y-1">
                                  {daySchedule.slots.map((slot, index) => (
                                    <div
                                      key={index}
                                      className={cn(
                                        "text-xs px-2 py-1 rounded",
                                        slot.isBreak
                                          ? "bg-orange-100 text-orange-800"
                                          : getAppointmentTypeColor(slot.type)
                                      )}
                                    >
                                      {slot.isBreak ? (
                                        <Coffee className="w-3 h-3 mx-auto" />
                                      ) : (
                                        formatTimeSlot(slot)
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-xs text-muted-foreground">—</div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {viewMode === "card" && (
            <>
              {filteredAvailability.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No doctor availability found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAvailability.map((availability) => (
                    <Card key={availability.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={availability.doctorPhoto || "/placeholder.svg"} />
                              <AvatarFallback className="text-lg">
                                {availability.doctorName.split(" ").map((n) => n.charAt(0)).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{availability.doctorName}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Stethoscope className="w-3 h-3" />
                                {availability.specialty}
                              </CardDescription>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {availability.hospitalName}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Availability
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Refresh Data
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Calendar className="w-4 h-4 mr-2" />
                                View Appointments
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(availability.status)}>
                            {getStatusIcon(availability.status)}
                            <span className="ml-1">
                              {availability.status === "on-leave"
                                ? "On Leave"
                                : availability.status.charAt(0).toUpperCase() + availability.status.slice(1)}
                            </span>
                          </Badge>
                          {isAvailableToday(availability) && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <Play className="w-3 h-3 mr-1" />
                              Available Today
                            </Badge>
                          )}
                          {availability.exceptionDates.length > 0 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Has Exceptions
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{availability.totalHoursPerWeek}h/week</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-muted-foreground" />
                            <span>{availability.availableDays} days</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="truncate">{availability.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="truncate">{availability.doctorId}</span>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">APPOINTMENT TYPES</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {availability.appointmentTypes.map((type) => (
                              <Badge key={type} className={getAppointmentTypeColor(type)} variant="secondary">
                                {appointmentTypes.find((t) => t.id === type)?.name}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">WEEKLY SCHEDULE</Label>
                          <div className="grid grid-cols-7 gap-1 mt-2">
                            {daysOfWeek.map((day) => {
                              const daySchedule = availability.weeklySchedule[day]
                              return (
                                <div
                                  key={day}
                                  className={cn(
                                    "text-center p-2 rounded text-xs",
                                    daySchedule.isAvailable
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-500"
                                  )}
                                >
                                  <div className="font-medium">{day.slice(0, 3)}</div>
                                  <div className="text-xs">
                                    {daySchedule.isAvailable ? (
                                      <CheckCircle className="w-3 h-3 mx-auto" />
                                    ) : (
                                      <XCircle className="w-3 h-3 mx-auto" />
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {availability.exceptionDates.length > 0 && (
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">EXCEPTION DATES</Label>
                            <div className="space-y-1 mt-1">
                              {availability.exceptionDates.slice(0, 2).map((exception, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                  <span>{format(parseISO(exception.date), "MMM dd")}</span>
                                  <Badge
                                    variant={exception.isAvailable ? "default" : "destructive"}
                                    className="text-xs"
                                  >
                                    {exception.reason}
                                  </Badge>
                                </div>
                              ))}
                              {availability.exceptionDates.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{availability.exceptionDates.length - 2} more exceptions
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Next Available:</span>
                          <span className="font-medium">{availability.nextAvailableSlot}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Results Summary */}
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <span>
          Showing {filteredAvailability.length} of {doctorAvailability.length} doctor schedules
        </span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  )
}
