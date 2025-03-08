"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, DownloadIcon, RefreshCcw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FileUpload from "@/components/FileUpload"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"

export function AdminDashboard() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [studentsData, setStudentsData] = useState<any[]>([])
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [editStatus, setEditStatus] = useState<string>("Absent")
  // New state to manage Flask API update status
  // "idle": no update in progress,
  // "loading": while the API call is being processed,
  // "success": API call succeeded,
  // "error": API call failed.
  const [flaskUpdateStatus, setFlaskUpdateStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  const refreshData = async () => {
    const response = await fetch("/api/attendance")
    const data = await response.json()
    data.sort((a: any, b: any) => a.studentRollNo - b.studentRollNo)
    setStudentsData(data)
  }

  useEffect(() => {
    refreshData()
  }, [])

  const exportToCSV = () => {
    const allDates = [
      ...new Set(
        studentsData.flatMap((student) =>
          Object.keys(student).filter((key) => key.startsWith("date_"))
        )
      ),
    ].sort()

    const header = ["Roll Number", "Name", ...allDates, "Attendance Percentage"]
    const csvData = studentsData.map((student) => {
      const rowStatuses = allDates.map((date) => student[date] || "Absent")
      return [
        student.studentRollNo,
        student.name,
        ...rowStatuses,
        student.attendancePercentage + "%",
      ]
    })

    const csvContent = [header, ...csvData].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "class-attendance.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: string) => {
    return status === "Present"
      ? "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
      : "bg-red-500/20 text-red-200 hover:bg-red-500/30"
  }

  const overallStats = {
    totalStudents: studentsData.length,
    presentToday: studentsData.filter(
      (student) => student[`date_${format(date, "yyyy_MM_dd")}`] === "Present"
    ).length,
  }

  const handleEditClick = (student: any) => {
    setSelectedStudent(student)
    const currentStatus =
      student[`date_${format(date, "yyyy_MM_dd")}`] || "Absent"
    setEditStatus(currentStatus)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = async () => {
    const formattedDate = format(date, "yyyy_MM_dd")
    try {
      const res = await fetch("/api/attendance/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNo: selectedStudent.studentRollNo,
          field: `date_${formattedDate}`,
          newStatus: editStatus,
        }),
      })
      if (res.ok) {
        refreshData()
        setIsEditModalOpen(false)
        setSelectedStudent(null)
      } else {
        console.error("Failed to update attendance")
      }
    } catch (error) {
      console.error("Error updating attendance:", error)
    }
  }

  // Updated function to trigger the Flask API route with inline UI feedback.
  const handleFlaskUpdate = async () => {
    setFlaskUpdateStatus("loading")
    try {
      const response = await fetch("https://dask58.pythonanywhere.com/update_attendance")
      if (response.ok) {
        setFlaskUpdateStatus("success")
      } else {
        setFlaskUpdateStatus("error")
      }
    } catch (error) {
      console.error("Error calling Flask API:", error)
      setFlaskUpdateStatus("error")
    } finally {
      // Clear the message after 3 seconds
      setTimeout(() => {
        setFlaskUpdateStatus("idle")
      }, 3000)
    }
  }

  return (
    <main className="max-w-[85rem] w-full mx-auto p-6 space-y-8">
      <div className="fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
          Class Attendance Register
        </h1>
        <p className="text-gray-400">Manage and track student attendance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Today's Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Total Students</p>
                <p className="text-3xl font-bold">{overallStats.totalStudents}</p>
              </div>
              <div>
                <p className="text-gray-400">Present Today</p>
                <p className="text-3xl font-bold text-emerald-400">
                  {overallStats.presentToday}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <FileUpload />
      </div>
      <Card className="glass-card fade-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              View and manage class attendance
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant="outline"
              onClick={async () => {
                const button = document.querySelector(".refresh-icon")
                button?.classList.add("animate-spin")
                await refreshData()
                button?.classList.remove("animate-spin")
              }}
              className="border-white/10 hover:bg-white/5 w-full md:w-auto"
            >
              <RefreshCcw className="mr-2 h-4 w-4 refresh-icon" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={exportToCSV}
              className="border-white/10 hover:bg-white/5 w-full md:w-auto"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            {/* Updated trigger button for the Flask API */}
            <div className="flex flex-col items-center">
              <Button
                variant="outline"
                onClick={handleFlaskUpdate}
                disabled={flaskUpdateStatus === "loading"}
                className="border-white/10 hover:bg-white/5 w-full md:w-auto"
              >
                {flaskUpdateStatus === "loading" ? (
                  <>
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Trigger Update"
                )}
              </Button>
              {flaskUpdateStatus === "success" && (
                <span className="text-green-500 mt-1 text-sm">
                  Attendance marked successfully!
                </span>
              )}
              {flaskUpdateStatus === "error" && (
                <span className="text-red-500 mt-1 text-sm">
                  Error triggering Flask API.
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] justify-start text-left font-normal border-white/10 hover:bg-white/5"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="rounded-md border-white/10"
                />
              </PopoverContent>
            </Popover>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px] border-white/10">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/[0.02]">
                  <TableHead className="text-gray-300">Roll Number</TableHead>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">
                    Attendance Percentage
                  </TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsData.map((student) => {
                  const todayAttendance =
                    student[`date_${format(date, "yyyy_MM_dd")}`]
                  if (
                    selectedStatus !== "all" &&
                    todayAttendance !== selectedStatus
                  ) {
                    return null
                  }
                  return (
                    <TableRow
                      key={student.studentRollNo}
                      className="border-white/10 hover:bg-white/[0.02]"
                    >
                      <TableCell className="font-mono text-gray-300">
                        {student.studentRollNo}
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        {todayAttendance ? (
                          <Badge className={getStatusBadge(todayAttendance)}>
                            {todayAttendance}
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-500/20 text-gray-200">
                            Not Marked
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {student.attendancePercentage}%
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handleEditClick(student)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Attendance</DialogTitle>
            <DialogDescription>
              Update the attendance status for{" "}
              <span className="font-bold">
                {selectedStudent?.name || "this student"}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Status</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveEdit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
