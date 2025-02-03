"use client"

import { useState, useMemo } from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend } from "date-fns"
import { CalendarIcon, InfoIcon, DownloadIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { TooltipProvider } from "@/components/ui/tooltip"

const attendanceData = [
  {
    id: 1,
    date: "2025-02-04",
    class: "CS301 - Software Engineering",
    status: "Present",
    time: "11:00 AM",
  },
  {
    id: 2,
    date: "2025-02-05",
    class: "CS301 - Software Engineering",
    status: "Absent",
    time: "11:00 AM",
  }
]

const allClasses = [
  "CS301 - Software Engineering",
]

export default function DashboardPage() {
  const { user } = useUser()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showAllData, setShowAllData] = useState(false)
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const { overallStats, classStats, monthlyOverview } = useMemo(() => {
    const totalClasses = attendanceData.length
    const presentClasses = attendanceData.filter(record => record.status === "Present").length
    const classStats = allClasses.map(className => {
      const classRecords = attendanceData.filter(record => record.class === className)
      const present = classRecords.filter(record => record.status === "Present").length
      return {
        className,
        total: classRecords.length,
        present,
        percentage: (classRecords.length > 0) ? (present / classRecords.length) * 100 : 0
      }
    })

    const monthStart = startOfMonth(date || new Date())
    const monthEnd = endOfMonth(date || new Date())
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
    
    const monthlyOverview = daysInMonth.map(day => {
      const formattedDate = format(day, 'yyyy-MM-dd')
      const records = attendanceData.filter(record => record.date === formattedDate)
      return {
        date: day,
        present: records.filter(r => r.status === 'Present').length,
        absent: records.filter(r => r.status === 'Absent').length,
        isWeekend: isWeekend(day)
      }
    })

    return {
      overallStats: {
        total: totalClasses,
        present: presentClasses,
        percentage: (totalClasses > 0) ? (presentClasses / totalClasses) * 100 : 0
      },
      classStats,
      monthlyOverview
    }
  }, [date])

  const classesToDisplay = useMemo(() => {
    const monthDates = eachDayOfInterval({ start: startOfMonth(date || new Date()), end: endOfMonth(date || new Date()) });
    if (showAllData) {
      return monthDates.map((day) => {
        const formattedDate = format(day, "yyyy-MM-dd")
        if (isWeekend(day)) {
          return {
            date: formattedDate,
            classes: [{ class: "Weekend", status: "Holiday", time: "-" }],
          }
        }
        const classesOnDate = attendanceData.filter((record) => record.date === formattedDate)
        return {
          date: formattedDate,
          classes: allClasses.map((className) => {
            const classRecord = classesOnDate.find((record) => record.class === className)
            return (
              classRecord || {
                class: className,
                status: "No Class",
                time: "-",
              }
            )
          }),
        }
      })
    } else if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      if (isWeekend(date)) {
        return [
          {
            date: formattedDate,
            classes: [{ class: "Weekend", status: "Holiday", time: "-" }],
          },
        ]
      }
      const classesOnDate = attendanceData.filter((record) => record.date === formattedDate)
      return [
        {
          date: formattedDate,
          classes: allClasses.map((className) => {
            const classRecord = classesOnDate.find((record) => record.class === className)
            return (
              classRecord || {
                class: className,
                status: "No Class",
                time: "-",
              }
            )
          }),
        },
      ]
    }
    return []
  }, [date, showAllData])

  const filteredData = useMemo(() => {
    return classesToDisplay.map(dayData => ({
      ...dayData,
      classes: dayData.classes.filter(record => 
        (selectedClass === 'all' || record.class === selectedClass) &&
        (selectedStatus === 'all' || record.status === selectedStatus)
      )
    })).filter(dayData => dayData.classes.length > 0)
  }, [classesToDisplay, selectedClass, selectedStatus])

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Class', 'Status', 'Time'],
      ...attendanceData.map(item => [
        item.date,
        item.class,
        item.status,
        item.time
      ])
    ].map(e => e.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance-record.csv'
    a.click()
  }

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      Present: "bg-green-100 text-green-800 hover:bg-green-200",
      Absent: "bg-red-100 text-red-800 hover:bg-red-200",
      Holiday: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    }
    return variants[status] || "bg-gray-100 text-gray-800"
  }  

  return (
    <TooltipProvider>
      <main className="max-w-[75rem] w-full mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl font-bold text-gray-800">Welcome, { user?.fullName }</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Overall Attendance
                <Tooltip>
                  <TooltipTrigger><InfoIcon className="h-4 w-4" /></TooltipTrigger>
                  <TooltipContent>
                    <p>Calculated based on {attendanceData.length} recorded classes</p>
                  </TooltipContent>
                </Tooltip>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overallStats.percentage.toFixed(1)}%</div>
              <div className="text-sm text-gray-500">
                {overallStats.present} attended / {overallStats.total} total classes
              </div>
              <Progress value={overallStats.percentage} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {monthlyOverview.map((day, index) => (
                  <div 
                    key={index}
                    className={`h-6 w-6 text-xs flex items-center justify-center rounded-sm 
                      ${day.isWeekend ? 'bg-yellow-100' : 
                       day.present > 0 ? 'bg-green-100' : 
                       day.absent > 0 ? 'bg-red-100' : 'bg-gray-100'}`}
                  >
                    {format(day.date, 'd')}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2 text-xs">
                <div className="flex items-center"><div className="h-3 w-3 bg-green-100 mr-1" /> Present</div>
                <div className="flex items-center"><div className="h-3 w-3 bg-red-100 mr-1" /> Absent</div>
                <div className="flex items-center"><div className="h-3 w-3 bg-yellow-100 mr-1" /> Holiday</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {classStats.map((stat, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="truncate max-w-[120px]">{stat.className}</span>
                    <span>{stat.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                {showAllData ? 
                  "Showing all records for the month" : 
                  `Showing records for ${date ? format(date, 'MMM dd, yyyy') : 'selected date'}`}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={exportToCSV}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <Popover>
              <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Choose date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setShowAllData(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="No Class">No Class</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showAllData ? "default" : "outline"}
                onClick={() => setShowAllData(!showAllData)}
              >
                {showAllData ? "Show Single Day" : "Show Full Month"}
              </Button>
            </div>

            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((dayData) =>
                    dayData.classes.map((record, index) => (
                      <TableRow key={`${dayData.date}-${record.class}`}>
                        {index === 0 && (
                          <TableCell rowSpan={dayData.classes.length}>
                            {format(new Date(dayData.date), "EEE, MMM d")}
                          </TableCell>
                        )}
                        <TableCell>{record.time}</TableCell>
                        <TableCell className="font-medium">{record.class}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadge(record.status)}>{record.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                  {filteredData.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        No records found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <InfoIcon className="h-5 w-5" />
              Data Transparency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• Weekend days (Saturday and Sunday) are automatically marked as holidays</p>
            <p>• "No Class" indicates no scheduled class for that course on that day</p>
            <p>• Sample data used for demonstration purposes</p>
            <p>• Attendance percentage calculated based on recorded classes only</p>
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  )
}
