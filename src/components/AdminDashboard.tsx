"use client"

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { DownloadIcon, CalendarIcon, RefreshCcw } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FileUpload from "@/components/FileUpload"
import { useState, useEffect } from "react"

export function AdminDashboard() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [studentsData, setStudentsData] = useState<any[]>([])

  const refreshData = async () => {
    const response = await fetch('/api/attendance')
    const data = await response.json()
    data.sort((a: any, b: any) => a.studentRollNo - b.studentRollNo)
    setStudentsData(data)
  }

  useEffect(() => {
    refreshData()
  }, [])

  const exportToCSV = () => {
    const allDates = [
      ...new Set(studentsData.flatMap(student =>
        Object.keys(student).filter(key => key.startsWith('date_'))
      ))
    ].sort()

    const header = ['Roll Number', 'Name', ...allDates, 'Attendance Percentage']
    const csvData = studentsData.map(student => {
      const rowStatuses = allDates.map(date => student[date] || 'Absent')
      return [student.studentRollNo, student.name, ...rowStatuses, student.attendancePercentage + '%']
    })

    // Combine header and rows into CSV content.
    const csvContent = [header, ...csvData]
      .map(row => row.join(','))
      .join('\n')

    // Create a Blob and trigger the download.
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'class-attendance.csv'
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
    presentToday: studentsData.filter(student => 
      student[`date_${format(date, 'yyyy_MM_dd')}`] === "Present"
    ).length
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
                <p className="text-3xl font-bold text-emerald-400">{overallStats.presentToday}</p>
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
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={refreshData}
              className="border-white/10 hover:bg-white/5"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              onClick={exportToCSV}
              className="border-white/10 hover:bg-white/5"
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
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
                  <TableHead className="text-gray-300">Attendance Percentage</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsData.map((student) => {
                  const todayAttendance = student[`date_${format(date, 'yyyy_MM_dd')}`]
                  
                  if (selectedStatus !== 'all' && todayAttendance !== selectedStatus) {
                    return null
                  }
                  return (
                    <TableRow 
                      key={student.studentRollNo}
                      className="border-white/10 hover:bg-white/[0.02]"
                    >
                      <TableCell className="font-mono text-gray-300">{student.studentRollNo}</TableCell>
                      <TableCell className="font-medium text-white">{student.name}</TableCell>
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
                      <TableCell className="text-gray-300">{student.attendancePercentage}%</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-400 hover:text-white"
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
    </main>
  )
}
