"use client"

import * as React from "react"
import {
  Search,
  MapPin,
  Phone,
  Bed,
  Users,
  Star,
  Edit,
  Trash2,
  Eye,
  Building2,
  Plus,
  SlidersHorizontal,
  Download,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
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

// Sample hospital data
const hospitals = [
  {
    id: "1",
    name: "City General Hospital",
    type: "general",
    status: "active",
    location: "Downtown Medical District",
    address: "123 Medical Center Dr, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@citygeneral.com",
    website: "www.citygeneral.com",
    totalBeds: 450,
    icuBeds: 50,
    occupancyRate: 85,
    rating: 4.8,
    services: ["Emergency Medicine", "Cardiology", "Neurology", "Surgery"],
    emergencyServices: true,
    accreditations: ["Joint Commission", "NABH"],
    adminName: "Dr. Sarah Johnson",
    adminPhone: "+1 (555) 123-4568",
    establishedYear: 1985,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "St. Mary's Medical Center",
    type: "specialty",
    status: "active",
    location: "Westside Health Campus",
    address: "456 Healthcare Ave, Los Angeles, CA 90210",
    phone: "+1 (555) 234-5678",
    email: "contact@stmarys.com",
    website: "www.stmarys.com",
    totalBeds: 320,
    icuBeds: 40,
    occupancyRate: 92,
    rating: 4.6,
    services: ["Oncology", "Radiology", "Surgery", "Pediatrics"],
    emergencyServices: true,
    accreditations: ["Joint Commission", "ISO 9001:2015"],
    adminName: "Dr. Michael Chen",
    adminPhone: "+1 (555) 234-5679",
    establishedYear: 1978,
    lastUpdated: "2024-01-12",
  },
  {
    id: "3",
    name: "Regional Health Institute",
    type: "teaching",
    status: "active",
    location: "North Medical Plaza",
    address: "789 University Blvd, Chicago, IL 60601",
    phone: "+1 (555) 345-6789",
    email: "info@regionalhealth.edu",
    website: "www.regionalhealth.edu",
    totalBeds: 600,
    icuBeds: 80,
    occupancyRate: 78,
    rating: 4.9,
    services: ["Internal Medicine", "Research", "Teaching", "Emergency Medicine"],
    emergencyServices: true,
    accreditations: ["Joint Commission", "AAHRPP", "NABL"],
    adminName: "Dr. Emily Rodriguez",
    adminPhone: "+1 (555) 345-6790",
    establishedYear: 1965,
    lastUpdated: "2024-01-10",
  },
  {
    id: "4",
    name: "Sunshine Pediatric Hospital",
    type: "pediatric",
    status: "maintenance",
    location: "Children's Medical District",
    address: "321 Kids Care Lane, Miami, FL 33101",
    phone: "+1 (555) 456-7890",
    email: "info@sunshinepediatric.com",
    website: "www.sunshinepediatric.com",
    totalBeds: 180,
    icuBeds: 25,
    occupancyRate: 65,
    rating: 4.7,
    services: ["Pediatrics", "NICU", "Pediatric Surgery", "Child Psychology"],
    emergencyServices: true,
    accreditations: ["Joint Commission"],
    adminName: "Dr. James Wilson",
    adminPhone: "+1 (555) 456-7891",
    establishedYear: 1992,
    lastUpdated: "2024-01-08",
  },
  {
    id: "5",
    name: "Metro Rehabilitation Center",
    type: "rehabilitation",
    status: "inactive",
    location: "Recovery District",
    address: "654 Therapy St, Boston, MA 02101",
    phone: "+1 (555) 567-8901",
    email: "contact@metrorehab.com",
    website: "www.metrorehab.com",
    totalBeds: 120,
    icuBeds: 10,
    occupancyRate: 45,
    rating: 4.3,
    services: ["Physical Therapy", "Occupational Therapy", "Speech Therapy"],
    emergencyServices: false,
    accreditations: ["CARF"],
    adminName: "Dr. Lisa Thompson",
    adminPhone: "+1 (555) 567-8902",
    establishedYear: 2001,
    lastUpdated: "2024-01-05",
  },
]

const hospitalTypes = [
  { value: "all", label: "All Types" },
  { value: "general", label: "General Hospital" },
  { value: "specialty", label: "Specialty Hospital" },
  { value: "teaching", label: "Teaching Hospital" },
  { value: "pediatric", label: "Pediatric Hospital" },
  { value: "rehabilitation", label: "Rehabilitation Center" },
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Under Maintenance" },
]

const sortOptions = [
  { value: "name", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "beds", label: "Total Beds (High to Low)" },
  { value: "beds-asc", label: "Total Beds (Low to High)" },
  { value: "rating", label: "Rating (High to Low)" },
  { value: "updated", label: "Recently Updated" },
]

export default function HospitalList() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedType, setSelectedType] = React.useState("all")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [selectedServices, setSelectedServices] = React.useState([])
  const [sortBy, setSortBy] = React.useState("name")
  const [showEmergencyOnly, setShowEmergencyOnly] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("all")

  // Get unique services for filter
  const allServices = Array.from(new Set(hospitals.flatMap((h) => h.services)))

  // Filter and sort hospitals
  const filteredHospitals = React.useMemo(() => {
    const filtered = hospitals.filter((hospital) => {
      const matchesSearch =
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = selectedType === "all" || hospital.type === selectedType
      const matchesStatus = selectedStatus === "all" || hospital.status === selectedStatus
      const matchesServices =
        selectedServices.length === 0 || selectedServices.some((service) => hospital.services.includes(service))
      const matchesEmergency = !showEmergencyOnly || hospital.emergencyServices
      const matchesTab = activeTab === "all" || hospital.status === activeTab

      return matchesSearch && matchesType && matchesStatus && matchesServices && matchesEmergency && matchesTab
    })

    // Sort hospitals
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "beds":
          return b.totalBeds - a.totalBeds
        case "beds-asc":
          return a.totalBeds - b.totalBeds
        case "rating":
          return b.rating - a.rating
        case "updated":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedType, selectedStatus, selectedServices, sortBy, showEmergencyOnly, activeTab])

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedType("all")
    setSelectedStatus("all")
    setSelectedServices([])
    setSortBy("name")
    setShowEmergencyOnly(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusCounts = () => {
    return {
      all: hospitals.length,
      active: hospitals.filter((h) => h.status === "active").length,
      inactive: hospitals.filter((h) => h.status === "inactive").length,
      maintenance: hospitals.filter((h) => h.status === "maintenance").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hospital Management</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor all hospitals in your network</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/hospitals/add">
              <Plus className="w-4 h-4 mr-2" />
              Add Hospital
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
                    <SheetDescription>Apply additional filters to refine your hospital search</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label className="text-base font-medium">Medical Services</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {allServices.map((service) => (
                          <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                              id={service}
                              checked={selectedServices.includes(service)}
                              onCheckedChange={() => handleServiceToggle(service)}
                            />
                            <Label htmlFor={service} className="text-sm font-normal">
                              {service}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emergency-only">Emergency Services Only</Label>
                      <Switch id="emergency-only" checked={showEmergencyOnly} onCheckedChange={setShowEmergencyOnly} />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Hospital Type" />
              </SelectTrigger>
              <SelectContent>
                {hospitalTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
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
          {(selectedServices.length > 0 || showEmergencyOnly) && (
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((service) => (
                <Badge
                  key={service}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleServiceToggle(service)}
                >
                  {service} ×
                </Badge>
              ))}
              {showEmergencyOnly && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowEmergencyOnly(false)}>
                  Emergency Services ×
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
            All Hospitals
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
          <TabsTrigger value="maintenance" className="flex items-center gap-2">
            Maintenance
            <Badge variant="secondary" className="ml-1">
              {statusCounts.maintenance}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredHospitals.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hospitals found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHospitals.map((hospital) => (
                <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${hospital.name.charAt(0)}`} />
                          <AvatarFallback>{hospital.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{hospital.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {hospital.location}
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
                            Edit Hospital
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Hospital
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(hospital.status)}>
                        {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">{hospitalTypes.find((t) => t.value === hospital.type)?.label}</Badge>
                      {hospital.emergencyServices && (
                        <Badge variant="destructive" className="text-xs">
                          24/7 Emergency
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-muted-foreground" />
                        <span>{hospital.totalBeds} beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{hospital.occupancyRate}% occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="truncate">{hospital.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{hospital.rating}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">SERVICES</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {hospital.services.slice(0, 3).map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {hospital.services.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{hospital.services.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">ADMINISTRATOR</Label>
                      <p className="text-sm mt-1">{hospital.adminName}</p>
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
        </TabsContent>
      </Tabs>

      {/* Results Summary */}
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <span>
          Showing {filteredHospitals.length} of {hospitals.length} hospitals
        </span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  )
}
