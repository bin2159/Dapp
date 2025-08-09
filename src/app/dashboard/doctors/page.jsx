"use client"

import * as React from "react"
import {
  Search,
  MapPin,
  Phone,
  Star,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Plus,
  SlidersHorizontal,
  Download,
  MoreHorizontal,
  Calendar,
  Clock,
  Stethoscope,
  GraduationCap,
  Languages,
  DollarSign,
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

// Sample doctor data
const doctors = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    fullName: "Dr. Sarah Johnson",
    email: "sarah.johnson@citygeneral.com",
    phone: "+1 (555) 123-4567",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=SJ",
    specialties: ["Cardiology", "Internal Medicine"],
    qualifications: ["MD", "FACC", "FAHA"],
    experience: 15,
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Cardiology",
    employeeId: "DOC001",
    status: "active",
    rating: 4.9,
    consultationFee: 200,
    languagesSpoken: ["English", "Spanish"],
    acceptsNewPatients: true,
    availableToday: true,
    nextAvailable: "Today 2:00 PM",
    totalPatients: 1250,
    joiningDate: "2018-03-15",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    fullName: "Dr. Michael Chen",
    email: "michael.chen@citygeneral.com",
    phone: "+1 (555) 234-5678",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=MC",
    specialties: ["Neurology", "Neurosurgery"],
    qualifications: ["MD", "PhD", "FAANS"],
    experience: 12,
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Neurology",
    employeeId: "DOC002",
    status: "active",
    rating: 4.8,
    consultationFee: 250,
    languagesSpoken: ["English", "Chinese"],
    acceptsNewPatients: true,
    availableToday: false,
    nextAvailable: "Tomorrow 9:00 AM",
    totalPatients: 980,
    joiningDate: "2019-07-22",
    lastUpdated: "2024-01-12",
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Rodriguez",
    fullName: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@stmarys.com",
    phone: "+1 (555) 345-6789",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=ER",
    specialties: ["Emergency Medicine", "Critical Care"],
    qualifications: ["MD", "FACEP"],
    experience: 8,
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    department: "Emergency Medicine",
    employeeId: "DOC003",
    status: "active",
    rating: 4.7,
    consultationFee: 180,
    languagesSpoken: ["English", "Spanish", "Portuguese"],
    acceptsNewPatients: true,
    availableToday: true,
    nextAvailable: "Today 4:30 PM",
    totalPatients: 2100,
    joiningDate: "2020-01-10",
    lastUpdated: "2024-01-10",
  },
  {
    id: "4",
    firstName: "James",
    lastName: "Wilson",
    fullName: "Dr. James Wilson",
    email: "james.wilson@stmarys.com",
    phone: "+1 (555) 456-7890",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=JW",
    specialties: ["Surgery", "Orthopedics"],
    qualifications: ["MD", "FACS", "FAAOS"],
    experience: 20,
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    department: "Surgery",
    employeeId: "DOC004",
    status: "on-leave",
    rating: 4.9,
    consultationFee: 300,
    languagesSpoken: ["English"],
    acceptsNewPatients: false,
    availableToday: false,
    nextAvailable: "Next week",
    totalPatients: 1800,
    joiningDate: "2015-09-01",
    lastUpdated: "2024-01-08",
  },
  {
    id: "5",
    firstName: "Lisa",
    lastName: "Thompson",
    fullName: "Dr. Lisa Thompson",
    email: "lisa.thompson@regional.edu",
    phone: "+1 (555) 567-8901",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=LT",
    specialties: ["Internal Medicine", "Geriatrics"],
    qualifications: ["MD", "FACP"],
    experience: 10,
    hospitalId: "3",
    hospitalName: "Regional Health Institute",
    department: "Internal Medicine",
    employeeId: "DOC005",
    status: "active",
    rating: 4.6,
    consultationFee: 150,
    languagesSpoken: ["English", "French"],
    acceptsNewPatients: true,
    availableToday: true,
    nextAvailable: "Today 10:00 AM",
    totalPatients: 1450,
    joiningDate: "2021-02-15",
    lastUpdated: "2024-01-05",
  },
  {
    id: "6",
    firstName: "Robert",
    lastName: "Kim",
    fullName: "Dr. Robert Kim",
    email: "robert.kim@regional.edu",
    phone: "+1 (555) 678-9012",
    profilePhoto: "/placeholder.svg?height=100&width=100&text=RK",
    specialties: ["Dermatology", "Cosmetic Surgery"],
    qualifications: ["MD", "FAAD"],
    experience: 14,
    hospitalId: "3",
    hospitalName: "Regional Health Institute",
    department: "Dermatology",
    employeeId: "DOC006",
    status: "inactive",
    rating: 4.8,
    consultationFee: 220,
    languagesSpoken: ["English", "Korean"],
    acceptsNewPatients: false,
    availableToday: false,
    nextAvailable: "Not available",
    totalPatients: 890,
    joiningDate: "2017-11-30",
    lastUpdated: "2024-01-03",
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
  "Critical Care",
  "Geriatrics",
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

const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "experience", label: "Experience (High to Low)" },
  { value: "experience-asc", label: "Experience (Low to High)" },
  { value: "rating", label: "Rating (High to Low)" },
  { value: "patients", label: "Total Patients (High to Low)" },
  { value: "updated", label: "Recently Updated" },
]

export default function DoctorList() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedHospital, setSelectedHospital] = React.useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = React.useState("All Specialties")
  const [selectedDepartment, setSelectedDepartment] = React.useState("All Departments")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [selectedQualifications, setSelectedQualifications] = React.useState([])
  const [sortBy, setSortBy] = React.useState("name")
  const [showAvailableOnly, setShowAvailableOnly] = React.useState(false)
  const [showAcceptingPatientsOnly, setShowAcceptingPatientsOnly] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("all")

  // Get unique qualifications for filter
  const allQualifications = Array.from(new Set(doctors.flatMap((d) => d.qualifications)))

  // Filter and sort doctors
  const filteredDoctors = React.useMemo(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        doctor.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesHospital = selectedHospital === "all" || doctor.hospitalId === selectedHospital
      const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialties.includes(selectedSpecialty)
      const matchesDepartment = selectedDepartment === "All Departments" || doctor.department === selectedDepartment
      const matchesStatus = selectedStatus === "all" || doctor.status === selectedStatus
      const matchesQualifications =
        selectedQualifications.length === 0 ||
        selectedQualifications.some((qual) => doctor.qualifications.includes(qual))
      const matchesAvailable = !showAvailableOnly || doctor.availableToday
      const matchesAcceptingPatients = !showAcceptingPatientsOnly || doctor.acceptsNewPatients
      const matchesTab = activeTab === "all" || doctor.status === activeTab

      return (
        matchesSearch &&
        matchesHospital &&
        matchesSpecialty &&
        matchesDepartment &&
        matchesStatus &&
        matchesQualifications &&
        matchesAvailable &&
        matchesAcceptingPatients &&
        matchesTab
      )
    })

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.fullName.localeCompare(b.fullName)
        case "name-desc":
          return b.fullName.localeCompare(a.fullName)
        case "experience":
          return b.experience - a.experience
        case "experience-asc":
          return a.experience - b.experience
        case "rating":
          return b.rating - a.rating
        case "patients":
          return b.totalPatients - a.totalPatients
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
    selectedQualifications,
    sortBy,
    showAvailableOnly,
    showAcceptingPatientsOnly,
    activeTab,
  ])

  const handleQualificationToggle = (qualification) => {
    setSelectedQualifications((prev) =>
      prev.includes(qualification) ? prev.filter((q) => q !== qualification) : [...prev, qualification],
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedHospital("all")
    setSelectedSpecialty("All Specialties")
    setSelectedDepartment("All Departments")
    setSelectedStatus("all")
    setSelectedQualifications([])
    setSortBy("name")
    setShowAvailableOnly(false)
    setShowAcceptingPatientsOnly(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusCounts = () => {
    return {
      all: doctors.length,
      active: doctors.filter((d) => d.status === "active").length,
      inactive: doctors.filter((d) => d.status === "inactive").length,
      "on-leave": doctors.filter((d) => d.status === "on-leave").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Management</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor all doctors in your hospital network</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/doctors/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Doctors
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
                    <SheetDescription>Apply additional filters to refine your doctor search</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-medium">Qualifications</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {allQualifications.map((qualification) => (
                          <div key={qualification} className="flex items-center space-x-2">
                            <Checkbox
                              id={qualification}
                              checked={selectedQualifications.includes(qualification)}
                              onCheckedChange={() => handleQualificationToggle(qualification)}
                            />
                            <Label htmlFor={qualification} className="text-sm font-normal">
                              {qualification}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available-today">Available Today</Label>
                      <Switch id="available-today" checked={showAvailableOnly} onCheckedChange={setShowAvailableOnly} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="accepting-patients">Accepting New Patients</Label>
                      <Switch
                        id="accepting-patients"
                        checked={showAcceptingPatientsOnly}
                        onCheckedChange={setShowAcceptingPatientsOnly}
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
          {(selectedQualifications.length > 0 || showAvailableOnly || showAcceptingPatientsOnly) && (
            <div className="flex flex-wrap gap-2">
              {selectedQualifications.map((qualification) => (
                <Badge
                  key={qualification}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleQualificationToggle(qualification)}
                >
                  {qualification} ×
                </Badge>
              ))}
              {showAvailableOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowAvailableOnly(false)}>
                  Available Today ×
                </Badge>
              )}
              {showAcceptingPatientsOnly && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setShowAcceptingPatientsOnly(false)}
                >
                  Accepting Patients ×
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
          {filteredDoctors.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={doctor.profilePhoto || "/placeholder.svg"} />
                          <AvatarFallback className="text-lg">
                            {doctor.firstName.charAt(0)}
                            {doctor.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{doctor.fullName}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {doctor.hospitalName}
                          </CardDescription>
                          <p className="text-sm text-muted-foreground">{doctor.department}</p>
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
                            Edit Doctor
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            View Schedule
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Doctor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(doctor.status)}>
                        {doctor.status === "on-leave"
                          ? "On Leave"
                          : doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                      </Badge>
                      {doctor.acceptsNewPatients && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <UserCheck className="w-3 h-3 mr-1" />
                          New Patients
                        </Badge>
                      )}
                      {doctor.availableToday && (
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          Available Today
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span>{doctor.experience} years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{doctor.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{doctor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span>${doctor.consultationFee}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">SPECIALTIES</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {doctor.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">QUALIFICATIONS</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {doctor.qualifications.slice(0, 3).map((qualification) => (
                          <Badge key={qualification} variant="outline" className="text-xs">
                            {qualification}
                          </Badge>
                        ))}
                        {doctor.qualifications.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{doctor.qualifications.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next:</span>
                      </div>
                      <span className="font-medium">{doctor.nextAvailable}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Languages className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {doctor.languagesSpoken.slice(0, 2).join(", ")}
                        {doctor.languagesSpoken.length > 2 && ` +${doctor.languagesSpoken.length - 2} more`}
                      </span>
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
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  )
}
