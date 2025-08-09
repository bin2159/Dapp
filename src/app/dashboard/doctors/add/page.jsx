"use client"

import * as React from "react"
import { UserPlus, User, Stethoscope, MapPin, Phone, GraduationCap, Clock, Check, Upload, X } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data
const hospitals = [
  { id: "1", name: "City General Hospital", departments: ["Cardiology", "Neurology", "Emergency Medicine", "Surgery"] },
  { id: "2", name: "St. Mary's Medical Center", departments: ["Oncology", "Radiology", "Pediatrics", "Orthopedics"] },
  {
    id: "3",
    name: "Regional Health Institute",
    departments: ["Internal Medicine", "Psychiatry", "Dermatology", "Ophthalmology"],
  },
]

const specialties = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Surgery",
  "Internal Medicine",
  "Emergency Medicine",
  "Radiology",
  "Pathology",
  "Anesthesiology",
  "Dermatology",
  "Psychiatry",
  "Ophthalmology",
  "ENT",
  "Urology",
  "Oncology",
  "Gastroenterology",
  "Pulmonology",
  "Nephrology",
  "Endocrinology",
  "Rheumatology",
  "Hematology",
]

const qualifications = [
  "MBBS",
  "MD",
  "MS",
  "DNB",
  "DM",
  "MCh",
  "FRCS",
  "MRCP",
  "FACS",
  "FACP",
  "PhD",
  "DSc",
  "Fellowship",
  "Diploma",
  "Certificate",
]

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Bengali",
  "Tamil",
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]


const initialFormData = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: undefined,
  profilePhoto: "",
  medicalLicense: "",
  specialties: [],
  qualifications: [],
  experience: "",
  biography: "",
  phone: "",
  email: "",
  alternatePhone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  hospitalId: "",
  department: "",
  employeeId: "",
  joiningDate: undefined,
  availability: {
    monday: { available: true, startTime: "09:00", endTime: "17:00" },
    tuesday: { available: true, startTime: "09:00", endTime: "17:00" },
    wednesday: { available: true, startTime: "09:00", endTime: "17:00" },
    thursday: { available: true, startTime: "09:00", endTime: "17:00" },
    friday: { available: true, startTime: "09:00", endTime: "17:00" },
    saturday: { available: false, startTime: "09:00", endTime: "17:00" },
    sunday: { available: false, startTime: "09:00", endTime: "17:00" },
  },
  consultationFee: "",
  languagesSpoken: [],
  emergencyContact: "",
  emergencyPhone: "",
  isActive: true,
  acceptsNewPatients: true,
}

export default function AddDoctorForm() {
  const [formData, setFormData] = React.useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field, item) => {
    setFormData((prev) => {
      const currentArray = prev[field]
      return {
        ...prev,
        [field]: currentArray.includes(item) ? currentArray.filter((i) => i !== item) : [...currentArray, item],
      }
    })
  }

  const handleAvailabilityChange = (
    day,
    field,
    value,
  ) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setIsSuccess(false)
  }

  // Get departments for selected hospital
  const selectedHospital = hospitals.find((h) => h.id === formData.hospitalId)
  const availableDepartments = selectedHospital?.departments || []

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Doctor Added Successfully!</CardTitle>
            <CardDescription>
              Dr. {formData.firstName} {formData.lastName} has been added to the hospital management system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Doctor Name:</span>
                <span>
                  Dr. {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hospital:</span>
                <span>{selectedHospital?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Department:</span>
                <span>{formData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Specialties:</span>
                <span>{formData.specialties.length} specialties</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetForm} className="flex-1">
                Add Another Doctor
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                View Doctor List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add New Doctor</h1>
        <p className="text-muted-foreground mt-2">Enter the doctor's details to add them to the hospital system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic personal details of the doctor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={formData.profilePhoto || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {formData.firstName.charAt(0)}
                  {formData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  {formData.profilePhoto && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange("profilePhoto", "")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Recommended: 400x400px, max 2MB</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date of Birth *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dateOfBirth && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={formData.dateOfBirth}
                      onSelect={(date) => handleInputChange("dateOfBirth", date)}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Professional Information
            </CardTitle>
            <CardDescription>Medical credentials and professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medicalLicense">Medical License Number *</Label>
                <Input
                  id="medicalLicense"
                  placeholder="Enter medical license number"
                  value={formData.medicalLicense}
                  onChange={(e) => handleInputChange("medicalLicense", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="Enter years of experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Medical Specialties *</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all applicable specialties</p>
              <div className="grid md:grid-cols-3 gap-2">
                {specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center space-x-2">
                    <Checkbox
                      id={specialty}
                      checked={formData.specialties.includes(specialty)}
                      onCheckedChange={() => handleArrayToggle("specialties", specialty)}
                    />
                    <Label htmlFor={specialty} className="text-sm font-normal">
                      {specialty}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {formData.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label className="text-base font-medium">Qualifications</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all applicable qualifications</p>
              <div className="grid md:grid-cols-4 gap-2">
                {qualifications.map((qualification) => (
                  <div key={qualification} className="flex items-center space-x-2">
                    <Checkbox
                      id={qualification}
                      checked={formData.qualifications.includes(qualification)}
                      onCheckedChange={() => handleArrayToggle("qualifications", qualification)}
                    />
                    <Label htmlFor={qualification} className="text-sm font-normal">
                      {qualification}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="biography">Biography</Label>
              <Textarea
                id="biography"
                placeholder="Brief professional biography and achievements"
                value={formData.biography}
                onChange={(e) => handleInputChange("biography", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Primary phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Professional email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="alternatePhone">Alternate Phone</Label>
              <Input
                id="alternatePhone"
                type="tel"
                placeholder="Alternate phone number"
                value={formData.alternatePhone}
                onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="Complete address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="State"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Hospital Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Hospital Assignment
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hospital">Hospital *</Label>
              <Select value={formData.hospitalId} onValueChange={(value) => handleInputChange("hospitalId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.id}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleInputChange("department", value)}
                disabled={!formData.hospitalId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.hospitalId ? "Select department" : "Select hospital first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input
                id="employeeId"
                placeholder="Hospital employee ID"
                value={formData.employeeId}
                onChange={(e) => handleInputChange("employeeId", e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Joining Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.joiningDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.joiningDate ? format(formData.joiningDate, "PPP") : "Pick joining date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.joiningDate}
                    onSelect={(date) => handleInputChange("joiningDate", date)}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Availability Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Availability Schedule
            </CardTitle>
            <CardDescription>Set the doctor's weekly availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(formData.availability).map(([day, schedule]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24">
                    <Label className="capitalize font-medium">{day}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={schedule.available}
                      onCheckedChange={(checked) =>
                        handleAvailabilityChange(day, "available", checked)
                      }
                    />
                    <span className="text-sm text-muted-foreground">Available</span>
                  </div>
                  {schedule.available && (
                    <>
                      <Select
                        value={schedule.startTime}
                        onValueChange={(value) =>
                          handleAvailabilityChange(day, "startTime", value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-muted-foreground">to</span>
                      <Select
                        value={schedule.endTime}
                        onValueChange={(value) =>
                          handleAvailabilityChange(day, "endTime", value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                  {!schedule.available && <Badge variant="secondary">Not Available</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                <Input
                  id="consultationFee"
                  type="number"
                  placeholder="Enter consultation fee"
                  value={formData.consultationFee}
                  onChange={(e) => handleInputChange("consultationFee", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Languages Spoken</Label>
              <div className="grid md:grid-cols-4 gap-2 mt-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={formData.languagesSpoken.includes(language)}
                      onCheckedChange={() => handleArrayToggle("languagesSpoken", language)}
                    />
                    <Label htmlFor={language} className="text-sm font-normal">
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Emergency contact person"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  placeholder="Emergency contact phone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isActive">Active Status</Label>
                  <p className="text-sm text-muted-foreground">Doctor is currently active in the system</p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="acceptsNewPatients">Accepts New Patients</Label>
                  <p className="text-sm text-muted-foreground">Doctor is accepting new patient appointments</p>
                </div>
                <Switch
                  id="acceptsNewPatients"
                  checked={formData.acceptsNewPatients}
                  onCheckedChange={(checked) => handleInputChange("acceptsNewPatients", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Adding Doctor..." : "Add Doctor"}
            <UserPlus className="w-4 h-4 ml-2" />
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={resetForm}>
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  )
}
