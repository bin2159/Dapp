"use client"

import * as React from "react"
import {
  Search,
  MapPin,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Plus,
  SlidersHorizontal,
  Download,
  MoreHorizontal,
  Heart,
  AlertTriangle,
  Clock,
  User,
  Stethoscope,
  FileText,
  PhoneCall,
} from "lucide-react"
import Link from "next/link"
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

// Sample patient data
const patients = [
  {
    id: "PAT001",
    firstName: "John",
    lastName: "Smith",
    fullName: "John Smith",
    age: 45,
    gender: "male",
    dateOfBirth: "1979-03-15",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=JS",
    address: "123 Main St, New York, NY 10001",
    bloodType: "A+",
    status: "active",
    admissionStatus: "outpatient",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    assignedDoctor: "Dr. Sarah Johnson",
    assignedDoctorId: "1",
    department: "Cardiology",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-25",
    medicalConditions: ["Hypertension", "Diabetes"],
    allergies: ["Penicillin", "Peanuts"],
    insuranceProvider: "Blue Cross Blue Shield",
    emergencyContact: "Jane Smith (Wife)",
    emergencyPhone: "+1 (555) 123-4568",
    totalVisits: 12,
    registrationDate: "2022-05-10",
    lastUpdated: "2024-01-15",
  },
  {
    id: "PAT002",
    firstName: "Maria",
    lastName: "Garcia",
    fullName: "Maria Garcia",
    age: 32,
    gender: "female",
    dateOfBirth: "1992-08-22",
    phone: "+1 (555) 234-5678",
    email: "maria.garcia@email.com",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=MG",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    bloodType: "O-",
    status: "active",
    admissionStatus: "inpatient",
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    assignedDoctor: "Dr. Emily Rodriguez",
    assignedDoctorId: "3",
    department: "Emergency Medicine",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-20",
    medicalConditions: ["Asthma"],
    allergies: ["Latex"],
    insuranceProvider: "Aetna",
    emergencyContact: "Carlos Garcia (Husband)",
    emergencyPhone: "+1 (555) 234-5679",
    totalVisits: 8,
    registrationDate: "2023-02-18",
    lastUpdated: "2024-01-14",
  },
  {
    id: "PAT003",
    firstName: "Robert",
    lastName: "Johnson",
    fullName: "Robert Johnson",
    age: 67,
    gender: "male",
    dateOfBirth: "1957-11-03",
    phone: "+1 (555) 345-6789",
    email: "robert.johnson@email.com",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=RJ",
    address: "789 Pine St, Chicago, IL 60601",
    bloodType: "B+",
    status: "active",
    admissionStatus: "inpatient",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    assignedDoctor: "Dr. Michael Chen",
    assignedDoctorId: "2",
    department: "Neurology",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-22",
    medicalConditions: ["Heart Disease", "High Cholesterol", "Arthritis"],
    allergies: ["Aspirin"],
    insuranceProvider: "Medicare",
    emergencyContact: "Susan Johnson (Daughter)",
    emergencyPhone: "+1 (555) 345-6790",
    totalVisits: 25,
    registrationDate: "2020-09-12",
    lastUpdated: "2024-01-12",
  },
  {
    id: "PAT004",
    firstName: "Emily",
    lastName: "Davis",
    fullName: "Emily Davis",
    age: 28,
    gender: "female",
    dateOfBirth: "1996-04-18",
    phone: "+1 (555) 456-7890",
    email: "emily.davis@email.com",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=ED",
    address: "321 Elm St, Miami, FL 33101",
    bloodType: "AB+",
    status: "discharged",
    admissionStatus: "outpatient",
    hospitalId: "3",
    hospitalName: "Regional Health Institute",
    assignedDoctor: "Dr. Lisa Thompson",
    assignedDoctorId: "5",
    department: "Internal Medicine",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-02-15",
    medicalConditions: ["Depression", "Anxiety"],
    allergies: [],
    insuranceProvider: "Cigna",
    emergencyContact: "Michael Davis (Brother)",
    emergencyPhone: "+1 (555) 456-7891",
    totalVisits: 6,
    registrationDate: "2023-08-05",
    lastUpdated: "2024-01-08",
  },
  {
    id: "PAT005",
    firstName: "David",
    lastName: "Wilson",
    fullName: "David Wilson",
    age: 52,
    gender: "male",
    dateOfBirth: "1972-01-25",
    phone: "+1 (555) 567-8901",
    email: "david.wilson@email.com",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=DW",
    address: "654 Maple Dr, Boston, MA 02101",
    bloodType: "O+",
    status: "inactive",
    admissionStatus: "outpatient",
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    assignedDoctor: "Dr. James Wilson",
    assignedDoctorId: "4",
    department: "Surgery",
    lastVisit: "2023-12-20",
    nextAppointment: "Not scheduled",
    medicalConditions: ["COPD"],
    allergies: ["Codeine"],
    insuranceProvider: "UnitedHealth",
    emergencyContact: "Linda Wilson (Wife)",
    emergencyPhone: "+1 (555) 567-8902",
    totalVisits: 15,
    registrationDate: "2021-11-30",
    lastUpdated: "2023-12-20",
  },
  {
    id: "PAT006",
    firstName: "Sarah",
    lastName: "Brown",
    fullName: "Sarah Brown",
    age: 39,
    gender: "female",
    dateOfBirth: "1985-07-12",
    phone: "+1 (555) 678-9012",
    email: "sarah.brown@email.com",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=SB",
    address: "987 Cedar Ln, Seattle, WA 98101",
    bloodType: "A-",
    status: "active",
    admissionStatus: "emergency",
    hospitalId: "3",
    hospitalName: "Regional Health Institute",
    assignedDoctor: "Dr. Robert Kim",
    assignedDoctorId: "6",
    department: "Dermatology",
    lastVisit: "2024-01-16",
    nextAppointment: "2024-01-18",
    medicalConditions: ["Eczema"],
    allergies: ["Shellfish", "Dust"],
    insuranceProvider: "Humana",
    emergencyContact: "Tom Brown (Husband)",
    emergencyPhone: "+1 (555) 678-9013",
    totalVisits: 9,
    registrationDate: "2022-12-15",
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

const bloodTypes = ["All Blood Types", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "discharged", label: "Discharged" },
]

const admissionStatusOptions = [
  { value: "all", label: "All Types" },
  { value: "inpatient", label: "Inpatient" },
  { value: "outpatient", label: "Outpatient" },
  { value: "emergency", label: "Emergency" },
]

const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "age", label: "Age (High to Low)" },
  { value: "age-asc", label: "Age (Low to High)" },
  { value: "last-visit", label: "Recent Visit" },
  { value: "registration", label: "Registration Date" },
  { value: "total-visits", label: "Total Visits" },
]

export default function PatientList() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedHospital, setSelectedHospital] = React.useState("all")
  const [selectedDepartment, setSelectedDepartment] = React.useState("All Departments")
  const [selectedBloodType, setSelectedBloodType] = React.useState("All Blood Types")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [selectedAdmissionStatus, setSelectedAdmissionStatus] = React.useState("all")
  const [selectedConditions, setSelectedConditions] = React.useState([])
  const [selectedAllergies, setSelectedAllergies] = React.useState([])
  const [sortBy, setSortBy] = React.useState("name")
  const [showCriticalOnly, setShowCriticalOnly] = React.useState(false)
  const [showUpcomingAppointments, setShowUpcomingAppointments] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("all")
  const [ageRange, setAgeRange] = React.useState({ min: "", max: "" })

  // Get unique conditions and allergies for filters
  const allConditions = Array.from(new Set(patients.flatMap((p) => p.medicalConditions)))
  const allAllergies = Array.from(new Set(patients.flatMap((p) => p.allergies)))

  // Filter and sort patients
  const filteredPatients = React.useMemo(() => {
    const filtered = patients.filter((patient) => {
      const matchesSearch =
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesHospital = selectedHospital === "all" || patient.hospitalId === selectedHospital
      const matchesDepartment = selectedDepartment === "All Departments" || patient.department === selectedDepartment
      const matchesBloodType = selectedBloodType === "All Blood Types" || patient.bloodType === selectedBloodType
      const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus
      const matchesAdmissionStatus =
        selectedAdmissionStatus === "all" || patient.admissionStatus === selectedAdmissionStatus
      const matchesConditions =
        selectedConditions.length === 0 ||
        selectedConditions.some((condition) => patient.medicalConditions.includes(condition))
      const matchesAllergies =
        selectedAllergies.length === 0 || selectedAllergies.some((allergy) => patient.allergies.includes(allergy))
      const matchesCritical = !showCriticalOnly || patient.allergies.length > 0 || patient.medicalConditions.length > 2
      const matchesUpcoming =
        !showUpcomingAppointments ||
        (patient.nextAppointment !== "Not scheduled" &&
          new Date(patient.nextAppointment) >= new Date() &&
          new Date(patient.nextAppointment) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
      const matchesAge =
        (!ageRange.min || patient.age >= Number.parseInt(ageRange.min)) &&
        (!ageRange.max || patient.age <= Number.parseInt(ageRange.max))
      const matchesTab = activeTab === "all" || patient.status === activeTab || patient.admissionStatus === activeTab

      return (
        matchesSearch &&
        matchesHospital &&
        matchesDepartment &&
        matchesBloodType &&
        matchesStatus &&
        matchesAdmissionStatus &&
        matchesConditions &&
        matchesAllergies &&
        matchesCritical &&
        matchesUpcoming &&
        matchesAge &&
        matchesTab
      )
    })

    // Sort patients
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.fullName.localeCompare(b.fullName)
        case "name-desc":
          return b.fullName.localeCompare(a.fullName)
        case "age":
          return b.age - a.age
        case "age-asc":
          return a.age - b.age
        case "last-visit":
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
        case "registration":
          return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
        case "total-visits":
          return b.totalVisits - a.totalVisits
        default:
          return 0
      }
    })

    return filtered
  }, [
    searchTerm,
    selectedHospital,
    selectedDepartment,
    selectedBloodType,
    selectedStatus,
    selectedAdmissionStatus,
    selectedConditions,
    selectedAllergies,
    sortBy,
    showCriticalOnly,
    showUpcomingAppointments,
    activeTab,
    ageRange,
  ])

  const handleConditionToggle = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition) ? prev.filter((c) => c !== condition) : [...prev, condition],
    )
  }

  const handleAllergyToggle = (allergy) => {
    setSelectedAllergies((prev) => (prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedHospital("all")
    setSelectedDepartment("All Departments")
    setSelectedBloodType("All Blood Types")
    setSelectedStatus("all")
    setSelectedAdmissionStatus("all")
    setSelectedConditions([])
    setSelectedAllergies([])
    setSortBy("name")
    setShowCriticalOnly(false)
    setShowUpcomingAppointments(false)
    setAgeRange({ min: "", max: "" })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "discharged":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAdmissionStatusColor = (status) => {
    switch (status) {
      case "inpatient":
        return "bg-red-100 text-red-800"
      case "outpatient":
        return "bg-green-100 text-green-800"
      case "emergency":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusCounts = () => {
    return {
      all: patients.length,
      active: patients.filter((p) => p.status === "active").length,
      inactive: patients.filter((p) => p.status === "inactive").length,
      discharged: patients.filter((p) => p.status === "discharged").length,
      inpatient: patients.filter((p) => p.admissionStatus === "inpatient").length,
      emergency: patients.filter((p) => p.admissionStatus === "emergency").length,
    }
  }

  const statusCounts = getStatusCounts()

  const formatDate = (dateString) => {
    if (dateString === "Not scheduled") return dateString
    return new Date(dateString).toLocaleDateString()
  }

  const isUpcomingAppointment = (appointmentDate) => {
    if (appointmentDate === "Not scheduled") return false
    const appointment = new Date(appointmentDate)
    const today = new Date()
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    return appointment >= today && appointment <= nextWeek
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor all patients in your hospital network</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/patients/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Patients
            </Link>
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
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Advanced Filters</SheetTitle>
                    <SheetDescription>Apply additional filters to refine your patient search</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-medium">Age Range</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Min age"
                          type="number"
                          value={ageRange.min}
                          onChange={(e) => setAgeRange((prev) => ({ ...prev, min: e.target.value }))}
                        />
                        <Input
                          placeholder="Max age"
                          type="number"
                          value={ageRange.max}
                          onChange={(e) => setAgeRange((prev) => ({ ...prev, max: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Medical Conditions</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
                        {allConditions.map((condition) => (
                          <div key={condition} className="flex items-center space-x-2">
                            <Checkbox
                              id={condition}
                              checked={selectedConditions.includes(condition)}
                              onCheckedChange={() => handleConditionToggle(condition)}
                            />
                            <Label htmlFor={condition} className="text-sm font-normal">
                              {condition}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-medium">Allergies</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2 max-h-40 overflow-y-auto">
                        {allAllergies.map((allergy) => (
                          <div key={allergy} className="flex items-center space-x-2">
                            <Checkbox
                              id={allergy}
                              checked={selectedAllergies.includes(allergy)}
                              onCheckedChange={() => handleAllergyToggle(allergy)}
                            />
                            <Label htmlFor={allergy} className="text-sm font-normal">
                              {allergy}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="critical-only">Critical Patients Only</Label>
                      <Switch id="critical-only" checked={showCriticalOnly} onCheckedChange={setShowCriticalOnly} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="upcoming-appointments">Upcoming Appointments</Label>
                      <Switch
                        id="upcoming-appointments"
                        checked={showUpcomingAppointments}
                        onCheckedChange={setShowUpcomingAppointments}
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
                placeholder="Search patients..."
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
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
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
            <Select value={selectedAdmissionStatus} onValueChange={setSelectedAdmissionStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Admission" />
              </SelectTrigger>
              <SelectContent>
                {admissionStatusOptions.map((status) => (
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
          {(selectedConditions.length > 0 ||
            selectedAllergies.length > 0 ||
            showCriticalOnly ||
            showUpcomingAppointments ||
            ageRange.min ||
            ageRange.max) && (
            <div className="flex flex-wrap gap-2">
              {selectedConditions.map((condition) => (
                <Badge
                  key={condition}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleConditionToggle(condition)}
                >
                  {condition} ×
                </Badge>
              ))}
              {selectedAllergies.map((allergy) => (
                <Badge
                  key={allergy}
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleAllergyToggle(allergy)}
                >
                  {allergy} ×
                </Badge>
              ))}
              {showCriticalOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowCriticalOnly(false)}>
                  Critical Only ×
                </Badge>
              )}
              {showUpcomingAppointments && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setShowUpcomingAppointments(false)}
                >
                  Upcoming Appointments ×
                </Badge>
              )}
              {(ageRange.min || ageRange.max) && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setAgeRange({ min: "", max: "" })}>
                  Age: {ageRange.min || "0"}-{ageRange.max || "∞"} ×
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
            All Patients
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
          <TabsTrigger value="discharged" className="flex items-center gap-2">
            Discharged
            <Badge variant="secondary" className="ml-1">
              {statusCounts.discharged}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inpatient" className="flex items-center gap-2">
            Inpatient
            <Badge variant="secondary" className="ml-1">
              {statusCounts.inpatient}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="emergency" className="flex items-center gap-2">
            Emergency
            <Badge variant="secondary" className="ml-1">
              {statusCounts.emergency}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredPatients.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No patients found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={patient.profilePhoto || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">
                            {patient.firstName.charAt(0)}
                            {patient.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{patient.fullName}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {patient.age} years • {patient.gender}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule Appointment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Medical Records
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PhoneCall className="w-4 h-4 mr-2" />
                            Contact Patient
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Patient
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </Badge>
                      <Badge className={getAdmissionStatusColor(patient.admissionStatus)}>
                        {patient.admissionStatus.charAt(0).toUpperCase() + patient.admissionStatus.slice(1)}
                      </Badge>
                      {patient.allergies.length > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Allergies
                        </Badge>
                      )}
                      {isUpcomingAppointment(patient.nextAppointment) && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          <Clock className="w-3 h-3 mr-1" />
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{patient.hospitalName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{patient.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{patient.bloodType}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">ASSIGNED DOCTOR</Label>
                      <p className="text-sm font-medium mt-1">{patient.assignedDoctor}</p>
                    </div>

                    {patient.medicalConditions.length > 0 && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">MEDICAL CONDITIONS</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {patient.medicalConditions.slice(0, 2).map((condition) => (
                            <Badge key={condition} variant="secondary" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                          {patient.medicalConditions.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{patient.medicalConditions.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {patient.allergies.length > 0 && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">ALLERGIES</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {patient.allergies.slice(0, 2).map((allergy) => (
                            <Badge key={allergy} variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {allergy}
                            </Badge>
                          ))}
                          {patient.allergies.length > 2 && (
                            <Badge variant="destructive" className="text-xs">
                              +{patient.allergies.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next:</span>
                      </div>
                      <span className="font-medium">{formatDate(patient.nextAppointment)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Visits:</span>
                      <span className="font-medium">{patient.totalVisits}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
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
          Showing {filteredPatients.length} of {patients.length} patients
        </span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  )
}
