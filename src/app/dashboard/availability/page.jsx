"use client"

import * as React from "react"
import { CalendarIcon, Clock, Copy, Plus, Trash2, Save, RotateCcw, User, MapPin, Settings, Check, X, Coffee, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay, parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data
const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    photo: "/placeholder.svg?height=100&width=100&text=SJ",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Cardiology",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    photo: "/placeholder.svg?height=100&width=100&text=MC",
    hospitalId: "1",
    hospitalName: "City General Hospital",
    department: "Neurology",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Emergency Medicine",
    photo: "/placeholder.svg?height=100&width=100&text=ER",
    hospitalId: "2",
    hospitalName: "St. Mary's Medical Center",
    department: "Emergency Medicine",
  },
]

const hospitals = [
  { id: "1", name: "City General Hospital" },
  { id: "2", name: "St. Mary's Medical Center" },
  { id: "3", name: "Regional Health Institute" },
]

const appointmentTypes = [
  { id: "consultation", name: "Consultation", duration: 30, color: "bg-blue-100 text-blue-800" },
  { id: "procedure", name: "Procedure", duration: 60, color: "bg-green-100 text-green-800" },
  { id: "follow-up", name: "Follow-up", duration: 20, color: "bg-yellow-100 text-yellow-800" },
  { id: "emergency", name: "Emergency", duration: 45, color: "bg-red-100 text-red-800" },
]

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2)
  const minute = i % 2 === 0 ? "00" : "30"
  return `${hour.toString().padStart(2, "0")}:${minute}`
})

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function DoctorAvailability() {
  const [selectedDoctor, setSelectedDoctor] = React.useState("")
  const [selectedHospital, setSelectedHospital] = React.useState("")
  const [currentWeek, setCurrentWeek] = React.useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  // Weekly schedule state
  const [weeklySchedule, setWeeklySchedule] = React.useState({
    Monday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
    Tuesday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
    Wednesday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
    Thursday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
    Friday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
    Saturday: { isAvailable: false, slots: [] },
    Sunday: { isAvailable: false, slots: [] },
  })

  // Exception dates state
  const [exceptionDates, setExceptionDates] = React.useState([])
  const [selectedExceptionDate, setSelectedExceptionDate] = React.useState()
  const [exceptionReason, setExceptionReason] = React.useState("")
  const [isExceptionAvailable, setIsExceptionAvailable] = React.useState(false)

  // Settings state
  const [defaultAppointmentDuration, setDefaultAppointmentDuration] = React.useState(30)
  const [bufferTime, setBufferTime] = React.useState(5)
  const [maxAdvanceBooking, setMaxAdvanceBooking] = React.useState(30)
  const [allowSameDayBooking, setAllowSameDayBooking] = React.useState(true)

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor)

  const handleDayAvailabilityToggle = (day) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
        slots: !prev[day].isAvailable ? [{ start: "09:00", end: "17:00", type: "consultation" }] : [],
      },
    }))
  }

  const handleAddTimeSlot = (day) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "09:00", end: "10:00", type: "consultation" }],
      },
    }))
  }

  const handleRemoveTimeSlot = (day, index) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }))
  }

  const handleTimeSlotChange = (day, index, field, value) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)),
      },
    }))
  }

  const handleCopySchedule = (fromDay, toDay) => {
    setWeeklySchedule((prev) => ({
      ...prev,
      [toDay]: {
        ...prev[fromDay],
        slots: [...prev[fromDay].slots],
      },
    }))
  }

  const handleCopyToAllDays = (day) => {
    const daySchedule = weeklySchedule[day]
    const newSchedule = { ...weeklySchedule }
    daysOfWeek.forEach((d) => {
      if (d !== day) {
        newSchedule[d] = {
          ...daySchedule,
          slots: [...daySchedule.slots],
        }
      }
    })
    setWeeklySchedule(newSchedule)
  }

  const handleAddException = () => {
    if (!selectedExceptionDate) return

    const newException = {
      date: format(selectedExceptionDate, "yyyy-MM-dd"),
      reason: exceptionReason,
      isAvailable: isExceptionAvailable,
      customSlots: isExceptionAvailable ? [{ start: "09:00", end: "17:00", type: "consultation" }] : [],
    }

    setExceptionDates((prev) => [...prev, newException])
    setSelectedExceptionDate(undefined)
    setExceptionReason("")
    setIsExceptionAvailable(false)
  }

  const handleRemoveException = (index) => {
    setExceptionDates((prev) => prev.filter((_, i) => i !== index))
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
    setSelectedDoctor("")
    setSelectedHospital("")
    setWeeklySchedule({
      Monday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
      Tuesday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
      Wednesday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
      Thursday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
      Friday: { isAvailable: true, slots: [{ start: "09:00", end: "17:00", type: "consultation" }] },
      Saturday: { isAvailable: false, slots: [] },
      Sunday: { isAvailable: false, slots: [] },
    })
    setExceptionDates([])
    setIsSuccess(false)
  }

  const getWeekDates = () => {
    return daysOfWeek.map((_, index) => addDays(currentWeek, index))
  }

  const navigateWeek = (direction) => {
    setCurrentWeek((prev) => (direction === "prev" ? subWeeks(prev, 1) : addWeeks(prev, 1)))
  }

  const getAppointmentTypeColor = (type) => {
    const appointmentType = appointmentTypes.find((t) => t.id === type)
    return appointmentType?.color || "bg-gray-100 text-gray-800"
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Availability Updated Successfully!</CardTitle>
            <CardDescription>
              {selectedDoctorData?.name}'s availability has been updated in the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Doctor:</span>
                <span>{selectedDoctorData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Hospital:</span>
                <span>{hospitals.find((h) => h.id === selectedHospital)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Available Days:</span>
                <span>{daysOfWeek.filter((day) => weeklySchedule[day].isAvailable).length} days</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Exception Dates:</span>
                <span>{exceptionDates.length} dates</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetForm} className="flex-1">
                Set Another Schedule
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                View All Schedules
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Doctor Availability Management</h1>
        <p className="text-muted-foreground mt-2">Set up and manage doctor schedules for appointment booking</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Doctor Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Doctor & Hospital Selection
            </CardTitle>
            <CardDescription>Select the doctor and hospital for schedule management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hospital">Hospital *</Label>
                <Select value={selectedHospital} onValueChange={setSelectedHospital}>
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
                <Label htmlFor="doctor">Doctor *</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors
                      .filter((doctor) => !selectedHospital || doctor.hospitalId === selectedHospital)
                      .map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={doctor.photo || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {doctor.name.split(" ").map((n) => n.charAt(0)).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium">{doctor.name}</span>
                              <span className="text-sm text-muted-foreground ml-2">{doctor.specialty}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedDoctorData && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedDoctorData.photo || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedDoctorData.name.split(" ").map((n) => n.charAt(0)).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedDoctorData.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDoctorData.specialty}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedDoctorData.hospitalName} • {selectedDoctorData.department}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedDoctor && (
          <Tabs defaultValue="weekly" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="exceptions">Exception Dates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Weekly Schedule */}
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Weekly Schedule
                      </CardTitle>
                      <CardDescription>Set up the regular weekly availability</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
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
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigateWeek("next")}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {daysOfWeek.map((day, dayIndex) => {
                    const daySchedule = weeklySchedule[day]
                    const weekDate = getWeekDates()[dayIndex]

                    return (
                      <div key={day} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={daySchedule.isAvailable}
                              onCheckedChange={() => handleDayAvailabilityToggle(day)}
                            />
                            <div>
                              <Label className="text-base font-medium">{day}</Label>
                              <p className="text-sm text-muted-foreground">
                                {format(weekDate, "MMM dd, yyyy")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {daySchedule.isAvailable && (
                              <>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button type="button" variant="outline" size="sm">
                                      <Copy className="w-4 h-4 mr-2" />
                                      Copy
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Copy {day} Schedule</DialogTitle>
                                      <DialogDescription>
                                        Choose where to copy this day's schedule
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => handleCopyToAllDays(day)}
                                      >
                                        Copy to All Days
                                      </Button>
                                      <div className="grid grid-cols-2 gap-2">
                                        {daysOfWeek
                                          .filter((d) => d !== day)
                                          .map((targetDay) => (
                                            <Button
                                              key={targetDay}
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => handleCopySchedule(day, targetDay)}
                                            >
                                              Copy to {targetDay}
                                            </Button>
                                          ))}
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAddTimeSlot(day)}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Slot
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        {daySchedule.isAvailable && (
                          <div className="ml-8 space-y-3">
                            {daySchedule.slots.map((slot, slotIndex) => (
                              <div
                                key={slotIndex}
                                className="flex items-center gap-3 p-3 border rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  {slot.isBreak ? (
                                    <Coffee className="w-4 h-4 text-orange-500" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-blue-500" />
                                  )}
                                </div>
                                <div className="grid grid-cols-4 gap-3 flex-1">
                                  <Select
                                    value={slot.start}
                                    onValueChange={(value) =>
                                      handleTimeSlotChange(day, slotIndex, "start", value)
                                    }
                                  >
                                    <SelectTrigger>
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
                                  <Select
                                    value={slot.end}
                                    onValueChange={(value) =>
                                      handleTimeSlotChange(day, slotIndex, "end", value)
                                    }
                                  >
                                    <SelectTrigger>
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
                                  <Select
                                    value={slot.type}
                                    onValueChange={(value) =>
                                      handleTimeSlotChange(day, slotIndex, "type", value)
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {appointmentTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                          {type.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      checked={slot.isBreak || false}
                                      onCheckedChange={(checked) =>
                                        handleTimeSlotChange(day, slotIndex, "isBreak", checked)
                                      }
                                    />
                                    <Label className="text-sm">Break</Label>
                                  </div>
                                </div>
                                <Badge className={getAppointmentTypeColor(slot.type)}>
                                  {appointmentTypes.find((t) => t.id === slot.type)?.name}
                                </Badge>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveTimeSlot(day, slotIndex)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {!daySchedule.isAvailable && (
                          <div className="ml-8 p-4 bg-gray-50 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Not available on {day}</p>
                          </div>
                        )}

                        <Separator />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Exception Dates */}
            <TabsContent value="exceptions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    Exception Dates
                  </CardTitle>
                  <CardDescription>
                    Set specific dates with different availability (holidays, vacations, special hours)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <div>
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedExceptionDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedExceptionDate ? format(selectedExceptionDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={selectedExceptionDate}
                            onSelect={setSelectedExceptionDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="reason">Reason</Label>
                      <Input
                        id="reason"
                        placeholder="Holiday, vacation, etc."
                        value={exceptionReason}
                        onChange={(e) => setExceptionReason(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="exception-available"
                          checked={isExceptionAvailable}
                          onCheckedChange={setIsExceptionAvailable}
                        />
                        <Label htmlFor="exception-available">Available</Label>
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button
                        type="button"
                        onClick={handleAddException}
                        disabled={!selectedExceptionDate || !exceptionReason}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Exception
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {exceptionDates.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No exception dates set</p>
                        <p className="text-sm">Add dates with special availability or unavailability</p>
                      </div>
                    ) : (
                      exceptionDates.map((exception, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {exception.isAvailable ? (
                                <Play className="w-4 h-4 text-green-500" />
                              ) : (
                                <Pause className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{format(parseISO(exception.date), "PPP")}</p>
                              <p className="text-sm text-muted-foreground">{exception.reason}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={exception.isAvailable ? "default" : "destructive"}
                            >
                              {exception.isAvailable ? "Available" : "Unavailable"}
                            </Badge>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveException(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Appointment Settings
                  </CardTitle>
                  <CardDescription>Configure appointment booking rules and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="default-duration">Default Appointment Duration (minutes)</Label>
                        <Input
                          id="default-duration"
                          type="number"
                          value={defaultAppointmentDuration}
                          onChange={(e) => setDefaultAppointmentDuration(Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="buffer-time">Buffer Time Between Appointments (minutes)</Label>
                        <Input
                          id="buffer-time"
                          type="number"
                          value={bufferTime}
                          onChange={(e) => setBufferTime(Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="advance-booking">Maximum Advance Booking (days)</Label>
                        <Input
                          id="advance-booking"
                          type="number"
                          value={maxAdvanceBooking}
                          onChange={(e) => setMaxAdvanceBooking(Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="same-day-booking">Allow Same Day Booking</Label>
                          <p className="text-sm text-muted-foreground">
                            Patients can book appointments for the same day
                          </p>
                        </div>
                        <Switch
                          id="same-day-booking"
                          checked={allowSameDayBooking}
                          onCheckedChange={setAllowSameDayBooking}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Appointment Types & Durations</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      {appointmentTypes.map((type) => (
                        <div key={type.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge className={type.color}>{type.name}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{type.duration} min</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Submit Button */}
        {selectedDoctor && (
          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saving Availability..." : "Save Availability"}
              <Save className="w-4 h-4 ml-2" />
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={resetForm}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
