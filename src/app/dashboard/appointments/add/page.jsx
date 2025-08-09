"use client"

import * as React from "react"
import { CalendarDays, Clock, MapPin, User, CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Sample data
const hospitals = [
  {
    id: "1",
    name: "City General Hospital",
    location: "Downtown Medical District",
    departments: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
  },
  {
    id: "2",
    name: "St. Mary's Medical Center",
    location: "Westside Health Campus",
    departments: ["Emergency Medicine", "Surgery", "Oncology", "Radiology"],
  },
  {
    id: "3",
    name: "Regional Health Institute",
    location: "North Medical Plaza",
    departments: ["Internal Medicine", "Dermatology", "Psychiatry", "Ophthalmology"],
  },
]

const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    hospitalId: "1",
    experience: "15 years",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    hospitalId: "1",
    experience: "12 years",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Emergency Medicine",
    hospitalId: "2",
    experience: "8 years",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Dr. James Wilson",
    specialty: "Surgery",
    hospitalId: "2",
    experience: "20 years",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Internal Medicine",
    hospitalId: "3",
    experience: "10 years",
    rating: 4.6,
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    specialty: "Dermatology",
    hospitalId: "3",
    experience: "14 years",
    rating: 4.8,
  },
]

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

export default function HospitalAppointmentBooking() {
  const [selectedHospital, setSelectedHospital] = React.useState("")
  const [selectedDoctor, setSelectedDoctor] = React.useState("")
  const [selectedDate, setSelectedDate] = React.useState()
  const [selectedTime, setSelectedTime] = React.useState("")
  const [patientInfo, setPatientInfo] = React.useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isBooked, setIsBooked] = React.useState(false)

  // Filter doctors based on selected hospital
  const availableDoctors = doctors.filter((doctor) => doctor.hospitalId === selectedHospital)

  // Get selected hospital and doctor details
  const selectedHospitalData = hospitals.find((h) => h.id === selectedHospital)
  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsBooked(true)
  }

  const resetForm = () => {
    setSelectedHospital("")
    setSelectedDoctor("")
    setSelectedDate(undefined)
    setSelectedTime("")
    setPatientInfo({ name: "", phone: "", email: "", reason: "" })
    setIsBooked(false)
  }

  if (isBooked) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CalendarDays className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Appointment Confirmed!</CardTitle>
            <CardDescription>Your appointment has been successfully booked</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Hospital:</span>
                <span>{selectedHospitalData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Doctor:</span>
                <span>{selectedDoctorData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{selectedDate ? format(selectedDate, "PPP") : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{selectedTime}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">A confirmation email has been sent to {patientInfo.email}</p>
            <Button onClick={resetForm} className="w-full">
              Book Another Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Book an Appointment</h1>
        <p className="text-muted-foreground mt-2">Schedule your visit with our healthcare professionals</p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Select Hospital
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hospital">Hospital</Label>
                <Select value={selectedHospital} onValueChange={setSelectedHospital}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{hospital.name}</span>
                          <span className="text-sm text-muted-foreground">{hospital.location}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedHospitalData && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Available Departments:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedHospitalData.departments.map((dept) => (
                      <Badge key={dept} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Select Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="doctor">Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor} disabled={!selectedHospital}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedHospital ? "Choose a doctor" : "Select hospital first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{doctor.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {doctor.specialty} • {doctor.experience} • ⭐ {doctor.rating}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Appointment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {selectedDate && (
                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Patient Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Please provide your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={patientInfo.name}
                  onChange={(e) => setPatientInfo((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={patientInfo.email}
                  onChange={(e) => setPatientInfo((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Briefly describe your symptoms or reason for the appointment"
                  value={patientInfo.reason}
                  onChange={(e) => setPatientInfo((prev) => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appointment Summary */}
          {selectedHospitalData && selectedDoctorData && selectedDate && selectedTime && (
            <Card>
              <CardHeader>
                <CardTitle>Appointment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hospital:</span>
                  <span className="font-medium">{selectedHospitalData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="font-medium">{selectedDoctorData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Specialty:</span>
                  <span className="font-medium">{selectedDoctorData.specialty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{format(selectedDate, "PPP")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Consultation Fee:</span>
                  <span>$150</span>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={
              !selectedHospital ||
              !selectedDoctor ||
              !selectedDate ||
              !selectedTime ||
              !patientInfo.name ||
              !patientInfo.phone ||
              !patientInfo.email ||
              isSubmitting
            }
          >
            {isSubmitting ? "Booking Appointment..." : "Book Appointment"}
          </Button>
        </div>
      </form>
    </div>
  )
}
