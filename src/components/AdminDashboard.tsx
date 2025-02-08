"use client"

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { DownloadIcon, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FileUpload from "@/components/FileUpload"
import { useState } from "react"

const studentsData = Array.from({ length: 70 }, (_, index) => {
  // Skipping student 14 as per original logic.
  if (index + 1 === 14) return null;
  const rollNumber = `23bcs${String(index + 1).padStart(3, '0')}`;
  const attendanceRecords = [
    { date: "2025-02-08", status: Math.random() > 0.5 ? "Present" : "Absent" },
    { date: "2025-02-07", status: Math.random() > 0.5 ? "Present" : "Absent" },
    { date: "2025-02-06", status: Math.random() > 0.5 ? "Present" : "Absent" },
  ];
  const presentCount = attendanceRecords.filter(record => record.status === "Present").length;
  const attendancePercentage = (presentCount / attendanceRecords.length) * 100;

  return {
    id: index + 1,
    name: `Student ${index + 1}`,
    roll: rollNumber,
    attendance: attendanceRecords,
    attendancePercentage: attendancePercentage.toFixed(2)
  };
}).filter(student => student !== null);

export function AdminDashboard() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const exportToCSV = () => {
    // 1. Get all unique dates across all students' attendance records.
    const allDates = [
      ...new Set(studentsData.flatMap(student =>
        student.attendance.map(record => record.date)
      ))
    ].sort();

    // 2. Build the CSV header.
    const header = ['Roll Number', 'Name', ...allDates, 'Attendance Percentage'];

    // 3. For each student, create a row with:
    //    - Roll number and name.
    //    - For each date in header, attendance status (or "Absent" if not present).
    //    - The attendance percentage.
    const csvData = studentsData.map(student => {
      const attendanceMap = new Map(student.attendance.map(record => [record.date, record.status]));
      const rowStatuses = allDates.map(date => attendanceMap.get(date) || 'Absent');
      return [student.roll, student.name, ...rowStatuses, student.attendancePercentage + '%'];
    });

    // 4. Combine header and rows into CSV content.
    const csvContent = [header, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    // 5. Create a Blob and trigger the download.
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'class-attendance.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const getStatusBadge = (status: string) => {
    return status === "Present" 
      ? "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
      : "bg-red-500/20 text-red-200 hover:bg-red-500/30"
  }

  const overallStats = {
    totalStudents: studentsData.length,
    presentToday: studentsData.filter(student => 
      student.attendance.some(record => 
        record.date === format(date, 'yyyy-MM-dd') && record.status === "Present"
      )
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
          <Button 
            variant="outline" 
            onClick={exportToCSV}
            className="border-white/10 hover:bg-white/5"
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
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
                  const todayAttendance = student.attendance.find(
                    record => record.date === format(date, 'yyyy-MM-dd')
                  )
                  
                  if (selectedStatus !== 'all' && todayAttendance?.status !== selectedStatus) {
                    return null
                  }
                  return (
                    <TableRow 
                      key={student.id}
                      className="border-white/10 hover:bg-white/[0.02]"
                    >
                      <TableCell className="font-mono text-gray-300">{student.roll}</TableCell>
                      <TableCell className="font-medium text-white">{student.name}</TableCell>
                      <TableCell>
                        {todayAttendance ? (
                          <Badge className={getStatusBadge(todayAttendance.status)}>
                            {todayAttendance.status}
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
