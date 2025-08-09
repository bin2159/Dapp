"use client"

import * as React from "react"
import { UserPlus, User, Heart, MapPin, Phone, Shield, AlertTriangle, Check, Upload, X } from "lucide-react"
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
  { id: "1", name: "City General Hospital" },
  { id: "2", name: "St. Mary's Medical Center" },
  { id: "3", name: "Regional Health Institute" },
]

const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiology", hospitalId: "1" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Neurology", hospitalId: "1" },
  { id: "3", name: "Dr. Emily Rodriguez", specialty: "Emergency Medicine", hospitalId: "2" },
  { id: "4", name: "Dr. James Wilson", specialty: "Surgery", hospitalId: "2" },
  { id: "5", name: "Dr. Lisa Thompson", specialty: "Internal Medicine", hospitalId: "3" },
  { id: "6", name: "Dr. Robert Kim", specialty: "Dermatology", hospitalId: "3" },
]

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"]

const insuranceProviders = [
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "UnitedHealth",
  "Humana",
  "Kaiser Permanente",
  "Anthem",
  "Medicaid",
  "Medicare",
  "Self-Pay",
  "Other",
]

const relationshipTypes = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Grandparent",
  "Grandchild",
  "Friend",
  "Guardian",
  "Other",
]

const commonAllergies = [
  "Penicillin",
  "Aspirin",
  "Ibuprofen",
  "Codeine",
  "Morphine",
  "Latex",
  "Peanuts",
  "Shellfish",
  "Eggs",
  "Milk",
  "Soy",
  "Wheat",
  "Dust",
  "Pollen",
  "Pet Dander",
]

const commonConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "COPD",
  "Arthritis",
  "Depression",
  "Anxiety",
  "High Cholesterol",
  "Kidney Disease",
  "Liver Disease",
  "Cancer",
  "Stroke",
  "Epilepsy",
  "Thyroid Disorder",
]


const initialFormData = {
  firstName: "",
  lastName: "",
  middleName: "",
  gender: "",
  dateOfBirth: undefined,
  ssn: "",
  profilePhoto: "",
  phone: "",
  email: "",
  alternatePhone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  emergencyContactRelationship: "",
  emergencyContactAddress: "",
  bloodType: "",
  allergies: [],
  customAllergies: "",
  medicalConditions: [],
  customConditions: "",
  currentMedications: "",
  medicalHistory: "",
  familyMedicalHistory: "",
  insuranceProvider: "",
  policyNumber: "",
  groupNumber: "",
  subscriberName: "",
  subscriberRelationship: "",
  preferredHospital: "",
  preferredDoctor: "",
  referredBy: "",
  occupation: "",
  maritalStatus: "",
  language: "",
  religion: "",
  smokingStatus: "",
  alcoholConsumption: "",
  exerciseFrequency: "",
  consentToTreatment: false,
  consentToShare: false,
  emailNotifications: true,
  smsNotifications: true,
  emergencyOnly: false,
}

export default function AddPatientForm() {
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

  // Calculate age from date of birth
  const calculateAge = (birthDate) => {
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }
    return age
  }

  // Get doctors for selected hospital
  const availableDoctors = doctors.filter((doctor) => doctor.hospitalId === formData.preferredHospital)
  const selectedHospital = hospitals.find((h) => h.id === formData.preferredHospital)

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Patient Added Successfully!</CardTitle>
            <CardDescription>
              {formData.firstName} {formData.lastName} has been registered in the hospital management system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Patient Name:</span>
                <span>
                  {formData.firstName} {formData.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{formData.dateOfBirth ? calculateAge(formData.dateOfBirth) : "N/A"} years</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hospital:</span>
                <span>{selectedHospital?.name || "Not assigned"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Blood Type:</span>
                <span>{formData.bloodType || "Not specified"}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetForm} className="flex-1">
                Add Another Patient
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                View Patient List
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
        <h1 className="text-3xl font-bold tracking-tight">Add New Patient</h1>
        <p className="text-muted-foreground mt-2">Register a new patient in the hospital management system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Basic personal details of the patient</CardDescription>
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

            <div className="grid md:grid-cols-3 gap-4">
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
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  placeholder="Enter middle name"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
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
            </div>

            <div className="grid md:grid-cols-3 gap-4">
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
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
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
              <div>
                <Label htmlFor="ssn">SSN</Label>
                <Input
                  id="ssn"
                  placeholder="XXX-XX-XXXX"
                  value={formData.ssn}
                  onChange={(e) => handleInputChange("ssn", e.target.value)}
                />
              </div>
            </div>

            {formData.dateOfBirth && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">Age:</span> {calculateAge(formData.dateOfBirth)} years old
                </p>
              </div>
            )}
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
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
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
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="Complete address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
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
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Emergency Contact
            </CardTitle>
            <CardDescription>Primary emergency contact information</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContactName">Contact Name *</Label>
              <Input
                id="emergencyContactName"
                placeholder="Emergency contact name"
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
              <Input
                id="emergencyContactPhone"
                type="tel"
                placeholder="Emergency contact phone"
                value={formData.emergencyContactPhone}
                onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
              <Select
                value={formData.emergencyContactRelationship}
                onValueChange={(value) => handleInputChange("emergencyContactRelationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationshipTypes.map((relationship) => (
                    <SelectItem key={relationship} value={relationship.toLowerCase()}>
                      {relationship}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="emergencyContactAddress">Contact Address</Label>
              <Input
                id="emergencyContactAddress"
                placeholder="Emergency contact address"
                value={formData.emergencyContactAddress}
                onChange={(e) => handleInputChange("emergencyContactAddress", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Medical Information
            </CardTitle>
            <CardDescription>Medical history and health information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select value={formData.bloodType} onValueChange={(value) => handleInputChange("bloodType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Known Allergies</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all known allergies</p>
              <div className="grid md:grid-cols-3 gap-2">
                {commonAllergies.map((allergy) => (
                  <div key={allergy} className="flex items-center space-x-2">
                    <Checkbox
                      id={allergy}
                      checked={formData.allergies.includes(allergy)}
                      onCheckedChange={() => handleArrayToggle("allergies", allergy)}
                    />
                    <Label htmlFor={allergy} className="text-sm font-normal">
                      {allergy}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.allergies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {formData.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <Label htmlFor="customAllergies">Other Allergies</Label>
                <Input
                  id="customAllergies"
                  placeholder="List any other allergies"
                  value={formData.customAllergies}
                  onChange={(e) => handleInputChange("customAllergies", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Medical Conditions</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all current medical conditions</p>
              <div className="grid md:grid-cols-3 gap-2">
                {commonConditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.medicalConditions.includes(condition)}
                      onCheckedChange={() => handleArrayToggle("medicalConditions", condition)}
                    />
                    <Label htmlFor={condition} className="text-sm font-normal">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Label htmlFor="customConditions">Other Conditions</Label>
                <Input
                  id="customConditions"
                  placeholder="List any other medical conditions"
                  value={formData.customConditions}
                  onChange={(e) => handleInputChange("customConditions", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  placeholder="List current medications and dosages"
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  placeholder="Brief medical history"
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="familyMedicalHistory">Family Medical History</Label>
              <Textarea
                id="familyMedicalHistory"
                placeholder="Relevant family medical history"
                value={formData.familyMedicalHistory}
                onChange={(e) => handleInputChange("familyMedicalHistory", e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Insurance Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Insurance Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Select
                value={formData.insuranceProvider}
                onValueChange={(value) => handleInputChange("insuranceProvider", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance provider" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceProviders.map((provider) => (
                    <SelectItem key={provider} value={provider.toLowerCase().replace(/\s+/g, "-")}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                placeholder="Insurance policy number"
                value={formData.policyNumber}
                onChange={(e) => handleInputChange("policyNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="groupNumber">Group Number</Label>
              <Input
                id="groupNumber"
                placeholder="Insurance group number"
                value={formData.groupNumber}
                onChange={(e) => handleInputChange("groupNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subscriberName">Subscriber Name</Label>
              <Input
                id="subscriberName"
                placeholder="Primary subscriber name"
                value={formData.subscriberName}
                onChange={(e) => handleInputChange("subscriberName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subscriberRelationship">Relationship to Subscriber</Label>
              <Select
                value={formData.subscriberRelationship}
                onValueChange={(value) => handleInputChange("subscriberRelationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self">Self</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="preferredHospital">Preferred Hospital</Label>
              <Select
                value={formData.preferredHospital}
                onValueChange={(value) => handleInputChange("preferredHospital", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred hospital" />
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
              <Label htmlFor="preferredDoctor">Preferred Doctor</Label>
              <Select
                value={formData.preferredDoctor}
                onValueChange={(value) => handleInputChange("preferredDoctor", value)}
                disabled={!formData.preferredHospital}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={formData.preferredHospital ? "Select preferred doctor" : "Select hospital first"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{doctor.name}</span>
                        <span className="text-sm text-muted-foreground">{doctor.specialty}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="referredBy">Referred By</Label>
              <Input
                id="referredBy"
                placeholder="Doctor or person who referred the patient"
                value={formData.referredBy}
                onChange={(e) => handleInputChange("referredBy", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  placeholder="Patient's occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) => handleInputChange("maritalStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Primary Language</Label>
                <Input
                  id="language"
                  placeholder="Primary language"
                  value={formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="smokingStatus">Smoking Status</Label>
                <Select
                  value={formData.smokingStatus}
                  onValueChange={(value) => handleInputChange("smokingStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="former">Former smoker</SelectItem>
                    <SelectItem value="current">Current smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alcoholConsumption">Alcohol Consumption</Label>
                <Select
                  value={formData.alcoholConsumption}
                  onValueChange={(value) => handleInputChange("alcoholConsumption", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                    <SelectItem value="regularly">Regularly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="exerciseFrequency">Exercise Frequency</Label>
                <Select
                  value={formData.exerciseFrequency}
                  onValueChange={(value) => handleInputChange("exerciseFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent and Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Consent and Communication Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="consentToTreatment">Consent to Treatment *</Label>
                  <p className="text-sm text-muted-foreground">Patient consents to medical treatment</p>
                </div>
                <Switch
                  id="consentToTreatment"
                  checked={formData.consentToTreatment}
                  onCheckedChange={(checked) => handleInputChange("consentToTreatment", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="consentToShare">Consent to Share Information</Label>
                  <p className="text-sm text-muted-foreground">Allow sharing medical information with family</p>
                </div>
                <Switch
                  id="consentToShare"
                  checked={formData.consentToShare}
                  onCheckedChange={(checked) => handleInputChange("consentToShare", checked)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Communication Preferences</h4>
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={formData.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <Switch
                  id="smsNotifications"
                  checked={formData.smsNotifications}
                  onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="emergencyOnly">Emergency Communications Only</Label>
                <Switch
                  id="emergencyOnly"
                  checked={formData.emergencyOnly}
                  onCheckedChange={(checked) => handleInputChange("emergencyOnly", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting || !formData.consentToTreatment} className="flex-1">
            {isSubmitting ? "Registering Patient..." : "Register Patient"}
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
