"use client"

import * as React from "react"
import { Building2, MapPin, Phone, Clock, Users, Shield, Plus, Check } from "lucide-react"
import axios from '@/lib/api'
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
import { toast } from 'sonner'
const hospitalTypes = [
  { value: "general", label: "General Hospital" },
  { value: "specialty", label: "Specialty Hospital" },
  { value: "teaching", label: "Teaching Hospital" },
  { value: "research", label: "Research Hospital" },
  { value: "rehabilitation", label: "Rehabilitation Center" },
  { value: "psychiatric", label: "Psychiatric Hospital" },
  { value: "pediatric", label: "Pediatric Hospital" },
  { value: "maternity", label: "Maternity Hospital" },
]

const medicalServices = [
  "Emergency Medicine",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "Surgery",
  "Internal Medicine",
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
]

const accreditations = [
  "Joint Commission",
  "NABH (National Accreditation Board)",
  "ISO 9001:2015",
  "NABL (National Accreditation Board for Testing)",
  "AAHRPP",
  "CAP (College of American Pathologists)",
  "AABB (American Association of Blood Banks)",
]


const initialFormData = {
  name: "",
  description: "",
  type: "",
  phone: "",
  email: "",
  website: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  totalBeds: "",
  icuBeds: "",
  emergencyBeds: "",
  operatingRooms: "",
  services: [],
  emergencyServices: false,
  ambulanceServices: false,
  bloodBank: false,
  pharmacy: false,
  operatingHours: {
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "09:00", close: "17:00", closed: false },
    sunday: { open: "09:00", close: "17:00", closed: true },
  },
  accreditations: [],
  licenseNumber: "",
  adminName: "",
  adminPhone: "",
  adminEmail: "",
}

export default function AddHospitalForm() {
  const [formData, setFormData] = React.useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const handleAccreditationToggle = (accreditation) => {
    setFormData((prev) => ({
      ...prev,
      accreditations: prev.accreditations.includes(accreditation)
        ? prev.accreditations.filter((a) => a !== accreditation)
        : [...prev.accreditations, accreditation],
    }))
  }

  const handleOperatingHoursChange = (
    day,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      debugger
      const response = await axios.post('/api/hospital/create', formData)
      toast.success('Hospital created successfully')
      setIsSuccess(true)
    } catch (error) {
      debugger
      toast.error(error.response?.data?.error || 'Failed to create hospital')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Hospital Added Successfully!</CardTitle>
            <CardDescription>{formData.name} has been added to the hospital management system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Hospital Name:</span>
                <span>{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Type:</span>
                <span>{hospitalTypes.find((t) => t.value === formData.type)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Beds:</span>
                <span>{formData.totalBeds}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Services:</span>
                <span>{formData.services.length} services</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetForm} className="flex-1">
                Add Another Hospital
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                View Hospital List
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
        <h1 className="text-3xl font-bold tracking-tight">Add New Hospital</h1>
        <p className="text-muted-foreground mt-2">Enter the hospital details to add it to the management system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription>General details about the hospital</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Hospital Name *</Label>
              <Input
                id="name"
                placeholder="Enter hospital name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the hospital"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="type">Hospital Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hospital type" />
                </SelectTrigger>
                <SelectContent>
                  {hospitalTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                placeholder="Hospital license number"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                required
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
                placeholder="Hospital phone number"
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
                placeholder="Hospital email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="Hospital website URL"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="street">Street Address *</Label>
              <Input
                id="street"
                placeholder="Street address"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
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
              <Label htmlFor="state">State/Province *</Label>
              <Input
                id="state"
                placeholder="State or Province"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
              <Input
                id="zipCode"
                placeholder="ZIP or Postal Code"
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
          </CardContent>
        </Card>

        {/* Capacity & Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Capacity & Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="totalBeds">Total Beds *</Label>
              <Input
                id="totalBeds"
                type="number"
                placeholder="Total beds"
                value={formData.totalBeds}
                onChange={(e) => handleInputChange("totalBeds", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="icuBeds">ICU Beds</Label>
              <Input
                id="icuBeds"
                type="number"
                placeholder="ICU beds"
                value={formData.icuBeds}
                onChange={(e) => handleInputChange("icuBeds", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emergencyBeds">Emergency Beds</Label>
              <Input
                id="emergencyBeds"
                type="number"
                placeholder="Emergency beds"
                value={formData.emergencyBeds}
                onChange={(e) => handleInputChange("emergencyBeds", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="operatingRooms">Operating Rooms</Label>
              <Input
                id="operatingRooms"
                type="number"
                placeholder="Operating rooms"
                value={formData.operatingRooms}
                onChange={(e) => handleInputChange("operatingRooms", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Services</CardTitle>
            <CardDescription>Select all medical services offered by the hospital</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {medicalServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <Label htmlFor={service} className="text-sm font-normal">
                    {service}
                  </Label>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emergencyServices">24/7 Emergency Services</Label>
                <Switch
                  id="emergencyServices"
                  checked={formData.emergencyServices}
                  onCheckedChange={(checked) => handleInputChange("emergencyServices", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ambulanceServices">Ambulance Services</Label>
                <Switch
                  id="ambulanceServices"
                  checked={formData.ambulanceServices}
                  onCheckedChange={(checked) => handleInputChange("ambulanceServices", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="bloodBank">Blood Bank</Label>
                <Switch
                  id="bloodBank"
                  checked={formData.bloodBank}
                  onCheckedChange={(checked) => handleInputChange("bloodBank", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pharmacy">In-house Pharmacy</Label>
                <Switch
                  id="pharmacy"
                  checked={formData.pharmacy}
                  onCheckedChange={(checked) => handleInputChange("pharmacy", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(formData.operatingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-20">
                    <Label className="capitalize">{day}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!hours.closed}
                      onCheckedChange={(checked) =>
                        handleOperatingHoursChange(day, "closed", !checked)
                      }
                    />
                    <span className="text-sm text-muted-foreground">Open</span>
                  </div>
                  {!hours.closed && (
                    <>
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) =>
                          handleOperatingHoursChange(
                            day ,
                            "open",
                            e.target.value,
                          )
                        }
                        className="w-32"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) =>
                          handleOperatingHoursChange(
                            day,
                            "close",
                            e.target.value,
                          )
                        }
                        className="w-32"
                      />
                    </>
                  )}
                  {hours.closed && <Badge variant="secondary">Closed</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accreditation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Accreditation & Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {accreditations.map((accreditation) => (
                <div key={accreditation} className="flex items-center space-x-2">
                  <Checkbox
                    id={accreditation}
                    checked={formData.accreditations.includes(accreditation)}
                    onCheckedChange={() => handleAccreditationToggle(accreditation)}
                  />
                  <Label htmlFor={accreditation} className="text-sm font-normal">
                    {accreditation}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Administrative Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative Contact</CardTitle>
            <CardDescription>Primary administrative contact for the hospital</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="adminName">Administrator Name *</Label>
              <Input
                id="adminName"
                placeholder="Hospital administrator name"
                value={formData.adminName}
                onChange={(e) => handleInputChange("adminName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="adminPhone">Administrator Phone *</Label>
              <Input
                id="adminPhone"
                type="tel"
                placeholder="Administrator phone number"
                value={formData.adminPhone}
                onChange={(e) => handleInputChange("adminPhone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Administrator Email *</Label>
              <Input
                id="adminEmail"
                type="email"
                placeholder="Administrator email address"
                value={formData.adminEmail}
                onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Adding Hospital..." : "Add Hospital"}
            <Plus className="w-4 h-4 ml-2" />
          </Button>
          <Button type="button" variant="outline" size="lg" onClick={resetForm}>
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  )
}
