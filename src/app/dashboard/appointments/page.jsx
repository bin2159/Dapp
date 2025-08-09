"use client"

import * as React from "react"
import { Search, MapPin, Clock, Calendar, Edit, Trash2, Eye, Plus, SlidersHorizontal, Download, MoreHorizontal, User, Stethoscope, Phone, CheckCircle, XCircle, AlertCircle, CalendarX, Video, UserCheck } from 'lucide-react'
import { format, isToday, isTomorrow, isThisWeek, parseISO } from "date-fns"

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
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample appointment data
const appointments = [
  {
    id: "APT001",
    patientId: "PAT001",
    patientName: "John Smith",
    patientAge: 45,
    patientPhone: "+1 (555) 123-4567",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=JS",
    doctorId: "DOC001",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiology",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=SJ",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Cardiology",
    appointmentDate: "2024-01-18",
    appointmentTime: "10:00 AM",
    duration: 30,
    type: "consultation",
    status: "scheduled",
    priority: "normal",
    reason: "Regular checkup and blood pressure monitoring",
    notes: "Patient has been experiencing mild chest discomfort",
    isFollowUp: true,
    isVirtual: false,
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-15",
  },
  {
    id: "APT002",
    patientId: "PAT002",
    patientName: "Maria Garcia",
    patientAge: 32,
    patientPhone: "+1 (555) 234-5678",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=MG",
    doctorId: "DOC003",
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Emergency Medicine",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=ER",
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    department: "Emergency Medicine",
    appointmentDate: "2024-01-18",
    appointmentTime: "2:30 PM",
    duration: 45,
    type: "emergency",
    status: "in-progress",
    priority: "high",
    reason: "Severe asthma attack",
    notes: "Patient brought in by ambulance, requires immediate attention",
    isFollowUp: false,
    isVirtual: false,
    createdDate: "2024-01-18",
    lastUpdated: "2024-01-18",
  },
  {
    id: "APT003",
    patientId: "PAT003",
    patientName: "Robert Johnson",
    patientAge: 67,
    patientPhone: "+1 (555) 345-6789",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=RJ",
    doctorId: "DOC002",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Neurology",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=MC",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Neurology",
    appointmentDate: "2024-01-19",
    appointmentTime: "9:00 AM",
    duration: 60,
    type: "procedure",
    status: "scheduled",
    priority: "high",
    reason: "MRI scan and neurological assessment",
    notes: "Pre-surgical consultation for brain tumor removal",
    isFollowUp: false,
    isVirtual: false,
    createdDate: "2024-01-12",
    lastUpdated: "2024-01-16",
  },
  {
    id: "APT004",
    patientId: "PAT004",
    patientName: "Emily Davis",
    patientAge: 28,
    patientPhone: "+1 (555) 456-7890",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=ED",
    doctorId: "DOC005",
    doctorName: "Dr. Lisa Thompson",
    doctorSpecialty: "Internal Medicine",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=LT",
    hospitalId: "3",
    hospitalName: "Regional Health Institute",
    department: "Internal Medicine",
    appointmentDate: "2024-01-17",
    appointmentTime: "11:30 AM",
    duration: 30,
    type: "consultation",
    status: "completed",
    priority: "normal",
    reason: "Mental health consultation",
    notes: "Patient showing improvement with current medication",
    isFollowUp: true,
    isVirtual: true,
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-17",
  },
  {
    id: "APT005",
    patientId: "PAT005",
    patientName: "David Wilson",
    patientAge: 52,
    patientPhone: "+1 (555) 567-8901",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=DW",
    doctorId: "DOC004",
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Surgery",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=JW",
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    department: "Surgery",
    appointmentDate: "2024-01-16",
    appointmentTime: "3:00 PM",
    duration: 30,
    type: "consultation",
    status: "cancelled",
    priority: "normal",
    reason: "Pre-operative consultation",
    notes: "Patient cancelled due to family emergency",
    isFollowUp: false,
    isVirtual: false,
    createdDate: "2024-01-08",
    lastUpdated: "2024-01-16",
  },
  {
    id: "APT006",
    patientId: "PAT006",
    patientName: "Sarah Brown",
    patientAge: 39,
    patientPhone: "+1 (555) 678-9012",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=SB",
    doctorId: "DOC006",
    doctorName: "Dr. Robert Kim",
    doctorSpecialty: "Dermatology",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=RK",
    hospitalId: "3",
    hospitalName: "Regional Health Institute",
    department: "Dermatology",
    appointmentDate: "2024-01-15",
    appointmentTime: "4:00 PM",
    duration: 30,
    type: "consultation",
    status: "no-show",
    priority: "normal",
    reason: "Skin condition evaluation",
    notes: "Patient did not show up for appointment",
    isFollowUp: false,
    isVirtual: false,
    createdDate: "2024-01-08",
    lastUpdated: "2024-01-15",
  },
  {
    id: "APT007",
    patientId: "PAT001",
    patientName: "John Smith",
    patientAge: 45,
    patientPhone: "+1 (555) 123-4567",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=JS",
    doctorId: "DOC001",
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiology",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=SJ",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Cardiology",
    appointmentDate: "2024-01-20",
    appointmentTime: "2:00 PM",
    duration: 45,
    type: "procedure",
    status: "scheduled",
    priority: "high",
    reason: "Cardiac stress test",
    notes: "Follow-up from previous consultation",
    isFollowUp: true,
    isVirtual: false,
    createdDate: "2024-01-15",
    lastUpdated: "2024-01-15",
  },
  {
    id: "APT008",
    patientId: "PAT003",
    patientName: "Robert Johnson",
    patientAge: 67,
    patientPhone: "+1 (555) 345-6789",
    patientPhoto: "/placeholder.svg?height=100&width=100&text=RJ",
    doctorId: "DOC002",
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Neurology",
    doctorPhoto: "/placeholder.svg?height=100&width=100&text=MC",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Neurology",
    appointmentDate: "2024-01-22",
    appointmentTime: "10:30 AM",
    duration: 30,
    type: "consultation",
    status: "scheduled",
    priority: "normal",
    reason: "Post-surgery follow-up",
    notes: "Check recovery progress after brain surgery",
    isFollowUp: true,
    isVirtual: true,
    createdDate: "2024-01-16",
    lastUpdated: "2024-01-16",
  },
]

const hospitals = [
  { id: "all", name: "All Hospitals" },
  { id: "1", name: "City General Hospital" },
  { id: "2", name: "St. Mary's Medical Center" },
  { id: "3", name: "Regional Health Institute" },
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

const appointmentTypes = [
  "All Types",
  "consultation",
  "procedure",
  "emergency",
  "surgery",
  "follow-up",
  "screening",
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no-show", label: "No Show" },
  { value: "rescheduled", label: "Rescheduled" },
]

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "low", label: "Low Priority" },
  { value: "normal", label: "Normal Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent" },
]

const timeFilters = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "this-week", label: "This Week" },
  { value: "next-week", label: "Next Week" },
  { value: "this-month", label: "This Month" },
]

const sortOptions = [
  { value: "date-asc", label: "Date (Earliest First)" },
  { value: "date-desc", label: "Date (Latest First)" },
  { value: "patient-name", label: "Patient Name (A-Z)" },
  { value: "doctor-name", label: "Doctor Name (A-Z)" },
  { value: "priority", label: "Priority (High to Low)" },
  { value: "created", label: "Recently Created" },
]

export default function AppointmentList() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedHospital, setSelectedHospital] = React.useState("all")
  const [selectedDepartment, setSelectedDepartment] = React.useState("All Departments")
  const [selectedType, setSelectedType] = React.useState("All Types")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [selectedPriority, setSelectedPriority] = React.useState("all")
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("all")
  const [selectedDoctors, setSelectedDoctors] = React.useState([])
  const [sortBy, setSortBy] = React.useState("date-asc")
  const [showVirtualOnly, setShowVirtualOnly] = React.useState(false)
  const [showFollowUpOnly, setShowFollowUpOnly] = React.useState(false)
  const [showHighPriorityOnly, setShowHighPriorityOnly] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("all")

  // Get unique doctors for filter
  const allDoctors = Array.from(new Set(appointments.map((a) => a.doctorName)))

  // Filter and sort appointments
  const filteredAppointments = React.useMemo(() => {
    const filtered = appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientPhone.includes(searchTerm)

      const matchesHospital = selectedHospital === "all" || appointment.hospitalId === selectedHospital
      const matchesDepartment = selectedDepartment === "All Departments" || appointment.department === selectedDepartment
      const matchesType = selectedType === "All Types" || appointment.type === selectedType
      const matchesStatus = selectedStatus === "all" || appointment.status === selectedStatus
      const matchesPriority = selectedPriority === "all" || appointment.priority === selectedPriority
      const matchesDoctors = selectedDoctors.length === 0 || selectedDoctors.includes(appointment.doctorName)
      const matchesVirtual = !showVirtualOnly || appointment.isVirtual
      const matchesFollowUp = !showFollowUpOnly || appointment.isFollowUp
      const matchesHighPriority = !showHighPriorityOnly || appointment.priority === "high" || appointment.priority === "urgent"
      const matchesTab = activeTab === "all" || appointment.status === activeTab

      // Time filter logic
      let matchesTimeFilter = true
      if (selectedTimeFilter !== "all") {
        const appointmentDate = parseISO(appointment.appointmentDate)
        switch (selectedTimeFilter) {
          case "today":
            matchesTimeFilter = isToday(appointmentDate)
            break
          case "tomorrow":
            matchesTimeFilter = isTomorrow(appointmentDate)
            break
          case "this-week":
            matchesTimeFilter = isThisWeek(appointmentDate)
            break
          case "next-week":
            const nextWeekStart = new Date()
            nextWeekStart.setDate(nextWeekStart.getDate() + 7)
            const nextWeekEnd = new Date()
            nextWeekEnd.setDate(nextWeekEnd.getDate() + 14)
            matchesTimeFilter = appointmentDate >= nextWeekStart && appointmentDate < nextWeekEnd
            break
          case "this-month":
            const now = new Date()
            matchesTimeFilter = appointmentDate.getMonth() === now.getMonth() && appointmentDate.getFullYear() === now.getFullYear()
            break
        }
      }

      return (
        matchesSearch &&
        matchesHospital &&
        matchesDepartment &&
        matchesType &&
        matchesStatus &&
        matchesPriority &&
        matchesDoctors &&
        matchesVirtual &&
        matchesFollowUp &&
        matchesHighPriority &&
        matchesTimeFilter &&
        matchesTab
      )
    })

    // Sort appointments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(`${a.appointmentDate} ${a.appointmentTime}`).getTime() - new Date(`${b.appointmentDate} ${b.appointmentTime}`).getTime()
        case "date-desc":
          return new Date(`${b.appointmentDate} ${b.appointmentTime}`).getTime() - new Date(`${a.appointmentDate} ${a.appointmentTime}`).getTime()
        case "patient-name":
          return a.patientName.localeCompare(b.patientName)
        case "doctor-name":
          return a.doctorName.localeCompare(b.doctorName)
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 }
          return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
        case "created":
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [
    searchTerm,
    selectedHospital,
    selectedDepartment,
    selectedType,
    selectedStatus,
    selectedPriority,
    selectedTimeFilter,
    selectedDoctors,
    sortBy,
    showVirtualOnly,
    showFollowUpOnly,
    showHighPriorityOnly,
    activeTab,
  ])

  const handleDoctorToggle = (doctor) => {
    setSelectedDoctors((prev) => (prev.includes(doctor) ? prev.filter((d) => d !== doctor) : [...prev, doctor]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedHospital("all")
    setSelectedDepartment("All Departments")
    setSelectedType("All Types")
    setSelectedStatus("all")
    setSelectedPriority("all")
    setSelectedTimeFilter("all")
    setSelectedDoctors([])
    setSortBy("date-asc")
    setShowVirtualOnly(false)
    setShowFollowUpOnly(false)
    setShowHighPriorityOnly(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-gray-100 text-gray-800"
      case "rescheduled":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-green-100 text-green-800 border-green-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      case "no-show":
        return <CalendarX className="w-4 h-4" />
      case "rescheduled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getStatusCounts = () => {
    return {
      all: appointments.length,
      scheduled: appointments.filter((a) => a.status === "scheduled").length,
      "in-progress": appointments.filter((a) => a.status === "in-progress").length,
      completed: appointments.filter((a) => a.status === "completed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
      "no-show": appointments.filter((a) => a.status === "no-show").length,
    }
  }

  const statusCounts = getStatusCounts()

  const formatAppointmentDate = (date) => {
    const appointmentDate = parseISO(date)
    if (isToday(appointmentDate)) return "Today"
    if (isTomorrow(appointmentDate)) return "Tomorrow"
    return format(appointmentDate, "MMM dd, yyyy")
  }

  const isUpcoming = (date, time) => {
    const appointmentDateTime = new Date(`${date} ${time}`)
    return appointmentDateTime > new Date()
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor all appointments across your hospital network</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Link href="/dashboard/appointments/add">
            <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
            </Button>
          </Link>
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
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>Apply additional filters to refine your appointment search</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-medium">Doctors</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
                        {allDoctors.map((doctor) => (
                          <div key={doctor} className="flex items-center space-x-2">
                            <Checkbox
                              id={doctor}
                              checked={selectedDoctors.includes(doctor)}
                              onCheckedChange={() => handleDoctorToggle(doctor)}
                            />
                            <Label htmlFor={doctor} className="text-sm font-normal">
                              {doctor}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="virtual-only">Virtual Appointments Only</Label>
                      <Switch id="virtual-only" checked={showVirtualOnly} onCheckedChange={setShowVirtualOnly} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="follow-up-only">Follow-up Appointments Only</Label>
                      <Switch id="follow-up-only" checked={showFollowUpOnly} onCheckedChange={setShowFollowUpOnly} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="high-priority-only">High Priority Only</Label>
                      <Switch
                        id="high-priority-only"
                        checked={showHighPriorityOnly}
                        onCheckedChange={setShowHighPriorityOnly}
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
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTimeFilter} onValueChange={setSelectedTimeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Time Filter" />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {appointmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
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
          {(selectedDoctors.length > 0 || showVirtualOnly || showFollowUpOnly || showHighPriorityOnly) && (
            <div className="flex flex-wrap gap-2">
              {selectedDoctors.map((doctor) => (
                <Badge
                  key={doctor}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleDoctorToggle(doctor)}
                >
                  {doctor} ×
                </Badge>
              ))}
              {showVirtualOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowVirtualOnly(false)}>
                  Virtual Only ×
                </Badge>
              )}
              {showFollowUpOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowFollowUpOnly(false)}>
                  Follow-up Only ×
                </Badge>
              )}
              {showHighPriorityOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowHighPriorityOnly(false)}>
                  High Priority Only ×
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary" className="ml-1">
              {statusCounts.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            Scheduled
            <Badge variant="secondary" className="ml-1">
              {statusCounts.scheduled}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            In Progress
            <Badge variant="secondary" className="ml-1">
              {statusCounts["in-progress"]}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="ml-1">
              {statusCounts.completed}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2">
            Cancelled
            <Badge variant="secondary" className="ml-1">
              {statusCounts.cancelled}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="no-show" className="flex items-center gap-2">
            No Show
            <Badge variant="secondary" className="ml-1">
              {statusCounts["no-show"]}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredAppointments.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={appointment.patientPhoto || "/placeholder.svg"} />
                          <AvatarFallback className="text-sm">
                            {appointment.patientName.split(" ").map((n) => n.charAt(0)).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{appointment.patientName}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {appointment.patientAge} years • {appointment.id}
                          </CardDescription>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Appointment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="w-4 h-4 mr-2" />
                            Call Patient
                          </DropdownMenuItem>
                          {appointment.isVirtual && (
                            <DropdownMenuItem>
                              <Video className="w-4 h-4 mr-2" />
                              Join Video Call
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel Appointment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1">{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(appointment.priority)}>
                        {appointment.priority.charAt(0).toUpperCase() + appointment.priority.slice(1)}
                      </Badge>
                      {appointment.isVirtual && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          <Video className="w-3 h-3 mr-1" />
                          Virtual
                        </Badge>
                      )}
                      {appointment.isFollowUp && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <UserCheck className="w-3 h-3 mr-1" />
                          Follow-up
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{formatAppointmentDate(appointment.appointmentDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{appointment.appointmentTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{appointment.hospitalName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{appointment.department}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">DOCTOR</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={appointment.doctorPhoto || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {appointment.doctorName.split(" ").map((n) => n.charAt(0)).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{appointment.doctorName}</p>
                          <p className="text-xs text-muted-foreground">{appointment.doctorSpecialty}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">REASON</Label>
                      <p className="text-sm mt-1">{appointment.reason}</p>
                    </div>

                    {appointment.notes && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">NOTES</Label>
                        <p className="text-sm mt-1 text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{appointment.duration} minutes</span>
                    </div>

                    {isUpcoming(appointment.appointmentDate, appointment.appointmentTime) && appointment.status === "scheduled" && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">Upcoming Appointment</p>
                        <p className="text-xs text-blue-600">
                          {formatAppointmentDate(appointment.appointmentDate)} at {appointment.appointmentTime}
                        </p>
                      </div>
                    )}

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
        </TabsContent>
      </Tabs>

      {/* Results Summary */}
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <span>
          Showing {filteredAppointments.length} of {appointments.length} appointments
        </span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  )
}
